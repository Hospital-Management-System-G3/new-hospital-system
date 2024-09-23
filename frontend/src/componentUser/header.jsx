import React, { useEffect, useState } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserRole, clearUserRole } from '../slices/roleSice'; // Adjust the path as necessary
import logo from "../assets/logo.png";
 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoImage, setLogoImage] = useState(logo);
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.userRole.role); // Access userRole from Redux
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/settings/get");
        setLogoImage(`http://localhost:5000/${response.data.logo_image}`);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();

    const role = localStorage.getItem("userRole");
    console.log(role);
    if (role) {
      dispatch(setUserRole(role)); // Update role in Redux state
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearUserRole()); // Clear role in Redux state
    navigate("/log-in");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-transparent shadow-lg sticky top-0 z-50 text-emerald-500 px-4 sm:px-6 lg:px-16"
    >

{/* bg-gradient-to-r from-emerald-500 to-teal-600  */}
      <nav className="fixed container mx-auto py-4">
        <div className="flex justify-between items-center">
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
            <div className='w-10 h-10'>
              <img src={logoImage} alt="Carelth Logo" className="mr-2 rounded-full" />
            </div>
            <div className="text-lg sm:text-2xl font-bold">BraveHearts</div>
          </motion.div>

          <div className="hidden md:flex space-x-6 text-sm md:text-base">
            <Link to="/" className="hover:text-emerald-200 transition duration-300 font-semibold">Home</Link>
            <Link to="/services" className="hover:text-emerald-200 transition duration-300 font-semibold">Services</Link>
            <Link to="/Catalog" className="hover:text-emerald-200 transition duration-300 font-semibold">Hospitals</Link>
            <Link to="/about" className="hover:text-emerald-200 transition duration-300 font-semibold">About Us</Link>
            <Link to="/contact" className="hover:text-emerald-200 transition duration-300 font-semibold">Contact</Link>
            {userRole === "doctor" && (
              <Link to="/doctor" className="hover:text-emerald-200 transition duration-300 font-semibold">Dr. Profile</Link>
            )}
            {userRole === "user" && (
              <Link to="/profile" className="hover:text-emerald-200 transition duration-300 font-semibold">Profile</Link>
            )}
          </div>

          <div className="hidden md:flex space-x-4">
            {!userRole ? (
              <>
                <Link to="/register">
                  <motion.button
                    className="bg-white text-emerald-500 px-4 py-2 rounded-full hover:bg-emerald-100 transition duration-300 font-semibold shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </Link>
                <Link to="/log-in">
                  <motion.button
                    className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition duration-300 font-semibold shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Log In
                  </motion.button>
                </Link>
              </>
            ) : (
              <motion.button
                className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-green-300 transition duration-300 font-semibold shadow-md"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log Out
              </motion.button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-emerald-600 p-4"
          >
            <Link to="/" className="block py-2 hover:text-emerald-200 transition duration-300">Home</Link>
            <Link to="/services" className="block py-2 hover:text-emerald-200 transition duration-300">Services</Link>
            <Link to="/hospitals" className="block py-2 hover:text-emerald-200 transition duration-300">Hospitals</Link>
            <Link to="/about" className="block py-2 hover:text-emerald-200 transition duration-300">About Us</Link>
            <Link to="/contact" className="block py-2 hover:text-emerald-200 transition duration-300">Contact</Link>
            {userRole === "doctor" && (
              <Link to="/doctor" className="block py-2 hover:text-emerald-200 transition duration-300">Dr. Profile</Link>
            )}
            {userRole === "user" && (
              <Link to="/profile" className="block py-2 hover:text-emerald-200 transition duration-300">Profile</Link>
            )}

            <Link to="/register">
              <motion.button
                className="mt-4 w-full bg-white text-emerald-500 px-6 py-3 rounded-full hover:bg-emerald-100 transition duration-300 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </Link>
            <Link to="/log-in">
              <motion.button
                className="mt-4 w-full bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition duration-300 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log In
              </motion.button>
            </Link>

            {userRole && (
              <motion.button
                className="mt-4 w-full bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 font-semibold"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log Out
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
