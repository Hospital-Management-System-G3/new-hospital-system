import React from "react";
import { Users, Calendar, Activity, Clock } from "lucide-react";
import WelcomeCard from "../componentsAdmin/overview/WelcomeCard";
import MetricCard from "../componentsAdmin/overview/MetricCard";
import ProgressCard from "../componentsAdmin/overview/ProgressCard";
import ActivityAnalytics from "../componentsAdmin/overview/ActivityAnalytics";
import Overview from "../componentsAdmin/overview/Overview";

const DashboardOverview = () => {
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
    <main className="flex-1 ml-[3.5rem] mr-[18rem] p-8 w-full overflow-y-auto">
      <WelcomeCard />
      <Overview />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<Users className="text-emerald-600 animate-icon" />}
          title="Total Patients"
          value={patientData.totalPatients}
          unit=""
          bgColor="bg-white"
          textColor="text-gray-800"
        />
        <MetricCard
          icon={<Activity className="text-blue-500 animate-icon" />}
          title="Active Patients"
          value={patientData.activePatients}
          unit=""
          bgColor="bg-white"
          textColor="text-gray-800"
        />
        <MetricCard
          icon={<Calendar className="text-purple-500 animate-icon" />}
          title="Discharged Patients"
          value={patientData.dischargedPatients}
          unit=""
          bgColor="bg-white"
          textColor="text-gray-800"
        />
        <MetricCard
          icon={<Clock className="text-orange-500 animate-icon" />}
          title="Avg Length of Stay"
          value={patientData.averageLengthOfStay}
          unit="days"
          bgColor="bg-emerald-500"
          textColor="text-white"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ProgressCard
          title="Patient Satisfaction"
          icon={<Activity className="text-emerald-500 animate-icon" />}
          value={75}
          color="text-emerald-500"
        />
        <ProgressCard
          title="Staff Utilization"
          icon={<Activity className="text-emerald-500 animate-icon" />}
          value={85}
          color="text-emerald-500"
        />
      </div>

      <ActivityAnalytics data={activityData} />
    </main>
  );
};

export default DashboardOverview;
