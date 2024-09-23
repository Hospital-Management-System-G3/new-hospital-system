import React from "react";
import img from "/src/assets/admin.jpeg";

const WelcomeCard = () => (
  <div className="bg-white rounded-2xl p-6 mb-8 flex items-center justify-between shadow-sm">
    <div>
      <h1 className="text-2xl font-bold mb-2">Hello, islam omar</h1>
      <p className="text-gray-600">This is your dashboard 😄!</p>
      <a href="#" className="text-emerald-600 font-semibold mt-2 inline-block">
        Read more →
      </a>
    </div>
    <img
      src={img}
      alt="admin"
      className="w-32 h-32 object-cover rounded-full"
    />
  </div>
);

export default WelcomeCard;
