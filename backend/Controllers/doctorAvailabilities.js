// Import the database pool from config
const pool = require("./../config/db");

const doctorAvailabilities = async (req, res) => {
  const doctor_id = req.user.id; // Extracting doctor ID from authenticated user information
  console.log("doctor_id :" + doctor_id);

  try {
    // Query to fetch doctor availabilities where conditions are met
    const query = `
      SELECT * 
      FROM doctor_availabilities
      WHERE doctor_id = $1
      AND is_deleted = FALSE
      AND status = 'active'
      AND is_booked = FALSE;

    `;

    // Execute the query with the doctor_id parameter
    const { rows } = await pool.query(query, [doctor_id]);

    // Check if any availabilities were found
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No available slots found' });
    }

    console.log('Available slots:', rows);
    res.json(rows); // Respond with the available slots data

  } catch (error) {
    console.error('Error fetching doctor availabilities:', error);
    res.status(500).json({ error: 'Error fetching doctor availabilities' });
  }
};



module.exports = { doctorAvailabilities };
