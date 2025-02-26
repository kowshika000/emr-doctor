import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import CustomTable from "../../../components/Table";
import { useState } from "react";

function MedicationHistory({
  handlePrescribedMedicationModalClose,
  medicationAdded,
  setupdatedMedication,
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
    { field: "tradeName", headerName: "Trade Name", flex: 1 },
    { field: "ingredientName", headerName: "Ingredient Name", flex: 1 },
    { field: "status", headerName: "Status/Type", flex: 1 },
    { field: "drugForm", headerName: "Drug Form/Order Type", flex: 1 },
    { field: "dosage", headerName: "Dosage", flex: 1 },
    { field: "frequency", headerName: "Frequency", flex: 1 },
    { field: "roa", headerName: "ROA", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "remarks", headerName: "Remarks", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
    },
  ];

  const handleAddMedication = () => {
    setupdatedMedication((prev) => [...prev, currentRow]);
  };

  return (
    <Dialog
      open={true}
      onClose={handlePrescribedMedicationModalClose}
      maxWidth="lg"
      fullWidth
    >
      <form>
        <DialogTitle>View Medications</DialogTitle>
        <DialogContent>
          <CustomTable
            rows={medicationAdded}
            columns={columns}
            onOptionClick={handleOptionsClick}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAddMedication}>Add</MenuItem>
          </Menu>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePrescribedMedicationModalClose}
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default MedicationHistory;
