import DisplayComplaints from "./cheifComplaints/displayComplaints";
import DisplayRos from "./ros/displayRos";
import DisplayClinicalExamination from "./clinicalExamination/displayClinicalExamination";
import DisplayConfidentalDetails from "./confidentalDetails/displayConfidentalDetails";
import React from "react";
import { Box, Grid, Paper } from "@mui/material";

function Examination() {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <DisplayComplaints />
        <DisplayRos />
        <DisplayClinicalExamination />
        <DisplayConfidentalDetails />
      </Box>
    </Box>
  );
}

export default Examination;
