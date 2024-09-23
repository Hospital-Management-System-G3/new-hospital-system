// createTables.js

// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'chats' table
const createChatsTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS public.chats (
        chat_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        doctor_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        doctor_name VARCHAR(255),
        doctor_picture VARCHAR(255),
        user_name VARCHAR(255),
        user_picture VARCHAR(255),
        last_message VARCHAR(255),
        time_last_message VARCHAR(255)
      );
  `;

  try {
    // Execute the query to create the chats table
    await pool.query(query);
    console.log('chats table created or already exists');
  } catch (error) {
    console.error('Error creating chats table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createChatsTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
