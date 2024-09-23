// createTables.js

// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'messages' table
const createMessagesTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS public.messages (
        message_id SERIAL PRIMARY KEY,
        chat_id INTEGER NOT NULL REFERENCES public.chats(chat_id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        sender VARCHAR(255) NOT NULL,
        "time" TIME NOT NULL
      );
  `;

  try {
    // Execute the query to create the messages table
    await pool.query(query);
    console.log('messages table created or already exists');
  } catch (error) {
    console.error('Error creating messages table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createMessagesTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
