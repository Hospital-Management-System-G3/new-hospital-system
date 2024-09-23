const pool = require("../config/db");

const getInfoContact = async (req, res) => {
  const query = `SELECT * FROM info_contact LIMIT 1;`;

  try {
    const result = await pool.query(query);
    const contactInfo = result.rows[0];

    if (!contactInfo) {
      return res.status(404).json({ message: "Contact information not found" });
    }

    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching contact information",
      error: error.message,
    });
  }
};

const updateInfoContact = async (req, res) => {
  const { address, phoneNumber, email } = req.body;

  if (!address || !phoneNumber || !email) {
    return res
      .status(400)
      .json({ message: "Address, phone number, and email are required" });
  }

  const query = `
    UPDATE info_contact 
    SET address = $1, phone_number = $2, email = $3, updated_at = NOW()
    WHERE contact_id = 1
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [address, phoneNumber, email]);
    const updatedContactInfo = result.rows[0];

    if (!updatedContactInfo) {
      return res
        .status(404)
        .json({ message: "Contact information not found or update failed" });
    }

    res.status(200).json(updatedContactInfo);
  } catch (error) {
    res.status(500).json({
      message: "Error updating contact information",
      error: error.message,
    });
  }
};

module.exports = {
  getInfoContact,
  updateInfoContact,
};
