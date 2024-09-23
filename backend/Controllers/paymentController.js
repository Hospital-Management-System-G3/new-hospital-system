const Stripe = require("stripe");
const pool = require("../config/db");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  const { total_price, doctor_id, booking_id, email } = req.body;

  const currency = "usd";

  try {
    if (!email) {
      // إذا كان الإيميل غير موجود في الطلب
      return res.status(200).json({ message: "Email is required." });
    } else if (email !== req.user.email) {
      return res.status(200).json({ message: "The provided email is incorrect." });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total_price * 100,
      currency,
    });

    const result = await pool.query(
      `INSERT INTO bookingbilling (booking_id, user_id, doctor_id, total_price, doctor_profit, hospital_profit) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING billing_id`,
      [
        booking_id,
        req.user.id,
        doctor_id,
        total_price,
        total_price * 0.9,
        total_price * 0.1,
      ]
    );
    await pool.query(
      `UPDATE doctor_availabilities 
         SET is_booked = $1, status = $2 
         WHERE doctor_id = $3 AND availability_id = $4`,
      [true, "confirmed", doctor_id, booking_id]
    );
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
};
