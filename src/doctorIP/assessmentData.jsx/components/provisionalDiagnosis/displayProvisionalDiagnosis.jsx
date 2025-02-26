import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import AddProvisionalDiagnosis from "./addProvisionalDiagnosis";
import ProvisionalDiagnosisHistory from "./provisionalDiagnosisHistory";
import CustomTable from "../../../components/Table";

function DisplayProvisionalDiagnosis() {
  const [addProvisionalDiagnosisModal, setAddProvisionalDiagnosisModal] =
    useState(false);
  const [
    provisionalDiagnosisHistoryModal,
    setProvisionalDiagnosisHistoryModal,
  ] = useState(false);
  const [provisionalDiagnosisAdded, setprovisionalDiagnosisAdded] = useState(
    []
  );
  const [updatedProvisionalDiagnosis, setupdatedProvisionalDiagnosis] =
    useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddProvisionalDiagnosisModalOpen = () => {
    setAddProvisionalDiagnosisModal(true);
  };

  const handleAddProvisionalDiagnosisModalClose = () => {
    setAddProvisionalDiagnosisModal(false);
  };

  const handleProvisionalDiagnosisHistoryModalOpen = () => {
    setProvisionalDiagnosisHistoryModal(true);
  };

  const handleProvisionalDiagnosisHistoryModalClose = () => {
    setProvisionalDiagnosisHistoryModal(false);
  };
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };
  const handleMenuClick = (action) => {
    handleClose();
    if (action === "delete") {
      let deleteDiagnosis = updatedProvisionalDiagnosis.filter(
        (item) => item.id !== currentRow.id
      );
      setupdatedProvisionalDiagnosis(deleteDiagnosis);
    }
  };

  const columns = [
    { field: "id", headerName: "S.No", flex: 1 },
    {
      field: "provisionalDiagnosis",
      headerName: "Provisional Diagnosis",
      flex: 1,
    },
    { field: "enteredDate", headerName: " Entered Date", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
    },
  ];

  const ProvisionalDiagnosis = (value) => {
    setprovisionalDiagnosisAdded((prev) => [...prev, value]);
    setupdatedProvisionalDiagnosis((prev) => [...prev, value]);
  };

  return (
    <div>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h6>Provisional Diagnosis</h6>
          <div className="d-flex gap-5">
            <div
              className="custom-btn"
              onClick={handleAddProvisionalDiagnosisModalOpen}
            >
              Add Diagnosis
            </div>
            <div
              className="custom-btn"
              onClick={handleProvisionalDiagnosisHistoryModalOpen}
            >
              View History
            </div>
          </div>
        </div>

        <CustomTable
          rows={updatedProvisionalDiagnosis}
          columns={columns}
          onOptionClick={handleClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuClick("delete")}>Delete</MenuItem>
        </Menu>
      </div>
      {addProvisionalDiagnosisModal && (
        <AddProvisionalDiagnosis
          handleAddProvisionalDiagnosisModalClose={
            handleAddProvisionalDiagnosisModalClose
          }
          ProvisionalDiagnosis={ProvisionalDiagnosis}
          currentPlanCount={provisionalDiagnosisAdded.length}
        />
      )}
      {provisionalDiagnosisHistoryModal && (
        <ProvisionalDiagnosisHistory
          handleProvisionalDiagnosisHistoryModalClose={
            handleProvisionalDiagnosisHistoryModalClose
          }
          provisionalDiagnosisAdded={provisionalDiagnosisAdded}
          setupdatedProvisionalDiagnosis={setupdatedProvisionalDiagnosis}
        />
      )}
    </div>
  );
}

export default DisplayProvisionalDiagnosis;
