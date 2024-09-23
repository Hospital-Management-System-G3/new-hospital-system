const pool = require('../config/db');

// Controller to add a new doctor availability
const addDoctorAvailability = async (req, res) => {
  const {  date, timeFrom, timeTo, totalPrice, serviceType } = req.body;
 

  const doctor_id=req.user.id;
  try {
    // Insert a new availability record into the 'doctor_availabilities' table
    const result = await pool.query(
      `INSERT INTO doctor_availabilities (doctor_id, available_date, available_time_from, available_time_to, total_price, service_type)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [doctor_id, date, timeFrom, timeTo, totalPrice, serviceType]
    );

    const newAvailability = result.rows[0]; // Access the newly inserted availability record

    res.status(201).json({ message: 'New availability added successfully', availability: newAvailability });
  } catch (error) {
    // console.error('Error adding new doctor availability:', error);
    res.status(500).json({ error: 'An error occurred while adding the new availability' });
  }
};

module.exports = {
  addDoctorAvailability,
};
