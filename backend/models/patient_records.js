const pool = require('../config/db');

const createPatientRecordsTable = async () => {
  const query = `
   CREATE TABLE IF NOT EXISTS patient_records (
    record_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    medical_history TEXT,
    date_of_birth DATE NOT NULL,
    phone VARCHAR(15),
    treatment_plan TEXT,
    date DATE[] NOT NULL,  -- Make date an array of dates
    notes TEXT,
    gender VARCHAR(10),
    height INTEGER,
    weight INTEGER[],  -- Keep weight as an array of integers
    blood_type VARCHAR(5),
    allergies TEXT,
    temperature DECIMAL(4, 2)[],  -- Keep temperature as an array of decimal values
    blood_pressure INTEGER[],  -- Keep blood_pressure as an array of integers
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT false
    );
  `;


 
  try {
    await pool.query(query);
    console.log('patient_records table created or already exists');
  } catch (error) {
    console.error('Error creating patient_records table:', error);
  }
};

const init = async () => {
  await createPatientRecordsTable();
  process.exit(); 
};

init();
