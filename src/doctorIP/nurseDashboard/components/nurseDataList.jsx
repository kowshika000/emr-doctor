import React, { useState } from 'react';
import { Box, Menu, MenuItem, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const NurseDataList = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    // Open menu when options button is clicked
    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    // Close menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Dummy Data
    const rows = [
        { id: 1, serialNo: '1', mrdNo: 'A001', mobileNo: '1234567890', consultationDate: '2024-11-15', patientName: 'John Doe', doctorName: 'Dr. Smith', insurance: 'Aetna', nurseStatus: 'Completed', doctorStatus: 'Pending' },
        { id: 2, serialNo: '2', mrdNo: 'A002', mobileNo: '9876543210', consultationDate: '2024-11-14', patientName: 'Jane Doe', doctorName: 'Dr. Johnson', insurance: 'Blue Cross', nurseStatus: 'Pending', doctorStatus: 'Completed' },
        // More rows...
    ];

    // Columns definition
    const columns = [
        { field: 'serialNo', headerName: 'S.no', width: 50 },
        { field: 'mrdNo', headerName: 'MRD No', width: 90 },
        { field: 'mobileNo', headerName: 'Mobile No', width: 100 },
        { field: 'consultationDate', headerName: 'Consultation Date', width: 150 },
        { field: 'patientName', headerName: 'Patient Name', width: 150 },
        { field: 'doctorName', headerName: 'Doctor Name', width: 150 },
        { field: 'insurance', headerName: 'Insurance', width: 100 },
        { field: 'nurseStatus', headerName: 'Nurse Status', width: 150 },
        { field: 'doctorStatus', headerName: 'Doctor Status', width: 150 },
        {
            field: 'options',
            headerName: 'Options',
            renderCell: (params) => (
                <Button
                    variant="contained"
                    size="small"
                    onClick={(event) => handleClick(event, params.row)}
                >
                    Options
                </Button>
            ),
            width: 90,
        },
    ];


    return (
        <>

            <Box
                sx={{
                    borderRadius: '8px',
                    backgroundColor: '#f5fcff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    margin: ' auto',
                    maxWidth: 'auto',
                    maxHeight: 'auto',
                    marginTop: "15px"
                }}
            >
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => { console.log('View Consent Form', selectedRow); handleClose(); }}>View Consent Form</MenuItem>
                        <MenuItem onClick={() => { console.log('Start Encounter', selectedRow); handleClose(); }}>Start Encounter</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </>
    )
}
export default NurseDataList