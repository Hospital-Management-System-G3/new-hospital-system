const pool = require('../config/db');

const fetchDoctorBillingDetails = async (req, res) => {
  const doctor_id = req.user.id;
  try {
    const query = `
      SELECT 
        bb.billing_id, 
        bb.total_price, 
        bb.doctor_profit, 
        bb.hospital_profit,
        u.user_id, 
        u.username AS patient_name, 
        u.email AS patient_email,
        da.available_date, 
        da.available_time_from, 
        da.available_time_to, 
        da.service_type,
        da.status
      FROM BookingBilling bb
      INNER JOIN doctor_availabilities da ON bb.booking_id = da.availability_id
      INNER JOIN users u ON bb.user_id = u.user_id
      WHERE bb.doctor_id = $1
        AND bb.is_deleted = FALSE
        AND da.is_deleted = FALSE
        AND da.is_booked = TRUE
        AND u.is_deleted = FALSE;
    `;
    
    const result = await pool.query(query, [doctor_id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No bookings found for this doctor' });
    }
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching doctor bookings:', error);
    res.status(500).json({ error: 'Error fetching doctor bookings' });
  }
};

module.exports = { fetchDoctorBillingDetails };