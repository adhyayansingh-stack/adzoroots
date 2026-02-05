const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST"
      }
    };
  }

  try {
    console.log("Function triggered");

    const data = JSON.parse(event.body || "{}");
    console.log("Received:", data);

    const {
      name,
      email,
      phone,
      company,
      message,
      type = "general"
    } = data;

    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Name and email are required" })
      };
    }

    const result = await pool.query(
      `INSERT INTO leads (name, email, phone, company, message, type)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [name, email, phone || "", company || "", message || "", type]
    );

    console.log("Inserted ID:", result.rows[0].id);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        message: "Thank you! We’ll contact you soon."
      })
    };

  } catch (err) {
    console.error("DB ERROR:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        message: "Something went wrong. Please try again later."
      })
    };
  }
};
