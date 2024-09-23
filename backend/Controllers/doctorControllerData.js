// Import the database pool from config
const pool = require("./../config/db");

const doctorData = async (req, res) => {
  const doctor_id = req.user.id; // Extracting doctor ID from authenticated user information
 console.log("doctor_id :"+doctor_id)
  try {
    // Query to fetch the user where user_id matches doctor_id
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const { rows } = await pool.query(query, [doctor_id]); // Using parameterized queries to prevent SQL injection

    // Check if any user was found
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found:', rows[0]);
    res.json(rows[0]); // Respond with the user data

  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ error: 'Error finding user' });
  }
};

module.exports = { doctorData };
