import React from "react";
import VitalHistoryTable from "./Vitals";
import CheifComplaints from "./CheifComplaints";
import DiagnosisTable from "./finalDaignosis";
import DiagnosisChecklist from "./checkList";
import InvestigationsTable from "./Inverstigations";
import TreatmentTable from "./Treatment";
import UCAFForm from "./Form";

const UCAF = () => {
  return (
    <div className="full-screen-scrollable">
      <div>
        <VitalHistoryTable />
      </div>
      <div>
        <CheifComplaints/>
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
