import React, { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";

const DoctorSign = () => {
  const [selectedRecipient, setSelectedRecipient] = useState("Patient");

  const handleRecipientChange = (event) => {
    setSelectedRecipient(event.target.value);
  };

  return (
    <div>
      <div className="my-4 header-container">
        <h6>Doctor's Signature & Stamp</h6>
        <h6>Date & Time : 5/10/2024 7:40:00 AM</h6>
      </div>

      <Box className="box-style">
        {/* Radio Buttons for Recipient */}
        <Typography sx={{ mb: 2 }}>A Copy Received By</Typography>
        <RadioGroup
          row
          value={selectedRecipient}
          onChange={handleRecipientChange}
          sx={{ mb: 3 }}
        >
          <FormControlLabel
            value="Patient"
            control={<Radio size="small" />}
            label="Patient"
          />
          <FormControlLabel
            value="Family Member"
            control={<Radio size="small" />}
            label="Family Member"
          />
          <FormControlLabel
            value="Others"
            control={<Radio size="small" />}
            label="Others"
          />
        </RadioGroup>

        {/* Form Fields */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Name" size="small" variant="standard" />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              label="Date & Time"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              size="small"
              variant="standard"
            />
          </Grid>
        </Grid>

        {/* Signature and Date in the Same Row */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={6} md={6}>
            <Box
              sx={{
                border: "1px solid #ddd",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Signature
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ mt: 1 }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>

      </Box>
    </div>
  );
};

export default DoctorSign;
