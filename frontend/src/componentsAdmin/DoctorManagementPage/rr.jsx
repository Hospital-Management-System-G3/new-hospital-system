import React, { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  MessageSquare,
  Plus,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Gladys Jones",
    email: "gladys@example.com",
    role: "Admin",
    specialty: "Cardiology",
    appointmentDate: "2024-09-25",
    availableTimes: ["09:00", "11:00", "14:00"],
    status: "available",
    price: 150,
    doctorProfit: 120,
    patientName: "",
    photo: "/api/placeholder/50/50",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Dr. Jennie Cooper",
    email: "jennie@example.com",
    role: "Candidate",
    specialty: "Pediatrics",
    appointmentDate: "2024-09-26",
    availableTimes: ["10:00", "13:00", "15:00"],
    status: "booked",
    price: 180,
    doctorProfit: 140,
    patientName: "John Doe",
    photo: "/api/placeholder/50/50",
    rating: 4.5,
  },
  // Add more doctor data as needed
];

export default function DoctorManagementPage() {
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    role: "",
    specialty: "",
    status: "",
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDoctors(doctors.map((doctor) => doctor.id));
    } else {
      setSelectedDoctors([]);
    }
  };

  const handleSelectDoctor = (id) => {
    setSelectedDoctors((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.role === "" || doctor.role === filters.role) &&
      (filters.specialty === "" || doctor.specialty === filters.specialty) &&
      (filters.status === "" || doctor.status === filters.status)
  );

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortConfig.key !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mr-[19rem] ml-20">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6">
        Doctor Management
      </h1>

      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition duration-300"
          >
            <Filter size={18} />
            <span>Filter</span>
          </button>

          <button className="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition duration-300">
            <MessageSquare size={18} />
            <span>Message Selected</span>
          </button>

          <button className="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition duration-300">
            <Plus size={18} />
            <span>Add Doctor</span>
          </button>
        </div>
      </div>

      {filterOpen && (
        <div className="mb-6 p-4 bg-emerald-50 rounded-lg flex flex-wrap gap-4">
          <select
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={filters.role}
            onChange={(e) => handleFilterChange("role", e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Candidate">Candidate</option>
            <option value="User">User</option>
          </select>
          <select
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={filters.specialty}
            onChange={(e) => handleFilterChange("specialty", e.target.value)}
          >
            <option value="">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrics">Pediatrics</option>
            {/* Add more specialties */}
          </select>
          <select
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="visited">Visited</option>
          </select>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-emerald-100 text-emerald-700">
            <tr>
              <th className="py-3 px-4 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedDoctors.length === doctors.length}
                  className="rounded text-emerald-500 focus:ring-emerald-500"
                />
              </th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp size={14} className="inline" />
                  ) : (
                    <ChevronDown size={14} className="inline" />
                  ))}
              </th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("role")}
              >
                Role{" "}
                {sortConfig.key === "role" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp size={14} className="inline" />
                  ) : (
                    <ChevronDown size={14} className="inline" />
                  ))}
              </th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("specialty")}
              >
                Specialty{" "}
                {sortConfig.key === "specialty" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp size={14} className="inline" />
                  ) : (
                    <ChevronDown size={14} className="inline" />
                  ))}
              </th>
              <th className="py-3 px-4 text-left">Appointment</th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp size={14} className="inline" />
                  ) : (
                    <ChevronDown size={14} className="inline" />
                  ))}
              </th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price{" "}
                {sortConfig.key === "price" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUp size={14} className="inline" />
                  ) : (
                    <ChevronDown size={14} className="inline" />
                  ))}
              </th>
              <th className="py-3 px-4 text-left">Patient</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedDoctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="hover:bg-emerald-50 transition duration-150"
              >
                <td className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedDoctors.includes(doctor.id)}
                    onChange={() => handleSelectDoctor(doctor.id)}
                    className="rounded text-emerald-500 focus:ring-emerald-500"
                  />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-emerald-700">
                        {doctor.name}
                      </p>
                      <p className="text-sm text-gray-500">{doctor.email}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(doctor.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm text-gray-500">
                          {doctor.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                    {doctor.role}
                  </span>
                </td>
                <td className="py-4 px-4">{doctor.specialty}</td>
                <td className="py-4 px-4">
                  <p className="font-medium">{doctor.appointmentDate}</p>
                  <p className="text-sm text-gray-500">
                    {doctor.availableTimes.join(", ")}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      doctor.status === "available"
                        ? "bg-green-100 text-green-800"
                        : doctor.status === "booked"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {doctor.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <p className="font-medium">${doctor.price}</p>
                  <p className="text-sm text-gray-500">
                    Profit: ${doctor.doctorProfit}
                  </p>
                </td>
                <td className="py-4 px-4">{doctor.patientName || "N/A"}</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button className="text-emerald-500 hover:text-emerald-600 transition duration-150">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-600 transition duration-150">
                      <Trash2 size={18} />
                    </button>
                    <button className="text-blue-500 hover:text-blue-600 transition duration-150">
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
