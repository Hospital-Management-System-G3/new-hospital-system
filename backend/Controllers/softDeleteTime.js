
const pool = require("./../config/db");
const deleteTime  = async (req, res) => {
    const { availability_id } = req.params;
  
    try {
      // Update the status to 'deleted' or set is_deleted to TRUE
      const query = 'UPDATE doctor_availabilities SET is_deleted = $1 WHERE availability_id = $2 RETURNING *';
      const { rows } = await pool.query(query, ['true', availability_id]);
  
      // Check if the update was successful
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Availability not found' });
      }
  
      res.json({ message: 'Availability soft deleted', availability: rows[0] });
    } catch (error) {
      console.error("Error soft deleting availability:", error);
      res.status(500).json({ error: 'Error soft deleting availability' });
    }
  };
  
  // Export the controller functions
  module.exports = {
    deleteTime 
  };