import React, { useEffect, useState } from "react";
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
  Box,
} from "@mui/material";
import CustomTable from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryDetails } from "../../Redux/slice/IpSlice/GET/deliveryDetails";
import FormInput from "../../component/FormInput";
import { createDeliveryDetails } from "../../Redux/slice/IpSlice/POST/deliveryDetails";
import { Table } from "antd";

const DeliveryDetails = ({ patientId }) => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data } = useSelector((state) => state.docEmr?.delivery);
  console.log("Delivery Details Data:", data);

  useEffect(() => {
    dispatch(fetchDeliveryDetails({ patientId }));
  }, [dispatch]);
  const [formData, setFormData] = useState({
    parentName: "",
    babyName: "",
    dateOfBirth: "",
    birthTime: "",
    babyHeight: "",
    babyWeight: "",
    babyGender: "",
    typeOfDelivery: "",
    tribe: "",
    remarks: "",
  });

  const columns = [
    { key: "parentName", title: "Parent Name", dataIndex: "parentName" },
    { key: "babyName", title: "Baby Name", dataIndex: "babyName" },
    { key: "dateOfBirth", title: "Date of Birth", dataIndex: "dateOfBirth" },
    { key: "birthTime", title: "Birth Time", dataIndex: "birthTime" },
    { key: "babyHeight", title: "Baby Height", dataIndex: "babyHeight" },
    { key: "babyWeight", title: "Baby Weight", dataIndex: "babyWeight" },
    { key: "babygender", title: "Baby Gender", dataIndex: "babygender" },
    { key: "typeOfDelivery", title: "Type of Delivery", dataIndex: "typeOfDelivery" },
    { key: "tribe", title: "Tribe", dataIndex: "tribe" },
    { key: "remarks", title: "Remarks", dataIndex: "remarks" },
  ];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSubmit = () => {
    dispatch(createDeliveryDetails({ ...formData, patientId })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(fetchDeliveryDetails({ patientId }));
        setFormData({
          parentName: "",
          babyName: "",
          dateOfBirth: "",
          birthTime: "",
          babyHeight: "",
          babyWeight: "",
          babyGender: "",
          typeOfDelivery: "",
          tribe: "",
          remarks: "",
        });
        setDialogOpen(false);
      } else {
        console.error("Error submitting form:", res.error.message);
      }
    });
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
        <Table
          dataSource={data}
          columns={columns}
          className="table-container"
        />
      </div>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        {/* <DialogTitle>Add Delivery Details</DialogTitle> */}
        <DialogContent>
          <h6 className="mb-3">Add Delivery Details</h6>
          <Box className="form-container-1">
            <FormInput
              label="Parent Name"
              value={formData.parentName}
              onChange={(value) => handleInputChange("parentName", value)}
            />
            <FormInput
              label="Baby Name"
              value={formData.babyName}
              onChange={(value) => handleInputChange("babyName", value)}
            />
            <FormInput
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(value) => handleInputChange("dateOfBirth", value)}
            />
            <FormInput
              label="Birth Time"
              type="time"
              step="1" // Allows seconds input
              value={formData.birthTime}
              onChange={(value) => handleInputChange("birthTime", value)}
            />
            <FormInput
              label="Baby Height (cm)"
              value={formData.babyHeight}
              onChange={(value) => handleInputChange("babyHeight", value)}
            />
            <FormInput
              label="Baby Weight (kg)"
              value={formData.babyWeight}
              onChange={(value) => handleInputChange("babyWeight", value)}
            />
            <FormInput
              label="Baby Gender"
              value={formData.babyGender}
              onChange={(value) => handleInputChange("babyGender", value)}
              type="select"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
            />
            <FormInput
              label="Type of Delivery"
              value={formData.typeOfDelivery}
              onChange={(value) => handleInputChange("typeOfDelivery", value)}
              type="select"
              options={[
                { value: "Normal", label: "Normal" },
                { value: "Vaginal Delivery", label: "Vaginal Delivery" },
                { value: "C-section", label: "C-section" },
              ]}
            />

            <FormInput
              label="Tribe"
              value={formData.tribe}
              onChange={(value) => handleInputChange("tribe", value)}
            />
            <FormInput
              label="Remarks"
              value={formData.remarks}
              onChange={(value) => handleInputChange("remarks", value)}
            />
          </Box>
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
