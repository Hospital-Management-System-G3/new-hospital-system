// createTables.js

// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'contacts' table
const createContactsTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS contacts (
      contact_id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      contact_message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    );
  `;

  try {
    // Execute the query to create the contacts table
    await pool.query(query);
    console.log('contacts table created or already exists');
  } catch (error) {
    console.error('Error creating contacts table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createContactsTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
