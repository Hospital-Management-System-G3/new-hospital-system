import React, { useEffect, useState } from "react";
import axios from "axios";
import { Hospital, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const [logoImage, setLogoImage] = useState("");

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/settings/get"
        );
        setLogoImage(`http://localhost:5000/${response.data.logo_image}`);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();
  }, []);

  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-emerald-900 text-white py-8"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-16">
        <motion.div
          className="flex items-center mb-4 md:mb-0"
          whileHover={{ scale: 1.05 }}
        >
          {logoImage && (
            <img
              src={logoImage}
              alt="Carelth Logo"
              className="mr-2 w-12 h-12"
            />
          )}
          <span className="text-xl font-semibold">Carelth</span>
        </motion.div>
        <div className="text-center mb-4 md:mb-0">
          <p className="italic">"Your health is our mission"</p>
        </div>
        <div className="flex space-x-4">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              className="hover:text-emerald-300 transition duration-300"
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.8 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
