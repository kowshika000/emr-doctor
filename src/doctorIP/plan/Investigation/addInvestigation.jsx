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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import FormInput from "../../../component/FormInput";
import { useDispatch } from "react-redux";
import { createInvestigation } from "../../../Redux/slice/OpSlice/POST/investigationSlice";

const labTests = [
  "Complete blood count (CBC)",
  "Lipid panel",
  "Thyroid function tests",
  "Urinalysis",
];

function AddInvestigation({
  handleAddInvestigationModalClose,
  investigation,
  getInvestigation,
  patientId,
}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [formValues, setFormValues] = useState({
    labTestName: "",
    price: "",
    quantity: "",
    discount: "",
    emergency: "",
    covered: "",
    remarks: "",
  });

  const handleChange = (field) => (value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectLabTest = (labTest) => {
    setFormValues((prev) => ({ ...prev, labTestName: labTest }));
    setSearchQuery("");
  };

  const handleSubmit = () => {
    dispatch(createInvestigation({...formValues, patientId }))
      .then(() => {
        getInvestigation();
        handleAddInvestigationModalClose();
      })
      .catch((error) => {
        console.error("Error creating investigation:", error);
      });
  };

  const filteredLabTests = labTests.filter((test) =>
    test.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog
      open={true}
      onClose={handleAddInvestigationModalClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <Typography variant="h6">Add Investigation</Typography>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <FormInput
            label="Search Investigation"
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Type to search..."
          />

          <Box
            sx={{
              height: 100,
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: 1,
              px: 1,
            }}
          >
            <List>
              {filteredLabTests.length > 0 ? (
                filteredLabTests.map((test, idx) => (
                  <ListItem
                    key={idx}
                    button
                    onClick={() => handleSelectLabTest(test)}
                  >
                    <ListItemText primary={test} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No items found" />
                </ListItem>
              )}
            </List>
          </Box>

          <FormInput
            label="Lab Test Name"
            value={formValues.labTestName}
            onChange={() => {}}
            // disabled
          />

          <FormInput
            label="Price"
            value={formValues.price}
            onChange={handleChange("price")}
          />

          <FormInput
            label="Quantity"
            value={formValues.quantity}
            onChange={handleChange("quantity")}
          />

          <FormInput
            label="Discount"
            value={formValues.discount}
            onChange={handleChange("discount")}
          />

          <FormInput
            label="Emergency"
            type="select"
            value={formValues.emergency}
            onChange={handleChange("emergency")}
            options={[{ label: "Yes" }, { label: "No" }]}
          />

          <Box>
            <FormLabel>Covered</FormLabel>
            <RadioGroup
              row
              name="covered"
              value={formValues.covered}
              onChange={(e) => handleChange("covered")(e.target.value)}
            >
              <FormControlLabel value="No" control={<Radio />} label="No" />
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            </RadioGroup>
          </Box>

          <FormInput
            label="Remarks"
            type="textarea"
            value={formValues.remarks}
            onChange={handleChange("remarks")}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleAddInvestigationModalClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddInvestigation;
