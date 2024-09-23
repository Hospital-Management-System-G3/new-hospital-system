import React from "react";
import MissionVisionForm from "../componentsAdmin/Setting/MissionVisionForm";
import ContactInfoForm from "../componentsAdmin/Setting/ContactInfoForm";
import BrandingForm from "../componentsAdmin/Setting/BrandingForm";

const Settings = () => {
  return (
    <div className="container mx-auto p-6  min-h-screen mr-[25rem] ml-[11rem] ">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        System Settings
      </h1>
      <div className="flex flex-col space-y-6 ">
        <MissionVisionForm />
        <ContactInfoForm />
        <BrandingForm />
      </div>
    </div>
  );
};

export default Settings;
