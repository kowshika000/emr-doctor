import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // This includes Popper.js which Bootstrap needs
import React, { useState } from "react";
import AddIssuedDocument from "./addIssuedDocuments";

const DocumentsIssued = () => {
  const [addIssuedDocModal, setAddIssuedDocModal] = useState(false);

  const handleAddIssuedDocModalOpen = () => {
    setAddIssuedDocModal(true);
  };

  const handleAddIssuedDocModalClose = () => {
    setAddIssuedDocModal(false);
  };

  const uploadDocuments = (values) => {
    console.log(values, "uploadDocuments values ");
  };

  return (
    <div>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h6>Documents Issued</h6>
          <div className="custom-btn" onClick={handleAddIssuedDocModalOpen}>
            Issue Documents
          </div>
        </div>
        <div className="custom-container">{"No Documents"}</div>
      </div>
      {addIssuedDocModal && (
        <AddIssuedDocument
          handleAddIssuedDocModalClose={handleAddIssuedDocModalClose}
          uploadDocuments={uploadDocuments}
          documentType={"Issued Documents"}
        />
      )}
    </div>
  );
};
export default DocumentsIssued;
