import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { setUserRole, clearUserRole } from '../slices/roleSice'; // Adjust the path as necessary

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      const userRole = result.role;
      localStorage.setItem("userRole", userRole);
      dispatch(setUserRole(userRole));
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Login failed:", error.message || error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 min-h-screen flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-screen-lg mx-auto bg-white shadow-2xl rounded-xl overflow-hidden lg:flex">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-8 text-center text-emerald-600">Welcome Back</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 ease-in-out"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-emerald-600">
                Email
              </label>
            </div>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 ease-in-out"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label className="absolute left-4 -top-2.5 bg-gray-100 px-1 text-sm font-semibold text-emerald-600">
                Password
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 tracking-wide font-semibold bg-emerald-500 text-white w-full py-4 rounded-lg hover:bg-emerald-600 transition-all duration-300 ease-in-out shadow-md transform hover:scale-105"
            >
              Log In
            </button>
          </form>
          <p className="mt-8 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-emerald-500 font-semibold hover:text-emerald-600 transition-all duration-300 ease-in-out">
              Register Now
            </a>
          </p>
        </div>
        {/* Right Side - Hospital Theme */}
        <div className="w-full lg:w-1/2 bg-emerald-100 p-12 flex flex-col justify-center items-center">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-emerald-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-3xl font-bold mb-2 text-emerald-800">Healthcare Portal</h3>
            <p className="text-lg text-emerald-600 mb-6">Access your medical records and appointments</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <p className="text-emerald-700">View Records</p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-emerald-700">Schedule Appointments</p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-emerald-700">Secure Access</p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <p className="text-emerald-700">Communicate with Doctors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;