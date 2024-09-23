import React, { useState } from "react";
import {
  Search,
  Filter,
  MessageSquare,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
} from "lucide-react";

const NurseManagement = () => {
  const [selectedNurses, setSelectedNurses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: "",
    experience: "",
  });
  const nursesPerPage = 5; // Number of nurses to show per page

  const nurses = [
    {
      id: 1,
      name: "Emma Johnson",
      email: "emma@example.com",
      rating: 4.8,
      experience: "5 years",
      status: "Available",
    },
    {
      id: 2,
      name: "Michael Smith",
      email: "michael@example.com",
      rating: 4.5,
      experience: "3 years",
      status: "On Duty",
    },
    {
      id: 3,
      name: "Sophia Lee",
      email: "sophia@example.com",
      rating: 4.7,
      experience: "7 years",
      status: "On Leave",
    },
    {
      id: 4,
      name: "David Brown",
      email: "david@example.com",
      rating: 4.6,
      experience: "4 years",
      status: "Available",
    },
    {
      id: 5,
      name: "Olivia Davis",
      email: "olivia@example.com",
      rating: 4.4,
      experience: "2 years",
      status: "On Duty",
    },
    {
      id: 6,
      name: "Liam Wilson",
      email: "liam@example.com",
      rating: 4.9,
      experience: "6 years",
      status: "Available",
    },
    {
      id: 7,
      name: "Ava Martinez",
      email: "ava@example.com",
      rating: 4.3,
      experience: "1 year",
      status: "On Duty",
    },
    {
      id: 8,
      name: "James Anderson",
      email: "james@example.com",
      rating: 4.7,
      experience: "5 years",
      status: "On Leave",
    },
    {
      id: 9,
      name: "Isabella Thompson",
      email: "isabella@example.com",
      rating: 4.8,
      experience: "6 years",
      status: "Available",
    },
    {
      id: 10,
      name: "Ethan Garcia",
      email: "ethan@example.com",
      rating: 4.6,
      experience: "3 years",
      status: "On Duty",
    },
  ];

  const handleSelectNurse = (nurseId) => {
    setSelectedNurses((prev) =>
      prev.includes(nurseId)
        ? prev.filter((id) => id !== nurseId)
        : [...prev, nurseId]
    );
  };

  const handleSelectAll = () => {
    setSelectedNurses(
      selectedNurses.length === nurses.length
        ? []
        : nurses.map((nurse) => nurse.id)
    );
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredNurses = nurses
    .filter(
      (nurse) =>
        (nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nurse.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filters.rating === "" || nurse.rating >= parseFloat(filters.rating)) &&
        (filters.experience === "" ||
          parseInt(nurse.experience) >= parseInt(filters.experience))
    )
    .slice((currentPage - 1) * nursesPerPage, currentPage * nursesPerPage); // Pagination logic

  const pageCount = Math.ceil(
    nurses.filter(
      (nurse) =>
        (nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nurse.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filters.rating === "" || nurse.rating >= parseFloat(filters.rating)) &&
        (filters.experience === "" ||
          parseInt(nurse.experience) >= parseInt(filters.experience))
    ).length / nursesPerPage
  ); // Total number of pages

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < pageCount ? prev + 1 : prev));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "On Duty":
        return "bg-blue-100 text-blue-800";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 min-h-screen ml-[-14rem] min-w-[73rem]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-emerald-800 mb-8">
          Nurse Management
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search nurses..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-emerald-400" />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition duration-300 flex items-center font-medium"
              >
                <Filter className="h-5 w-5 mr-2" />
                {showFilters ? "Hide" : "Show"}
              </button>
              {selectedNurses.length > 0 && (
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 flex items-center font-medium">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Message ({selectedNurses.length})
                </button>
              )}
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 flex items-center font-medium">
                <Plus className="h-5 w-5 mr-2" />
                Add Nurse
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h2 className="text-lg font-semibold text-emerald-800 mb-3">
                Filters
              </h2>
              <div className="flex flex-wrap -mx-2">
                <div className="px-2 w-full sm:w-1/2 md:w-1/4 mb-4">
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Minimum Rating
                  </label>
                  <select
                    name="rating"
                    value={filters.rating}
                    onChange={handleFilterChange}
                    className="w-full p-2 border-2 border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="4.5">4.5 & Up</option>
                    <option value="4.0">4.0 & Up</option>
                    <option value="3.5">3.5 & Up</option>
                  </select>
                </div>
                <div className="px-2 w-full sm:w-1/2 md:w-1/4 mb-4">
                  <label className="block text-sm font-medium text-emerald-700 mb-1">
                    Minimum Experience (Years)
                  </label>
                  <select
                    name="experience"
                    value={filters.experience}
                    onChange={handleFilterChange}
                    className="w-full p-2 border-2 border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="1">1 Year & Up</option>
                    <option value="3">3 Years & Up</option>
                    <option value="5">5 Years & Up</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead>
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedNurses.length === nurses.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-4 text-left font-semibold text-emerald-800">
                  Name
                </th>
                <th className="p-4 text-left font-semibold text-emerald-800">
                  Email
                </th>
                <th className="p-4 text-left font-semibold text-emerald-800">
                  Rating
                </th>
                <th className="p-4 text-left font-semibold text-emerald-800">
                  Experience
                </th>
                <th className="p-4 text-left font-semibold text-emerald-800">
                  Status
                </th>
                <th className="p-4 text-left font-semibold text-emerald-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredNurses.map((nurse) => (
                <tr key={nurse.id}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedNurses.includes(nurse.id)}
                      onChange={() => handleSelectNurse(nurse.id)}
                    />
                  </td>
                  <td className="p-4">{nurse.name}</td>
                  <td className="p-4">{nurse.email}</td>
                  <td className="p-4">{nurse.rating}</td>
                  <td className="p-4">{nurse.experience}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        nurse.status
                      )}`}
                    >
                      {nurse.status}
                    </span>
                  </td>
                  <td className="p-4 flex space-x-2">
                    <button className="text-emerald-600 hover:text-emerald-800">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={goToPreviousPage}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-emerald-800 font-semibold">
              Page {currentPage} of {pageCount}
            </span>
            <button
              onClick={goToNextPage}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              disabled={currentPage === pageCount}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseManagement;
