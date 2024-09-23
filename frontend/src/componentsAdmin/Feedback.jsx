import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Mail,
  MessageCircle,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Feedback = () => {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch feedback data from the API
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contacts");
        if (!response.ok) {
          throw new Error("Failed to fetch feedback data");
        }
        const data = await response.json();
        // Assuming data is an array of feedback items
        setFeedbackItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeedback();
  }, []);

  const filteredItems = feedbackItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-emerald-800 mb-12 ml-[-12rem]">
          User Feedback
        </h1>
        <div className="mb-8 ml-[-12rem]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="space-y-8 ml-[-20rem] mr-[-6rem]">
          {currentItems.map((item) => (
            <FeedbackItem
              key={item.contact_id}
              {...item}
              contact_id={item.contact_id}
            />
          ))}
        </div>
        <div className="mt-8 flex ml-[-6rem] mr-[6rem] justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Next
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FeedbackItem = ({
  name,
  email,
  created_at,
  contact_message,
  contact_id,
}) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleReply = async () => {
    setIsSending(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/contacts/${contact_id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ replyMessage }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send reply");
      }

      // Handle success (e.g., show a success message or reset the input)
      alert("Reply sent successfully!");
      setReplyMessage("");
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Failed to send reply: " + error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <User className="h-5 w-5 text-emerald-500 mr-2" />
            <span className="font-semibold text-gray-800">{name}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(created_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <Mail className="h-5 w-5 mr-2 text-emerald-500" />
          <span>{email}</span>
        </div>
        <div className="mt-4">
          <MessageCircle className="h-5 w-5 text-emerald-500 float-left mr-2 mt-1" />
          <p className="text-gray-700 leading-relaxed">{contact_message}</p>
        </div>
      </div>
      <div className="px-6 py-4 bg-emerald-50">
        <textarea
          rows="3"
          placeholder="Type your reply here..."
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={handleReply}
          disabled={isSending || !replyMessage}
          className="mt-2 w-full text-white bg-emerald-600 hover:bg-emerald-700 font-medium py-2 rounded-md"
        >
          {isSending ? "Sending..." : "Reply to feedback"}
        </button>
      </div>
    </div>
  );
};

export default Feedback;
