import React from "react";
import { Vital } from "./vital/Vital";
import Fluid from "./vital/fluid";
// import IpCrud from "../components/IpCRUD";
import PainRate from "./vital/painRate";

const VitalSigns = ({appointmentId, patientId}) => {
  return (
    <div className="full-screen-scrollable">
      <Vital appointmentId={appointmentId} patientId={patientId} />
      <Fluid appointmentId={appointmentId} patientId={patientId}/>
      {/* <IpCrud type={"Pain Rate"} /> */}
      <PainRate appointmentId={appointmentId} patientId={patientId}/>
    </div>
  );
};

export default VitalSigns;
