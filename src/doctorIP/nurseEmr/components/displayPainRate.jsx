import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddPainRate from "./AddPainRate";
import EditPainRate from "./EditPainRate";
import PainRateHistory from "./PainRateHistory";

function DisplayPainRate() {
  const [addExaminationModal, setAddExaminationModal] = useState(false);
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [examinationAdded, setexaminationAdded] = useState([]);
  const [updatedExamination, setUpdatedExamination] = useState([
    {
      id: 1,
      painScale: "Headache",
      severity: "High",
    },
  ]);
  const [editExaminationModal, setEditExaminationModal] = useState(false);
  const [selectedExamination, setSelectedExamination] = useState(null);

  const renderOptionsMenu = (params) => (
    <OptionsMenu
      row={params.row}
      updatedExamination={updatedExamination}
      setUpdatedExamination={setUpdatedExamination}
      setEditExaminationModal={setEditExaminationModal}
      setSelectedExamination={setSelectedExamination}
    />
  );

  const columns = [
    { field: "painScale", headerName: "Pain Scale", flex: 1 },
    { field: "severity", headerName: "Severity", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
      renderCell: renderOptionsMenu,
    },
  ];

  const Examination = (value) => {
    const newId =
      updatedExamination.length > 0
        ? updatedExamination[updatedExamination.length - 1].id + 1
        : 1;
    const newExamination = { ...value, id: newId };
    setexaminationAdded((prev) => [...prev, newExamination]);
    setUpdatedExamination((prev) => [...prev, newExamination]);
  };

  return (
    <div>
      <div className="card border-light mb-3">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Pain Scale</h4>
            <div>
              <button
                className="btn btn-warning me-2"
                onClick={() => setAddExaminationModal(true)}
              >
                Add Pain Scale
              </button>
              <button
                className="btn btn-success"
                onClick={() => setViewHistoryModal(true)}
              >
                View History
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={updatedExamination}
              columns={columns}
              pageSize={5}
            />
          </div>
        </div>
      </div>
      {addExaminationModal && (
        <AddPainRate
          handleAddExaminationModalClose={() => setAddExaminationModal(false)}
          Examination={Examination}
        />
      )}
      {viewHistoryModal && (
        <PainRateHistory
          handleViewHistoryModalClose={() => setViewHistoryModal(false)}
          examinationAdded={examinationAdded}
        />
      )}
      {editExaminationModal && (
        <EditPainRate
          editSelectedComplaints={selectedExamination}
          setUpdatedExamination={setUpdatedExamination}
          handleEditExaminationModalClose={() => setEditExaminationModal(false)}
        />
      )}
    </div>
  );
}

const OptionsMenu = React.memo(
  ({
    row,
    updatedExamination,
    setUpdatedExamination,
    setSelectedExamination,
    setEditExaminationModal,
  }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleMenuClick = (action) => {
      handleClose();
      if (action === "delete") {
        setUpdatedExamination((prev) =>
          prev.filter((item) => item.id !== row.id)
        );
      } else if (action === "edit") {
        setSelectedExamination(row);
        setEditExaminationModal(true);
      }
    };

    return (
      <div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuClick("edit")}>
            Edit Examination
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("delete")}>
            Delete Examination
          </MenuItem>
        </Menu>
      </div>
    );
  }
);

export default DisplayPainRate;
