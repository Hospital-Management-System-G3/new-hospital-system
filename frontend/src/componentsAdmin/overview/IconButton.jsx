import React from "react";

const IconButton = ({ icon, label }) => (
  <button className="flex flex-col items-center">
    <span className="bg-green-600 p-2 rounded-full mb-1">{icon}</span>
    <span className="text-sm">{label}</span>
  </button>
);

export default IconButton;
