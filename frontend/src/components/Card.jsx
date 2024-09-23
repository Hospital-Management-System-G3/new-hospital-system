 
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Card({ username, profilepic, role }) {
  const navigate = useNavigate();
  const imageUrl = profilepic || 'https://via.placeholder.com/150';

  const handleViewDetails = () => {
    navigate(`/details/${username}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
      <div className="relative">
        <img
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          src={imageUrl}
          alt={username}
        />
        <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 rounded-bl-lg text-sm font-semibold">
          {role}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-900">{username}</h2>
        <button
          onClick={handleViewDetails}
          className="w-full bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          View Details
        </button>
      </div>
    </div>
  );
};
export default Card;