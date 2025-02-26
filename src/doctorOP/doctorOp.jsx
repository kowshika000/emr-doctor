import React from "react";
import DoctorOpDashboard from "./landingPage/doctorOpDashboard";
import "./component/opcomponent.css";

const DoctorOp = ({ navigate }) => {
  return (
    <div className="w-100">
      <DoctorOpDashboard navigate={navigate} />
    </div>
  );
};
export default DoctorOp;
