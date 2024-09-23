import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import {
  FaCreditCard,
  FaPaypal,
  FaUser,
  FaCalendar,
  FaUserMd,
  FaDollarSign,
  FaStethoscope,
  FaEnvelope,
} from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const stripePromise = loadStripe(
  "pk_test_51Po3xJA4L1QDrrEEECST7zzuz3EwgAvliyrzirIXNUtRvRBxHoSGucEZfKX6JyA1Z5A5OpSdpSh5VUuvkwGTFAj2007tEPrtx7"
);

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [bookingData, setBookingData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const booking_id = Cookies.get("booking_id");
        const response = await axios.get(
          `http://localhost:5000/api/book/booking/${booking_id}`,
          {
            withCredentials: true,
          }
        );
        setBookingData(response.data);
      } catch (error) {
        console.error("Error fetching booking data", error);
      }
    };
    fetchBookingData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-6xl w-full flex flex-col md:flex-row gap-8 animate-fadeIn">
        <div className="md:w-1/2 bg-gray-50 p-8 rounded-3xl space-y-6 animate-slideInFromRight">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Order Summary
          </h2>
          {bookingData ? (
            <OrderSummary bookingData={bookingData} />
          ) : (
            <p>Loading...</p>
          )}
          <div className="mt-8 p-6 bg-emerald-100 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-black">Total:</span>
              <span className="text-3xl font-bold text-black">
                {bookingData?.total_price} JOD
              </span>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-extrabold text-emerald-600 mb-8">
            Checkout{" "}
            <FaStethoscope size={40} className="text-green-500 inline-block" />
          </h1>

          <div className="flex gap-4">
            <button
              className={`p-4 w-1/2 rounded-lg ${
                paymentMethod === "stripe"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setPaymentMethod("stripe")}
            >
              Pay with Stripe
            </button>
            <button
              className={`p-4 w-1/2 rounded-lg ${
                paymentMethod === "paypal"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setPaymentMethod("paypal")}
            >
              Pay with PayPal
            </button>
          </div>

          {paymentMethod === "stripe" && (
            <div className="space-y-4 animate-slideInFromLeft">
              <Elements stripe={stripePromise}>
                <CheckoutForm bookingData={bookingData} />
              </Elements>
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="text-center">
              <p>PayPal payment option will be integrated here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderSummary = ({ bookingData }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center">
        <FaUserMd className="text-emerald-500 mr-3" />
        <span className="font-semibold">Doctor:</span>
      </div>
      <span className="text-gray-700">{bookingData.doctor_name}</span>
    </div>
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center">
        <FaCalendar className="text-emerald-500 mr-3" />
        <span className="font-semibold">Appointment:</span>
      </div>
      <div className="text-gray-700">
        <p>{new Date(bookingData.available_date).toLocaleDateString()}</p>
        <p>{`${bookingData.available_time_from} - ${bookingData.available_time_to}`}</p>
      </div>
    </div>
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center">
        <FaUser className="text-emerald-500 mr-3" />
        <span className="font-semibold">Patient:</span>
      </div>
      <span className="text-gray-700">{bookingData.user_name}</span>
    </div>
  </div>
);

const CheckoutForm = ({ bookingData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [Message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      const booking_id = Cookies.get("booking_id");
      const paymentResponse = await axios.post(
        "http://localhost:5000/api/auth/pay",
        {
          total_price: bookingData.total_price,
          doctor_id: bookingData.doctor_id,
          booking_id: booking_id,
          email,
        },
        {
          withCredentials: true,
        }
      );
      if (paymentResponse.data.message) {
        setMessage(paymentResponse.data.message);
      }
      const { clientSecret } = paymentResponse.data;
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: { email: email, name: fullName },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
        Swal.fire(
          "Payment Successful!",
          "Thank you for your payment.",
          "success"
        );
      }

      setProcessing(false);
      navigate("/");
    } catch (error) {
      setError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg pl-12"
        />
        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Details
        </label>
        <CardElement className="p-3 border border-gray-300 rounded-md shadow-sm" />
      </div>
      <div className="text-lg font-semibold text-gray-800">
        Total: {bookingData?.total_price} JOD
      </div>
      {Message
        ? Message && <div className="text-red-500 mb-4">{Message}</div>
        : error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full p-4 text-white font-semibold rounded-md ${
          processing ? "bg-gray-600" : "bg-green-500"
        }`}
      >
        {processing ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
};

export default CheckoutPage;