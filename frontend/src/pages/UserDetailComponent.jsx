import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const UserDetail = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/user/${username}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  useEffect(() => {
    if (user && user.role === 'doctor') {
      const fetchFeedbacks = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/feedback/doctor/${user.user_id}`);
          setFeedbacks(response.data);
        } catch (error) {
          console.error('Error fetching feedbacks:', error);
        }
      };

      fetchFeedbacks();
    }
  }, [user]);

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-900"></div></div>;
  if (error) return <div className="text-center mt-8 text-red-500 text-xl">{error}</div>;

  return (

    
    <div className="container mx-auto px-4 py-8 bg-green-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8   hover:shadow-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img 
              className="h-48 w-full object-cover md:w-48  duration-300 hover:scale-105" 
              src={user.profilepic} 
              alt={user.username} 
            />


 
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-green-700 font-semibold">
              {user.role}
            </div>
            <h2 className="block mt-1 text-3xl leading-tight font-bold text-green-900">
              {user.username}
            </h2>
            <p className="mt-2 text-green-600">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
        </div>
      </div>

      {user.role === 'doctor' && (
        <>
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-green-800">Doctor Availabilities</h3>
            <DoctorAvailability doctorId={user.user_id} />
          </div>
          
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-green-800">Feedbacks</h3>
            <FeedbackList feedbacks={feedbacks} />
            <FeedbackForm doctorId={user.user_id} setFeedbacks={setFeedbacks} />
          </div>
        </>
      )}
    </div>
  );
};

const DoctorAvailability = ({ doctorId }) => {
    const navigate = useNavigate();
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctors/${doctorId}/availabilities`);
        setAvailabilities(response.data);
      } catch (err) {
        setError('Failed to fetch availabilities');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilities();
  }, [doctorId]);

  const handleBooking = async (availabilityId) => {
    const userId = 1; // Replace with actual user ID from authentication context
    const totalPrice = availabilities.find(avail => avail.availability_id === availabilityId)?.total_price;

    if (!totalPrice) {
      alert('Total price not found for this availability');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/doctors/book', {
        availabilityId,
        userId,
        doctorId,
        totalPrice,
      });

      Cookies.set('booking_id', response.data.bookingId, { expires: 1 });
      navigate('/CheckoutPage')
      alert(response.data.message);
    } catch (err) {
      console.error('Error booking availability:', err);
      alert('Booking failed: ' + err.response?.data?.message || 'Unknown error');
    }
  };

  if (loading) return <div className="text-center text-green-700">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {availabilities.map((availability) => (
        <div key={availability.availability_id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h4 className="text-xl font-semibold text-green-800 mb-2">{`Service: ${availability.service_type}`}</h4>
          <p className="text-green-700 mb-1">{`Date: ${availability.available_date}`}</p>
          <p className="text-green-700 mb-2">{`From: ${availability.available_time_from} To: ${availability.available_time_to}`}</p>
          <p className="text-green-900 font-bold mb-4">{`Price: $${availability.total_price}`}</p>

          <button
            onClick={() => handleBooking(availability.availability_id)}
            disabled={availability.is_booked}
            className={`w-full py-2 px-4 rounded-full font-bold transition-colors duration-300 ${
              availability.is_booked 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {availability.is_booked ? 'Already Booked' : 'Book Now'}
          </button>
        </div>
      ))}
    </div>
  );
};

const FeedbackList = ({ feedbacks }) => {
  return (
    <div className="space-y-6">
      {feedbacks.map((feedback) => (
        <div key={feedback.feedback_id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <p className="text-green-800 mb-2">{feedback.feedback_message}</p>
          <p className="text-sm text-green-600">By: {feedback.username}</p>
          <ReportList feedbackId={feedback.feedback_id} />
          <ReportForm feedbackId={feedback.feedback_id} />
        </div>
      ))}
    </div>
  );
};

const ReportList = ({ feedbackId }) => {
  const [reports, setReports] = useState([]);
  const [showReports, setShowReports] = useState(false);

  useEffect(() => {
    if (showReports) {
      const fetchReports = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/report/feedback/${feedbackId}`);
          setReports(response.data);
        } catch (error) {
          console.error('Error fetching reports:', error);
        }
      };

      fetchReports();
    }
  }, [feedbackId, showReports]);

  return (
    <div className="mt-4">
      <button 
        onClick={() => setShowReports(!showReports)} 
        className="text-green-600 hover:text-green-800 transition-colors duration-300"
      >
        {showReports ? 'Hide Reports' : 'Show Reports'}
      </button>
      {showReports && (
        <div className="mt-2 space-y-2">
          {reports.map((report) => (
            <div key={report.report_id} className="bg-green-50 p-3 rounded-md">
              <p className="text-green-800">{report.report_messege}</p>
              <p className="text-sm text-green-600 mt-1">By: {report.username}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FeedbackForm = ({ doctorId, setFeedbacks }) => {
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/feedback', { 
        doctorId,
        feedbackMessage
      });
      setFeedbacks(prevFeedbacks => [...prevFeedbacks, response.data]);
      setFeedbackMessage('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        value={feedbackMessage}
        onChange={(e) => setFeedbackMessage(e.target.value)}
        placeholder="Write your feedback here"
        className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
      />
      <button 
        type="submit" 
        className="mt-2 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
      >
        Submit Feedback
      </button>
    </form>
  );
};

const ReportForm = ({ feedbackId }) => {
  const [reportMessage, setReportMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/report', {
        feedbackId,
        reportMessage
      });
      setReportMessage('');
      alert('Report submitted successfully');
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={reportMessage}
        onChange={(e) => setReportMessage(e.target.value)}
        placeholder="Write your report here"
        className="w-full p-3 border border-red-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
      />
      <button 
        type="submit" 
        className="mt-2 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
      >
        Submit Report
      </button>
    </form>
  );
};

export { UserDetail, DoctorAvailability };