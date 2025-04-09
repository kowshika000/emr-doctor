import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import FormInput from "../../../component/FormInput";
import { useDispatch } from "react-redux";
import { createTreatment } from "../../../Redux/slice/OpSlice/POST/treatment";

const procedureList = [
  "Tooth Extraction",
  "Appendix Surgery",
  "Blood Transfusion",
  "ECG Monitoring",
];

const dosageOptions = [
  { label: "ml", value: "ml" },
  { label: "mg", value: "mg" },
];

const preAppOptions = [
  { label: "Required", value: "Required" },
  { label: "Not Required", value: "Not Required" },
];

function AddTreatment({
  handleAddTreatmentModalClose,
  treatment,
  getTreatment,
  patientId,
}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    procedureName: "",
    insuranceName: "",
    preApp: "",
    quantity: "",
    price: "",
    remarks: "",
    discount: "",
    covered: "",
    serviceBy: "",
    dosageDetails: "",
    serviceDatetime: new Date().toISOString(),
  });

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectProcedure = (procedure) => {
    setFormData((prev) => ({ ...prev, procedureName: procedure }));
    setSearchQuery("");
  };

  const handleSubmit = () => {
    const { serviceBy, serviceDatetime, ...rest } = formData;
    dispatch(createTreatment({ ...rest, patientId }))
      .then(() => {
        getTreatment();
        handleAddTreatmentModalClose();
      })
      .catch((error) => {
        console.error("Error creating investigation:", error);
      });
  };

  const filteredProcedures = procedureList.filter(
    (item) =>
      typeof item === "string" &&
      item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open onClose={handleAddTreatmentModalClose} maxWidth="md" fullWidth>
      <DialogContent>
        <Typography variant="h6" mb={2}>
          Add Treatment
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormInput
              label="Search Procedure"
              name="searchQuery"
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
              placeholder="Type to search..."
            />
            <Box
              sx={{
                height: 100,
                overflowY: "auto",
                border: "1px solid #ddd",
                borderRadius: 1,
                px: 1,
                mt: 1,
              }}
            >
              <List>
                {searchQuery &&
                  (filteredProcedures.length > 0 ? (
                    filteredProcedures.map((procedure, index) => (
                      <ListItem
                        key={index}
                        button
                        onClick={() => handleSelectProcedure(procedure)}
                      >
                        <ListItemText primary={procedure} />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="No items found" />
                    </ListItem>
                  ))}
              </List>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <FormInput
              label="Procedure Name"
              name="procedureName"
              value={formData.procedureName}
              onChange={handleChange("procedureName")}
              disabled
            />
          </Grid>

          <Grid item xs={4}>
            <FormInput
              label="Normal Rate"
              name="price"
              value={formData.price}
              onChange={handleChange("price")}
              type="number"
            />
          </Grid>

          <Grid item xs={4}>
            <FormInput
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange("quantity")}
              type="number"
            />
          </Grid>

          <Grid item xs={4}>
            <FormInput
              label="Discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange("discount")}
              type="number"
            />
          </Grid>

          <Grid item xs={4}>
            <FormInput
              label="Dosage"
              name="dosageDetails"
              value={formData.dosageDetails}
              onChange={handleChange("dosageDetails")}
              type="select"
              options={dosageOptions}
            />
          </Grid>

          <Grid item xs={4}>
            <FormInput
              label="Pre App"
              name="preApp"
              value={formData.preApp}
              onChange={handleChange("preApp")}
              type="select"
              options={preAppOptions}
            />
          </Grid>

          <Grid item xs={4}>
            <FormInput
              label="Co-Insurance"
              name="insuranceName"
              value={formData.insuranceName}
              onChange={handleChange("insuranceName")}
              type="text"
            />
          </Grid>

          <Grid item xs={4}>
            <FormInput
              label="Service By"
              name="serviceBy"
              value={formData.serviceBy}
              onChange={handleChange("serviceBy")}
              type="text"
            />
          </Grid>

          <Grid item xs={4}>
            <FormInput
              label="Service Date & Time"
              name="serviceDatetime"
              value={formData.serviceDatetime}
              onChange={handleChange("serviceDatetime")}
              type="datetime-local"
            />
          </Grid>

          <Grid item xs={4}>
            <FormInput
              label="Covered"
              name="covered"
              value={formData.covered}
              onChange={handleChange("covered")}
              type="select"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange("remarks")}
              type="textarea"
              rows={3}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddTreatmentModalClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTreatment;
