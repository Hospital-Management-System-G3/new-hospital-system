import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Activity, Calendar, CreditCard, Thermometer } from 'lucide-react';
import { getRecord } from "../slices/patientSlice"
import axios from 'axios';

const PatientProfilePage = () => {
  const dispatch = useDispatch();
  const { user, record, bills, loading, error } = useSelector((state) => ({
    user: state.patientRecord.user,
    record: state.patientRecord.record,
    bills: state.patientRecord.bills,
    loading: state.patientRecord.loading,
    error: state.patientRecord.error
  }));

  // console.log(record);

  const [activeTab, setActiveTab] = useState('overview');
  const [showInputs, setShowInputs] = useState(false);
  const [newTemperature, setNewTemperature] = useState('');
  const [newBloodPressure, setNewBloodPressure] = useState('');
  const [newWeight, setNewWeight] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getRecord()).unwrap();
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dispatch]);

  // Fetch mock health data for demonstration
  //   const mockHealthData = [
  //     { date: '2023-01', temperature: 36.6, bloodPressure: 120, weight: 70 },
  //     { date: '2023-02', temperature: 36.8, bloodPressure: 118, weight: 69 },
  //     { date: '2023-03', temperature: 36.5, bloodPressure: 122, weight: 71 },
  //     { date: '2023-04', temperature: 36.7, bloodPressure: 119, weight: 70 },
  //     { date: '2023-05', temperature: 36.6, bloodPressure: 121, weight: 69 },
  //   ];
  //   setHealthData(mockHealthData);
  // }, [dispatch]);


  // console.log({ user, record, bills  });
  console.log(record);


  const patientData = {
    name: user.username,
    user_id: user.user_id,
    // medical_history: record.medical_history,
    date_of_birth: record.date_of_birth,
    gender: record.gender,
    height: record.height,
    weight: record.weight,
    blood_type: record.blood_type,
    allergies: record.allergies,
    emergency_contact: "Jane Doe (+1 555-987-6543)"
  };

  // date_of_birth: record.date_of_birth.substring(0, 10),
  // weight: record.weight[record.weight.length-1],

  const appointments = [
    { id: 1, date: '2023-06-01', time: '10:00 AM', doctor: 'Dr. Smith', department: 'Cardiology', room: 'Room 301', duration: '30 minutes' },
    { id: 2, date: '2023-06-15', time: '2:30 PM', doctor: 'Dr. Johnson', department: 'General Practice', room: 'Room 205', duration: '45 minutes' },
  ];

  const tabVariants = {
    inactive: { opacity: 0.6, scale: 0.9 },
    active: { opacity: 1, scale: 1 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    initial: { scale: 1, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };
  

  const formattedHealthData = record.date ? record.date.map((date, index) => ({
    date: new Date(date).toISOString().split('T')[0],
    temperature: parseFloat(record.temperature?.[index] || 0),
    bloodPressure: record.blood_pressure?.[index] || 0,
    weight: record.weight?.[index] || 0,
  })) : [];
  

  const addHealthData = () => {
    if (newTemperature || newBloodPressure || newWeight) {
      const newData = {
        date: new Date().toISOString(),
        temperature: newTemperature ? parseFloat(newTemperature) : health[health.length - 1].temperature,
        blood_pressure: newBloodPressure ? parseInt(newBloodPressure) : health[health.length - 1].blood_pressure,
        weight: newWeight ? parseFloat(newWeight) : health[health.length - 1].weight,
      };
      // Here you would typically dispatch an action to add this data to your Redux store
      // For now, we'll just log it
      console.log("New health data to be added:", newData);
      setNewTemperature('');
      setNewBloodPressure('');
      setNewWeight('');
    }
    setShowInputs(false);
  };


  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 sm:p-6 lg:p-10">
            <div className="flex flex-col sm:flex-row items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white shadow-lg flex items-center justify-center mb-4 sm:mb-0 sm:mr-6"
              >
                <User size={48} className="text-emerald-500 sm:hidden" />
                <User size={64} className="text-emerald-500 hidden sm:block" />
              </motion.div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{patientData.name}</h1>
                <p className="text-emerald-100 mt-2">Patient ID: {patientData.user_id}</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-emerald-100 p-2 sm:p-4">
            <nav className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {['overview', 'health', 'bills', 'appointments'].map((tab) => (
                <motion.button
                  key={tab}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === tab ? 'active' : 'inactive'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium ${activeTab === tab
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-emerald-600 hover:bg-emerald-50'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5 }}
              className="p-4 sm:p-6 lg:p-10"
            >
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {Object.entries(patientData).map(([key, value]) => (
                    <motion.div
                      key={key}
                      variants={cardVariants}
                      initial="initial"
                      whileHover="hover"
                      className="bg-white p-6 rounded-lg shadow-md border border-emerald-100 hover:border-emerald-300 transition-colors duration-300"
                    >
                      <h3 className="text-lg sm:text-xl font-semibold text-emerald-600 mb-3">
                        {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </h3>
                      <p className="text-base sm:text-lg text-gray-700 font-medium">{value}</p>
                      {key === 'height' && <p className="text-sm text-gray-500 mt-1">cm</p>}
                      {key === 'weight' && <p className="text-sm text-gray-500 mt-1">kg</p>}
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'health' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-4 sm:mb-6">Health Statistics</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-emerald-600 mb-4">Body Temperature</h3>
                      <div className="h-60 sm:h-72 lg:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={formattedHealthData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                            <Tooltip />
                            <Line type="monotone" dataKey="temperature" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-emerald-600 mb-4">Blood Pressure</h3>
                      <div className="h-60 sm:h-72 lg:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={formattedHealthData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                            <Tooltip />
                            <Line type="monotone" dataKey="bloodPressure" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>
                  </div>
                  {/* <div className="mt-6 text-center">
                    {!showInputs ? (
                      <button
                        onClick={() => setShowInputs(true)}
                        className="bg-emerald-500 text-white px-4 py-2 rounded-full text-base hover:bg-emerald-600 transition duration-300"
                      >
                        Add More Data
                      </button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <input
                          type="number"
                          value={newTemperature}
                          onChange={(e) => setNewTemperature(e.target.value)}
                          placeholder="Temperature (°C)"
                          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          type="number"
                          value={newBloodPressure}
                          onChange={(e) => setNewBloodPressure(e.target.value)}
                          placeholder="Blood Pressure (mmHg)"
                          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          type="number"
                          value={newWeight}
                          onChange={(e) => setNewWeight(e.target.value)}
                          placeholder="Weight (kg)"
                          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                          onClick={addHealthData}
                          className="bg-emerald-500 text-white px-4 py-2 rounded-full text-base hover:bg-emerald-600 transition duration-300"
                        >
                          Submit Data
                        </button>
                      </motion.div>
                    )}
                  </div> */}
                </div>
              )}

              {activeTab === 'bills' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-4 sm:mb-6">Billing History</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {bills.map((bill) => (
                      <motion.div
                        key={bill.billing_id}
                        variants={cardVariants}
                        initial="initial"
                        whileHover="hover"
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-emerald-300 transition-colors duration-300"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-emerald-600">Bill #{bill.billing_id}</h3>
                          <span className="text-sm text-gray-500">{bill.date}</span>
                        </div>
                        <p className="text-base text-gray-700 mb-2">{bill.description}</p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-sm text-gray-500">Booking ID: {bill.booking_id}</span>
                          <span className="text-lg font-bold text-emerald-600">${bill.total_price}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'appointments' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-4 sm:mb-6">Upcoming Appointments</h2>
                  <div className="space-y-4 sm:space-y-6">
                    {appointments.map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        variants={cardVariants}
                        initial="initial"
                        whileHover="hover"
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-emerald-300 transition-colors duration-600"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <div>
                            <h3 className="text-lg font-semibold text-emerald-600 mb-2">{appointment.doctor}</h3>
                            <p className="text-base text-gray-700">{appointment.department}</p>
                            <p className="text-sm text-gray-500 mt-2">
                              {appointment.date} at {appointment.time} ({appointment.duration})
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Location: {appointment.room}</p>
                          </div>
                          <div className="mt-4 sm:mt-0 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm">
                            Upcoming
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientProfilePage;