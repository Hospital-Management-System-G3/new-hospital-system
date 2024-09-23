// createTables.js

// Import the database pool from config
const pool = require("../config/db");

// Define the function to create the 'report' table
const createReportTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS report (
      report_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      feedback_id INT NOT NULL,
      report_messege TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_deleted BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (feedback_id) REFERENCES feedback(feedback_id)
  );
  `;
 
  try {
    // Execute the query to create the report table
    await pool.query(query);
    console.log("reports table created or already exists");
  } catch (error) {
    console.error("Error creating reports table:", error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createReportTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
