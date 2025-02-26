import React, { useState } from "react";
import CustomTable from "../components/Table"; // Assuming you have a reusable table component
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const DiagnosisTable = () => {
  const rows = [
    {
      slNo: 1,
      category: "Primary",
      icdCode: "O09.623",
      diagnosis: "Supervision of young multigravida, third trimester",
      enteredDate: "Fri, May 10, 2024 01:01",
      enteredBy: "Dr. Nikola Tesla",
      options: "Delete",
    },
  ];

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    icdCode: "",
    diagnosis: "",
    enteredBy: "",
  });

  const columns = [
    { field: "slNo", headerName: "Sl No", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "icdCode", headerName: "ICD Code", flex: 1 },
    { field: "diagnosis", headerName: "Diagnosis", flex: 2 },
    { field: "enteredDate", headerName: "Entered Date", flex: 2 },
    { field: "enteredBy", headerName: "Entered By", flex: 2 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleMenuOpen(event, params.row)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  const handleMenuOpen = (event, row) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleDelete = () => {
    alert(`Deleting row: ${selectedRow.slNo}`);
    handleMenuClose();
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    alert("Saving Final Diagnosis: " + JSON.stringify(formData));
    setDialogOpen(false); // Close the dialog after saving
  };

  return (
    <div>
      <div className="header-container my-4">
        <h6>Final Diagnosis</h6>
        <div className="custom-btn" onClick={handleDialogOpen}>
          Add Final Diagnosis
        </div>
      </div>

      <div>
        <CustomTable
          rows={rows}
          columns={columns}
          onOptionClick={handleMenuOpen}
        />
      </div>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      {/* Dialog for Adding Final Diagnosis */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Final Diagnosis</DialogTitle>
        <DialogContent>
          <TextField
            label="Category"
            fullWidth
            variant="standard"
            margin="normal"
            name="category"
            value={formData.category}
            onChange={handleFormChange}
          />
          <TextField
            label="ICD Code"
            fullWidth
            variant="standard"
            margin="normal"
            name="icdCode"
            value={formData.icdCode}
            onChange={handleFormChange}
          />
          <TextField
            label="Diagnosis"
            fullWidth
            variant="standard"
            margin="normal"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleFormChange}
          />
          <TextField
            label="Entered By"
            fullWidth
            variant="standard"
            margin="normal"
            name="enteredBy"
            value={formData.enteredBy}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DiagnosisTable;
