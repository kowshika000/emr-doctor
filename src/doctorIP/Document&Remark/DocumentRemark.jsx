import React from "react";
import ScannedDocuments from "./component/scannedDocuments";
import DocumentsIssued from "./component/DocumentsIssued";
import Remarks from "./component/Remarks";
import ConsentForms from "./component/consentforms";
import Handouts from "./component/Handouts";

const DocumentandRemarkIp = () => {
  return (
    <div className="full-screen-scrollable">
      <ScannedDocuments />
      <DocumentsIssued />
      <Remarks />
      <ConsentForms />
      <Handouts />
    </div>
  );
};

export default DocumentandRemarkIp;
