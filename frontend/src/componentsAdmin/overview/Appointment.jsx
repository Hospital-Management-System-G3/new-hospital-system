import React from "react";

const Appointment = ({ icon, title, time, doctor }) => (
  <div className="bg-green-600 rounded-2xl p-4 flex items-center space-x-4">
    <span className="text-2xl">{icon}</span>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-green-200">{time}</p>
      <p className="text-sm">{doctor}</p>
    </div>
  </div>
);

export default Appointment;
