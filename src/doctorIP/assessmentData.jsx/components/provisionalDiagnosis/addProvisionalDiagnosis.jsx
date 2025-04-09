import React, { useState } from "react";
import { Dialog, DialogContent, TextField } from "@mui/material";
import FormButton from "../../../../component/FormButton";
import { createProvisionalDiagnosis } from "../../../../Redux/slice/DoctSlice/POST/provisionalSlice";
import { useDispatch } from "react-redux";

function AddProvisionalDiagnosis({
  handleAddProvisionalDiagnosisModalClose,
  ProvisionalDiagnosis,
  currentPlanCount,
  getProvisionalDiagnosis,
  patientId,
}) {
  const dispatch = useDispatch();

  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!provisionalDiagnosis.trim()) {
      alert("Please enter a provisional diagnosis.");
      return;
    }

    dispatch(createProvisionalDiagnosis({ patientId, provisionalDiagnosis }))
      .then(() => {
        getProvisionalDiagnosis();
        setProvisionalDiagnosis("");
        handleAddProvisionalDiagnosisModalClose();
      })
      .catch((error) => {
        console.error("Failed to add diagnosis:", error);
        alert("Something went wrong while adding the diagnosis.");
      });
  };

  return (
    <Dialog
      open
      onClose={handleAddProvisionalDiagnosisModalClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <h6>Add Provisional Diagnosis</h6>

          <div className="form-group mt-3">
            <TextField
              label="Provisional Diagnosis"
              id="provisionalDiagnosis"
              name="provisionalDiagnosis"
              type="text"
              fullWidth
              value={provisionalDiagnosis}
              onChange={(e) => setProvisionalDiagnosis(e.target.value)}
              size="small"
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
