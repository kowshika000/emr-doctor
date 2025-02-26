import React, { useState } from "react";
import { TextField, Grid, Typography } from "@mui/material";

const PatientInstructions = () => {
  const [instructionsData, setInstructionsData] = useState({
    conditionChanges: "",
    doctorContactNumber: "",
    hospitalContactNumber: "",
    careInstructionsWith: "",
    followUpInstructions: "",
    followUpDateTime: "",
    labAppointments: "",
    diagnosticImagingAppointments: "",
    specialOrdersAppointments: "",
    otherClinicAppointments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructionsData({ ...instructionsData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Instructions Data:", instructionsData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
      <h6 className="my-4">Patient Instructions</h6>
      <Grid
        container
        spacing={3}
        sx={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          margin: "0",
          paddingRight: "24px",
          paddingBottom: "24px",
        }}
      >
        {/* First Row */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="In case of change in your condition or symptoms"
            name="conditionChanges"
            value={instructionsData.conditionChanges}
            onChange={handleChange}
            variant="standard"
            placeholder="Describe changes in condition or symptoms"
          />
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Please contact your doctor on the number"
            name="doctorContactNumber"
            value={instructionsData.doctorContactNumber}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter doctor's contact number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Or contact Hospital Telephone Number"
            name="hospitalContactNumber"
            value={instructionsData.hospitalContactNumber}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter hospital contact number"
          />
        </Grid>

        {/* Third Row */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Patient's care instructions discussed with"
            name="careInstructionsWith"
            value={instructionsData.careInstructionsWith}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter name or details"
          />
        </Grid>

        {/* Fourth Row */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Follow-Up Instructions"
            name="followUpInstructions"
            value={instructionsData.followUpInstructions}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter follow-up instructions"
          />
        </Grid>

        {/* Fifth Row */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="datetime-local"
            label="Follow-Up Date / Time"
            InputLabelProps={{ shrink: true }}
            name="followUpDateTime"
            value={instructionsData.followUpDateTime}
            onChange={handleChange}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Appointments For Lab"
            name="labAppointments"
            value={instructionsData.labAppointments}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter lab appointment details"
          />
        </Grid>

        {/* Sixth Row */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Appointments For Diagnostic Imaging"
            name="diagnosticImagingAppointments"
            value={instructionsData.diagnosticImagingAppointments}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter diagnostic imaging details"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Appointments For Special Orders"
            name="specialOrdersAppointments"
            value={instructionsData.specialOrdersAppointments}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter special order details"
          />
        </Grid>

        {/* Seventh Row */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Appointments For Other Clinic"
            name="otherClinicAppointments"
            value={instructionsData.otherClinicAppointments}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter other clinic appointment details"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PatientInstructions;
