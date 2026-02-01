const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async (event) => {
  try {
    console.log("Function triggered");

    const data = JSON.parse(event.body);
    console.log("Received:", data);

    const result = await pool.query(
      "INSERT INTO leads(name,email,phone,company,message) VALUES($1,$2,$3,$4,$5)",
      [data.name, data.email, data.phone, data.company, data.message]
    );

    console.log("Inserted ID:", result.rows[0].id);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Thank you! We’ll contact you soon." })
    };
  } catch (err) {
    console.error("DB ERROR:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Database error" })
    };
  }
};
