import React, { useState } from "react";
import { TextField, Grid, MenuItem, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { createSurgeryDetails } from "../../Redux/slice/IpSlice/POST/surgeryDetails";
import { toast } from "react-toastify";

const SurgeryBookingDetails = ({ patientId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    surgeryDate: "",
    startTime: "",
    endTime: "",
    theatre: "",
    surgeon: "",
    seniorSurgeon: "",
    surgerySeverity: "",
    anesthesia: "",
    surgeryType: "",
    emergencyReason: "",
    specialNursingInstruction: "",
    specialInstructionOt: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    dispatch(createSurgeryDetails({ ...formData, patientId })).then((res) => {
      if (res?.payload?.data?.message) {
        toast.success(res.payload.data.message); // success toast
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <form style={{ marginTop: "16px" }}>
      <div className="my-4 header-container">
        <h6>Surgery Booking Details</h6>
        <Box className=" custom-btn" onClick={handleSubmit}>
          Schedule Surgery
        </Box>
      </div>
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
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Surgery Date & Time"
                InputLabelProps={{ shrink: true }}
                name="surgeryDate"
                value={formData.surgeryDate}
                onChange={handleChange}
                variant="standard"
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                type="time"
                label="From"
                InputLabelProps={{ shrink: true }}
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                variant="standard"
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                type="time"
                label="To"
                InputLabelProps={{ shrink: true }}
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={12} md={6} item>
          <TextField
            fullWidth
            select
            label="Theatre"
            name="theatre"
            value={formData.theatre}
            onChange={handleChange}
            variant="standard"
            className="custom-dropdown"
          >
            <MenuItem value="">Select Theatre</MenuItem>
            <MenuItem value="Theatre 1">Theatre 1</MenuItem>
            <MenuItem value="Theatre 2">Theatre 2</MenuItem>
            <MenuItem value="Theatre 3">Theatre 3</MenuItem>
          </TextField>
        </Grid>

        <Grid xs={12} md={6} item>
          <TextField
            fullWidth
            select
            label="Surgeon"
            name="surgeon"
            value={formData.surgeon}
            onChange={handleChange}
            variant="standard"
            className="custom-dropdown"
          >
            <MenuItem value="">Select Surgeon</MenuItem>
            <MenuItem value="Dr. Neil Armstrong">Dr. Neil Armstrong</MenuItem>
            <MenuItem value="Dr. John Doe">Dr. John Doe</MenuItem>
            <MenuItem value="Dr. Emma Watson">Dr. Emma Watson</MenuItem>
          </TextField>
        </Grid>

        <Grid xs={12} md={6} item>
          <TextField
            fullWidth
            select
            label="Consultant/Sr. Surgeon"
            name="seniorSurgeon"
            value={formData.seniorSurgeon}
            onChange={handleChange}
            variant="standard"
            className="custom-dropdown"
          >
            <MenuItem value="">Select Consultant</MenuItem>
            <MenuItem value="Consultant 1">Consultant 1</MenuItem>
            <MenuItem value="Consultant 2">Consultant 2</MenuItem>
            <MenuItem value="Consultant 3">Consultant 3</MenuItem>
          </TextField>
        </Grid>

        <Grid xs={12} md={6} item>
          <TextField
            fullWidth
            select
            label="Surgery Severity"
            name="surgerySeverity"
            value={formData.surgerySeverity}
            onChange={handleChange}
            variant="standard"
            className="custom-dropdown"
          >
            <MenuItem value="">Select Severity</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
        </Grid>

        <Grid xs={12} md={6} item>
          <TextField
            fullWidth
            select
            label="Anesthesia"
            name="anesthesia"
            value={formData.anesthesia}
            onChange={handleChange}
            variant="standard"
            className="custom-dropdown"
          >
            <MenuItem value="">Select Anesthesia</MenuItem>
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Local">Local</MenuItem>
            <MenuItem value="Sedation">Sedation</MenuItem>
          </TextField>
        </Grid>

        <Grid xs={12} md={6} item>
          <TextField
            fullWidth
            select
            label="Surgery Type"
            name="surgeryType"
            value={formData.surgeryType}
            onChange={handleChange}
            variant="standard"
            className="custom-dropdown"
          >
            <MenuItem value="">Select Surgery Type</MenuItem>
            <MenuItem value="Elective">Elective</MenuItem>
            <MenuItem value="Emergency">Emergency</MenuItem>
            <MenuItem value="Minor">Minor</MenuItem>
          </TextField>
        </Grid>

        <Grid xs={12} md={6} item>
          <TextField
            fullWidth
            select
            label="Reason for Emergency"
            name="emergencyReason"
            value={formData.emergencyReason}
            onChange={handleChange}
            variant="standard"
            className="custom-dropdown"
          >
            <MenuItem value="">Select Reason</MenuItem>
            <MenuItem value="Accident">Accident</MenuItem>
            <MenuItem value="Urgent">Urgent</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </TextField>
        </Grid>

        <Grid xs={12} md={6} item>
          <TextField
            fullWidth
            label="Special Nursing Instruction"
            name="specialNursingInstruction"
            value={formData.specialNursingInstruction}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter nursing instructions"
          />
        </Grid>

        <Grid xs={12} md={6} item>
          <TextField
            fullWidth
            label="Special Instruction to OT"
            name="specialInstructionOt"
            value={formData.specialInstructionOt}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter instructions"
          />
        </Grid>

        <Grid xs={12} item>
          <TextField
            fullWidth
            // multiline
            rows={4}
            label="Comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter comments"
            // className="custom-dropdown"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default SurgeryBookingDetails;
