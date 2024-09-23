const pool = require("../config/db");

const createInfoAboutTable = async () => {
  const query = `
        CREATE TABLE IF NOT EXISTS info_about (
        info_id SERIAL PRIMARY KEY,
        our_mission TEXT NOT NULL,
        our_vision TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );
  `;

  try {
    await pool.query(query);
    console.log("info_about table created or already exists");
  } catch (error) {
    console.error("Error creating info_about table:", error);
  }
};

const init = async () => {
  await createInfoAboutTable();
  process.exit();
};

init();
