import React from "react";
import DisplayTreatment from "./Treatment/displayTreatment";

const Treatments = ({patientId}) => {
  return (
    <div className="full-screen-scrollable">
      <DisplayTreatment patientId={patientId} />
    </div>
  );
};

export default Treatments;
