import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Method not allowed" })
    };
  }

  try {
    const data = JSON.parse(event.body);

    await pool.query(
      "INSERT INTO leads(name,email,phone,company,message) VALUES($1,$2,$3,$4,$5)",
      [
        data.name,
        data.email,
        data.phone,
        data.company,
        data.message
      ]
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Thank you! We’ll contact you soon." })
    };
  } catch (err) {
    console.error("DB Error:", err);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Server error" })
    };
  }
};
