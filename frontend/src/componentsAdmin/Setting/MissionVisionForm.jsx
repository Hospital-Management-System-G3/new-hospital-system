import React, { useState, useEffect } from "react";
import { AlignLeft } from "lucide-react";
import axios from "axios";

const MissionVisionForm = () => {
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchMissionVision = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/info-about"
        );
        const { our_mission, our_vision } = response.data;
        setMission(our_mission);
        setVision(our_vision);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchMissionVision();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    try {
      await axios.put("http://localhost:5000/api/edit/info-about", {
        ourMission: mission,
        ourVision: vision,
      });
      setSuccess(true);
    } catch (err) {
      setError("Failed to update data");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
        <AlignLeft className="mr-2" size={20} />
        Mission & Vision
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="mission"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Our Mission
            </label>
            <textarea
              id="mission"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="3"
              placeholder="Enter your mission statement"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="vision"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Our Vision
            </label>
            <textarea
              id="vision"
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="3"
              placeholder="Enter your vision statement"
            ></textarea>
          </div>

          {success && (
            <p className="text-green-500 mb-4">
              Mission and Vision updated successfully!
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-800 transition duration-300"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default MissionVisionForm;
