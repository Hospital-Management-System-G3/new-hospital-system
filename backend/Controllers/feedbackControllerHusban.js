const pool = require('../config/db');

exports.createFeedback = async (req, res) => {
  const { doctorId, feedbackMessage } = req.body;
  const userId = req.user.id; // Assuming auth middleware sets user info

  try {
    const query = 'INSERT INTO feedback (user_id, doctor_id, feedback_message) VALUES ($1, $2, $3) RETURNING *';
    const values = [userId, doctorId, feedbackMessage];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDoctorFeedbacks = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const query = `
      SELECT f.*, u.username 
      FROM feedback f 
      JOIN users u ON f.user_id = u.user_id 
      WHERE f.doctor_id = $1 
      ORDER BY f.created_at DESC
    `;
    const result = await pool.query(query, [doctorId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching doctor feedbacks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
