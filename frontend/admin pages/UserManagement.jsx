import React, { useState } from "react";
import { UserPlus, Users, FileText } from "lucide-react";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("users");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UsersList />;
      case "roles":
        return <RolesAndPermissions />;
      case "logs":
        return <ActivityLogs />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-emerald-100 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6">
        User Management
      </h1>
      <div className="grid w-full grid-cols-3 mb-6">
        <button
          className={`flex items-center ${
            activeTab === "users" ? "text-emerald-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("users")}
        >
          <Users className="mr-2" /> Users
        </button>
        <button
          className={`flex items-center ${
            activeTab === "roles" ? "text-emerald-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("roles")}
        >
          <UserPlus className="mr-2" /> Roles & Permissions
        </button>
        <button
          className={`flex items-center ${
            activeTab === "logs" ? "text-emerald-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("logs")}
        >
          <FileText className="mr-2" /> Activity Logs
        </button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

const UsersList = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Administrator",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Healthcare Provider",
      email: "jane@example.com",
    },
    { id: 3, name: "Bob Johnson", role: "Patient", email: "bob@example.com" },
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-emerald-600 mb-4">Users</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-emerald-500 text-white">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <button className="text-emerald-600 hover:text-emerald-700 mr-2">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-700">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600">
        Add New User
      </button>
    </div>
  );
};

const RolesAndPermissions = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Administrator", permissions: ["Full Access"] },
    {
      id: 2,
      name: "Healthcare Provider",
      permissions: ["View Patient Records", "Update Patient Records"],
    },
    { id: 3, name: "Patient", permissions: ["View Own Records"] },
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
        Roles & Permissions
      </h2>
      <table className="w-full">
        <thead>
          <tr className="bg-emerald-500 text-white">
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Permissions</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="border-b">
              <td className="p-2">{role.name}</td>
              <td className="p-2">{role.permissions.join(", ")}</td>
              <td className="p-2">
                <button className="text-emerald-600 hover:text-emerald-700 mr-2">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-700">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600">
        Add New Role
      </button>
    </div>
  );
};

const ActivityLogs = () => {
  const [logs, setLogs] = useState([
    {
      id: 1,
      user: "John Doe",
      action: "Logged in",
      timestamp: "2024-09-20 10:30:00",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Updated patient record",
      timestamp: "2024-09-20 11:15:00",
    },
    {
      id: 3,
      user: "Bob Johnson",
      action: "Changed appointment",
      timestamp: "2024-09-20 12:00:00",
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
        Activity Logs
      </h2>
      <table className="w-full">
        <thead>
          <tr className="bg-emerald-500 text-white">
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">Action</th>
            <th className="p-2 text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b">
              <td className="p-2">{log.user}</td>
              <td className="p-2">{log.action}</td>
              <td className="p-2">{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
