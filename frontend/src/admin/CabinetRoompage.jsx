import React from "react";
import MedicationForm from "../componentsAdmin/MedicationForm";
import CabinetRoom from "../componentsAdmin/CabinetRoom";

const NurseManagementpage = () => {
  return (
    <div className="mr-[14rem]">
      <CabinetRoom />
      <MedicationForm />
    </div>
  );
};

export default NurseManagementpage;
