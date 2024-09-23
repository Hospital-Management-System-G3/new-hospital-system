
// Import the database pool from config
const pool = require("./../config/db");
const allRecords = async (req, res) => {
    try {
      // Correct JOIN query to select from both users and patient_records
      const query = `
      SELECT 
    users.user_id,
    users.username,
    users.email,
    users.role,
    users.profilepic,
    patient_records.record_id,
    patient_records.medical_history,
    patient_records.date_of_birth,
    patient_records.phone,
    patient_records.treatment_plan,
    patient_records.notes,
    patient_records.gender,
    patient_records.height,
    patient_records.weight,
    patient_records.blood_type,
    patient_records.allergies,
    patient_records.created_at,
    patient_records.is_deleted AS record_is_deleted
FROM 
    users
JOIN 
    patient_records ON users.user_id = patient_records.user_id
WHERE 
    users.is_deleted = false AND patient_records.is_deleted = false;

      `;
      
      const { rows } = await pool.query(query);
  
      // Check if any records were found
      if (rows.length === 0) {
        return res.status(404).json({ error: 'No records found' });
      }
  
      console.log('Records found:', rows);
      res.json(rows); // Respond with the fetched data
  
    } catch (error) {
      console.error('Error finding all records:', error);
      res.status(500).json({ error: 'Error finding all records' });
    }
  };
  
  module.exports = { allRecords };
  
 