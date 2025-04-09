import React from "react";
import Consultation from "./Consultation";
import Progress from "./ProgressNotes";
import Discharge from "./Discharge";

const PhysicianNotes = ({ patientId }) => {
  return (
    <div className="full-screen-scrollable">
      <h6>Admission Notes</h6>
      <Consultation patientId={patientId} />
      <Progress patientId={patientId}/>
      <Discharge patientId={patientId}/>
    </div>
  );
};

export default PhysicianNotes;
