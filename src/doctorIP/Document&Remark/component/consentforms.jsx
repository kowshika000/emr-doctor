import React, { useState } from "react";
import AddIssuedDocument from "./addIssuedDocuments";

const ConsentForms = () => {
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
      <div className=" mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h6>Consent Forms</h6>
          <div className="custom-btn" onClick={handleAddIssuedDocModalOpen}>
            Add Consent Form
          </div>
        </div>
        <div className="custom-container">{"No Consent Forms"}</div>
      </div>
      {addIssuedDocModal && (
        <AddIssuedDocument
          handleAddIssuedDocModalClose={handleAddIssuedDocModalClose}
          uploadDocuments={uploadDocuments}
          documentType={"Consent Forms"}
        />
      )}
    </div>
  );
};
export default ConsentForms;
