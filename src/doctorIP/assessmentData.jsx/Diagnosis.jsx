import React from "react";
import DisplayDiagnosis from "./components/diagnosis/displayDiagnosis";
import DisplayMedication from "./components/medication/displayMedication";
import DisplayProvisionalDiagnosis from "./components/provisionalDiagnosis/displayProvisionalDiagnosis";
import MangementPlan from "./components/managementPlan/managementPlan";

const DiagnosisIp = ({ patientId }) => {
  return (
    <div className="full-screen-scrollable">
      <DisplayDiagnosis patientId={patientId} />
      <MangementPlan patientId={patientId} />
      <DisplayMedication patientId={patientId} />
      <DisplayProvisionalDiagnosis patientId={patientId} />
    </div>
  );
};

export default DiagnosisIp;
