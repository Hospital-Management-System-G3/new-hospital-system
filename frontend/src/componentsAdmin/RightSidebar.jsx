import React from "react";
import { Eye, Smartphone, Activity, Bell } from "lucide-react";
import IconButton from "./overview/IconButton";
import Appointment from "./overview/Appointment";
import img from "/src/assets/admin.jpeg";

const RightSidebar = () => (
  <aside className="fixed top-0 right-0 h-full w-72 bg-emerald-500 text-white p-6">
    <div className="flex items-center space-x-4 mb-8 animate-fadeIn">
      <img
        src={img}
        alt="Admin Profile"
        className="w-16 h-16 rounded-full hover:scale-110 transform transition-transform duration-300"
      />
      <div>
        <h2 className="font-semibold">Dr. Sarah Johnson</h2>
        <p className="text-sm text-emerald-100">
          Cancer Treatment Administrator
        </p>
      </div>
      <div className="ml-auto">
        <IconButton
          icon={
            <Bell className="animate-bounce hover:text-emerald-600 transition duration-300" />
          }
          label="Notifications"
        />
      </div>
    </div>
    <div className="flex justify-between mb-8 space-x-4">
      <IconButton
        icon={
          <Eye className="hover:text-emerald-600 transition duration-300 hover:scale-110 transform" />
        }
        label="Vision: 20/20"
      />
      <IconButton
        icon={
          <Smartphone className="hover:text-emerald-600 transition duration-300 hover:scale-110 transform" />
        }
        label="Phone: +123 456 7890"
      />
      <IconButton
        icon={
          <Activity className="hover:text-emerald-600 transition duration-300 hover:scale-110 transform" />
        }
        label="Age: 45"
      />
    </div>
    <div className="mt-8 space-y-4">
      <Appointment
        icon="🧑‍⚕️"
        title="Oncology Check-up"
        time="09:00 AM"
        doctor="Dr. Emily Carter"
      />
      <Appointment
        icon="💉"
        title="Chemotherapy Session"
        time="11:30 AM"
        doctor="Dr. James Brown"
      />
      <Appointment
        icon="🫀"
        title="Cardiology Consultation"
        time="02:00 PM"
        doctor="Dr. Olivia Davis"
      />
    </div>
  </aside>
);

export default RightSidebar;
