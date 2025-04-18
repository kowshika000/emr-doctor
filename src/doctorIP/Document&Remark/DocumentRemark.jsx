import React from "react";
import ScannedDocuments from "./component/scannedDocuments";
import DocumentsIssued from "./component/DocumentsIssued";
import Remarks from "./component/Remarks";
import ConsentForms from "./component/consentforms";
import Handouts from "./component/Handouts";

const DocumentandRemarkIp = ({patientId}) => {
  return (
    <div className="full-screen-scrollable">
      <ScannedDocuments patientId={patientId} />
      <DocumentsIssued patientId={patientId} />
      <Remarks patientId={patientId} />
      <ConsentForms patientId={patientId} />
      <Handouts patientId={patientId} />
    </div>
  );
};

export default DocumentandRemarkIp;
