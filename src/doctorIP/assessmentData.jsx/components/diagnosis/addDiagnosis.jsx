import { useFormik } from "formik";
import React from "react";
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

function AddDiagnosis({
  handleAddDiagnosisModalClose,
  handleAddDiagnosis,
  currentPlanCount,
}) {
  const formik = useFormik({
    initialValues: {
      id: currentPlanCount + 1,
      category: "",
      IcdCode: `Icd ${currentPlanCount + 1}`,
      diagnosis: "",
    },
    onSubmit: (values) => {
      handleAddDiagnosis(values);
      handleAddDiagnosisModalClose();
    },
  });

  return (
    <Dialog
      open={true}
      onClose={handleAddDiagnosisModalClose}
      maxWidth="md"
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <h6>Add Final Diagnosis</h6>
          <div className="row">
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Category</InputLabel>
                <Select
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  label="Category"
                >
                  <MenuItem value="">Select a Category</MenuItem>
                  <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Secondary">Secondary</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="form-group" style={{ marginBottom: "16px" }}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Diagnosis</InputLabel>
                <Select
                  id="diagnosis"
                  name="diagnosis"
                  value={formik.values.diagnosis}
                  onChange={formik.handleChange}
                  label="Diagnosis"
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
              <FormButton label={"Add"} type="submit" />
              <FormButton
                label={"Close"}
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
