import React from "react";
import SurgeryBookingList from "./surgeryBooking";
import PreOpNotes from "./preOpNotes";
import PreOpCareForm from "./preOpCareForm";

const PreOperative = () => {
  return (
    <div className="full-screen-scrollable">
      <div className="h5">Pre-Operative</div>
      <div>
        <SurgeryBookingList />
      </div>
      <div>
        <PreOpNotes />
      </div>
      <div>
        <PreOpCareForm />
      </div>
    </div>
  );
};

export default PreOperative;
