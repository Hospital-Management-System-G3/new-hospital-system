const pool = require("./../config/db");

// Controller to update a patient's record
const updatePatientRecord = async (req, res) => {
  const { record_id } = req.params; // Record ID from the request URL
  const { medical_history, treatment_plan, allergies, notes, blood_pressure, temperature } = req.body; // Fields to update

  try {
    // Update the record with the new data
    const result = await pool.query(
      'UPDATE patient_records SET medical_history = $1, treatment_plan = $2, allergies = $3, notes = $4, blood_pressure = $5, temperature = $6 WHERE record_id = $7 RETURNING *',
      [medical_history, treatment_plan, allergies, notes, blood_pressure, temperature, record_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Patient record not found' });
    }

    const updatedRecord = result.rows[0]; // Accessing the updated record

    res.status(200).json({ message: 'Record updated successfully', patientRecord: updatedRecord });
  } catch (error) {
    console.error('Error updating patient record:', error);
    res.status(500).json({ error: 'An error occurred while updating the record' });
  }
};

module.exports = {
  updatePatientRecord,
};
