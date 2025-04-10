import React from "react";
import SurgeryDiagnosis from "./Diagnosis";
import SurgicalProcedures from "./Procedures";
import SurgeryBookingDetails from "./BookingDetails";

const SurgeryOrder = ({patientId}) => {
  return (
    <div className="full-screen-scrollable">
      <div className="h5">Surgery Order</div>
      <div>
        <SurgeryDiagnosis patientId={patientId} />
      </div>
      <div>
        <SurgicalProcedures patientId={patientId}/>
      </div>
      <div>
        <SurgeryBookingDetails patientId={patientId}/>
      </div>
    </div>
  );
};

export default SurgeryOrder;
