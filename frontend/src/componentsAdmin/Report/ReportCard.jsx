import React, { useState } from "react";
import { Trash2, MessageCircle } from "lucide-react";

const ReportCard = ({ report, onDelete, onReply }) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleReply = () => {
    onReply(report.id, replyMessage);
    setReplyMessage("");
    setShowInput(false);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 mb-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {report.name}
          </h3>
          <p className="text-sm font-medium text-gray-500">{report.email}</p>
        </div>
        <p className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
          {report.date}
        </p>
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed">{report.message}</p>
      {showInput && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Type your reply here..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 w-full"
          />
          <button
            onClick={handleReply}
            className="mt-2 bg-emerald-600 text-white rounded-full px-4 py-1"
          >
            Send Reply
          </button>
        </div>
      )}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setShowInput((prev) => !prev)} // Toggle the input field
          className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
        >
          <MessageCircle size={18} className="mr-1" />
          <span className="text-sm font-medium">Reply</span>
        </button>
        <button
          onClick={() => onDelete(report.id)}
          className="flex items-center text-gray-400 hover:text-red-500 transition-colors duration-300"
        >
          <Trash2 size={18} className="mr-1" />
          <span className="text-sm font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
