import React from "react";
import { Heart, UserCheck, BarChart2, Clock } from "lucide-react";

const ProgressCard = ({ title, value, color }) => {
  // Use different icons based on the title or purpose
  let icon;
  switch (title) {
    case "Patient Satisfaction":
      icon = <Heart className="text-red-500 animate-bounce" />;
      break;
    case "Staff Utilization":
      icon = <UserCheck className="text-blue-500 animate-bounce" />;
      break;
    case "Admissions":
      icon = <BarChart2 className="text-green-500 animate-bounce" />;
      break;
    case "Avg Length of Stay":
      icon = <Clock className="text-orange-500 animate-bounce" />;
      break;
    default:
      icon = <Heart className="text-gray-500 animate-bounce" />;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        <div>{icon}</div>
      </div>
      <div className="flex items-center">
        <div className="w-24 h-24 relative">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray={`${value}, 100`}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
            {value}%
          </div>
        </div>
        <div className="ml-4">
          <p className={`${color} text-sm`}>+6% Last week</p>
          <p className="text-gray-500 text-sm">Great result!</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
