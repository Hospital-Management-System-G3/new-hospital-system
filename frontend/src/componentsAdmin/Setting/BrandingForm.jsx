import React, { useState, useEffect } from "react";
import { Image, Palette } from "lucide-react";
import axios from "axios";

const BrandingForm = () => {
  const [logoFile, setLogoFile] = useState(null); // Store the file here
  const [logo, setLogo] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff");

  // Fetch initial settings from the API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/settings/get"
        );
        const data = response.data;
        if (data) {
          setLogo(
            data.logo_image ? `http://localhost:5000/${data.logo_image}` : null
          );
          setBgColor(data.background_color || "#ffffff");
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file); // Store the file
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (logoFile) {
      formData.append("logo_image", logoFile);
    }
    formData.append("background_color", bgColor);

    try {
      const response = await axios.put(
        "http://localhost:5000/api/settings/edit",
        formData
      );
      if (response.status === 200) {
        alert("Branding updated successfully!");
      }
    } catch (error) {
      console.error(
        "Error updating branding:",
        error.response ? error.response.data : error
      );
      alert("Error updating branding.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
        <Image className="mr-2" size={20} />
        Branding
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="logo"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Logo
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="logo-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              {logo ? (
                <img
                  src={logo}
                  alt="Logo Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Image className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}
              <input
                id="logo-upload"
                type="file"
                className="hidden"
                onChange={handleLogoChange}
                accept="image/*"
              />
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="bgColor"
            className="block text-sm font-medium text-gray-600 mb-1 flex items-center"
          >
            <Palette className="mr-1" size={16} />
            Background Color
          </label>
          <div className="flex items-center">
            <input
              type="color"
              id="bgColor"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-12 h-12 rounded-md border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="ml-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="#RRGGBB"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-800 transition duration-300"
        >
          Update Branding
        </button>
      </form>
    </div>
  );
};

export default BrandingForm;
