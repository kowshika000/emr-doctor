import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HotelIcon from "@mui/icons-material/Hotel";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const DoctorOpDashboard = ({ navigate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  const handleMenuOpen = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };
  const columns = [
    "Sl No",
    "Consultation Date",
    "MRD No",
    "Patient Name",
    "View Procedure Status",
    "Insurance",
    "Status",
    "Options",
  ];

  const rows = [
    {
      id: 1,
      consultationDate: "24-08-2024 01:27 PM",
      mrdNo: "MRD123",
      patientName: "John Don TRIAGE",
      viewProcedureStatus: "D",
      insurance: "Cigna",

      status: "Admitted",
    },
    {
      id: 2,
      consultationDate: "23-08-2024 10:45 AM",
      mrdNo: "MRD124",
      patientName: "Alice Green",
      viewProcedureStatus: "D",
      insurance: "UnitedHealth",

      status: "Pre Discharge",
    },
    {
      id: 3,
      consultationDate: "22-08-2024 03:15 PM",
      mrdNo: "MRD125",
      patientName: "Robert Black",
      viewProcedureStatus: "D",
      insurance: "Blue Cross",

      status: "Discharge",
    },
    {
      id: 4,
      consultationDate: "21-08-2024 11:30 AM",
      mrdNo: "MRD126",
      patientName: "Sophia Brown",
      viewProcedureStatus: "D ",
      insurance: "Aetna",

      status: "Admitted",
    },
    {
      id: 5,
      consultationDate: "20-08-2024 09:00 AM",
      mrdNo: "MRD127",
      patientName: "Michael White",
      viewProcedureStatus: "D",
      insurance: "Medicare",

      status: "Admitted",
    },
  ];
  // const navigate = useNavigate();
  const handlePatientClick = (mrdNo) => {
    navigate(`/secure/doctorEmr/opDetails/${mrdNo}`);
  };
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const isToday = dayjs().isSame(selectedDate, "day");
  return (
    <Box>
      <Box className="overall-container mb-4">
        <Chip label="Today Appointment 50" variant="outlined" />
        <Chip label="Revenue 100k" variant="outlined" />
        <Chip label="Emergency Patient 5" variant="outlined" />
        <Chip label="Waiting List 15" variant="outlined" />
        <Chip label="Telemedicine Appointment 30" variant="outlined" />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <h6>Out-Patients List</h6>
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          format="dddd, MMMM DD, YYYY"
          showTime={isToday}
          variant="borderless"
          style={{ minWidth: "250px" }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} align="center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.consultationDate}</TableCell>
                <TableCell align="center">{row.mrdNo}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#2b9aca",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => handlePatientClick(row.mrdNo)}
                >
                  {row.patientName}
                </TableCell>
                <TableCell align="center">{row.viewProcedureStatus}</TableCell>
                <TableCell align="center">{row.insurance}</TableCell>

                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleMenuOpen(e, row.id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && activeRow === row.id}
                    onClose={handleMenuClose}
                    sx={{ fontSize: "12px" }}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <PersonAddIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Refer To OP (Consultation)" />
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <HotelIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Refer To IP (Admission)" />
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <DescriptionIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="View Claim Form" />
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <AssignmentIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="View Consent Form" />
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DoctorOpDashboard;
