import React from "react";
import TreatementPlan from "./TreatementPlan";
import FollowUpPlan from "./FollowUpPlan";

const FollowUp = () => {
  return (
    <div className="full-screen-scrollable">
      <div>
        <TreatementPlan />
      </div>
      <div>
        <FollowUpPlan />
      </div>
    </div>
  );
};

export default FollowUp;
