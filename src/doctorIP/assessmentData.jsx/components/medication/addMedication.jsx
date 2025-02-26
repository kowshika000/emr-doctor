import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Select,
  MenuItem,
  Button,
  Box,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";

const dummyMedicines = [
  { tradeName: "Dol65", ingredientName: "Paracetamol", dosage: "1 mg" },
  { tradeName: "Ciplox", ingredientName: "Ciprofloxacin", dosage: "500 mg" },
  { tradeName: "Dolo650", ingredientName: "Paracetamol", dosage: "650 mg" },
];

function AddMedication({
  handleprescribeMedicationModalClose,
  prescribedMedicines,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const formik = useFormik({
    initialValues: {
      id: "",
      tradeName: "",
      ingredientName: "",
      status: "",
      drugForm: "",
      dosage: "",
      frequency: "",
      frequencyUnit: "",
      orderType: "",
      roa: "",
      duration: "",
      remarks: "",
    },
    onSubmit: (values) => {
      const statement = `${values.tradeName} ${values.dosage} ${values.frequency} ${values.drugForm}`;
      const updatedValues = {
        ...values,
        remarks: statement,
      };
      prescribedMedicines(updatedValues);
      handleprescribeMedicationModalClose();
    },
  });

  const handleSelectMedicine = (medicine) => {
    formik.setFieldValue("tradeName", medicine.tradeName);
    formik.setFieldValue("ingredientName", medicine.ingredientName);
    formik.setFieldValue("dosage", medicine.dosage);
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
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Prescribe Medication
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Search Medicine"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="standard"
                placeholder="Type to search..."
              />
              <Box
                mt={2}
                style={{
                  height: 150,
                  overflowY: "auto",
                  border: "1px solid #ddd",
                  borderRadius: 4,
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
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Drug Type"
                name="drugForm"
                value={formik.values.drugForm}
                onChange={formik.handleChange}
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Order Type</InputLabel>
                <Select
                  name="orderType"
                  value={formik.values.orderType}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="Regular">Regular</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Route of Admin"
                name="roa"
                value={formik.values.roa}
                onChange={formik.handleChange}
                variant="standard"
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Dosage</InputLabel>
                <Select
                  name="dosage"
                  value={formik.values.dosage}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="ml">ml</MenuItem>
                  <MenuItem value="Mcg">Mcg</MenuItem>
                  <MenuItem value="Tablet">Tablet</MenuItem>
                  <MenuItem value="Patch">Patch</MenuItem>
                  <MenuItem value="Vial">Vial</MenuItem>
                  <MenuItem value="Drops">Drops</MenuItem>
                  <MenuItem value="Grams">Grams</MenuItem>
                  <MenuItem value="Inj">Inj</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Frequency</InputLabel>
                <Select
                  name="frequency"
                  value={formik.values.frequency}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="1-0-0">1-0-0</MenuItem>
                  <MenuItem value="0-1-0">0-1-0</MenuItem>
                  <MenuItem value="0-0-1">0-0-1</MenuItem>
                  <MenuItem value="1-0-1">1-0-1</MenuItem>
                  <MenuItem value="1-1-1">1-1-1</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Duration (days)"
                name="duration"
                value={formik.values.duration}
                onChange={formik.handleChange}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Instructions"
                name="remarks"
                value={`${formik.values.tradeName} ${formik.values.dosage} ${formik.values.frequency} ${formik.values.drugForm}`}
                variant="standard"
                readOnly
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleprescribeMedicationModalClose}
            color="secondary"
          >
            Close
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddMedication;
