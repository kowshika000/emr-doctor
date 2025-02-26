import React from "react";
import { CurrentPatient } from "./currentPatient";
import NextPatients from "./nextPatients";
import OpTab from "./opTab";

const PatientDetails = () => {
  return (
    <div
      className="d-flex w-100 p-2"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div
      >
        <NextPatients />
      </div>
      <div
        className="w-100"
        style={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        <CurrentPatient />
        <OpTab />
      </div>
    </div>
  );
};

export default PatientDetails;
