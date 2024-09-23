const pool = require('../config/db');

const getUserDetails = async (req, res) => {
  const { username } = req.params;

  const query = `
    SELECT user_id , username, email, role, profilepic
    FROM users
    WHERE username = $1 AND is_deleted = false
  `;

  try {
    const { rows } = await pool.query(query, [username]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserDetails };