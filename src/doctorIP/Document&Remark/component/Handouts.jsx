import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // This includes Popper.js which Bootstrap needs
import React, { useState } from "react";
import AddIssuedDocument from "./addIssuedDocuments";

const Handouts = () => {
  const [addHandoutModal, setAddHandoutModal] = useState(false);

  const handleAddIssuedDocModalOpen = () => {
    setAddHandoutModal(true);
  };

  const handleAddIssuedDocModalClose = () => {
    setAddHandoutModal(false);
  };

  const uploadDocuments = (values) => {
    console.log(values, "uploadDocuments values ");
  };

  return (
    <div>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h6>Handouts</h6>
          <div className="custom-btn" onClick={handleAddIssuedDocModalOpen}>
            Add Handouts
          </div>
        </div>

        <div className="custom-container">{"No Handouts"}</div>
      </div>
      {addHandoutModal && (
        <AddIssuedDocument
          handleAddIssuedDocModalClose={handleAddIssuedDocModalClose}
          uploadDocuments={uploadDocuments}
          documentType={"Handouts"}
        />
      )}
    </div>
  );
};
export default Handouts;
