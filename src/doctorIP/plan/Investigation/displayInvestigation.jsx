import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddInvestigation from "./addInvestigation";
import ViewHistory from "./viewHistory";
import ViewAddNote from "./viewAddLabNotes";
import CustomTable from "../../components/Table";

function DisplayInvestigation() {
  const [addInvestigationModal, setaddInvestigationModal] = useState(false);
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [investigationAdded, setinvestigationAdded] = useState([]);
  const [updatedInvestigation, setupdatedInvestigation] = useState([]);
  const [viewAddModal, setViewAddModal] = useState(false);
  const [notesType, setNotesType] = useState("");

  const rows = [
    {
      id: 1,
      labTestName: "THIAMINE (VITAMIN B1) [100 MG/ML]",
      insurance: "THIAMINE:SOLUTION FOR INJECTION (2ML, AMPOULE)",
      preApp: "Active",
      quantity: "Injection Regular",
      price: "1 Mol",
      serviceStatus: "1",
      billStatus: "IV",
      remarks: "2",
    },
  ];

  const columns = [
    { field: "id", headerName: "S.No", flex: 1 },
    { field: "labTestName", headerName: "Lab Test Name", flex: 1 },
    { field: "insurance", headerName: "Insurance", flex: 1 },
    { field: "preApp", headerName: "Pre App", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "serviceStatus", headerName: "Service Status", flex: 1 },
    { field: "billStatus", headerName: "Bill Status", flex: 1 },
    { field: "remarks", headerName: "Remarks", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
    },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState([]);

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    handleClose();
    if (action === "delete") {
      let deleteDiagnosis = updatedInvestigation.filter(
        (item) => item.id !== currentRow.id
      );
      setupdatedInvestigation(deleteDiagnosis);
    }
  };
  const handleAddInvestigationModalOpen = () => {
    setaddInvestigationModal(true);
  };

  const handleAddInvestigationModalClose = () => {
    setaddInvestigationModal(false);
  };

  const handleViewHistoryModalOpen = () => {
    setViewHistoryModal(true);
  };

  const handleViewHistoryModalClose = () => {
    setViewHistoryModal(false);
  };

  const handleViewAddNotesModalOpen = (type) => {
    setViewAddModal(true);
    setNotesType(type);
  };

  const handleViewAddNotesModalClose = () => {
    setViewAddModal(false);
  };

  const investigation = (value) => {
    setinvestigationAdded((prev) => [...prev, value]);
    setupdatedInvestigation((prev) => [...prev, value]);
  };

  return (
    <div>
      <div className=" mb-3">
        <div className="d-flex justify-content-between align-items-center my-4 gap-4">
          <div>
            <h6>Investigation</h6>
          </div>
          <div className="d-flex gap-3">
            <div
              className="custom-btn "
              onClick={handleAddInvestigationModalOpen}
            >
              Add Investigation
            </div>
            <div className="custom-btn " onClick={handleViewHistoryModalOpen}>
              {" "}
              View History
            </div>
            <div className="custom-btn ">Print Request</div>
            <div
              className="custom-btn "
              onClick={() => handleViewAddNotesModalOpen("Rad")}
            >
              View/Add Rad Notes{" "}
            </div>
            <div
              className="custom-btn "
              onClick={() => handleViewAddNotesModalOpen("Lab")}
            >
              View/Add Lab Notes{" "}
            </div>
            <div className="custom-btn ">Collect Samples </div>
          </div>
        </div>

        <div>
          <CustomTable
            rows={updatedInvestigation}
            columns={columns}
            onOptionClick={handleClick}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleMenuClick("delete")}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
      {addInvestigationModal && (
        <AddInvestigation
          handleAddInvestigationModalClose={handleAddInvestigationModalClose}
          investigation={investigation}
        />
      )}
      {viewHistoryModal && (
        <ViewHistory
          handleViewHistoryModalClose={handleViewHistoryModalClose}
          investigationAdded={investigationAdded}
          setupdatedInvestigation={setupdatedInvestigation}
        />
      )}
      {viewAddModal && (
        <ViewAddNote
          handleViewAddNotesModalClose={handleViewAddNotesModalClose}
          notesType={notesType}
        />
      )}
    </div>
  );
}

const OptionsMenu = ({
  row,
  updatedInvestigation,
  setupdatedInvestigation,
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
      let deleteDiagnosis = updatedInvestigation.filter(
        (item) => item.id !== row.id
      );
      setupdatedInvestigation(deleteDiagnosis);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuClick("delete")}>Delete</MenuItem>
      </Menu>
    </div>
  );
};
export default DisplayInvestigation;
