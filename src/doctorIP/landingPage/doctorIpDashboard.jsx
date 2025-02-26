import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import DoctorIpSearch from "./doctorIpSearch";

const DoctorIpDashboard = ({ navigate }) => {
  const columns = [
    "Sl No",
    "Admit Date",
    "IP No",
    "Patient Name",
    "Doctor",
    "Insurance",
    "Ward",
    "Bed",
    "Room",
    "Status",
  ];

  const rows = [
    {
      id: 1,
      admitDate: "24-08-2024 01:27 PM",
      ipNo: "JP123",
      patientName: "John Don TRIAGE",
      doctor: "Dr. Michelle",
      insurance: "Cigna",
      ward: "ER",
      bed: "BED1",
      room: "Emergency Observation",
      status: "Admitted",
    },
    {
      id: 2,
      admitDate: "23-08-2024 10:45 AM",
      ipNo: "JP124",
      patientName: "Alice Green",
      doctor: "Dr. John Smith",
      insurance: "UnitedHealth",
      ward: "Cardiology",
      bed: "BED2",
      room: "Cardio ICU",
      status: "Pre Discharge",
    },
    {
      id: 3,
      admitDate: "22-08-2024 03:15 PM",
      ipNo: "JP125",
      patientName: "Robert Black",
      doctor: "Dr. Emily Carter",
      insurance: "Blue Cross",
      ward: "General",
      bed: "BED3",
      room: "General Ward 1",
      status: "Discharge",
    },
    {
      id: 4,
      admitDate: "21-08-2024 11:30 AM",
      ipNo: "JP126",
      patientName: "Sophia Brown",
      doctor: "Dr. James Lee",
      insurance: "Aetna",
      ward: "Pediatrics",
      bed: "BED4",
      room: "Pediatric ICU",
      status: "Admitted",
    },
    {
      id: 5,
      admitDate: "20-08-2024 09:00 AM",
      ipNo: "JP127",
      patientName: "Michael White",
      doctor: "Dr. Sarah Johnson",
      insurance: "Medicare",
      ward: "Orthopedics",
      bed: "BED5",
      room: "Ortho Ward",
      status: "Admitted",
    },
  ];
  const handlePatientClick = (ipNo) => {
    navigate(`/secure/doctorEmr/ipDetails/${ipNo}`);
  };
  return (
    <Box>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h5>In-Patients List</h5>
        <div>Sunday, September 01, 2024 07:39 AM</div>
      </div>
      <Box
        sx={{
          marginBottom: 3,
          marginTop: 3,
        }}
      >
        <DoctorIpSearch />
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
                <TableCell align="center">{row.admitDate}</TableCell>
                <TableCell align="center">{row.ipNo}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "#2b9aca",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => handlePatientClick(row.ipNo)}
                >
                  {row.patientName}
                </TableCell>
                <TableCell align="center">{row.doctor}</TableCell>
                <TableCell align="center">{row.insurance}</TableCell>
                <TableCell align="center">{row.ward}</TableCell>
                <TableCell align="center">{row.bed}</TableCell>
                <TableCell align="center">{row.room}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DoctorIpDashboard;
