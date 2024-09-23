// Import the database pool from config
const pool = require('../config/db');

// Function to insert sample data into patient_records
const insertPatientRecords = async () => {
  const query = `
    INSERT INTO patient_records (user_id, medical_history, date_of_birth, phone, treatment_plan, notes, gender, height, weight, blood_type, allergies, temperature, blood_pressure)
    VALUES
    -- Sample data for patient records
    (1, 'No significant medical history.', '1985-05-15', '123-456-7890', 'Routine checkup', 'No additional notes', 'Male', 180, ARRAY[75, 76, 77, 78, 79], 'O+', 'None', ARRAY[36.5, 36.6, 36.7, 36.8, 36.9], ARRAY[120, 122, 125, 126, 128]),
    (2, 'Diabetic since 2010.', '1990-07-20', '123-456-7891', 'Insulin therapy', 'Regular monitoring required', 'Female', 165, ARRAY[65, 64, 63, 66, 67], 'A+', 'Penicillin allergy', ARRAY[37.0, 37.2, 37.1, 37.3, 37.4], ARRAY[130, 135, 132, 137, 138]),
    (3, 'Hypertension and hyperlipidemia.', '1982-03-22', '123-456-7892', 'Medication required', 'Exercise recommended', 'Male', 175, ARRAY[80, 82, 83, 84, 85], 'B+', 'None', ARRAY[36.8, 36.9, 37.0, 37.1, 37.2], ARRAY[140, 138, 142, 144, 146]),
    (4, 'Asthma since childhood.', '1975-11-11', '123-456-7893', 'Inhalers prescribed', 'Avoid dust and allergens', 'Female', 160, ARRAY[60, 61, 62, 63, 64], 'AB+', 'Dust allergy', ARRAY[36.7, 36.8, 36.9, 37.0, 37.1], ARRAY[110, 112, 115, 117, 119])
    RETURNING *;
  `;

  try {
    // Execute the query to insert sample data
    const result = await pool.query(query);
    console.log('Sample patient records inserted:', result.rows);
  } catch (error) {
    console.error('Error inserting patient records:', error);
  }
};

// Function to run the data insertion
const init = async () => {
  await insertPatientRecords();
  process.exit(); // Exit the process once the data is inserted
};

// Run the initialization
init();
