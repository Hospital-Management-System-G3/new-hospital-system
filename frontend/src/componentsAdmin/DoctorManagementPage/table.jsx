import React, { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  MessageSquare,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaUserPlus, FaFilePdf, FaFileExcel } from "react-icons/fa";

const doctors = [
  {
    id: 1,
    name: "Dr. Gladys Jones",
    email: "gladys@example.com",
    role: "Doctor",
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
    role: "Doctor",
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
  {
    id: 3,
    name: "Dr. Ahmed Al-Farsi",
    email: "ahmed@example.com",
    role: "Doctor",
    specialty: "Dermatology",
    appointmentDate: "2024-09-27",
    availableTimes: ["08:00", "12:00"],
    status: "visited",
    price: 160,
    doctorProfit: 130,
    patientName: "Fatima Ali",
    photo: "/api/placeholder/50/50",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Dr. Layla Nasser",
    email: "layla@example.com",
    role: "Doctor",
    specialty: "Gynecology",
    appointmentDate: "2024-09-28",
    availableTimes: ["09:30", "14:30"],
    status: "available",
    price: 170,
    doctorProfit: 140,
    patientName: "",
    photo: "/api/placeholder/50/50",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Dr. Omar Al-Hassan",
    email: "omar@example.com",
    role: "Doctor",
    specialty: "Orthopedics",
    appointmentDate: "2024-09-29",
    availableTimes: ["11:00", "15:00"],
    status: "booked",
    price: 190,
    doctorProfit: 150,
    patientName: "Sara Khan",
    photo: "/api/placeholder/50/50",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Dr. Amina Suleiman",
    email: "amina@example.com",
    role: "Doctor",
    specialty: "Neurology",
    appointmentDate: "2024-09-30",
    availableTimes: ["10:30", "13:30"],
    status: "available",
    price: 200,
    doctorProfit: 160,
    patientName: "",
    photo: "/api/placeholder/50/50",
    rating: 4.9,
  },
  {
    id: 7,
    name: "Dr. Samir Khoury",
    email: "samir@example.com",
    role: "Doctor",
    specialty: "Oncology",
    appointmentDate: "2024-10-01",
    availableTimes: ["08:00", "12:00"],
    status: "booked",
    price: 250,
    doctorProfit: 200,
    patientName: "Mohamed Ali",
    photo: "/api/placeholder/50/50",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Dr. Noor Youssef",
    email: "noor@example.com",
    role: "Doctor",
    specialty: "Endocrinology",
    appointmentDate: "2024-10-02",
    availableTimes: ["09:00", "14:00"],
    status: "visited",
    price: 180,
    doctorProfit: 140,
    patientName: "Zara Ahmed",
    photo: "/api/placeholder/50/50",
    rating: 4.5,
  },
  {
    id: 9,
    name: "Dr. Fatima Al-Mansoori",
    email: "fatima@example.com",
    role: "Doctor",
    specialty: "Psychiatry",
    appointmentDate: "2024-10-03",
    availableTimes: ["10:00", "13:00"],
    status: "available",
    price: 220,
    doctorProfit: 180,
    patientName: "",
    photo: "/api/placeholder/50/50",
    rating: 4.6,
  },
  {
    id: 10,
    name: "Dr. Zainab Asad",
    email: "zainab@example.com",
    role: "Doctor",
    specialty: "Gastroenterology",
    appointmentDate: "2024-10-04",
    availableTimes: ["11:00", "15:00"],
    status: "booked",
    price: 175,
    doctorProfit: 135,
    patientName: "Ali Saeed",
    photo: "/api/placeholder/50/50",
    rating: 4.4,
  },
  {
    id: 11,
    name: "Dr. Khaled Rami",
    email: "khaled@example.com",
    role: "Doctor",
    specialty: "Urology",
    appointmentDate: "2024-10-05",
    availableTimes: ["09:00", "12:00"],
    status: "available",
    price: 190,
    doctorProfit: 150,
    patientName: "",
    photo: "/api/placeholder/50/50",
    rating: 4.7,
  },
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5; // Set the number of doctors per page

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

  // Calculate total pages and current doctors to display
  const pageCount = Math.ceil(sortedDoctors.length / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = sortedDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount));
  };

  return (
    <div className="container mx-auto p-6 bg-emerald-50 rounded-lg  mr-[19rem] ml-20">
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
        <div className="flex justify-items-center gap-4">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transform hover:scale-110 transition duration-300 ease-in-out">
            <FaFilePdf size={20} /> {/* Icon for downloading PDF */}
          </button>
          {/* Download Excel Button */}
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transform hover:scale-110 transition duration-300 ease-in-out">
            <FaFileExcel size={20} /> {/* Icon for downloading Excel */}
          </button>{" "}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition duration-300"
          >
            <Filter size={18} />
            <span>Filter</span>
          </button>

          {selectedDoctors.length > 0 && (
            <button className="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition duration-300">
              <MessageSquare size={18} />
              <span>Message Selected ({selectedDoctors.length})</span>
            </button>
          )}

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
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Specialty</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Patient</th>
              <th className="py-3 px-4 text-left">Appointment Date</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDoctors.map((doctor) => (
              <tr key={doctor.id} className="border-t">
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedDoctors.includes(doctor.id)}
                    onChange={() => handleSelectDoctor(doctor.id)}
                    className="rounded text-emerald-500 focus:ring-emerald-500"
                  />
                </td>
                <td className="py-3 px-4">
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
                <td className="py-3 px-4">
                  {" "}
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                    {doctor.role}
                  </span>
                </td>
                <td className="py-3 px-4">{doctor.specialty}</td>
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
                <td className="py-3 px-4">{doctor.patientName || "N/A"}</td>
                <td className="py-4 px-4">
                  <p className="font-medium">{doctor.appointmentDate}</p>
                  <p className="text-sm text-gray-500">
                    {doctor.availableTimes.join(", ")}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <p className="font-medium">${doctor.price}</p>
                  <p className="text-sm text-gray-500">
                    Profit: ${doctor.doctorProfit}
                  </p>
                </td>
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

      {/* Pagination */}
      <div className="flex items-center space-x-2 mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-emerald-100 text-emerald-700 disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {pageCount}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === pageCount}
          className="p-2 rounded-full bg-emerald-100 text-emerald-700 disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
