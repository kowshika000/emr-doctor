import React from "react";
import { Box } from "@mui/material";
import ChiefComplaint from "./hopi/chiefComplaint";
// import ReviewSystem from "./hopi/reviewSystem";

const HistoryOfPresentIllness = ({ patientId }) => {
  return (
    <>
      <Box className="full-screen-scrollable">
        {/* <h6>History Of Present Illness</h6> */}
        <ChiefComplaint patientId={patientId} />
        {/* <ReviewSystem patientId={patientId} /> */}
      </Box>
    </>
  );
};
export default HistoryOfPresentIllness;
