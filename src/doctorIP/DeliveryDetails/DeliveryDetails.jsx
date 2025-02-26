import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CustomTable from "../components/Table";

const DeliveryDetails = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    babyName: "",
    dateOfBirth: "",
    birthTime: "",
    babyHeight: "",
    babyWeight: "",
    babyGender: "",
    deliveryType: "",
    tribe: "",
    remarks: "",
  });
  const [rows, setRows] = useState([
    {
      id: 1,
      parentName: "John Doe",
      babyName: "Baby Doe",
      dateOfBirth: "2024-11-01",
      birthTime: "14:00",
      babyHeight: "50 cm",
      babyWeight: "3.2 kg",
      babyGender: "Male",
      deliveryType: "Normal",
      tribe: "Tribe A",
      remarks: "Healthy baby",
    },
  ]);

  const columns = [
    { field: "parentName", headerName: "Parent Name" },
    { field: "babyName", headerName: "Baby Name" },
    { field: "dateOfBirth", headerName: "Date of Birth" },
    { field: "birthTime", headerName: "Birth Time" },
    { field: "babyHeight", headerName: "Baby Height" },
    { field: "babyWeight", headerName: "Baby Weight" },
    { field: "babyGender", headerName: "Baby Gender" },
    { field: "deliveryType", headerName: "Type of Delivery" },
    { field: "tribe", headerName: "Tribe" },
    { field: "remarks", headerName: "Remarks" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSubmit = () => {
    console.log("Form Submitted:", formData);
    setDialogOpen(false);
  };

  return (
    <div className="full-screen-scrollable">
      <div className="header-container my-4">
        <h6>Delivery Details</h6>
        <div className="custom-btn" onClick={handleDialogOpen}>
          Add
        </div>
      </div>
      <div>
        <CustomTable rows={rows} columns={columns} />
      </div>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Delivery Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Parent Name"
            name="parentName"
            value={formData.parentName}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Baby Name"
            name="babyName"
            value={formData.babyName}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Birth Time"
            name="birthTime"
            type="time"
            value={formData.birthTime}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Baby Height (cm)"
            name="babyHeight"
            value={formData.babyHeight}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Baby Weight (kg)"
            name="babyWeight"
            value={formData.babyWeight}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth variant="standard">
            <InputLabel id="baby-gender-label">Baby Gender</InputLabel>
            <Select
              labelId="baby-gender-label"
              name="babyGender"
              value={formData.babyGender}
              onChange={handleInputChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard">
            <InputLabel id="delivery-type-label">Type of Delivery</InputLabel>
            <Select
              labelId="delivery-type-label"
              name="deliveryType"
              value={formData.deliveryType}
              onChange={handleInputChange}
            >
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="Vaginal Delivery">Vaginal Delivery</MenuItem>
              <MenuItem value="C-section">C-section</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Tribe"
            name="tribe"
            value={formData.tribe}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="Remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
          <Button
            onClick={handleDialogSubmit}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeliveryDetails;
