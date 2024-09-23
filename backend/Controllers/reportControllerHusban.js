const pool = require('../config/db');

exports.createReport = async (req, res) => {
  const { feedbackId, reportMessage } = req.body;
  const userId = req.user.id; // Assuming auth middleware sets user info

  try {
    const query = 'INSERT INTO report (user_id, feedback_id, report_messege) VALUES ($1, $2, $3) RETURNING *';
    const values = [userId, feedbackId, reportMessage];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFeedbackReports = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    const query = `
      SELECT r.*, u.username 
      FROM report r 
      JOIN users u ON r.user_id = u.user_id 
      WHERE r.feedback_id = $1 
      ORDER BY r.created_at DESC
    `;
    const result = await pool.query(query, [feedbackId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching feedback reports:', error);
    res.status(500).json({ message: 'Server error' });
  }
};