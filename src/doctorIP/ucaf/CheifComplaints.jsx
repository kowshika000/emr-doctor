import React, { useState } from "react";
import CustomTable from "../components/Table";
import {
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CheifComplaints = () => {
  const rows = [
    {
      id: 1,
      symptoms: "nlkn",
      painScale: "Wong-Baker Pain Scale",
      severity: "Little Pain [1-2]",
      location: "abdomen",
      quality: "aching",
      duration: "2 months",
      timing: "Day",
      options: "View / Delete",
    },
  ];

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { field: "symptoms", headerName: "Symptoms", flex: 1 },
    { field: "painScale", headerName: "Pain Scale", flex: 1 },
    { field: "severity", headerName: "Severity", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "quality", headerName: "Quality", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "timing", headerName: "Timing", flex: 1 },
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

  const handleView = () => {
    alert(`Viewing details for row: ${selectedRow.id}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    alert(`Deleting row: ${selectedRow.id}`);
    handleMenuClose();
  };

  return (
    <div>
      <h6 className="my-4">Chief Complaints</h6>
      <div>
        <CustomTable
          rows={rows}
          columns={columns}
          onOptionClick={handleMenuOpen}
        />
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleView}>View</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </div>

      <Grid container spacing={2} mt={4}>
        <Grid item xs={12} md={6}>
          <TextField label="Significant Signs" variant="standard" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Other Conditions" variant="standard" fullWidth />
        </Grid>
      </Grid>
    </div>
  );
};

export default CheifComplaints;
