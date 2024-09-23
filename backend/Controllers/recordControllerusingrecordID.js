
const pool = require("./../config/db");

const getPatientRecordbyrecordId = async (req, res) => {
    const { recordid } = req.params; // Get the record ID from the request parameters
    try {
      const query = `
        SELECT 
          *
        FROM 
          users
        JOIN 
          patient_records ON users.user_id = patient_records.user_id
        WHERE 
          patient_records.record_id = $1 AND 
          users.is_deleted = false AND 
          patient_records.is_deleted = false;
      `;
  
      const { rows } = await pool.query(query, [recordid]); // Use the ID parameter in the query
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      res.json(rows[0]); // Respond with the specific patient record
    } catch (error) {
      console.error('Error fetching patient record:', error);
      res.status(500).json({ error: 'Error fetching patient record' });
    }
  };
  
  module.exports = { getPatientRecordbyrecordId };
