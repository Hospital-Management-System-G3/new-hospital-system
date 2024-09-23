import React from "react";
import { FaUserPlus, FaFilePdf, FaFileExcel } from "react-icons/fa";

const PatientButton = () => {
  return (
    <div className="flex flex-row-reverse space-x-5 mr-6">
      {/* Create Patient Button */}
      <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 ml-5 rounded transform hover:scale-110 transition duration-300 ease-in-out">
        <FaUserPlus size={20} /> {/* Icon for creating patient */}
      </button>

      {/* Download PDF Button */}
      <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transform hover:scale-110 transition duration-300 ease-in-out">
        <FaFilePdf size={20} /> {/* Icon for downloading PDF */}
      </button>

      {/* Download Excel Button */}
      <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transform hover:scale-110 transition duration-300 ease-in-out">
        <FaFileExcel size={20} /> {/* Icon for downloading Excel */}
      </button>
    </div>
  );
};

export default PatientButton;
