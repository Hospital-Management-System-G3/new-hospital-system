import React, { useState } from "react";
import {
  FaPills,
  FaSyringe,
  FaPrescriptionBottleAlt,
  FaCapsules,
} from "react-icons/fa"; // Additional medical icons

const MedicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dosage_form: "",
    quantity_available: "",
    prescription_required: false,
    icon: "pill",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Send data to server or perform other actions
  };

  // Icons and Emojis
  const icons = {
    pill: "💊",
    syringe: "💉",
    bottle: "🧴",
    bandage: "🩹",
    capsules: FaCapsules,
    prescription: FaPrescriptionBottleAlt,
  };

  return (
    <div className="bg-emerald-50 mb-24">
      <div className="max-w-4xl mx-auto mt-10 p-8  rounded-lg ">
        <h2 className="text-3xl font-bold mb-8 text-emerald-600">
          Medication Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-emerald-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-emerald-600"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., antibiotic, painkiller, vitamin"
                className="mt-1 block w-full rounded-md border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="dosage_form"
                className="block text-sm font-medium text-emerald-600"
              >
                Dosage Form
              </label>
              <input
                type="text"
                id="dosage_form"
                name="dosage_form"
                value={formData.dosage_form}
                onChange={handleChange}
                placeholder="e.g., 500mg, 10ml"
                className="mt-1 block w-full rounded-md border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="quantity_available"
                className="block text-sm font-medium text-emerald-600"
              >
                Quantity Available
              </label>
              <input
                type="number"
                id="quantity_available"
                name="quantity_available"
                value={formData.quantity_available}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="prescription_required"
                name="prescription_required"
                checked={formData.prescription_required}
                onChange={handleChange}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-emerald-300 rounded"
              />
              <label
                htmlFor="prescription_required"
                className="ml-2 block text-sm text-emerald-600"
              >
                Prescription Required
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-600 mb-2">
                Select Icon
              </label>
              <div className="flex space-x-4">
                {Object.entries(icons).map(([key, Icon]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, icon: key }))
                    }
                    className={`p-2 rounded-full ${
                      formData.icon === key
                        ? "bg-emerald-500 text-white"
                        : "bg-emerald-200 text-emerald-600"
                    }`}
                  >
                    {typeof Icon === "string" ? Icon : <Icon size={24} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MedicationForm;
