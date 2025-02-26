import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from "@mui/material";
import CustomTable from "../../components/Table";

function ViewHistory({
  handleViewHistoryModalClose,
  treatmentAdded,
  setupdatedTreatment,
}) {
  const [currentRow, setCurrentRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOptionsClick = (event, row) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleAddInvestigation = () => {
    setupdatedTreatment((prev) => [...prev, currentRow]);
    handleCloseMenu();
  };

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

  return (
    <Dialog
      open={true}
      onClose={handleViewHistoryModalClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>View Investigation</DialogTitle>
      <DialogContent>
        <CustomTable
          rows={treatmentAdded}
          columns={columns}
          onOptionClick={handleOptionsClick}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleViewHistoryModalClose} color="secondary">
          Close
        </Button>
      </DialogActions>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleAddInvestigation}>Add</MenuItem>
      </Menu>
    </Dialog>
  );
}

export default ViewHistory;
