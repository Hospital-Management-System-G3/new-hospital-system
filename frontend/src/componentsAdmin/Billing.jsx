import React, { useState } from "react";
import { FileText, User, Stethoscope, DollarSign } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

// Dummy data for multiple bills
const billsData = [
  {
    id: 1,
    userName: "John Doe",
    doctorName: "Dr. Jane Smith",
    totalPrice: 1000,
    doctorProfit: 700,
    hospitalProfit: 300,
    billDate: "2024-09-21",
    billNumber: "INV-001",
  },
  {
    id: 2,
    userName: "Alice Johnson",
    doctorName: "Dr. Bob Williams",
    totalPrice: 1500,
    doctorProfit: 1000,
    hospitalProfit: 500,
    billDate: "2024-09-22",
    billNumber: "INV-002",
  },
  {
    id: 3,
    userName: "Emma Brown",
    doctorName: "Dr. Michael Davis",
    totalPrice: 800,
    doctorProfit: 550,
    hospitalProfit: 250,
    billDate: "2024-09-23",
    billNumber: "INV-003",
  },
  // Add more bills as needed
];

const totalProfitData = [{ name: "Total Profit", value: 15000 }];
const hospitalProfitData = [{ name: "Hospital Profit", value: 9000 }];
const doctorProfitData = [{ name: "Doctor Profit", value: 6000 }];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const BillingDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 2;

  // Get current bills
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = billsData.slice(indexOfFirstBill, indexOfLastBill);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 space-y-6 min-h-screen ml-[-15rem] w-[72rem] mr-[-1rem] ">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Billing Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Profit"
          value="$15,000"
          icon="💰"
          color="text-blue-600"
        />
        <StatCard
          title="Total Patients"
          value="150"
          icon="👥"
          color="text-green-600"
        />
        <StatCard
          title="This Month"
          value="September"
          icon="📅"
          color="text-purple-600"
        />
      </div>

      {currentBills.map((bill) => (
        <BillCard key={bill.id} billData={bill} />
      ))}

      <Pagination
        billsPerPage={billsPerPage}
        totalBills={billsData.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartCard
          title="Total Profit"
          data={totalProfitData}
          color="#0088FE"
        />
        <ChartCard
          title="Hospital Profit"
          data={hospitalProfitData}
          color="#00C49F"
        />
        <ChartCard
          title="Doctor Profit"
          data={doctorProfitData}
          color="#FFBB28"
        />
      </div>
    </div>
  );
};

const BillCard = ({ billData }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 mb-6 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-2xl font-bold text-gray-800 mb-4 flex items-center"
        variants={itemVariants}
      >
        <motion.span
          variants={iconVariants}
          className="mr-2"
          animate={{ y: [0, -10, 0] }} // Big jump effect
          transition={{ repeat: Infinity, duration: 1 }}
        ></motion.span>
        Bill Details
      </motion.h2>
      <div className="bg-white rounded-lg">
        <motion.div
          className="flex justify-between items-center mb-6"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <motion.span
              variants={iconVariants}
              className="mr-2"
              animate={{ y: [0, -10, 0] }} // Big jump effect
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <FileText size={20} />
            </motion.span>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Invoice</h3>
              <p className="text-gray-600">#{billData.billNumber}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Date: {billData.billDate}</p>
          </div>
        </motion.div>
        <motion.div className="mb-6 flex items-center" variants={itemVariants}>
          <motion.span
            variants={iconVariants}
            className="mr-2"
            animate={{ y: [0, -10, 0] }} // Big jump effect
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <User size={20} />
          </motion.span>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Patient Information
            </h3>
            <p className="text-gray-600">{billData.userName}</p>
          </div>
        </motion.div>
        <motion.div className="mb-6 flex items-center" variants={itemVariants}>
          <motion.span
            variants={iconVariants}
            className="mr-2"
            animate={{ y: [0, -10, 0] }} // Big jump effect
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Stethoscope size={20} />
          </motion.span>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Doctor</h3>
            <p className="text-gray-600">{billData.doctorName}</p>
          </div>
        </motion.div>
        <motion.div className="border-t pt-4" variants={itemVariants}>
          <motion.div
            variants={iconVariants}
            className="mb-2"
            animate={{ y: [0, -10, 0] }} // Big jump effect
            transition={{ repeat: Infinity, duration: 1 }}
          ></motion.div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Total Price</span>
            <span className="text-gray-800 font-semibold">
              ${billData.totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Doctor Profit</span>
            <span className="text-gray-800 font-semibold">
              ${billData.doctorProfit.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Hospital Profit</span>
            <span className="text-gray-800 font-semibold">
              ${billData.hospitalProfit.toFixed(2)}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const AnimatedPaymentIcon = () => (
  <div className="animate-pulse">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-green-500"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  </div>
);

const Pagination = ({ billsPerPage, totalBills, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBills / billsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
    <div className={`p-2 rounded-full ${color} bg-opacity-10 text-2xl`}>
      {icon}
    </div>
  </div>
);

const ChartCard = ({ title, data, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill={color}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    <p className="text-center text-2xl font-bold mt-4">${data[0].value}</p>
  </div>
);

export default BillingDashboard;
