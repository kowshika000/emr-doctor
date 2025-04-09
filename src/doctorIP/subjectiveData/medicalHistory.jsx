import React from "react";
import DisplayMdlHistory from "./medicalHistory/DisplayMdlHistory";

const MedicalHistory = ({ patientId, appointmentId }) => {
  return (
    <div className="full-screen-scrollable">
      <DisplayMdlHistory patientId={patientId} appointmentId={appointmentId} />
    </div>
  );
};

export default MedicalHistory;
