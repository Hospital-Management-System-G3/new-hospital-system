import React, { useState } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  Bell,
  Users,
  Calendar,
  DollarSign,
  BarChart,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion"; // Add animation package

ChartJS.register(...registerables);

const DashboardCard = ({ title, icon, children }) => (
  <motion.div
    whileHover={{ scale: 1.05 }} // Slight hover animation
    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
  >
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-semibold ml-2">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("month");

  // Mock data - replace with actual data in a real application
  const patientData = {
    total: 1000,
    active: 750,
    inactive: 250,
    demographics: {
      labels: ["Male", "Female", "Other"],
      datasets: [
        {
          data: [400, 550, 50],
          backgroundColor: ["#34D399", "#059669", "#D1FAE5"], // Emerald colors
        },
      ],
    },
  };

  const appointmentData = {
    total: 500,
    scheduled: 300,
    completed: 200,
    trend: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Appointments",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "#059669", // Emerald-600
          backgroundColor: "#34D399", // Emerald-500
          borderWidth: 3, // Thicker line for better visibility
          tension: 0.4, // Smooth the curve
        },
      ],
    },
  };

  const revenueData = {
    total: 1000000,
    breakdown: {
      labels: ["Consultations", "Surgeries", "Lab Tests", "Other"],
      datasets: [
        {
          data: [300000, 400000, 200000, 100000],
          backgroundColor: ["#34D399", "#059669", "#D1FAE5", "#6EE7B7"], // Emerald shades
        },
      ],
    },
  };

  const performanceData = {
    patientFeedback: 4.5,
    staffUtilization: 85,
    feedbackTrend: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Patient Feedback",
          data: [4.2, 4.3, 4.4, 4.3, 4.5, 4.5],
          borderColor: "#059669",
          backgroundColor: "#34D399",
          borderWidth: 3,
          tension: 0.3,
        },
      ],
    },
    staffUtilizationData: {
      labels: ["Utilized", "Idle"],
      datasets: [
        {
          data: [85, 15],
          backgroundColor: ["#34D399", "#059669"],
        },
      ],
    },
  };

  const alerts = [
    { id: 1, message: "Server maintenance scheduled", priority: "high" },
    { id: 2, message: "5 unpaid bills require attention", priority: "medium" },
    { id: 3, message: "Staff meeting tomorrow at 9 AM", priority: "low" },
  ];

  return (
    <div className="container mx-auto p-4 bg-emerald-50 min-h-[33rem]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
        <div className="flex items-center">
          <Filter className="w-5 h-5 mr-2 text-emerald-500" />
          <select
            className="bg-white border border-gray-300 rounded-md px-3 py-2"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Patients"
          icon={<Users className="w-8 h-8 text-emerald-500" />} // Bigger icon
        >
          <motion.div
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {patientData.total}
          </motion.div>
          <div className="flex justify-between text-sm mb-4">
            <span>Active: {patientData.active}</span>
            <span>Inactive: {patientData.inactive}</span>
          </div>
          <div className="mt-4">
            <Pie
              data={patientData.demographics}
              options={{
                responsive: true,
                plugins: {
                  title: { display: true, text: "Patient Demographics" },
                },
                maintainAspectRatio: false, // Larger chart size
              }}
              height={200}
            />
          </div>
        </DashboardCard>

        <DashboardCard
          title="Appointments"
          icon={<Calendar className="w-8 h-8 text-emerald-500" />} // Bigger icon
        >
          <motion.div
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {appointmentData.total}
          </motion.div>
          <div className="flex justify-between text-sm mb-4">
            <span>Scheduled: {appointmentData.scheduled}</span>
            <span>Completed: {appointmentData.completed}</span>
          </div>
          <div className="mt-4">
            <Line
              data={appointmentData.trend}
              options={{
                responsive: true,
                plugins: {
                  title: { display: true, text: "Appointment Trend" },
                },
                maintainAspectRatio: false, // Larger chart size
              }}
              height={200}
            />
          </div>
        </DashboardCard>

        <DashboardCard
          title="Revenue"
          icon={<DollarSign className="w-8 h-8 text-emerald-500" />} // Bigger icon
        >
          <motion.div
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ${revenueData.total.toLocaleString()}
          </motion.div>
          <div className="mt-4">
            <Bar
              data={revenueData.breakdown}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Revenue Breakdown" },
                },
                maintainAspectRatio: false, // Larger chart size
              }}
              height={200}
            />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
