import React from "react";
import DoctorIpDashboard from "./landingPage/doctorIpDashboard";
import "./components/component.css";

const DoctorIP = ({ navigate }) => {
  return (
    <div style={{ flexDirection: "row" }}>
      <DoctorIpDashboard navigate={navigate} />
    </div>
  );
};

export default DoctorIP;
