import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export const handler = async (event) => {
  try {
    const params = new URLSearchParams(event.body);

    const name = params.get("name");
    const email = params.get("email");
    const phone = params.get("phone");
    const company = params.get("company");
    const message = params.get("message");

    await pool.query(
      "INSERT INTO leads(name,email,phone,company,product) VALUES($1,$2,$3,$4,$5)",
      [name, email, phone, company, message]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Saved to database" })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
