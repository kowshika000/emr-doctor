import React from "react";
import SurgeryBookingList from "./surgeryBooking";
import IntraOpNotes from "./intraOpNotes";
import IntraOpCareForm from "./intraOpCareForm";
import MedicalFormList from "../components/medicalFormList";
import Vital from "../components/Vital";
import Fluid from "../components/Fluid";
import Medicine from "../components/Medicine";

const IntraOperative = () => {
  return (
    <div
      className="full-screen-scrollable"
     
    >
      <div className="h5">Intra-Operative</div>
      <div>
        <SurgeryBookingList />
      </div>
      <div>
        <IntraOpNotes />
      </div>
      <div>
        <IntraOpCareForm />
      </div>
      <div className="my-4">
        <MedicalFormList />
      </div>
      <div className="my-4">
        <Vital />
      </div>
      <div className="my-4">
        <Fluid />
      </div>
      <div className="my-4">
        <Medicine />
      </div>
    </div>
  );
};

export default IntraOperative;
