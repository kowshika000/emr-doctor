import { useFormik } from "formik";
import React from "react";
import { Dialog, DialogContent, TextField } from "@mui/material";
import FormButton from "../../../../component/FormButton";

function AddProvisionalDiagnosis({
  handleAddProvisionalDiagnosisModalClose,
  ProvisionalDiagnosis,
  currentPlanCount,
}) {
  const formik = useFormik({
    initialValues: {
      id: currentPlanCount + 1,
      provisionalDiagnosis: "",
      enteredDate: new Date().toLocaleString(), // Convert to a readable format
    },
    onSubmit: (values) => {
      if (values.provisionalDiagnosis.trim()) {
        ProvisionalDiagnosis(values); // Pass data to the parent
        formik.resetForm(); // Reset form after successful submission
        handleAddProvisionalDiagnosisModalClose();
      } else {
        alert("Please enter a provisional diagnosis.");
      }
    },
  });

  return (
    <Dialog
      open
      onClose={handleAddProvisionalDiagnosisModalClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <h6>Add Provisional Diagnosis</h6>

          <div className="form-group">
            <TextField
              label="Provisional Diagnosis"
              id="provisionalDiagnosis"
              name="provisionalDiagnosis"
              type="text"
              fullWidth
              // required
              value={formik.values.provisionalDiagnosis}
              onChange={formik.handleChange}
              variant="standard"
              sx={{ marginBottom: "10px" }}
            />
          </div>
          <div className="form-button">
            <FormButton label="Add" type="submit" />
            <FormButton
              label="Close"
              onClick={handleAddProvisionalDiagnosisModalClose}
            />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddProvisionalDiagnosis;
