import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import AddTreatment from "./addTreatment";
import ViewHistory from "./viewHistory";
import CustomTable from "../../components/Table";

function DisplayTreatment() {
  const [addTreatmentModal, setaddTreatmentModal] = useState(false);
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [treatmentAdded, setTreatmentAdded] = useState([]);
  const [updatedTreatment, setupdatedTreatment] = useState([]);

  const columns = [
    { field: "id", headerName: "S.No", flex: 1 },
    { field: "procedureName", headerName: "Procedure Name", flex: 1 },
    { field: "insurance", headerName: "Insurance", flex: 1 },
    { field: "preApp", headerName: "Pre App", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "serviceStatus", headerName: "Service Status", flex: 1 },
    { field: "billStatus", headerName: "Bill Status", flex: 1 },
    { field: "dosageDetails", headerName: "Dosage Details", flex: 1 },
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
      let deleteDiagnosis = updatedTreatment.filter(
        (item) => item.id !== currentRow.id
      );
      setupdatedTreatment(deleteDiagnosis);
    }
  };
  const handleAddTreatmentModalOpen = () => {
    setaddTreatmentModal(true);
  };

  const handleAddTreatmentModalClose = () => {
    setaddTreatmentModal(false);
  };

  const handleViewHistoryModalOpen = () => {
    setViewHistoryModal(true);
  };

  const handleViewHistoryModalClose = () => {
    setViewHistoryModal(false);
  };

  const treatment = (value) => {
    setTreatmentAdded((prev) => [...prev, value]);
    setupdatedTreatment((prev) => [...prev, value]);
  };

  return (
    <div>
      <div className=" mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <div>
            <h6>Treatment</h6>
          </div>
          <div className="d-flex gap-3">
            <div className="custom-btn " onClick={handleAddTreatmentModalOpen}>
              Add Procedure
            </div>
            <div className="custom-btn " onClick={handleViewHistoryModalOpen}>
              {" "}
              View History
            </div>
            <div className="custom-btn ">Print Request</div>
            <div className="custom-btn ">Update Procedure Status</div>
            <div className="custom-btn ">Print Treatment Request</div>
          </div>
        </div>

        <div>
          <CustomTable
            rows={updatedTreatment}
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
      {addTreatmentModal && (
        <AddTreatment
          handleAddTreatmentModalClose={handleAddTreatmentModalClose}
          treatment={treatment}
        />
      )}
      {viewHistoryModal && (
        <ViewHistory
          handleViewHistoryModalClose={handleViewHistoryModalClose}
          treatmentAdded={treatmentAdded}
          setupdatedTreatment={setupdatedTreatment}
        />
      )}
    </div>
  );
}

export default DisplayTreatment;
