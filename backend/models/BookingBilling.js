// Import the database pool from config
const pool = require('../config/db');

// Function to create the 'BookingBilling' table
const createBookingBillingTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS BookingBilling (
      billing_id SERIAL PRIMARY KEY, -- Unique identifier for each billing record
      booking_id INTEGER REFERENCES doctor_availabilities(availability_id) ON DELETE CASCADE, -- Foreign key referencing doctor_availabilities
      user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- Foreign key referencing users
      doctor_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- Foreign key referencing users (doctor)
      total_price DECIMAL(10, 2) DEFAULT 0, -- Total price for the booking
      doctor_profit DECIMAL(10, 2) DEFAULT 0, -- Profit for the doctor
      hospital_profit DECIMAL(10, 2) DEFAULT 0, -- Profit for the hospital
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the billing was created
      is_deleted BOOLEAN NOT NULL DEFAULT FALSE -- Flag to indicate if the record is deleted
    );
  `;

  try {
    // Execute the query to create the table
    await pool.query(query);
    console.log('BookingBilling table created or already exists');
  } catch (error) {
    console.error('Error creating BookingBilling table:', error);
  }
};

// Function to initialize the table creation
const init = async () => {
  await createBookingBillingTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
