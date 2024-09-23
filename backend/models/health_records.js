// createTables.js

// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'health_records' table
const createHealthRecordsTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS health_records (
        record_id SERIAL PRIMARY KEY,
        patient_id INTEGER NOT NULL REFERENCES patient_records(record_id) ON DELETE CASCADE,
        date DATE NOT NULL,
        temperature DECIMAL(4, 2) NOT NULL,
        blood_pressure INTEGER NOT NULL,
        weight INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_deleted BOOLEAN DEFAULT false
      );
  `;

  try {
    // Execute the query to create the health_records table
    await pool.query(query);
    console.log('health_records table created or already exists');
  } catch (error) {
    console.error('Error creating health_records table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createHealthRecordsTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
