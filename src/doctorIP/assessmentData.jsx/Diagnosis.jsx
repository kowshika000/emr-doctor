import React from "react";
import DisplayDiagnosis from "./components/diagnosis/displayDiagnosis";
import DisplayManagementPlan from "./components/managementPlan/displayManagementPlan";
import DisplayMedication from "./components/medication/displayMedication";
import DisplayProvisionalDiagnosis from "./components/provisionalDiagnosis/displayProvisionalDiagnosis";

const DiagnosisIp = ({ appointmentId, patientId }) => {
  return (
    <div className="full-screen-scrollable">
      <DisplayDiagnosis appointmentId={appointmentId} patientId={patientId} />
      <DisplayManagementPlan
        appointmentId={appointmentId}
        patientId={patientId}
      />
      <DisplayMedication appointmentId={appointmentId} patientId={patientId} />
      <DisplayProvisionalDiagnosis
        appointmentId={appointmentId}
        patientId={patientId}
      />
    </div>
  );
};

export default DiagnosisIp;
