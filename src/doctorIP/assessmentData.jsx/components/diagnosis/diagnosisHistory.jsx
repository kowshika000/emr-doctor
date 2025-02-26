import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import CustomTable from "../../../components/Table";

function DiagnosisHistory({
  handleDiagnosisHistoryModalClose,
  diagnosisAdded,
  setupdatedDiagnosis,
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

  const handleAddDiagnosis = () => {
    setupdatedDiagnosis((prev) => [...prev, currentRow]);
  };

  const columns = [
    { field: "id", headerName: "S.No", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "IcdCode", headerName: "ICD Code", flex: 1 },
    { field: "diagnosis", headerName: "Diagnosis", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
    },
  ];

  return (
    <Dialog
      open={true}
      onClose={handleDiagnosisHistoryModalClose}
      maxWidth="md"
      fullWidth
    >
      <form>
        <DialogTitle>View Complaints</DialogTitle>
        <DialogContent>
          <CustomTable
            rows={diagnosisAdded}
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
          <Button onClick={handleDiagnosisHistoryModalClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DiagnosisHistory;
