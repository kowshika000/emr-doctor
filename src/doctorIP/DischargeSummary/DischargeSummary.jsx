import React from "react";
import PatientInstructions from "./PatientInstuctionForm";
import Summary from "./Summary";
import DoctorSign from "./DoctorSign";
import { Box, Button, Typography } from "@mui/material";

const DischargeSummary = () => {
  return (
    <div className="full-screen-scrollable">
      <h6 className="mb-4">Discharge Summary</h6>
      <div>
        <Summary />
      </div>
      <div>
        <PatientInstructions />
      </div>
      <div>
        <DoctorSign />
      </div>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="contained" color="primary">
          Save Discharge Summary
        </Button>
        <Button variant="outlined" color="error">
          Clearances Not Yet Issued
        </Button>
        <Button variant="contained" color="secondary">
          Print Discharge Summary
        </Button>
      </Box>
    </div>
  );
};

export default DischargeSummary;
