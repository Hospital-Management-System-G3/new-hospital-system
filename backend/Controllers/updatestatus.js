const pool = require('../config/db');

// Controller to update status to completed based on billing ID
const completeAppointment = async (req, res) => {
  const { billingId } = req.params;

  try {
    // Get the booking_id from the BookingBilling table
    const billingResult = await pool.query(
      'SELECT booking_id FROM BookingBilling WHERE billing_id = $1 AND is_deleted = FALSE',
      [billingId]
    );

    if (billingResult.rows.length === 0) {
      return res.status(404).json({ error: 'Billing record not found or has been deleted' });
    }

    const bookingId = billingResult.rows[0].booking_id;

    // Update the status in the doctor_availabilities table
    const updateResult = await pool.query(
      'UPDATE doctor_availabilities SET status = $1 WHERE availability_id = $2 AND is_deleted = FALSE RETURNING *',
      ['completed', bookingId]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor availability record not found or has been deleted' });
    }

    const updatedAvailability = updateResult.rows[0];

    res.status(200).json({ 
      message: 'Status updated to completed successfully', 
      updatedAvailability: updatedAvailability 
    });
  } catch (error) {
    console.error('Error updating status to completed:', error);
    res.status(500).json({ error: 'An error occurred while updating the status' });
  }
};

module.exports = {
    completeAppointment,
};