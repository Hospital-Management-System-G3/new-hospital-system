// Import the database pool from config
const pool = require('../config/db');

// Function to insert sample data into BookingBilling without doctor_profit and hospital_profit
const insertBookingBillingData = async () => {
  const query = `
    INSERT INTO BookingBilling (booking_id, user_id, doctor_id, total_price)
    VALUES
    (2, 1, 11, 100.00),  -- Sample data entry 1
    (3, 2, 12, 120.00),  -- Sample data entry 2
    (4, 3, 11, 150.00),  -- Sample data entry 3
    (5, 4, 13, 90.00),  -- Sample data entry 4
    (6, 5, 12, 110.00)   -- Sample data entry 5
    RETURNING *;
  `;

  try {
    // Execute the query to insert sample data
    const result = await pool.query(query);
    console.log('Sample booking billing data inserted:', result.rows);
  } catch (error) {
    console.error('Error inserting booking billing data:', error);
  }
};

// Function to run the data insertion
const init = async () => {
  await insertBookingBillingData();
  process.exit(); // Exit the process once the data is inserted
};

// Run the initialization
init();
