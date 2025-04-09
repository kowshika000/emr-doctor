import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import FormButton from "../../../../component/FormButton";
import { useDispatch } from "react-redux";
import { createDiagnosis } from "../../../../Redux/slice/DoctSlice/POST/diagnosisSlice";

function AddDiagnosis({
  handleAddDiagnosisModalClose,
  getDiagnosis,
  appointmentId,
}) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDiagnosis = {
      category,
      diagnosis,
      appointmentId,
    };

    dispatch(createDiagnosis(newDiagnosis))
      .unwrap()
      .then(() => {
        getDiagnosis();
        handleAddDiagnosisModalClose();
      })
      .catch((error) => {
        console.error("Failed to create diagnosis:", error);
      });
  };

  return (
    <Dialog
      open={true}
      onClose={handleAddDiagnosisModalClose}
      maxWidth="md"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <h6>Add Final Diagnosis</h6>
          <div className="row">
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <FormControl fullWidth size="small">
                <InputLabel>Diagnosis</InputLabel>
                <Select
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  size="small"
                >
                  <MenuItem value="">Select a Diagnosis</MenuItem>
                  <MenuItem value="Malignant neoplasm of head of pancreas">
                    Malignant neoplasm of head of pancreas - C25.0
                  </MenuItem>
                  <MenuItem value="Abdominal actinomycosis">
                    Abdominal actinomycosis - A42.1
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="form-button">
              <FormButton label="Add" type="submit" />
              <FormButton
                label="Close"
                onClick={handleAddDiagnosisModalClose}
              />
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddDiagnosis;
