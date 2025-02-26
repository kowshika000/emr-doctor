import React from "react";
import Consultation from "./Consultation";
import Progress from "./ProgressNotes";
import Discharge from "./Discharge";

const PhysicianNotes = () => {
  return (
    <div className="full-screen-scrollable">
      <h6>Admission Notes</h6>
      <Consultation />
      <Progress />
      <Discharge />
    </div>
  );
};

export default PhysicianNotes;
