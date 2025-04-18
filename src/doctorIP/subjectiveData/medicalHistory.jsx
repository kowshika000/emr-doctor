import React from "react";
import DisplayMdlHistory from "./medicalHistory/DisplayMdlHistory";

const MedicalHistory = ({ patientId }) => {
  return (
    <div className="full-screen-scrollable">
      <DisplayMdlHistory patientId={patientId} />
    </div>
  );
};

export default MedicalHistory;
