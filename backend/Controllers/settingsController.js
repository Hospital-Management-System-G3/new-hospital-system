const pool = require("../config/db");

// Create setting with logo upload
const createSetting = async (req, res) => {
  const { background_color } = req.body;
  const logo_image = req.file ? req.file.path : null;

  if (!background_color || !logo_image) {
    return res
      .status(400)
      .json({ message: "Background color and logo image are required" });
  }

  const query = `
    INSERT INTO setting (logo_image, background_color)
    VALUES ($1, $2)
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [logo_image, background_color]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating setting", error: error.message });
  }
};

// Get settings
const getSettings = async (req, res) => {
  const query = `SELECT * FROM setting LIMIT 1;`;

  try {
    const result = await pool.query(query);
    const settings = result.rows[0];

    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }

    res.status(200).json(settings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching settings", error: error.message });
  }
};

// Update settings with logo upload
const updateSettings = async (req, res) => {
  const { background_color } = req.body;
  const logo_image = req.file ? req.file.path : null;

  const query = `
    UPDATE setting 
    SET logo_image = COALESCE($1, logo_image), background_color = COALESCE($2, background_color), updated_at = NOW()
    WHERE id = 1
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [logo_image, background_color]);
    const updatedSettings = result.rows[0];

    if (!updatedSettings) {
      return res
        .status(404)
        .json({ message: "Settings not found or update failed" });
    }

    res.status(200).json(updatedSettings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating settings", error: error.message });
  }
};

module.exports = {
  createSetting,
  getSettings,
  updateSettings,
};
