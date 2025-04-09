import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
} from "@mui/material";
import FormInput from "../../../../component/FormInput";
import { useDispatch } from "react-redux";
import { createMedication } from "../../../../Redux/slice/OpSlice/POST/medicationSlice";

const dummyMedicines = [
  { tradeName: "Dol65", ingredientName: "Paracetamol", dosage: "mg" },
  { tradeName: "Ciplox", ingredientName: "Ciprofloxacin", dosage: "mg" },
  { tradeName: "Dolo650", ingredientName: "Paracetamol", dosage: "mg" },
];

function AddMedication({
  handleprescribeMedicationModalClose,
  prescribedMedicines,
  patientId,
  getMedication,
}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [formValues, setFormValues] = useState({
    // tradeName: "",
    // ingredientName: "",
    dosage: "",
    drugType: "",
    frequency: "",
    orderType: "",
    roa: "",
    duration: "",
    instructions: "",
  });

  const handleSelectMedicine = (medicine) => {
    const updated = {
      ...formValues,
      // tradeName: medicine.tradeName,
      // ingredientName: medicine.ingredientName,
      dosage: medicine.dosage,
    };
    updated.instructions = generateInstructions(updated);
    setFormValues(updated);
  };

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
    ` ${values.dosage || ""} ${values.frequency || ""} ${
      values.drugType || ""
    }`.trim();

  const handleSubmit = () => {
    dispatch(createMedication({ ...formValues, patientId }))
      .then(() => {
        getMedication();
        handleprescribeMedicationModalClose();
      })
      .catch((error) => {
        console.error("Failed to create medication:", error);
      });
  };

  const filteredMedicines = dummyMedicines.filter(
    (medicine) =>
      medicine.tradeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.ingredientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog
      open={true}
      onClose={handleprescribeMedicationModalClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Prescribe Medication
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <FormInput
            label="Search Medicine"
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Type to search..."
          />

          <Box
            sx={{
              height: 150,
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: 1,
              px: 1,
            }}
          >
            <List>
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((medicine, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => handleSelectMedicine(medicine)}
                  >
                    <ListItemText
                      primary={medicine.tradeName}
                      secondary={`${medicine.ingredientName} | ${medicine.dosage}`}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No medicines found" />
                </ListItem>
              )}
            </List>
          </Box>
          <div className="form-container-1">
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
          </div>
          <FormInput
            label="Instructions"
            value={formValues.instructions}
            readOnly
          />
        </Box>
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
