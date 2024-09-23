import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import axios from "axios";

const ContactInfoForm = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/info/contact"
        );
        const { address, phone_number, email } = response.data;
        setAddress(address);
        setPhone(phone_number);
        setEmail(email);
      } catch (error) {
        console.error("Error fetching contact info:", error.message);
      }
    };

    fetchContactInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    const contactInfo = {
      address,
      phoneNumber: phone,
      email,
    };

    try {
      const response = await axios.put(
        "http://localhost:5000/api/edit/info/contact",
        contactInfo
      );
      setSuccess(true);

      console.log("Contact information updated:", response.data);
    } catch (error) {
      console.error(
        "Error updating contact info:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
        <MapPin className="mr-2" size={20} />
        Contact Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your address"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600 mb-1 flex items-center"
          >
            <Phone className="mr-1" size={16} />
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-1 flex items-center"
          >
            <Mail className="mr-1" size={16} />
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your email address"
          />
        </div>
        {success && (
          <p className="text-green-500 mb-4">
            Contact Info updated successfully!
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-800 transition duration-300"
        >
          Update Contact Info
        </button>
      </form>
    </div>
  );
};

export default ContactInfoForm;
