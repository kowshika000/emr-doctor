import React from "react";
import Examination from "./examination/examination";

const ExaminationIp = ({ patientId }) => {
  return (
    <div className="full-screen-scrollable">
      <Examination patientId={patientId} />
    </div>
  );
};

export default ExaminationIp;
