import React, { useState } from "react";
import { Plus, Edit, Trash, Search, Eye, EyeOff, Upload } from "lucide-react";

const pages = [
  "Overview",
  "User Management",
  "Doctor Management",
  "Nurse Management",
  "Medicine Cabinet",
  "Locker Room",
  "Billing and Payment",
  "Report",
  "Feedback",
  "System Setting",
];

const AdminManagementPage = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    permissions: {},
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAdmin({ ...newAdmin, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePermissionChange = (page) => {
    setNewAdmin({
      ...newAdmin,
      permissions: {
        ...newAdmin.permissions,
        [page]: !newAdmin.permissions[page],
      },
    });
  };

  const addAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      setAlert({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }
    setAdmins([...admins, newAdmin]);
    setNewAdmin({
      name: "",
      email: "",
      password: "",
      image: null,
      permissions: {},
    });
    setShowForm(false);
    setAlert({ type: "success", message: "Admin added successfully!" });
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-emerald-50 min-h-screen min-w-[70rem] ml-[-15rem]">
      <h1 className="text-4xl font-bold text-emerald-700 mb-8">
        Admin Management
      </h1>

      {/* Custom Alert */}
      {alert && (
        <div
          className={`p-4 mb-6 rounded-lg ${
            alert.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search admins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-emerald-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search
            className="absolute left-3 top-2.5 text-emerald-500"
            size={20}
          />
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition duration-300 flex items-center"
        >
          <Plus className="mr-2" size={20} />
          Add New Admin
        </button>
      </div>

      {/* Add New Admin Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
            Add New Admin
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newAdmin.name}
              onChange={handleInputChange}
              className="p-2 border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newAdmin.email}
              onChange={handleInputChange}
              className="p-2 border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={newAdmin.password}
                onChange={handleInputChange}
                className="p-2 pr-10 border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2.5 text-emerald-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full hover:bg-emerald-200 transition duration-300 flex items-center"
              >
                <Upload size={20} className="mr-2" />
                Upload Image
              </label>
              {newAdmin.image && (
                <img
                  src={newAdmin.image}
                  alt="Admin"
                  className="w-10 h-10 rounded-full ml-4 object-cover"
                />
              )}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-emerald-700">
              Permissions:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {pages.map((page) => (
                <label
                  key={page}
                  className="flex items-center space-x-2 text-emerald-800"
                >
                  <input
                    type="checkbox"
                    checked={newAdmin.permissions[page] || false}
                    onChange={() => handlePermissionChange(page)}
                    className="form-checkbox text-emerald-500 rounded focus:ring-emerald-500"
                  />
                  <span>{page}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={addAdmin}
            className="bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600 transition duration-300"
          >
            Add Admin
          </button>
        </div>
      )}

      {/* Admins Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-emerald-500 text-white">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Permissions</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin, index) => (
              <tr
                key={index}
                className="border-b border-emerald-100 hover:bg-emerald-50 transition duration-150"
              >
                <td className="p-3">
                  {admin.image ? (
                    <img
                      src={admin.image}
                      alt={admin.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                      {admin.name.charAt(0)}
                    </div>
                  )}
                </td>
                <td className="p-3 font-medium text-emerald-800">
                  {admin.name}
                </td>
                <td className="p-3 text-emerald-600">{admin.email}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(admin.permissions)
                      .filter(([, value]) => value)
                      .map(([key]) => (
                        <span
                          key={key}
                          className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full"
                        >
                          {key}
                        </span>
                      ))}
                  </div>
                </td>
                <td className="p-3">
                  <button className="text-blue-500 hover:text-blue-700 mr-2 transition duration-150">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition duration-150">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManagementPage;
