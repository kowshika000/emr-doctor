import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from "@mui/material";
import CustomTable from "../../../components/Table";
import { useState } from "react";

function ProvisionalDiagnosisHistory({
  handleProvisionalDiagnosisHistoryModalClose,
  provisionalDiagnosisAdded,
  setupdatedProvisionalDiagnosis,
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
    {
      field: "provisionalDiagnosis",
      headerName: "Provisional Diagnosis",
      flex: 1,
    },
    { field: "enteredDate", headerName: "Entered Date", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
      renderCell: (params) => (
        <Button variant="contained" onClick={() => handleAddDiagnosis(params)}>
          Add
        </Button>
      ),
    },
  ];

  const handleAddDiagnosis = () => {
    setupdatedProvisionalDiagnosis((prev) => [...prev, currentRow]);
  };

  return (
    <Dialog
      open={true}
      onClose={handleProvisionalDiagnosisHistoryModalClose}
      maxWidth="lg"
      fullWidth
    >
      <div className="modal-content">
        <DialogTitle>View Complaints</DialogTitle>
        <DialogContent>
          <CustomTable
            rows={provisionalDiagnosisAdded}
            columns={columns}
            onOptionClick={handleOptionsClick}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAddDiagnosis}>Add</MenuItem>
          </Menu>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleProvisionalDiagnosisHistoryModalClose}
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default ProvisionalDiagnosisHistory;
