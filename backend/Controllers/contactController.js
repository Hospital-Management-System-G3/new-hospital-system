const pool = require("../config/db");
const nodemailer = require("nodemailer");

const replyToFeedback = async (req, res) => {
  const { id } = req.params;
  const { replyMessage } = req.body;

  try {
    const contactQuery = "SELECT * FROM contacts WHERE contact_id = $1";
    const contactResult = await pool.query(contactQuery, [id]);

    if (contactResult.rows.length === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    const { email, name } = contactResult.rows[0];

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "islamomar0003@gmail.com",
        pass: "zskv vfjl fgsr mnnw",
      },
    });

    const mailOptions = {
      from: "Carelth",
      to: email,
      subject: `Reply to your feedback, ${name}`,
      text: replyMessage,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reply sent successfully" });
  } catch (error) {
    console.error("Error sending reply:", error);
    res.status(500).json({ error: "Error sending reply: " + error.message });
  }
};

const getContacts = async (req, res) => {
  const query = "SELECT * FROM contacts";

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving contacts: " + error.message });
  }
};

const submitContact = async (req, res) => {
  // console.log("inside contact controller");
  try {
      const { formData } = req.body;
      // console.log(formData);
      // console.log(formData.name, formData.email, formData.message);

      const response = pool.query(
          "INSERT INTO contacts( name, email, contact_message) VALUES($1, $2, $3) RETURNING *",
          [formData.name, formData.email, formData.message]
      )
      .catch(err=>{console.log(err)})

      res.status(201).json({ message: "Contact message sent successfully" });
  } catch (err) {
      console.log("Server error :", err)
      res.status(500).json({ error: "Server error (contact controller)" });
  }
}

module.exports = {
  getContacts,
  replyToFeedback,
  submitContact,
};
