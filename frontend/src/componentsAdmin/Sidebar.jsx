import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Calendar,
  ClipboardList,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import DashboardOverview from "../admin/DashboardOverview";
import PatientManagement from "../admin/PatientManagement";
import DoctorManagementPage from "./DoctorManagementPage/table";
import NurseManagement from "./NurseManagement/full page";
import CabinetRoompage from "../admin/CabinetRoompage";
import LockerRoom from "../admin/LockerRoom";
import AdminManagementPage from "../admin/AdminManagementPage";
import SystemSettings from "../admin/Settings";
import FeedbackPage from "../admin/FeedbackPage";
import ReportPage from "../admin/ReportPage";
import Billing from "../admin/BillingDashboard";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("DashboardOverview");
  const [hoveredMenu, setHoveredMenu] = useState(null);

  useEffect(() => {
    // Retrieve selected menu from localStorage on component mount
    const savedMenu = localStorage.getItem("selectedMenu");
    if (savedMenu) {
      setSelectedMenu(savedMenu);
    }
  }, []);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
    // Save the selected menu to localStorage
    localStorage.setItem("selectedMenu", menu);
  };

  const handleMenuHover = (menu) => {
    setHoveredMenu(menu);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "DashboardOverview":
        return <DashboardOverview />;
      case "User":
        return <PatientManagement />;
      case "Doctor":
        return <DoctorManagementPage />;
      case "Nurse":
        return <NurseManagement />;
      case "cabinet":
        return <CabinetRoompage />;
      case "Locker":
        return <LockerRoom />;
      case "Admin":
        return <AdminManagementPage />;
      case "Billing":
        return <Billing />;
      case "Reports":
        return <ReportPage />;
      case "Feedback":
        return <FeedbackPage />;
      case "Settings":
        return <SystemSettings />;
      default:
        return <div>No Content Selected</div>;
    }
  };

  return (
    <div className="flex min-h-screen relative">
      <aside
        className={`w-${
          expanded ? "64" : "16"
        } bg-green-600 text-white p-4 flex flex-col space-y-8 transition-all duration-300 fixed top-0 left-0 h-screen`}
        style={{ zIndex: 1000 }}
      >
        <div
          className="text-2xl font-bold cursor-pointer flex items-center justify-center w-full h-12 transition-all duration-300"
          onClick={handleToggle}
        >
          {expanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </div>

        <nav className="flex flex-col items-stretch space-y-4">
          <button
            className={`p-2 rounded-lg ${
              selectedMenu === "DashboardOverview"
                ? "bg-green-500"
                : "hover:bg-green-500"
            } transition-colors flex items-center w-full`}
            onClick={() => handleMenuSelect("DashboardOverview")}
            onMouseEnter={() => handleMenuHover("Dashboard Overview")}
            onMouseLeave={() => handleMenuHover(null)}
          >
            <LayoutDashboard size={20} />
            {expanded && <span className="ml-2">Dashboard Overview</span>}
            {!expanded && hoveredMenu === "Dashboard Overview" && (
              <span className="absolute ml-16 w-48 bg-green-500 p-2 rounded-lg">
                Dashboard Overview
              </span>
            )}
          </button>

          <button
            className={`p-2 rounded-lg ${
              selectedMenu === "User" ? "bg-green-500" : "hover:bg-green-500"
            } transition-colors flex items-center w-full`}
            onClick={() => handleMenuSelect("User")}
            onMouseEnter={() => handleMenuHover("User Management")}
            onMouseLeave={() => handleMenuHover(null)}
          >
            <Users size={20} />
            {expanded && <span className="ml-2">User Management</span>}
            {!expanded && hoveredMenu === "User Management" && (
              <span className="absolute ml-16 w-48 bg-green-500 p-2 rounded-lg">
                User Management
              </span>
            )}
          </button>

          <button
            className={`p-2 rounded-lg ${
              selectedMenu === "Doctor" ? "bg-green-500" : "hover:bg-green-500"
            } transition-colors flex items-center w-full`}
            onClick={() => handleMenuSelect("Doctor")}
            onMouseEnter={() => handleMenuHover("Doctor Management")}
            onMouseLeave={() => handleMenuHover(null)}
          >
            <UserPlus size={20} />
            {expanded && <span className="ml-2">Doctor Management</span>}
            {!expanded && hoveredMenu === "Doctor Management" && (
              <span className="absolute ml-16 w-48 bg-green-500 p-2 rounded-lg">
                Doctor Management
              </span>
            )}
          </button>

          <button
            className={`p-2 rounded-lg ${
              selectedMenu === "Nurse" ? "bg-green-500" : "hover:bg-green-500"
            } transition-colors flex items-center w-full`}
            onClick={() => handleMenuSelect("Nurse")}
            onMouseEnter={() => handleMenuHover("Nurse Management")}
            onMouseLeave={() => handleMenuHover(null)}
          >
            <Users size={20} />
            {expanded && <span className="ml-2">Nurse Management</span>}
            {!expanded && hoveredMenu === "Nurse Management" && (
              <span className="absolute ml-16 w-48 bg-green-500 p-2 rounded-lg">
                Nurse Management
              </span>
            )}
          </button>

          <button
            className={`p-2 rounded-lg ${
              selectedMenu === "cabinet" ? "bg-green-500" : "hover:bg-green-500"
            } transition-colors flex items-center w-full`}
            onClick={() => handleMenuSelect("cabinet")}
            onMouseEnter={() => handleMenuHover("Cabinet Room")}
            onMouseLeave={() => handleMenuHover(null)}
          >
            <Users size={20} />
            {expanded && <span className="ml-2">Cabinet Room</span>}
            {!expanded && hoveredMenu === "Cabinet Room" && (
              <span className="absolute ml-16 w-48 bg-green-500 p-2 rounded-lg">
                Cabinet Room
              </span>
            )}
          </button>

          <button
            className={`p-2 rounded-lg ${
              selectedMenu === "Locker" ? "bg-green-500" : "hover:bg-green-500"
            } transition-colors flex items-center w-full`}
            onClick={() => handleMenuSelect("Locker")}
            onMouseEnter={() => handleMenuHover("Locker Room")}
            onMouseLeave={() => handleMenuHover(null)}
          >
            <Calendar size={20} />
            {expanded && <span className="ml-2">Locker Room</span>}
            {!expanded && hoveredMenu === "Locker Room" && (
              <span className="absolute ml-16 w-48 bg-green-500 p-2 rounded-lg">
                Locker Room
              </span>
            )}
          </button>
          <button
            className={`p-2 rounded-lg ${
              selectedMenu === "Admin" ? "bg-green-500" : "hover:bg-green-500"
            } transition-colors flex items-center w-full`}
            onClick={() => handleMenuSelect("Admin")}
            onMouseEnter={() => handleMenuHover("Admin Management")}
            onMouseLeave={() => handleMenuHover(null)}
          >
            <Calendar size={20} />
            {expanded && <span className="ml-2">Admin Management</span>}
            {!expanded && hoveredMenu === "Admin Management" && (
              <span className="absolute ml-16 w-48 bg-green-500 p-2 rounded-lg">
                Admin Management
              </span>
            )}
          </button>
          <button
            className={`p-2 rounded-lg ${
              selectedMenu === "Billing" ? "bg-green-500" : "hover:bg-green-500"
            } transition-colors flex items-center w-full`}
            onClick={() => handleMenuSelect("Billing")}
            onMouseEnter={() => handleMenuHover("Billing and Payments")}
            onMouseLeave={() => handleMenuHover(null)}
          >
            <CreditCard size={20} />
            {expanded && <span className="ml-2">Billing and Payments</span>}
            {!expanded && hoveredMenu === "Billing and Payments" && (
              <span className="absolute ml-16 w-48 bg-green-500 p-2 rounded-lg">
                Billing and Payments
              </span>
            )}
          </button>

          <button
            className={`p-2 rounded-lg ${
              selectedMenu === "Reports" ? "bg-green-500" : "hover:bg-green-500"
            } transition-colors flex items-center w-full`}
            onClick={() => handleMenuSelect("Reports")}
            onMouseEnter={() => handleMenuHover("Reports")}
            onMouseLeave={() => handleMenuHover(null)}
          >
            <ClipboardList size={20} />
            {expanded && <span className="ml-2">Reports</span>}
            {!expanded && hoveredMenu === "Reports" && (
              <span className="absolute ml-16 bg-green-500 p-2 rounded-lg">
                Reports
              </span>
            )}
          </button>

          <button
            className={`p-2 rounded-lg ${
              selectedMenu === "Feedback"
                ? "bg-green-500"
                : "hover:bg-green-500"
            } transition-colors flex items-center w-full`}
            onClick={() => handleMenuSelect("Feedback")}
            onMouseEnter={() => handleMenuHover("Feedback")}
            onMouseLeave={() => handleMenuHover(null)}
          >
            <MessageSquare size={20} />
            {expanded && <span className="ml-2">User Message</span>}
            {!expanded && hoveredMenu === "Feedback" && (
              <span className="absolute ml-16 bg-green-500 p-2 rounded-lg">
                Feedback
              </span>
            )}
          </button>

          <button
            className={`p-2 rounded-lg ${
              selectedMenu === "Settings"
                ? "bg-green-500"
                : "hover:bg-green-500"
            } transition-colors flex items-center w-full`}
            onClick={() => handleMenuSelect("Settings")}
            onMouseEnter={() => handleMenuHover("Settings")}
            onMouseLeave={() => handleMenuHover(null)}
          >
            <Settings size={20} />
            {expanded && <span className="ml-2">System Settings</span>}
            {!expanded && hoveredMenu === "Settings" && (
              <span className="absolute ml-16 w-32 bg-green-500 p-2 rounded-lg">
                System Settings
              </span>
            )}
          </button>
        </nav>

        {/* <button className="mt-auto p-2 rounded-lg hover:bg-green-500 transition-colors flex items-center w-full">
          <LogOut size={20} />
          {expanded && <span className="ml-2">Logout</span>}
        </button> */}
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex items-center justify-center min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default Sidebar;
