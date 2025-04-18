import React from "react";
import TreatementPlan from "./TreatementPlan";
import FollowUpPlan from "./FollowUpPlan";

const FollowUp = ({ patientId }) => {
  return (
    <div className="full-screen-scrollable">
      <div>
        <TreatementPlan patientId={patientId} />
      </div>
      <div>
        <FollowUpPlan patientId={patientId} />
      </div>
    </div>
  );
};

export default FollowUp;
