import React from "react";
import DoctorOpDashboard from "./landingPage/doctorOpDashboard";
import "./component/opcomponent.css";

const DoctorOp = ({ navigate, doctorId }) => {
  return (
    <div className="w-100">
      <DoctorOpDashboard navigate={navigate} doctorId={doctorId} />
    </div>
  );
};
export default DoctorOp;
