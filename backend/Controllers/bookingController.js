const express = require("express");
const pool = require("../config/db");

exports.GetBooking = async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id;
  try {
    const query = `
        SELECT da.total_price, da.doctor_id, da.available_date, da.available_time_from, da.available_time_to, 
        u1.username AS doctor_name, u2.username AS user_name
        FROM doctor_availabilities da
        JOIN users u1 ON da.doctor_id = u1.user_id
        JOIN users u2 ON $2 = u2.user_id
        WHERE da.availability_id = $1;
      `;

    const result = await pool.query(query, [bookingId, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(result.rows[0]); 
  } catch (error) {
    console.error("Error fetching booking data:", error);
    res.status(500).json({ message: "Error in server" });
  }
};
