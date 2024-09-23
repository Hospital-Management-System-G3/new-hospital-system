const pool = require("../config/db");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "islamomar0003@gmail.com",
    pass: "zskv vfjl fgsr mnnw",
  },
});

const getAllFeedback = async (req, res) => {
  const query = `
    SELECT 
      f.feedback_id,
      f.user_id,
      f.doctor_id,
      f.feedback_message,
      f.created_at,
      u.email,
      u.username
    FROM 
      feedback f
    JOIN 
      users u ON f.user_id = u.user_id
    WHERE 
      f.is_deleted = FALSE;
  `;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving feedback" });
  }
};

const replyToFeedback = async (req, res) => {
  const { feedbackId, replyMessage } = req.body;

  // Fetch the user's email based on the feedback ID
  const emailQuery = `
    SELECT u.email 
    FROM feedback f
    JOIN users u ON f.user_id = u.user_id
    WHERE f.feedback_id = $1
  `;

  try {
    const emailResult = await pool.query(emailQuery, [feedbackId]);

    if (emailResult.rows.length === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    const userEmail = emailResult.rows[0].email;

    // Email options
    const mailOptions = {
      from: "your_email@example.com", // Your email
      to: userEmail, // Recipient's email
      subject: "Reply to Your Feedback",
      text: replyMessage,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Reply sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send reply" });
  }
};

const deleteFeedback = async (req, res) => {
  const { feedback_id } = req.params;

  const query = `
    UPDATE feedback
    SET is_deleted = TRUE
    WHERE feedback_id = $1
  `;

  try {
    const result = await pool.query(query, [feedback_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting feedback" });
  }
};

module.exports = {
  getAllFeedback,
  replyToFeedback,
  deleteFeedback,
};
