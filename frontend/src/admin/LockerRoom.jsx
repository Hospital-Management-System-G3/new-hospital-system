import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock } from "lucide-react"; // Correct icon imports

const lockerContents = [
  {
    item: "Textbook",
    icon: "📚",
    description: "Your history book for the next class.",
  },
  {
    item: "Lunch Box",
    icon: "🍱",
    description: "A delicious packed lunch waiting for you.",
  },
  {
    item: "Sports Gear",
    icon: "🏀",
    description: "Everything you need for PE class.",
  },
  {
    item: "Science Project",
    icon: "🔬",
    description: "Your ongoing experiment on plant growth.",
  },
  {
    item: "Art Supplies",
    icon: "🎨",
    description: "Brushes and paints for your masterpiece.",
  },
];

const Locker = ({ number, isOpen, toggleLocker, combination }) => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [enteredCombo, setEnteredCombo] = useState("");

  useEffect(() => {
    if (enteredCombo === combination && isUnlocking) {
      toggleLocker(number); // Open the locker when the correct combination is entered
      setIsUnlocking(false); // Reset unlocking state
      setEnteredCombo(""); // Clear the input
    }
  }, [enteredCombo, combination, isUnlocking, toggleLocker, number]);

  const handleUnlock = () => {
    if (!isOpen) {
      // Only allow unlocking if the locker is closed
      setIsUnlocking(true);
    }
  };

  const handleComboChange = (e) => {
    setEnteredCombo(e.target.value);
  };

  return (
    <motion.div
      className={`w-32 h-48 m-4 rounded-lg shadow-xl ${
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
      onClick={() => (isOpen ? toggleLocker(number) : handleUnlock())} // Toggle on click
      layout
    >
      <motion.div
        className="text-3xl font-bold mb-2"
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {number}
      </motion.div>
      <motion.div
        className="w-full h-1 bg-emerald-300 mb-2"
        initial={false}
        animate={{ scaleX: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="text-sm text-center px-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-3xl">{lockerContents[number - 1].icon}</span>
            <p className="mt-1 font-semibold">
              {lockerContents[number - 1].item}
            </p>
            <p className="mt-1 text-xs">
              {lockerContents[number - 1].description}
            </p>
          </motion.div>
        ) : isUnlocking ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <input
              type="text"
              placeholder="Enter combo"
              className="w-20 text-center rounded border-emerald-600 border-2 mb-2"
              onChange={handleComboChange}
              maxLength={3}
              value={enteredCombo} // Bind input value
            />
            <Unlock className="w-6 h-6 text-emerald-700" />
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleUnlock}
            className="bg-emerald-600 text-white px-2 py-1 rounded-full flex items-center"
          >
            <Lock className="w-4 h-4 mr-1" />
            Unlock
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const LockerRoom = () => {
  const [openLockers, setOpenLockers] = useState({});
  const [combinations] = useState({
    1: "123",
    2: "456",
    3: "789",
    4: "012",
    5: "345",
  });

  const toggleLocker = (number) => {
    setOpenLockers((prev) => ({
      ...prev,
      [number]: !prev[number], // Toggle the locker state
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-200 to-teal-300 min-h-screen w-[80rem] ml-[-14rem] ">
      <h1 className="text-5xl font-bold text-emerald-800 mb-8  text-center">
        <span className="block">🔐 Secure Lockers</span>
        <span className="text-2xl block mt-2">
          Enter the combination to unlock
        </span>
      </h1>
      <div className="flex flex-wrap justify-center items-center max-w-4xl">
        {[1, 2, 3, 4, 5].map((number) => (
          <Locker
            key={number}
            number={number}
            isOpen={openLockers[number]}
            toggleLocker={toggleLocker}
            combination={combinations[number]}
          />
        ))}
      </div>
    </div>
  );
};

export default LockerRoom;
