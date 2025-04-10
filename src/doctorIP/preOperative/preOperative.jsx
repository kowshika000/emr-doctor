import React from "react";
import SurgeryBookingList from "./surgeryBooking";
import PreOpNotes from "./preOpNotes";
import PreOpCareForm from "./preOpCareForm";

const PreOperative = ({patientId}) => {
  return (
    <div className="full-screen-scrollable">
      <div className="h5">Pre-Operative</div>
      <div>
        <SurgeryBookingList patientId={patientId} />
      </div>
      <div>
        <PreOpNotes patientId={patientId} />
      </div>
      <div>
        <PreOpCareForm patientId={patientId} />
      </div>
    </div>
  );
};

export default PreOperative;
