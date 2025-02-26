import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomTable from "../components/Table";

const SurgeryBookingList = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      surgeryDateTime: "2024-11-25 10:00 AM",
      theatre: "Theatre 1",
      surgeon: "Dr. John Doe",
      bookedDate: "2024-11-20",
      bookedBy: "Nurse Jane",
    },
    {
      id: 2,
      surgeryDateTime: "2024-11-26 02:00 PM",
      theatre: "Theatre 2",
      surgeon: "Dr. Smith",
      bookedDate: "2024-11-21",
      bookedBy: "Nurse Emily",
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
    { field: "surgeryDateTime", headerName: "Surgery Date & Time", flex: 1 },
    { field: "theatre", headerName: "Theatre", flex: 1 },
    { field: "surgeon", headerName: "Surgeon", flex: 1 },
    { field: "bookedDate", headerName: "Booked Date", flex: 1 },
    { field: "bookedBy", headerName: "Booked By", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleMenuOpen(event, params.row)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div>
      <div className="my-4 header-container">
        <h6 >Surgery Booking List</h6>
      </div>
      <div>
        <CustomTable
          rows={rows}
          columns={columns}
          onOptionClick={handleMenuOpen}
        />
      </div>
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

export default SurgeryBookingList;
