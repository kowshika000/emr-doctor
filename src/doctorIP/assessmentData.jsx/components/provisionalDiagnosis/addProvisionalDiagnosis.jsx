import React, { useState } from "react";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  FormControl,
  TextField,
} from "@mui/material";
import FormButton from "../../../../component/FormButton";
import { createProvisionalDiagnosis } from "../../../../Redux/slice/DoctSlice/POST/provisionalSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchDiagnosis } from "../../../../Redux/slice/IpSlice/GET/searchDiagnosis";

function AddProvisionalDiagnosis({
  handleAddProvisionalDiagnosisModalClose,
  getProvisionalDiagnosis,
  patientId,
}) {
  const dispatch = useDispatch();

  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState("");

  const { data } = useSelector((state) => state?.docEmr?.searchDiagnosis);

  const diagnosisOptions =
    data?.map((item) => ({
      label: item.diagnosisName,
      value: item.id,
    })) || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    const diagnosisId = provisionalDiagnosis?.value;

    if (!diagnosisId) {
      alert("Please enter a provisional diagnosis.");
      return;
    }

    dispatch(
      createProvisionalDiagnosis({
        patientId,
        diagnosisId,
      })
    )
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
            <FormControl fullWidth size="small">
              <Autocomplete
                freeSolo
                options={diagnosisOptions}
                value={provisionalDiagnosis}
                onChange={(event, newValue) => {
                  setProvisionalDiagnosis(newValue);
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
                    label="Provisional Diagnosis"
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
              onClick={handleAddProvisionalDiagnosisModalClose}
            />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddProvisionalDiagnosis;
