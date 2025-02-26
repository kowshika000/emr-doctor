import React from "react";
import DisplayDiagnosis from "./components/diagnosis/displayDiagnosis";
import DisplayManagementPlan from "./components/managementPlan/displayManagementPlan";
import DisplayMedication from "./components/medication/displayMedication";
import DisplayProvisionalDiagnosis from "./components/provisionalDiagnosis/displayProvisionalDiagnosis";

const DiagnosisIp = () => {
  return (
    <div className="full-screen-scrollable"> 
      <DisplayDiagnosis />
      <DisplayManagementPlan />
      <DisplayMedication />
      <DisplayProvisionalDiagnosis />
    </div>
  );
};

export default DiagnosisIp;
















