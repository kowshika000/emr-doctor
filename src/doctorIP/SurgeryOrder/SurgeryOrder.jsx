import React from "react";
import SurgeryDiagnosis from "./Diagnosis";
import SurgicalProcedures from "./Procedures";
import SurgeryBookingDetails from "./BookingDetails";

const SurgeryOrder = () => {
  return (
    <div className="full-screen-scrollable">
      <div className="h5">Surgery Order</div>
      <div>
        <SurgeryDiagnosis />
      </div>
      <div>
        <SurgicalProcedures />
      </div>
      <div>
        <SurgeryBookingDetails />
      </div>
    </div>
  );
};

export default SurgeryOrder;
