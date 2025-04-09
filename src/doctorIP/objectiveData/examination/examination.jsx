// import DisplayComplaints from "./cheifComplaints/displayComplaints";
import DisplayRos from "./ros/displayRos";
import DisplayClinicalExamination from "./clinicalExamination/displayClinicalExamination";
import DisplayConfidentalDetails from "./confidentalDetails/displayConfidentalDetails";
import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import ChiefComplaint from "../../subjectiveData/hopi/chiefComplaint";

function Examination({ patientId, appointmentId }) {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <ChiefComplaint patientId={patientId} appointmentId={appointmentId} />
        <DisplayRos patientId={patientId} appointmentId={appointmentId} />
        <DisplayClinicalExamination
          patientId={patientId}
          appointmentId={appointmentId}
        />
        <DisplayConfidentalDetails
          patientId={patientId}
          appointmentId={appointmentId}
        />
      </Box>
    </Box>
  );
}

export default Examination;
