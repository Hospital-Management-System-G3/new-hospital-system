import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cabinetContents = [
  {
    type: "Painkillers",
    medicines: [
      { name: "Ibuprofen", quantity: 3, shape: "💊" },
      { name: "Paracetamol", quantity: 2, shape: "💊" },
    ],
  },
  {
    type: "Antibiotics",
    medicines: [
      { name: "Amoxicillin", quantity: 4, shape: "💊" },
      { name: "Azithromycin", quantity: 2, shape: "💊" },
    ],
  },
  {
    type: "Antidepressants",
    medicines: [
      { name: "Sertraline", quantity: 3, shape: "💊" },
      { name: "Fluoxetine", quantity: 5, shape: "💊" },
    ],
  },
  {
    type: "Vaccines",
    medicines: [
      { name: "Influenza Vaccine", quantity: 1, shape: "💉" },
      { name: "COVID-19 Vaccine", quantity: 3, shape: "💉" },
    ],
  },
  {
    type: "Supplements",
    medicines: [
      { name: "Vitamin D", quantity: 5, shape: "💊" },
      { name: "Iron Supplement", quantity: 3, shape: "💊" },
    ],
  },
];

const Modal = ({ medicine, onClose }) => {
  if (!medicine) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg w-96"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">{medicine.name}</h2>
          <p className="mb-2">Quantity: {medicine.quantity}</p>
          <p>Details about this medicine...</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Cabinet = ({ number, isOpen, toggleCabinet, setSelectedMedicine }) => {
  const handleMedicineClick = (medicine) => {
    setSelectedMedicine(medicine);
  };

  return (
    <motion.div
      className={`w-72 h-48  rounded-lg shadow-xl ${
        isOpen ? "bg-emerald-100" : "bg-emerald-500"
      } 
                  transition-all duration-300 cursor-pointer 
                  flex flex-col items-center justify-center text-emerald-900
                  border-4 ${
                    isOpen ? "border-emerald-300" : "border-emerald-600"
                  }
                  transform perspective-1000`}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      layout
      onClick={() => toggleCabinet(number)}
    >
      <motion.div
        className="text-2xl font-bold mb-2 text-center"
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {cabinetContents[number - 1].type}
      </motion.div>
      <motion.div
        className="w-full h-1 bg-emerald-300 mb-2"
        initial={false}
        animate={{ scaleX: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="text-sm text-center px-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.2 }}
          >
            {cabinetContents[number - 1].medicines.map((medicine, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between mb-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the cabinet from closing when clicking the medicine
                  handleMedicineClick(medicine);
                }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl">{medicine.shape}</span>
                <p className="ml-2 text-sm">
                  {medicine.name} (x{medicine.quantity})
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CabinetRoom = () => {
  const [openCabinets, setOpenCabinets] = useState({});
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const toggleCabinet = (number) => {
    setOpenCabinets((prev) => ({
      ...prev,
      [number]: !prev[number],
    }));
  };

  const closeModal = () => {
    setSelectedMedicine(null);
  };

  return (
    <div className="flex flex-col  items-center justify-center p-8 bg-gradient-to-bl from-emerald-50 to-emerald-50 min-h-screen w-[75rem]">
      <h1 className="text-5xl font-bold text-emerald-800 mb-8 text-center">
        <span className="block">🩺 Medicine Cabinets</span>
      </h1>
      <div className="flex flex-wrap justify-center items-center w-full gap-4">
        {[1, 2, 3, 4, 5].map((number) => (
          <Cabinet
            key={number}
            number={number}
            isOpen={openCabinets[number]}
            toggleCabinet={toggleCabinet}
            setSelectedMedicine={setSelectedMedicine}
          />
        ))}
      </div>

      {/* Modal for Medicine Information */}
      <Modal medicine={selectedMedicine} onClose={closeModal} />
    </div>
  );
};

export default CabinetRoom;
