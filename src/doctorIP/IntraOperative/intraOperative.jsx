import React from "react";
import SurgeryBookingList from "./surgeryBooking";
import IntraOpNotes from "./intraOpNotes";
import IntraOpCareForm from "./intraOpCareForm";
import MedicalFormList from "../components/medicalFormList";
import Vital from "../components/Vital";
import Fluid from "../components/Fluid";
import Medicine from "../components/Medicine";

const IntraOperative = ({ patientId }) => {
  return (
    <div className="full-screen-scrollable">
      <div className="h5">Intra-Operative</div>
      <div>
        <SurgeryBookingList patientId={patientId} />
      </div>
      <div>
        <IntraOpNotes patientId={patientId} />
      </div>
      <div>
        <IntraOpCareForm patientId={patientId} />
      </div>
      <div className="my-4">
        <MedicalFormList patientId={patientId} />
      </div>
      <div className="my-4">
        <Vital patientId={patientId} />
      </div>
      <div className="my-4">
        <Fluid patientId={patientId} />
      </div>
      <div className="my-4">
        <Medicine patientId={patientId} />
      </div>
    </div>
  );
};

export default IntraOperative;
