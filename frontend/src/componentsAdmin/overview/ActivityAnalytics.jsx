import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ActivityAnalytics = ({ data }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Activity Analytics
      </h2>
      <button className="text-green-600 font-semibold hover:underline">
        Week ▼
      </button>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="name" stroke="#6B7280" />
        <YAxis stroke="#6B7280" />
        <Tooltip />
        <Bar dataKey="patientVisits" fill="#10B981" />
        <Bar dataKey="treatments" fill="#3B82F6" />
        <Bar dataKey="staffHours" fill="#F59E0B" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default ActivityAnalytics;
