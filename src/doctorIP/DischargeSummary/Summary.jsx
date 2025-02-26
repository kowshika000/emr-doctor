import React, { useState } from "react";
import { TextField, Grid } from "@mui/material";
import MedicationTable from "./MedicationTable";

const Summary = () => {
  const [formData, setFormData] = useState({
    dischargeDateTime: "",
    reasonForAdmission: "",
    significantDiagnosis: "",
    significantFindings: "",
    significantMedication: "",
    diagnosticProcedures: "",
    positiveInvestigations: "",
    finalDiagnosis: "",
    dischargeCondition: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
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
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="datetime-local"
            label="Discharge Date & Time"
            InputLabelProps={{ shrink: true }}
            name="dischargeDateTime"
            value={formData.dischargeDateTime}
            onChange={handleChange}
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Reason for Admission / Chief Complaints"
            name="reasonForAdmission"
            value={formData.reasonForAdmission}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter reason for admission"
          />
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Significant Diagnosis and Co-morbidities"
            name="significantDiagnosis"
            value={formData.significantDiagnosis}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter significant diagnosis"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Significant Physical and Other Findings"
            name="significantFindings"
            value={formData.significantFindings}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter findings"
          />
        </Grid>

        {/* Third Row */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Significant Medication and Other Management Lines"
            name="significantMedication"
            value={formData.significantMedication}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter medications"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Diagnostic & Surgical Procedures Performed"
            name="diagnosticProcedures"
            value={formData.diagnosticProcedures}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter procedures"
          />
        </Grid>

        {/* Fourth Row */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Results of Positive Investigations"
            name="positiveInvestigations"
            value={formData.positiveInvestigations}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter results"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Final Diagnosis"
            name="finalDiagnosis"
            value={formData.finalDiagnosis}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter final diagnosis"
          />
        </Grid>

        {/* Fifth Row */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Condition at the Time of Discharge"
            name="dischargeCondition"
            value={formData.dischargeCondition}
            onChange={handleChange}
            variant="standard"
            placeholder="Enter condition"
          />
        </Grid>
      </Grid>
      <MedicationTable />
    </form>
  );
};

export default Summary;
