import React from "react";
import DisplayInvestigation from "./Investigation/displayInvestigation";

const Investigation = ({ patientId }) => {
  return (
    <div className="full-screen-scrollable">
      <DisplayInvestigation patientId={patientId} />
    </div>
  );
};

export default Investigation;
