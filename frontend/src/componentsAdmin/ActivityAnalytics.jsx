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
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Activity Analytics</h2>
      <button className="text-green-600 font-semibold">Week ▼</button>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="steps" fill="#10B981" />
        <Bar dataKey="calories" fill="#3B82F6" />
        <Bar dataKey="distance" fill="#F59E0B" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default ActivityAnalytics;
