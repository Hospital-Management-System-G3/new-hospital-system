import React from "react";

const MetricCard = ({
  icon,
  title,
  value,
  unit,
  bgColor = "bg-white",
  textColor = "text-gray-800",
}) => (
  <div
    className={`${bgColor} ${textColor} rounded-2xl p-4 flex items-center justify-between shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-105`}
  >
    <div>
      <p className="text-sm opacity-70">{title}</p>
      <p className="text-2xl font-bold">
        {value} <span className="text-sm font-normal">{unit}</span>
      </p>
    </div>
    <div
      className={`text-3xl transform transition-transform duration-300 hover:scale-110`}
    >
      {icon}
    </div>
  </div>
);

export default MetricCard;
