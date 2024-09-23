import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import ReportCard from "../componentsAdmin/Report/ReportCard";
import Pagination from "../componentsAdmin/Report/Pagination";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const reportsPerPage = 5;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback");
        const data = response.data;

        const transformedReports = data.map((item) => ({
          id: item.feedback_id,
          name: item.username,
          email: item.email,
          message: item.feedback_message,
          date: new Date(item.created_at).toLocaleDateString(),
          status: "pending",
        }));

        setReports(transformedReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || report.status === statusFilter)
  );

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const handleApprove = (id) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, status: "approved" } : report
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/feedback/${id}`
      );
      if (response.status === 200) {
        setReports(reports.filter((report) => report.id !== id));
        alert("Report deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
      alert(
        "Failed to delete report: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const handleReply = async (id, replyMessage) => {
    if (!replyMessage) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback/reply",
        {
          feedbackId: id,
          replyMessage: replyMessage,
        }
      );
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Error sending reply:", error);
      alert(
        "Failed to send reply: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-emerald-50 min-h-screen ml-[-14rem] ">
      <div className="container mx-auto px-4 py-8 w-[60rem]">
        <h1 className="text-4xl font-bold mb-8 text-center text-emerald-800">
          Report Dashboard
        </h1>
        <div className="mb-6 flex space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400"
              size={20}
            />
          </div>
        </div>
        {currentReports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onApprove={handleApprove}
            onDelete={handleDelete}
            onReply={handleReply}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ReportPage;
