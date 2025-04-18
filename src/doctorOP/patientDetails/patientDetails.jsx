import React from "react";
import { CurrentPatient } from "./currentPatient";
import NextPatients from "./nextPatients";
import OpTab from "./opTab";
// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PatientDetails = () => {
  // const { id } = useParams();
  const { patientData } = useSelector(
    (state) => state?.docEmr?.opPatientDetail
  );
  const patientId = patientData?.[0]?.patientId;
  const appointmentId = patientData?.[0]?.appointmentId;
  return (
    <div
      className="d-flex w-100"
      style={{
        // height: "100vh",
        overflow: "hidden",
      }}
    >
      <div>
        <NextPatients />
      </div>
      <div
        className="w-100"
        style={{
          // height: "100vh",
          overflow: "auto",
        }}
      >
        <CurrentPatient
          patientId={patientId}
          appointmentId={appointmentId}
          patientData={patientData}
        />
        <OpTab patientId={patientId} />
      </div>
    </div>
  );
};

export default PatientDetails;
