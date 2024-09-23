const pool = require("../config/db");

const createSettingTable = async () => {
  const query = `
        CREATE TABLE IF NOT EXISTS setting (
        id SERIAL PRIMARY KEY,
        logo_image VARCHAR(255) NOT NULL,
        background_color VARCHAR(7) NOT NULL, -- assuming hex color format
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );
  `;

  try {
    await pool.query(query);
    console.log("setting table created or already exists");
  } catch (error) {
    console.error("Error creating setting table:", error);
  }
};

const init = async () => {
  await createSettingTable();
  process.exit();
};

init();
