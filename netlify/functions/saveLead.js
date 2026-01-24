import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export const handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const { name, email, phone, company, message } = data;

    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required fields" })
      };
    }

    await pool.query(
      "INSERT INTO leads(name,email,phone,company,message) VALUES($1,$2,$3,$4,$5)",
      [name, email, phone, company, message]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Thank you! We’ll contact you soon." })
    };
  } catch (err) {
    console.error("DB ERROR:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error" })
    };
  }
};
