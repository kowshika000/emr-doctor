import React from "react";
import SurgeryBookingList from "./surgeryBooking";
import PACUNotes from "./pacuOpNotes";
import PACUCareForm from "./pacuOpCareForm";

const PACUData = ({patientId}) => {
  return (
    <div className="full-screen-scrollable">
      <div className="h5">PACU Data</div>
      <div>
        <SurgeryBookingList patientId={patientId}/>
      </div>
      <div>
        <PACUNotes patientId={patientId}/>
      </div>
      <div>
        <PACUCareForm patientId={patientId}/>
      </div>
    </div>
  );
};

export default PACUData;
