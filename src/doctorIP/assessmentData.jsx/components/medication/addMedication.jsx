import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import FormInput from "../../../../component/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { createMedication } from "../../../../Redux/slice/OpSlice/POST/medicationSlice";
import { searchMedicine } from "../../../../Redux/slice/OpSlice/GET/searchMedicine";

function AddMedication({
  handleprescribeMedicationModalClose,
  patientId,
  getMedication,
}) {
  const dispatch = useDispatch();

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [formValues, setFormValues] = useState({
    dosage: "",
    drugType: "",
    frequency: "",
    orderType: "",
    roa: "",
    duration: "",
    instructions: "",
  });

  const { data } = useSelector((state) => state?.docEmr?.searchMedicine);
  console.log("Medicine data:", data);

  const medicineOptions =
    data?.map((item) => ({
      label: item.tradeName,
      value: item.id,
    })) || [];

  const handleChange = (field) => (value) => {
    const updated = {
      ...formValues,
      [field]: value,
    };
    if (["dosage", "frequency", "drugType"].includes(field)) {
      updated.instructions = generateInstructions(updated);
    }
    setFormValues(updated);
  };

  const generateInstructions = (values) =>
    `${values.dosage || ""} ${values.frequency || ""} ${
      values.drugType || ""
    }`.trim();

  const handleSubmit = () => {
    dispatch(
      createMedication({
        ...formValues,
        patientId,
        medicineId: selectedMedicine?.value || null,
      })
    )
      .then(() => {
        getMedication();
        handleprescribeMedicationModalClose();
      })
      .catch((error) => {
        console.error("Failed to create medication:", error);
      });
  };

  return (
    <Dialog
      open={true}
      onClose={handleprescribeMedicationModalClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <h6 className="mb-3">Prescribe Medication</h6>
        <FormControl fullWidth size="small">
          <Autocomplete
            freeSolo
            options={medicineOptions}
            value={selectedMedicine}
            onChange={(event, newValue) => setSelectedMedicine(newValue)}
            onInputChange={(event, value, reason) => {
              if (reason === "input") {
                dispatch(searchMedicine({ name: value }));
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

        <div className="form-container-1 mt-3">
          <FormInput
            label="Drug Type"
            value={formValues.drugType}
            onChange={handleChange("drugType")}
          />

          <FormInput
            label="Order Type"
            type="select"
            value={formValues.orderType}
            onChange={handleChange("orderType")}
            options={[
              { label: "Regular" },
              { label: "Weekly" },
              { label: "Monthly" },
            ]}
          />

          <FormInput
            label="Route of Admin"
            value={formValues.roa}
            onChange={handleChange("roa")}
          />

          <FormInput
            label="Dosage"
            type="select"
            value={formValues.dosage}
            onChange={handleChange("dosage")}
            options={[
              { label: "ml" },
              { label: "Mcg" },
              { label: "Tablet" },
              { label: "Patch" },
              { label: "Vial" },
              { label: "Drops" },
              { label: "Grams" },
              { label: "mg" },
            ]}
          />

          <FormInput
            label="Frequency"
            type="select"
            value={formValues.frequency}
            onChange={handleChange("frequency")}
            options={[
              { label: "1-0-0" },
              { label: "0-1-0" },
              { label: "0-0-1" },
              { label: "1-0-1" },
              { label: "1-1-1" },
            ]}
          />

          <FormInput
            label="Duration (days)"
            value={formValues.duration}
            onChange={handleChange("duration")}
          />
          <FormInput
            label="Instructions"
            value={formValues.instructions}
            readOnly
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleprescribeMedicationModalClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddMedication;
