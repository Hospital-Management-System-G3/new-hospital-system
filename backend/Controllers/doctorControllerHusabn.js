const cookieParser = require('cookie-parser');
const pool = require('../config/db');

// دالة لجلب التوافر للأطباء
exports.getDoctorAvailabilities = async (req, res) => {
  const { doctorId  } = req.params;

  if (!doctorId || isNaN(doctorId)) {
    return res.status(400).json({ message: 'Invalid doctor ID' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM doctor_availabilities 
       WHERE doctor_id = $1 AND is_deleted = FALSE
       ORDER BY available_date, available_time_from`,
      [doctorId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching doctor availabilities:', error);
    res.status(500).json({ message: 'Error fetching availabilities' });
  }
};

// دالة لحجز الوقت المتاح
exports.bookAvailability = async (req, res) => {
  const { availabilityId, userId, doctorId, totalPrice } = req.body;

  console.log('Received Booking Request:', { availabilityId, userId, doctorId, totalPrice });

  if (!availabilityId || !userId || !doctorId || !totalPrice) {
    console.log('Missing fields:', { availabilityId, userId, doctorId, totalPrice });
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const checkAvailability = await pool.query(
      `SELECT * FROM doctor_availabilities WHERE availability_id = $1 AND is_booked = FALSE`,
      [availabilityId]
    );

    if (checkAvailability.rowCount === 0) {
      return res.status(400).json({ message: 'Availability not found or already booked' });
    }

    await pool.query(
      `UPDATE doctor_availabilities 
       SET is_booked = TRUE, status = 'pending' 
       WHERE availability_id = $1`, 
      [availabilityId]
    );

    const result = await pool.query(
      `INSERT INTO BookingBilling (booking_id, user_id, doctor_id, total_price) 
       VALUES ($1, $2, $3, $4) RETURNING billing_id`, 
      [availabilityId, userId, doctorId, totalPrice]
    );

    const bookingId = result.rows[0].billing_id;

    res.cookie('booking_id', bookingId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({ message: 'Booking successful', bookingId });
  } catch (error) {
    console.error('Error booking availability:', error);
    res.status(500).json({ message: 'Error booking availability' });
  }
};
