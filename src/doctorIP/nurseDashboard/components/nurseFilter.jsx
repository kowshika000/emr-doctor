import React, { useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Select,
    TextField,
    InputAdornment,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { DatePicker } from '@mui/x-date-pickers';

const NurseFilter = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [consultationDate, setConsultationDate] = useState(null);
    const [clearDate, setClearDate] = useState(null);

    const toggleFilters = () => {
        setShowFilters((prev) => !prev);
    };
    return (
        <>
            <Box
                
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 2,
                    borderRadius: '8px',
                    backgroundColor: '#f5fcff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    margin: ' auto',
                    maxWidth: 'auto',
                    marginTop: "15px"
                }}
            >
                {/* Filter Button */}
                <Box
                    sx={{

                        display: 'flex',

                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: "flex-end"
                    }}
                >

                    <Button
                        onClick={toggleFilters}
                        variant="contained"
                        startIcon={<FilterListIcon />}
                        sx={{
                            backgroundColor: '#237d9e',
                            color: '#fff',
                            textTransform: 'none',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                            '&:hover': { backgroundColor: '#1e6b85' },



                        }}
                    >
                        Filters
                    </Button>
                </Box>

                {/* Second Column */}
                {showFilters && (
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            gap: 2,
                            flexWrap: 'wrap',
                        }}
                    >
                        {/* Doctor Dropdown */}
                        <Select
                            defaultValue=""
                            size="medium"
                            sx={{ minWidth: '150px', flex: 1 }}
                            displayEmpty
                            renderValue={(selected) => {
                                if (selected === "") {
                                    return <span style={{ color: 'rgba(0, 0, 0, 0.54)' }}>Search by Doctor</span>;
                                }
                                return selected;
                            }}
                        >
                            <MenuItem value="" disabled>
                                Search by Doctor
                            </MenuItem>
                            <MenuItem value="doctor1">Dr. Smith</MenuItem>
                            <MenuItem value="doctor2">Dr. Johnson</MenuItem>
                        </Select>

                        {/* Appointment Type Dropdown */}
                        <Select
                            defaultValue=""
                            size="medium"
                            sx={{ minWidth: '150px', flex: 1 }}
                            placeholder='Appointment Type'
                            displayEmpty
                            renderValue={(selected) => {
                                if (selected === "") {
                                    return <span style={{ color: 'rgba(0, 0, 0, 0.54)' }}>Search by Doctor</span>;
                                }
                                return selected;
                            }}
                        >
                            <MenuItem value="" disabled>
                                Appointment Type
                            </MenuItem>
                            <MenuItem value="online">Online</MenuItem>
                            <MenuItem value="in-person">In-Person</MenuItem>
                        </Select>

                        {/* Consultation Date Picker */}
                        <DatePicker
                            label="Consultation Date"
                            value={consultationDate}
                            onChange={(newValue) => setConsultationDate(newValue)}
                            renderInput={(params) => (
                                <TextField size="small" {...params} sx={{ flex: 1 }} />
                            )}
                        />

                        {/* Clear Date Picker */}
                        <DatePicker
                            label="Clear Date"
                            value={clearDate}
                            onChange={(newValue) => setClearDate(newValue)}
                            renderInput={(params) => (
                                <TextField size="small" {...params} sx={{ flex: 1 }} />
                            )}
                        />

                        {/* Search Textbox */}
                        <TextField
                            label="Search Patient Name, Insurance, Mobile"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: '53px', // Set the height here
                                },
                                '& .MuiOutlinedInput-input': {
                                    height: '53px', // Adjust input field height
                                    padding: '10px 14px 10px 10px', // Adjust padding to align content properly
                                },
                                flex: 2
                            }}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">🔍</InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                )}
            </Box>
        </>
    )
}
export default NurseFilter