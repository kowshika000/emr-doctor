import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import AddManagementPlan from "./addManagementPlan";
import ManagementPlanHistory from "./managementPlanHistory";
import EditManagementPlan from "./editManagementPlan";
import CustomTable from "../../../components/Table";

function DisplayManagementPlan() {
  const [addManagementPlanModal, setAddManagementPlanModal] = useState(false);
  const [managementPlanHistoryModal, setManagementPlanHistoryModal] =
    useState(false);
  const [managementPlan, setManagementPlan] = useState([]);
  const [updatedManagementPlan, setupdatedManagementPlan] = useState([]);
  const [editManagementPlanModal, setManagementPlanModal] = useState(false);
  const [selectedManagementPlan, setSelectedManagementPlan] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (action) => {
    handleClose();
    if (action === "delete" && currentRow) {
      let deleteManagementPlan = updatedManagementPlan.filter(
        (item) => item.id !== currentRow.id
      );
      setupdatedManagementPlan(deleteManagementPlan);
    }
    if (action === "edit" && currentRow) {
      setSelectedManagementPlan(currentRow);
      setManagementPlanModal(true);
    }
  };

  const handleAddManagementPlanModalOpen = () => {
    setAddManagementPlanModal(true);
  };

  const handleAddManagementPlanModalClose = () => {
    setAddManagementPlanModal(false);
  };

  const handleManagementPlanHistoryModalOpen = () => {
    setManagementPlanHistoryModal(true);
  };

  const handleManagementPlanHistoryModalClose = () => {
    setManagementPlanHistoryModal(false);
  };

  const rows = [
    {
      id: 1,
      plan: "Primary",
      enteredBy: "C25.0",
      enteredDate: "C25.0",
    },
  ];

  const columns = [
    { field: "id", headerName: "S.No", flex: 1 },
    { field: "plan", headerName: "Plan", flex: 1 },
    { field: "enteredBy", headerName: "Entered By", flex: 1 },
    { field: "enteredDate", headerName: "Entered Date", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
      // renderCell: (params) => <></>,
    },
  ];

  const ManagementPlan = (value) => {
    setManagementPlan((prev) => [...prev, value]);
    setupdatedManagementPlan((prev) => [...prev, value]);
  };

  const handleEditManagementPlanModalClose = () => {
    setManagementPlanModal(false);
    setSelectedManagementPlan(null);
  };

  return (
    <div>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h6>Management Plan</h6>
          <div className="d-flex gap-4">
            <div
              className="custom-btn"
              onClick={handleAddManagementPlanModalOpen}
            >
              Add Management Plan
            </div>
            <div
              className="custom-btn"
              onClick={handleManagementPlanHistoryModalOpen}
            >
              View History
            </div>
          </div>
        </div>

        <CustomTable
          rows={updatedManagementPlan}
          columns={columns}
          onOptionClick={handleClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuClick("edit")}>Edit</MenuItem>
          <MenuItem onClick={() => handleMenuClick("delete")}>Delete</MenuItem>
        </Menu>
      </div>
      {addManagementPlanModal && (
        <AddManagementPlan
          handleAddManagementPlanModalClose={handleAddManagementPlanModalClose}
          ManagementPlan={ManagementPlan}
          currentPlanCount={managementPlan.length}
        />
      )}
      {managementPlanHistoryModal && (
        <ManagementPlanHistory
          handleManagementPlanHistoryModalClose={
            handleManagementPlanHistoryModalClose
          }
          managementPlan={managementPlan}
          setupdatedManagementPlan={setupdatedManagementPlan}
        />
      )}
      {editManagementPlanModal && (
        <EditManagementPlan
          editSelectedManagementPlan={selectedManagementPlan}
          setupdatedManagementPlan={setupdatedManagementPlan}
          handleEditManagementPlanModalClose={
            handleEditManagementPlanModalClose
          }
          updatedManagementPlan={updatedManagementPlan}
        />
      )}
    </div>
  );
}

export default DisplayManagementPlan;
