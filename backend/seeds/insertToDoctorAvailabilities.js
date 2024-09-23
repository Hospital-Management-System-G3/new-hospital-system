// Import the database pool from config
const pool = require('../config/db');

// Function to insert sample data into doctor_availabilities
const insertDoctorAvailabilities = async () => {
  const query = `
    INSERT INTO doctor_availabilities (doctor_id, available_date, available_time_from, available_time_to, total_price, service_type)
    VALUES
    (11, '2024-10-01', '09:00:00', '12:00:00', 100.00, 'Consultation'), -- Doctor 1 available on 1st October from 9 AM to 12 PM
    (12, '2024-10-02', '10:00:00', '14:00:00', 120.00, 'Chemotherapy'), -- Doctor 2 available on 2nd October from 10 AM to 2 PM
    (11, '2024-10-03', '13:00:00', '17:00:00', 150.00, 'Follow-Up Appointment'), -- Doctor 1 available on 3rd October from 1 PM to 5 PM
    (13, '2024-10-04', '08:00:00', '11:00:00', 90.00, 'Surgery'),  -- Doctor 3 available on 4th October from 8 AM to 11 AM
    (12, '2024-10-05', '11:00:00', '15:00:00', 110.00, 'Radiation Therapy')  -- Doctor 2 available on 5th October from 11 AM to 3 PM
    RETURNING *;
  `;

  try {
    // Execute the query to insert sample data
    const result = await pool.query(query);
    console.log('Sample doctor availabilities inserted:', result.rows);
  } catch (error) {
    console.error('Error inserting doctor availabilities:', error);
  }
};

// Function to run the table creation and data insertion
const init = async () => {
  await insertDoctorAvailabilities();
  process.exit(); // Exit the process once the data is inserted
};

// Run the initialization
init();
