import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import AddDiagnosis from "./addDiagnosis";
import DiagnosisHistory from "./diagnosisHistory";
import CustomTable from "../../../components/Table";

function DisplayDiagnosis() {
  const [addDiagnosisModal, setAddDiagnosisModal] = useState(false);
  const [diagnosisHistoryModal, setDiagnosisHistoryModal] = useState(false);
  const [diagnosisAdded, setDiagnosisAdded] = useState([]);
  const [updatedDiagnosis, setUpdatedDiagnosis] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    handleClose();
    if (action === "delete" && currentRow) {
      const deleteDiagnosis = updatedDiagnosis.filter(
        (item) => item.id !== currentRow.id
      );
      setUpdatedDiagnosis(deleteDiagnosis);
    }
  };

  const handleAddDiagnosisModalOpen = () => {
    setAddDiagnosisModal(true);
  };

  const handleAddDiagnosisModalClose = () => {
    setAddDiagnosisModal(false);
  };

  const handleDiagnosisHistoryModalOpen = () => {
    setDiagnosisHistoryModal(true);
  };

  const handleDiagnosisHistoryModalClose = () => {
    setDiagnosisHistoryModal(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      flex: 1,
    },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "IcdCode", headerName: "ICD Code", flex: 1 },
    { field: "diagnosis", headerName: "Diagnosis", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
    },
  ];

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleAddDiagnosis = (value) => {
    setDiagnosisAdded((prev) => [...prev, value]);
    setUpdatedDiagnosis((prev) => [...prev, value]);
  };

  return (
    <div>
      <div className=" mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h6>Diagnosis</h6>

          <div className="d-flex gap-4">
            <div className="custom-btn" onClick={handleAddDiagnosisModalOpen}>
              Add Diagnosis
            </div>
            <div
              className="custom-btn"
              onClick={handleDiagnosisHistoryModalOpen}
            >
              View History
            </div>
          </div>
        </div>
        <div className="card-body">
          <CustomTable
            rows={updatedDiagnosis}
            columns={columns}
            onOptionClick={handleClick}
          />
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuClick("")}>
            Make Diagnosis Primary
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("delete")}>
            Delete Diagnosis
          </MenuItem>
        </Menu>
      </div>

      {/* Add Diagnosis Modal */}
      {addDiagnosisModal && (
        <AddDiagnosis
          handleAddDiagnosisModalClose={handleAddDiagnosisModalClose}
          handleAddDiagnosis={handleAddDiagnosis}
          currentPlanCount={diagnosisAdded.length}
        />
      )}

      {/* Diagnosis History Modal */}
      {diagnosisHistoryModal && (
        <DiagnosisHistory
          handleDiagnosisHistoryModalClose={handleDiagnosisHistoryModalClose}
          diagnosisAdded={diagnosisAdded}
          setupdatedDiagnosis={setUpdatedDiagnosis}
        />
      )}
    </div>
  );
}

export default DisplayDiagnosis;
