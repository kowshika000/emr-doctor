import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Select,
  InputLabel,
  FormControl,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useFormik, FormikProvider } from "formik";

function AddTreatment({ handleAddTreatmentModalClose, treatment }) {
  const [searchQuery, setSearchQuery] = useState("");
  const formik = useFormik({
    initialValues: {
      id: "",
      procedureName: "",
      insurance: "",
      preApp: "",
      quantity: "",
      price: "",
      serviceStatus: "",
      billStatus: "",
      remarks: "",
      discount: "",
      emergency: "",
      covered: "",
      serviceBy: "",
      dosageDetails: "",
      serviceDatetime: new Date().toISOString(),
    },
    onSubmit: (values) => {
      treatment(values);
      handleAddTreatmentModalClose();
    },
  });
  const labTestName = [
    "Complete blood count (CBC)",
    "Lipid panel",
    "Thyroid function tests",
    "Urinalysis",
  ];

  // Filter diagnoses based on search query
  const filteredLabTest = labTestName.filter((labTest) =>
    labTest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle selection of a labTest
  const handleSelectLabTest = (labTest) => {
    formik.setFieldValue("labTestName", labTest); // Set selected labTest
    setSearchQuery(""); // Clear search query
  };

  return (
    <Dialog
      open={true}
      onClose={handleAddTreatmentModalClose}
      maxWidth="md"
      fullWidth
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <h6>Add Treatment</h6>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ID"
                  name="id"
                  onChange={formik.handleChange}
                  value={formik.values.id}
                  variant="standard"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Search Procedure"
                  name="searchQuery"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  variant="standard"
                  placeholder="Type to search..."
                />
                <Box>
                  <List
                    style={{
                      height: 100,
                      overflowY: "auto",
                      border: "1px solid #ddd",
                      borderRadius: 4,
                      marginTop: 8,
                    }}
                  >
                    {searchQuery &&
                      (filteredLabTest.length > 0 ? (
                        filteredLabTest.map((labTest, index) => (
                          <ListItem
                            key={index}
                            button
                            onClick={() => handleSelectLabTest(labTest)}
                          >
                            <ListItemText primary={labTest} />
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
                <TextField
                  fullWidth
                  label="Lab Test"
                  name="procedureName"
                  onChange={formik.handleChange}
                  value={formik.values.procedureName}
                  variant="standard"
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Normal Rate"
                  name="drugForm"
                  onChange={formik.handleChange}
                  value={formik.values.drugForm}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  onChange={formik.handleChange}
                  value={formik.values.quantity}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Discount"
                  name="discount"
                  onChange={formik.handleChange}
                  value={formik.values.discount}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth variant="standard">
                  <InputLabel>Dosage</InputLabel>
                  <Select
                    name="dosageDetails"
                    value={formik.values.dosageDetails}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="ml">ml</MenuItem>
                    <MenuItem value="mg">mg</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth variant="standard">
                  <InputLabel>Pre App</InputLabel>
                  <Select
                    name="preApp"
                    value={formik.values.preApp}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="Required">Required</MenuItem>
                    <MenuItem value="Not Required">Not Required</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Co-Insurance"
                  name="insurance"
                  onChange={formik.handleChange}
                  value={formik.values.insurance}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Service By"
                  name="serviceBy"
                  onChange={formik.handleChange}
                  value={formik.values.serviceBy}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Service Date and Time"
                  name="serviceDatetime"
                  onChange={formik.handleChange}
                  value={formik.values.serviceDatetime}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4}>
                <FormLabel>Covered</FormLabel>
                <RadioGroup
                  row
                  name="covered"
                  value={formik.values.covered}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Remarks"
                  name="remarks"
                  onChange={formik.handleChange}
                  value={formik.values.remarks}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddTreatmentModalClose} color="secondary">
              Close
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </FormikProvider>
    </Dialog>
  );
}

export default AddTreatment;
