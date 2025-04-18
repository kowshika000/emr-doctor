import React from "react";
import { Vital } from "./vital/Vital";
import Fluid from "./vital/fluid";
import PainRate from "./vital/painRate";

const VitalSigns = ({ patientId }) => {
  return (
    <div className="full-screen-scrollable">
      <Vital patientId={patientId} />
      <Fluid patientId={patientId} />
      <PainRate patientId={patientId} />
    </div>
  );
};

export default VitalSigns;
