const pool = require("../config/db");

const createInfoContactTable = async () => {
  const query = `
        CREATE TABLE IF NOT EXISTS info_contact (
        contact_id SERIAL PRIMARY KEY,
        address TEXT NOT NULL,
        phone_number VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );
  `;

  try {
    await pool.query(query);
    console.log("info_contact table created or already exists");
  } catch (error) {
    console.error("Error creating info_contact table:", error);
  }
};

const init = async () => {
  await createInfoContactTable();
  process.exit();
};

init();
