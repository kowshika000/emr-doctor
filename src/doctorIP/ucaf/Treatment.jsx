import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomTable from "../components/Table"; // Assuming CustomTable is a reusable component

const TreatmentTable = () => {
  const [rows, setRows] = useState([
    {
      slNo: 1,
      procedureName: "Enameloplasty Per Tooth [D9971]",
      insurance: "Covered",
      preApp: "Required",
      quantity: 1,
      price: 18.75,
      coPayment: 0,
      deductible: 0,
      enteredBy: "Dr. Neil Armstrong",
      serviceDate: "Mon, Dec 03, 2024",
      surgeryOrder: "",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newRow, setNewRow] = useState({
    procedureName: "",
    insurance: "",
    preApp: "",
    quantity: "",
    price: "",
    coPayment: "",
    deductible: "",
    enteredBy: "",
    serviceDate: "",
    surgeryOrder: "",
  });

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { field: "slNo", headerName: "Sl No", flex: 1 },
    { field: "procedureName", headerName: "Procedure Name", flex: 2 },
    { field: "insurance", headerName: "Insurance", flex: 1 },
    { field: "preApp", headerName: "Pre App", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "coPayment", headerName: "Co Payment", flex: 1 },
    { field: "deductible", headerName: "Deductible", flex: 1 },
    { field: "enteredBy", headerName: "Entered By / Service Date", flex: 1 },
    { field: "surgeryOrder", headerName: "Surgery Order", flex: 1 },
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

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        ...newRow,
        slNo: rows.length + 1,
        serviceDate: new Date().toLocaleString(),
      },
    ]);
    setNewRow({
      procedureName: "",
      insurance: "",
      preApp: "",
      quantity: "",
      price: "",
      coPayment: "",
      deductible: "",
      enteredBy: "",
      serviceDate: "",
      surgeryOrder: "",
    });
    handleDialogClose();
  };
  const collapseData = ["Consumable", "Procedure"];
  return (
    <div>
      <div className="my-4 header-container">
        <h6>Treatment</h6>
        <div className="custom-btn" onClick={handleDialogOpen}>
          Add
        </div>
      </div>
      {/* Custom Table */}
      <CustomTable
        rows={rows}
        columns={columns}
        onOptionClick={handleMenuOpen}
        collapseData={collapseData}
      />

      {/* Menu for options */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => alert(`Viewing row: ${selectedRow?.slNo}`)}>
          View
        </MenuItem>
        <MenuItem onClick={() => alert(`Deleting row: ${selectedRow?.slNo}`)}>
          Delete
        </MenuItem>
      </Menu>

      {/* Dialog to add a row */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Treatment</DialogTitle>
        <DialogContent>
          <TextField
            label="Procedure Name"
            name="procedureName"
            value={newRow.procedureName}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Insurance"
            name="insurance"
            value={newRow.insurance}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Pre App"
            name="preApp"
            value={newRow.preApp}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={newRow.quantity}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={newRow.price}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Co Payment"
            name="coPayment"
            type="number"
            value={newRow.coPayment}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Deductible"
            name="deductible"
            type="number"
            value={newRow.deductible}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Entered By"
            name="enteredBy"
            value={newRow.enteredBy}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Surgery Order"
            name="surgeryOrder"
            value={newRow.surgeryOrder}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddRow} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TreatmentTable;
