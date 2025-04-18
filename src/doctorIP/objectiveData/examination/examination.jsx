// import DisplayComplaints from "./cheifComplaints/displayComplaints";
import DisplayRos from "./ros/displayRos";
import DisplayClinicalExamination from "./clinicalExamination/displayClinicalExamination";
import DisplayConfidentalDetails from "./confidentalDetails/displayConfidentalDetails";
import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import ChiefComplaint from "../../subjectiveData/hopi/chiefComplaint";

function Examination({ patientId }) {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <ChiefComplaint patientId={patientId} />
        <DisplayRos patientId={patientId} />
        <DisplayClinicalExamination patientId={patientId} />
        <DisplayConfidentalDetails patientId={patientId} />
      </Box>
    </Box>
  );
}

export default Examination;
