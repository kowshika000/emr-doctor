import { Box } from "@mui/material";
import React from "react";

const Vital = () => {
  return (
    <div>
      <div className="header-container my-4">
        <h6 >Vital</h6>
        <div className="d-flex gap-2">
          <Box className="custom-btn">Add Vital Signs</Box>
          <Box className="custom-btn">Monitor Vital Signs</Box>
        </div>
      </div>
      <div
        className="custom-container"
      >
        <p>No data available</p>
      </div>
    </div>
  );
};

export default Vital;
