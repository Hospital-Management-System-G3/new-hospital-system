const pool = require("../config/db");

const getInfoAbout = async (req, res) => {
  const query = `SELECT * FROM info_about LIMIT 1;`;

  try {
    const result = await pool.query(query);
    const info = result.rows[0];

    if (!info) {
      return res.status(404).json({ message: "Information not found" });
    }

    res.status(200).json(info);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching information", error: error.message });
  }
};

const updateInfoAbout = async (req, res) => {
  const { ourMission, ourVision } = req.body;

  if (!ourMission || !ourVision) {
    return res.status(400).json({ message: "Mission and Vision are required" });
  }

  const query = `
    UPDATE info_about 
    SET our_mission = $1, our_vision = $2, updated_at = NOW()
    WHERE info_id = 1
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [ourMission, ourVision]);
    const updatedInfo = result.rows[0];

    if (!updatedInfo) {
      return res
        .status(404)
        .json({ message: "Information not found or update failed" });
    }

    res.status(200).json(updatedInfo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating information", error: error.message });
  }
};

module.exports = {
  getInfoAbout,
  updateInfoAbout,
};
