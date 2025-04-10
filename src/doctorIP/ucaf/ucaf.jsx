import React from "react";
import DiagnosisTable from "./finalDaignosis";
import DiagnosisChecklist from "./checkList";
import InvestigationsTable from "./Inverstigations";
import TreatmentTable from "./Treatment";
import UCAFForm from "./Form";
import { Vital } from "../objectiveData/vital/Vital";
import ChiefComplaint from "../subjectiveData/hopi/chiefComplaint";
import Investigation from "../plan/Investigation";
import Treatments from "../plan/Treatments";
import DisplayInvestigation from "../plan/Investigation/displayInvestigation";
import DisplayTreatment from "../plan/Treatment/displayTreatment";

const UCAF = ({ patientId }) => {
  return (
    <div className="full-screen-scrollable">
      <div>
        <Vital patientId={patientId} />
      </div>
      <div>
        <ChiefComplaint patientId={patientId} />
      </div>
      <div>
        <DiagnosisTable patientId={patientId} />
      </div>
      <div>
        <DiagnosisChecklist patientId={patientId} />
      </div>
      <div>
        <DisplayInvestigation patientId={patientId} />
      </div>
      <div>
        <DisplayTreatment patientId={patientId} />
      </div>
      <div>
        <UCAFForm patientId={patientId} />
      </div>
    </div>
  );
};

export default UCAF;
