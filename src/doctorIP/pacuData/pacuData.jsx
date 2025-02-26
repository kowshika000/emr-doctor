import React from "react";
import SurgeryBookingList from "./surgeryBooking";
import PACUNotes from "./pacuOpNotes";
import PACUCareForm from "./pacuOpCareForm";

const PACUData = () => {
  return (
    <div className="full-screen-scrollable">
      <div className="h5">PACU Data</div>
      <div>
        <SurgeryBookingList />
      </div>
      <div>
        <PACUNotes />
      </div>
      <div>
        <PACUCareForm />
      </div>
    </div>
  );
};

export default PACUData;
