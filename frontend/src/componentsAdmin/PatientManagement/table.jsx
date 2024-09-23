import React, { useState } from "react";
import {
  MessageSquare,
  Edit,
  Trash,
  ChevronDown,
  ChevronUp,
  Search,
  User,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PatientButton from "./patientbutton";

const patients = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  {
    id: 2,
    name: "islam",
    email: "islam@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  {
    id: 3,
    name: "islam",
    email: "islam@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  {
    id: 4,
    name: "islam",
    email: "islam@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  {
    id: 5,
    name: "islam",
    email: "islam@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  {
    id: 6,
    name: "islam",
    email: "islam@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  {
    id: 7,
    name: "islam",
    email: "islam@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  {
    id: 8,
    name: "islam",
    email: "islam@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  {
    id: 9,
    name: "islam",
    email: "islam@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  {
    id: 10,
    name: "islam",
    email: "islam@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  {
    id: 11,
    name: "islam",
    email: "islam@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  {
    id: 12,
    name: "islam",
    email: "islam@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  {
    id: 13,
    name: "islam",
    email: "islam@example.com",
    photo: "/api/placeholder/50/50",
    role: "Patient",
    active: true,
    medicalHistory: "Hypertension, Diabetes",
    dateOfBirth: "1985-05-15",
    phoneNumber: "+1 (555) 123-4567",
    gender: "Male",
    height: "180 cm",
    weight: "80 kg",
    bloodType: "A+",
  },
  // Add more patient data here
];

const PatientManagementTable = () => {
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;

  const filteredAndSortedPatients = patients
    .filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const pageCount = Math.ceil(
    filteredAndSortedPatients.length / patientsPerPage
  );
  const patientsOnCurrentPage = filteredAndSortedPatients.slice(
    (currentPage - 1) * patientsPerPage,
    currentPage * patientsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const togglePatientSelection = (patientId) => {
    setSelectedPatients((prevSelected) =>
      prevSelected.includes(patientId)
        ? prevSelected.filter((id) => id !== patientId)
        : [...prevSelected, patientId]
    );
  };

  const toggleAllPatients = () => {
    setSelectedPatients(
      selectedPatients.length === patients.length
        ? []
        : patients.map((p) => p.id)
    );
  };

  const toggleSort = (column) => {
    setSortColumn(column);
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const toggleRowExpand = (patientId) => {
    setExpandedRows((prev) =>
      prev.includes(patientId)
        ? prev.filter((id) => id !== patientId)
        : [...prev, patientId]
    );
  };

  const toggleActiveStatus = (patientId) => {
    // In a real application, you would update this in your backend
    console.log(`Toggling active status for patient ${patientId}`);
  };

  //     .filter(
  //       (patient) =>
  //         patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //     .sort((a, b) => {
  //       if (a[sortColumn] < b[sortColumn])
  //         return sortDirection === "asc" ? -1 : 1;
  //       if (a[sortColumn] > b[sortColumn])
  //         return sortDirection === "asc" ? 1 : -1;
  //       return 0;
  //     });

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br mt-[1rem] ml-[-14rem] w-[70rem] from-emerald-50 to-emerald-50 rounded-xl ">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-800 mb-4 sm:mb-0">
          Patient Management
        </h1>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-emerald-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
          <Search
            className="absolute left-3 top-2.5 text-emerald-400"
            size={20}
          />
        </div>
      </div>
      <PatientButton />
      <div className="bg-white mt-2 rounded-lg overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-emerald-200">
            <thead className="bg-emerald-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={
                      selectedPatients.length ===
                      filteredAndSortedPatients.length
                    }
                    onChange={toggleAllPatients}
                    className="form-checkbox h-5 w-5 text-emerald-500 rounded focus:ring-emerald-400"
                  />
                </th>
                {["Name", "Role", "Active", "Medical Info"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort(header.toLowerCase())}
                  >
                    <div className="flex items-center">
                      {header}
                      {sortColumn === header.toLowerCase() &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        ))}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-emerald-100">
              {patientsOnCurrentPage.map((patient) => (
                <React.Fragment key={patient.id}>
                  <tr className="hover:bg-emerald-50 transition-colors duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedPatients.includes(patient.id)}
                        onChange={() => togglePatientSelection(patient.id)}
                        className="form-checkbox h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={patient.photo}
                          alt=""
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {patient.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                        {patient.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={patient.active}
                            onChange={() => toggleActiveStatus(patient.id)}
                          />
                          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                          <div
                            className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${
                              patient.active
                                ? "transform translate-x-full bg-emerald-500"
                                : "bg-gray-200"
                            }`}
                          ></div>
                        </div>
                        <div className="ml-3 text-sm font-medium text-gray-700">
                          {patient.active ? "Active" : "Inactive"}
                        </div>
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => toggleRowExpand(patient.id)}
                        className="text-emerald-600 hover:text-emerald-800 transition-colors duration-150"
                      >
                        {expandedRows.includes(patient.id)
                          ? "Hide Details"
                          : "Show Details"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-emerald-600 hover:text-emerald-900 mr-3 transition-colors duration-150">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900 mr-3 transition-colors duration-150">
                        <Trash size={18} />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-150">
                        <MessageSquare size={18} />
                      </button>
                    </td>
                  </tr>
                  {expandedRows.includes(patient.id) && (
                    <tr className="bg-emerald-50">
                      <td colSpan="6" className="px-6 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center">
                            <Calendar
                              className="text-emerald-600 mr-2"
                              size={16}
                            />
                            <p>
                              <strong>Date of Birth:</strong>{" "}
                              {patient.dateOfBirth}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <User className="text-emerald-600 mr-2" size={16} />
                            <p>
                              <strong>Gender:</strong> {patient.gender}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Phone
                              className="text-emerald-600 mr-2"
                              size={16}
                            />
                            <p>
                              <strong>Phone:</strong> {patient.phoneNumber}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Height:</strong> {patient.height}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Weight:</strong> {patient.weight}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Blood Type:</strong> {patient.bloodType}
                            </p>
                          </div>
                          <div className="sm:col-span-3">
                            <p>
                              <strong>Medical History:</strong>{" "}
                              {patient.medicalHistory}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedPatients.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 shadow-lg">
            Message Selected ({selectedPatients.length})
          </button>
        </div>
      )}
      <div className="flex items-center space-x-2 mt-2 ">
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
};

export default PatientManagementTable;
