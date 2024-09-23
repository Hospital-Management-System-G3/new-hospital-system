const pool = require("../config/db");

// Define the function to create the 'feedback' table
const createFeedbackTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS feedback (
      feedback_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      doctor_id INT NOT NULL,
      feedback_message TEXT NOT NULL,
      is_deleted BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (doctor_id) REFERENCES users(user_id)
    );
  `;

  try {
    // Execute the query to create the feedback table
    await pool.query(query);
    console.log("feedback table created or already exists");
  } catch (error) {
    console.error("Error creating feedback table:", error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createFeedbackTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
