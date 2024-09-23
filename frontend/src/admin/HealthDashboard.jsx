import React from "react";
import Sidebar from "../componentsAdmin/Sidebar";
import WelcomeCard from "../componentsAdmin/overview/WelcomeCard";
import MetricCard from "../componentsAdmin/overview/MetricCard";
import ProgressCard from "../componentsAdmin/overview/ProgressCard";
import ActivityAnalytics from "../componentsAdmin/overview/ActivityAnalytics";
import RightSidebar from "../componentsAdmin/RightSidebar";
import Overview from "../componentsAdmin/overview/Overview";

// Import necessary icons from lucide-react
import { Users, Calendar, Activity, Clock } from "lucide-react";

const HealthDashboard = () => {
  const patientData = {
    totalPatients: 1200,
    activePatients: 800,
    dischargedPatients: 300,
    averageLengthOfStay: 4.5, // Average length of stay in days
  };

  const activityData = [
    { name: "Mon", patientVisits: 150, treatments: 120, staffHours: 40 },
    { name: "Tue", patientVisits: 200, treatments: 180, staffHours: 45 },
    { name: "Wed", patientVisits: 180, treatments: 160, staffHours: 50 },
    { name: "Thu", patientVisits: 220, treatments: 190, staffHours: 48 },
    { name: "Fri", patientVisits: 250, treatments: 230, staffHours: 60 },
    { name: "Sat", patientVisits: 100, treatments: 80, staffHours: 25 },
    { name: "Sun", patientVisits: 130, treatments: 110, staffHours: 30 },
  ];

  return (
    <div className=" bg-green-50 min-h-screen">
      {/* Sidebar is fixed */}
      <Sidebar />

      {/* Main content is scrollable */}
      {/*  */}

      {/* RightSidebar is fixed */}
      <RightSidebar />
    </div>
  );
};

export default HealthDashboard;
