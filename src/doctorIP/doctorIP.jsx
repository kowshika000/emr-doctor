import React from "react";
import DoctorIpDashboard from "./landingPage/doctorIpDashboard";
import "./components/component.css";

const DoctorIP = ({ navigate , doctorId}) => {
  return (
    <div style={{ flexDirection: "row" }}>
      <DoctorIpDashboard navigate={navigate} doctorId={doctorId} />
    </div>
  );
};

export default DoctorIP;
