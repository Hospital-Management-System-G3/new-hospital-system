const pool = require('../config/db');

// Controller to add a new patient and patient record
const addPatientRecord = async (req, res) => {
  const { username, email, profilepic, medical_history, date_of_birth, phone, treatment_plan, notes, gender, height, weight, blood_type, allergies, blood_pressure,temperature } = req.body;


  const password="$2b$10$gV/pipNk5dr0JD1.pKMrj.nii7NwjnaQ7YbS5UwGWFgq7nL8idIf2";
  const role="user";

  try {
    // Insert new user into the 'users' table
    const userResult = await pool.query(
      'INSERT INTO users (username, password, email, profilepic, role ) VALUES ($1, $2, $3, $4, $5) RETURNING user_id',
      [username, password, email, profilepic, role ]
    );

    const userId = userResult.rows[0].user_id; // Get the user_id from the inserted user

    // Insert the patient's medical record into the 'patient_records' table linked with the user_id
    const recordResult = await pool.query(
      'INSERT INTO patient_records (user_id, medical_history, date_of_birth, phone, treatment_plan, notes, gender, height, weight, blood_type, allergies,blood_pressure,temperature) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13) RETURNING *',
      [userId, medical_history, date_of_birth, phone, treatment_plan, notes, gender, height, weight, blood_type, allergies ,blood_pressure,temperature]
    );

    const newPatientRecord = recordResult.rows[0]; // Access the newly inserted patient record

    res.status(201).json({ message: 'New patient record added successfully', patientRecord: newPatientRecord });
  } catch (error) {
    console.error('Error adding new patient record:', error);
    res.status(500).json({ error: 'An error occurred while adding the new patient record' });
  }
};

module.exports = {
  addPatientRecord,
};
