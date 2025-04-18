import React from "react";
import LifeSupportTbl from "./Table";

const LifeSupportData = ({patientId}) => {
  return (
    <div className="full-screen-scrollable">
      <div>
        <LifeSupportTbl patientId={patientId} />
      </div>
    </div>
  );
};

export default LifeSupportData;
