// createDoctorAvailabilitiesTable.js

// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'doctor_availabilities' table
const createDoctorAvailabilitiesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS doctor_availabilities (
      availability_id SERIAL PRIMARY KEY, -- Unique identifier for each record
      doctor_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- Doctor identifier
      available_date DATE NOT NULL, -- Date available for booking
      available_time_from TIME NOT NULL, -- Start time of availability
      available_time_to TIME NOT NULL, -- End time of availability
      status VARCHAR(20) NOT NULL DEFAULT 'active', -- Status (e.g., 'active', 'cancelled', 'pending', 'confirmed', 'completed')
      is_booked BOOLEAN NOT NULL DEFAULT FALSE, -- Indicates if the slot is booked
      is_deleted BOOLEAN NOT NULL DEFAULT FALSE, -- Indicates if the record is deleted
      total_price DECIMAL(10, 2) NOT NULL, -- Total price for the booking
      service_type VARCHAR(50) NOT NULL, -- Type of service provided by the doctor
      CONSTRAINT valid_availability CHECK (available_time_from < available_time_to) -- Ensure start time is before end time
    );
  `;

  try {
    // Execute the query to create the table
    await pool.query(query);
    console.log('doctor_availabilities table created or already exists');
  } catch (error) {
    console.error('Error creating doctor_availabilities table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createDoctorAvailabilitiesTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
