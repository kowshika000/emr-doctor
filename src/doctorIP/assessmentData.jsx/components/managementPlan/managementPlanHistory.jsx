import { MenuItem, Menu, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import CustomTable from "../../../components/Table";
import { useState } from "react";

function ManagementPlanHistory({
  handleManagementPlanHistoryModalClose,
  managementPlan,
  setupdatedManagementPlan,
}) {
  const [currentRow, setCurrentRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionsClick = (event, row) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const columns = [
    { field: "id", headerName: "S.No", flex: 1 },
    { field: "plan", headerName: "Plan", flex: 1 },
    { field: "enteredBy", headerName: "Entered By", flex: 1 },
    { field: "enteredDate", headerName: "Entered Date", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
    },
  ];

  const handleAddManagementPlan = () => {
    setupdatedManagementPlan((prev) => [...prev, currentRow]);
  };

  return (
    <Dialog
      open={true}
      onClose={handleManagementPlanHistoryModalClose}
      maxWidth="lg"
      fullWidth
    >
      <form>
        <DialogTitle>View Complaints</DialogTitle>
        <DialogContent>
          <CustomTable
            rows={managementPlan}
            columns={columns}
            onOptionClick={handleOptionsClick}
          />
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleAddManagementPlan}>Add</MenuItem>
          </Menu>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleManagementPlanHistoryModalClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ManagementPlanHistory;
