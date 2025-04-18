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
  Autocomplete,
} from "@mui/material";
import FormButton from "../../../../component/FormButton";
import { useDispatch, useSelector } from "react-redux";
import { createDiagnosis } from "../../../../Redux/slice/DoctSlice/POST/diagnosisSlice";
import { fetchSearchDiagnosis } from "../../../../Redux/slice/IpSlice/GET/searchDiagnosis";

function AddDiagnosis({
  handleAddDiagnosisModalClose,
  getDiagnosis,
  patientId,
}) {
  const dispatch = useDispatch();
  const [diagnosis, setDiagnosis] = useState(null);

  const { data } = useSelector((state) => state?.docEmr?.searchDiagnosis);

  console.log("Diagnosis data:", data);

  const diagnosisOptions =
    data?.map((item) => ({
      label: item.diagnosisName,
      value: item.id,
    })) || [];

  console.log("Diagnosis options:", diagnosisOptions);

  const handleSubmit = (e) => {
    e.preventDefault();

    const diagnosisId = diagnosis?.value;

    if (!diagnosisId) {
      alert("Please select a valid diagnosis.");
      return;
    }

    dispatch(createDiagnosis({ patientId, diagnosisId }))
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
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <h6>Add Final Diagnosis</h6>
          <div className="row">
            <div className="form-group my-3" style={{ marginBottom: "16px" }}>
              <FormControl fullWidth size="small">
                <Autocomplete
                  freeSolo
                  options={diagnosisOptions}
                  value={diagnosis}
                  onChange={(event, newValue) => {
                    setDiagnosis(newValue);
                  }}
                  onInputChange={(event, value, reason) => {
                    if (reason === "input") {
                      dispatch(fetchSearchDiagnosis({ name: value }));
                    }
                  }}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option?.label || ""
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Diagnosis"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        autoComplete: "off",
                      }}
                    />
                  )}
                />
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
