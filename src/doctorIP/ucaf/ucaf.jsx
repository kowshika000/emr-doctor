import React from "react";
import VitalHistoryTable from "./Vitals";
import CheifComplaints from "./CheifComplaints";
import DiagnosisTable from "./finalDaignosis";
import DiagnosisChecklist from "./checkList";
import InvestigationsTable from "./Inverstigations";
import TreatmentTable from "./Treatment";
import UCAFForm from "./Form";
import { Vital } from "../objectiveData/vital/Vital";
import ChiefComplaint from "../subjectiveData/hopi/chiefComplaint";

const UCAF = ({patientId}) => {
  return (
    <div className="full-screen-scrollable">
      <div>
        <Vital patientId={patientId} />
      </div>
      <div>
        <ChiefComplaint/>
      </div>
      <div>
        <DiagnosisTable/>
      </div>
      <div>
        <DiagnosisChecklist/>
      </div>
      <div>
        <InvestigationsTable/>
      </div>
      <div>
        <TreatmentTable/>
      </div>
      <div>
        <UCAFForm/>
      </div>
    </div>
  );
};

export default UCAF;
