// createTables.js
//we must add chat_id here 

// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'users' table
const createUsersTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS users (
      user_id  SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      profilepic VARCHAR(255),
      is_deleted BOOLEAN DEFAULT false

    );
  `;

  try {
    // Execute the query to create the table
    await pool.query(query);
    console.log('users table created or already exists');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createUsersTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
