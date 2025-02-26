import React, { useState } from "react";
import CustomTable from "../components/Table";
import { Select, MenuItem, IconButton, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const MedicationTable = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      medicineName: "Paracetamol",
      drugForm: "Tablet",
      remarks: "For fever",
      drugType: "OTC",
      reconciliationStatus: "",
      appropriationStatus: "",
    },
    {
      id: 2,
      medicineName: "Amoxicillin",
      drugForm: "Capsule",
      remarks: "Antibiotic",
      drugType: "Prescription",
      reconciliationStatus: "",
      appropriationStatus: "",
    },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const handleDelete = () => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== selectedRow.id));
    handleMenuClose();
  };
  const columns = [
    { field: "id", headerName: "Sl No", flex: 1 },
    { field: "medicineName", headerName: "Medicine Name", flex: 2 },
    { field: "drugForm", headerName: "Drug Form", flex: 2 },
    { field: "remarks", headerName: "Remarks", flex: 2 },
    { field: "drugType", headerName: "Drug Type", flex: 2 },
    {
      field: "reconciliationStatus",
      headerName: "Reconciliation Status",
      flex: 2,
      renderCell: (params) => (
        <Select
          value={params.row.reconciliationStatus}
          onChange={(e) =>
            handleStatusChange(e, params.row.id, "reconciliationStatus")
          }
          fullWidth
          size="small"
          sx={{ maxWidth: "100px", fontSize: "12px", padding: "0px" }}
        >
          <MenuItem value="">Dropdown</MenuItem>
          <MenuItem value="Approve">Approve</MenuItem>
          <MenuItem value="Reject">Reject</MenuItem>
        </Select>
      ),
    },
    {
      field: "appropriationStatus",
      headerName: "Appropriation Status",
      flex: 2,
      renderCell: (params) => (
        <Select
          value={params.row.appropriationStatus}
          onChange={(e) =>
            handleStatusChange(e, params.row.id, "appropriationStatus")
          }
          fullWidth
          size="small"
          sx={{ maxWidth: "100px", fontSize: "12px", padding: "0px" }}
        >
          <MenuItem value="">Dropdown</MenuItem>
          <MenuItem value="Approve">Approve</MenuItem>
          <MenuItem value="Reject">Reject</MenuItem>
        </Select>
      ),
    },
    {
      field: "options",
      headerName: "Options",
      width: 150,
      renderCell: (params) => (
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  // Handle status changes for dropdowns
  const handleStatusChange = (event, id, field) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: event.target.value } : row
    );
    setRows(updatedRows);
  };

  return (
    <div className="my-4">
      <div className="text-link mb-3">Discharge Medications</div>
      <CustomTable
        rows={rows}
        columns={columns}
        onOptionClick={handleMenuOpen}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default MedicationTable;
