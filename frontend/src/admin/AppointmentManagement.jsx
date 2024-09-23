import React, { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Check,
} from "lucide-react";

const AppointmentManagement = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const appointments = [
    { id: 1, patientName: "John Doe", time: "09:00 AM", status: "upcoming" },
    { id: 2, patientName: "Jane Smith", time: "11:30 AM", status: "completed" },
    {
      id: 3,
      patientName: "Alice Johnson",
      time: "02:00 PM",
      status: "upcoming",
    },
    { id: 4, patientName: "Bob Brown", time: "04:30 PM", status: "upcoming" },
  ];

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  return (
    <div className="flex justify-center ml-[12rem] mt-10 items-center w-full bg-gray-100">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-4 sm:mb-0">
            <Calendar className="mr-2" size={32} />
            Appointment Management
          </h1>
          <button className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Approve Patient Bookings
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-6 w-full">
          <div className="p-4 border-b flex flex-col sm:flex-row items-center justify-between">
            <h2 className="text-xl font-semibold mb-4 sm:mb-0">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={prevMonth}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-7 gap-2 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="font-semibold">
                      {day}
                    </div>
                  )
                )}
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className="p-2 border rounded-lg hover:bg-gray-200 cursor-pointer"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md w-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Today's Appointments</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center mb-4 sm:mb-0">
                    <Clock className="mr-2 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{appointment.patientName}</p>
                      <p className="text-sm text-gray-500">
                        {appointment.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    {appointment.status === "upcoming" ? (
                      <>
                        <button className="w-full sm:w-auto px-3 py-1 text-sm border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-100 transition-colors">
                          Reschedule
                        </button>
                        <button className="w-full sm:w-auto px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-100 transition-colors">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <span className="text-green-500 flex items-center">
                        <Check className="mr-1" /> Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;
