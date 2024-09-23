import React, { useState, useEffect, useCallback } from 'react';
import Button from "./button";
import axios from 'axios';

function Appointments() {
  const [data, setData] = useState([]);
  const [databooked, setDatabooked] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    timeFrom: '',
    timeTo: '',
    serviceType: '',
    date: '',
    totalPrice: ''
  });
 

  const completed = async (billingId) => {
    try {
      await axios.post(`http://localhost:5000/api/completeAppointment/${billingId}`);
      // Optionally, you can refresh the booked data after completing an appointment
      fetchDatabooked();
    } catch (error) {
      console.error("Error completing appointment:", error);
    }
  };



  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctorAvailabilities", { withCredentials: true });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);



  const fetchDatabooked= useCallback(async () => {
    try {
   

      const response = await axios.get("http://localhost:5000/api/fetchDatabooked", { withCredentials: true });
      setDatabooked(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const deleteTime = async (availability_id) => {
    try {
      await axios.post(`http://localhost:5000/api/deleteTime/${availability_id}`);
      setData((prevData) => prevData.filter(appointment => appointment.availability_id !== availability_id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

    const formatDate = (isoDate) => {
    
    if (!isoDate) return 'N/A'; // Handle null or undefined dates
    const dateObject = new Date(isoDate);
    if (isNaN(dateObject.getTime())) {
      console.error('Invalid date:', isoDate);
      return 'Invalid Date'; // Return a placeholder for invalid dates
    }
    return dateObject.toISOString().split('T')[0];
    };

    const addTime = () => {
    setShowAddForm(true);
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/addAvailability", newAppointment, { withCredentials: true });
      setData(prevData => [...prevData, response.data]);
      setShowAddForm(false);
      setNewAppointment({
        timeFrom: '',
        timeTo: '',
        serviceType: '',
        date: '',
        totalPrice: ''
      });

      fetchData();
    } catch (error) {
      console.error("Error adding new appointment:", error);
    }
  };

  useEffect(() => {
    fetchData();
    handleSubmit();
    fetchDatabooked();
  }, [fetchData]);

 
  return (
    <>
      <div className="relative overflow-x-auto overflow-y-auto h-80">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl mr-4 font-semibold text-green-700 text-center md:text-left">
            Your active appointments
          </h2>
          <Button 
            onClick={addTime}
            className="px-4 py-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Add New  
          </Button>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold mb-4">Add New Appointment</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time From</label>
                    <input
                      type="time"
                      name="timeFrom"
                      value={newAppointment.timeFrom}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time To</label>
                    <input
                      type="time"
                      name="timeTo"
                      value={newAppointment.timeTo}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service Type</label>
                    <input
                      type="text"
                      name="serviceType"
                      value={newAppointment.serviceType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={newAppointment.date}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Price</label>
                    <input
                      type="number"
                      name="totalPrice"
                      value={newAppointment.totalPrice}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <Button type="button" onClick={() => setShowAddForm(false)} className="bg-gray-200 text-gray-800">Cancel</Button>
                  <Button type="submit" className="bg-green-600 text-white">Add Appointment</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-green-200 bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-green-200 p-3 text-left">Time-From</th>
                <th className="border border-green-200 p-3 text-left">Time-To</th>
                <th className="border border-green-200 p-3 text-left">Date</th>
                <th className="border border-green-200 p-3 text-left">Service Type</th>
                <th className="border border-green-200 p-3 text-left">Total Price</th>
                <th className="border border-green-200 p-3 text-left">Status</th>
                <th className="border border-green-200 p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((appointment, index) => (
                <tr key={index} className="hover:bg-green-50 transition-colors duration-200">
                  <td className="border border-green-200 p-3">{appointment.available_time_from}</td>
                  <td className="border border-green-200 p-3">{appointment.available_time_to}</td>
                  <td className="border border-green-200 p-3">{formatDate(appointment.available_date)}</td>
                  <td className="border border-green-200 p-3">{appointment.service_type}</td>
                  <td className="border border-green-200 p-3">{appointment.total_price}</td>
                  <td className="border border-green-200 p-3">{appointment.status}</td>
                  <td className="border border-green-200 p-3">
                    <Button onClick={() => deleteTime(appointment.availability_id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

{/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
<div className="relative overflow-x-auto overflow-y-auto h-80">
  <div className="flex items-center mb-6">
    <h2 className="text-2xl mr-4 font-semibold text-green-700 text-center md:text-left">
      Your booked appointments
    </h2>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-green-200 bg-white rounded-lg overflow-hidden">
      <thead>
      <tr className="bg-green-100">
                <th className="border border-green-200 p-3 text-left">Billing ID</th>
                <th className="border border-green-200 p-3 text-left">Patient Name</th>
                <th className="border border-green-200 p-3 text-left">Patient Email</th>
                <th className="border border-green-200 p-3 text-left">Date</th>
                <th className="border border-green-200 p-3 text-left">Time</th>
                <th className="border border-green-200 p-3 text-left">Service Type</th>
                <th className="border border-green-200 p-3 text-left">Total Price</th>
                <th className="border border-green-200 p-3 text-left">Doctor Profit</th>
                <th className="border border-green-200 p-3 text-left">Hospital Profit</th>
                <th className="border border-green-200 p-3 text-left">status</th>
                <th className="border border-green-200 p-3 text-left">Action</th>
              </tr>
      </thead>
      <tbody>
      {databooked.map((billing, index) => (
                <tr key={index} className="hover:bg-green-50 transition-colors duration-200">
                  <td className="border border-green-200 p-3">{billing.billing_id}</td>
                  <td className="border border-green-200 p-3">{billing.patient_name}</td>
                  <td className="border border-green-200 p-3">{billing.patient_email}</td>
                  <td className="border border-green-200 p-3">{formatDate(billing.available_date)}</td>
                  <td className="border border-green-200 p-3">{`${billing.available_time_from} - ${billing.available_time_to}`}</td>
                  <td className="border border-green-200 p-3">{billing.service_type}</td>
                  <td className="border border-green-200 p-3">${billing.total_price}</td>
                  <td className="border border-green-200 p-3">${billing.doctor_profit}</td>
                  <td className="border border-green-200 p-3">${billing.hospital_profit}</td>
                  <td className="border border-green-200 p-3">{billing.status}</td>
                  <td className="border border-green-200 p-3">
                    <Button onClick={() => completed(billing.billing_id)}>completed</Button>
                  </td>
                </tr>
              ))}
      </tbody>
    </table>
  </div>
</div>

      
    </>
  );
}

export default Appointments;