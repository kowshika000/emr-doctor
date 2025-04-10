import React, { useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Table } from "antd";
import FormInput from "../../component/FormInput";
import { useDispatch } from "react-redux";
import { createSurgicalProcedure } from "../../Redux/slice/IpSlice/POST/surgicalProcedure";
import { deleteSurgicalProcedure } from "../../Redux/slice/IpSlice/DELETE/surgicalProcedure";

const SurgicalProcedures = ({ patientId }) => {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState(null);

  const [formData, setFormData] = useState({
    procedureName: "",
    quantity: 1,
    price: "",
    discount: "",
    covered: "",
    deductible: 0,
    remarks: "",
  });

  const allProcedures = [
    "Soft tissue Injection Depomedrone [20552]",
    "Laparoscopic Cholecystectomy",
    "Open Hernia Repair",
    "Knee Arthroscopy",
    "Cataract Surgery",
    "Spinal Fusion Surgery",
    "Breast Cancer Surgery",
    "Thyroidectomy",
    "Appendectomy",
    "Prostatectomy",
  ];

  const filteredProcedures = allProcedures.filter((procedure) =>
    procedure.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch(deleteSurgicalProcedure({ id }));
  };

  const handleAddProcedure = () => {
    dispatch(createSurgicalProcedure({ ...formData, patientId }));
    setFormData({
      procedureName: "",
      quantity: 1,
      price: "",
      discount: "",
      covered: "",
      deductible: 0,
      remarks: "",
    });
    setSelectedProcedure(null);
    setOpenDialog(false);
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleOptionSelect = (event, value) => {
    setSelectedProcedure(value);
    handleChange("procedureName", value || "");
  };

  const columns = [
    {
      dataIndex: "slNo",
      title: "Sl No",
      render: (text) => (text ? text : "--"),
    },
    {
      dataIndex: "procedureName",
      title: "Procedure Name",
      render: (text) => (text ? text : "--"),
    },
    {
      dataIndex: "insurance",
      title: "Insurance",
      render: (text) => (text ? text : "--"),
    },
    {
      dataIndex: "preApp",
      title: "Pre App",
      render: (text) => (text ? text : "--"),
    },
    {
      dataIndex: "quantity",
      title: "Quantity",
      render: (text) => (text ? text : "--"),
    },
    {
      dataIndex: "price",
      title: "Price",
      render: (text) => (text ? text : "--"),
    },
    {
      dataIndex: "coPayment",
      title: "Co Payment",
      render: (text) => (text ? text : "--"),
    },
    {
      dataIndex: "deductible",
      title: "Deductible",
      render: (text) => (text ? text : "--"),
    },
    {
      dataIndex: "enteredByServiceDate",
      title: "Entered By / Service Date",
      render: (text) => (text ? text : "--"),
    },
    {
      dataIndex: "surgeryOrder",
      title: "Surgery Order",
      render: (text) => (text ? text : "--"),
    },
    {
      dataIndex: "options",
      title: "Options",
      render: (_, record) => (
        <IconButton onClick={() => handleDelete(record.id)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div>
      <div className="my-4 header-container">
        <h6 style={{ alignSelf: "center", margin: 0 }}>Surgical Procedures</h6>
        <Box className="custom-btn" onClick={() => setOpenDialog(true)}>
          Add Surgical Procedures
        </Box>
      </div>

      <Table
        dataSource={[]}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="table-container"
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogContent>
          <h6>Add Surgical Procedure</h6>

          <Box pb={4} pt={1}>
            <Autocomplete
              freeSolo
              options={filteredProcedures}
              getOptionLabel={(option) => option || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Procedure"
                  variant="outlined"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search..."
                  size="small"
                  sx={{ width: 300 }}
                />
              )}
              value={selectedProcedure}
              onChange={handleOptionSelect}
            />
          </Box>

          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gap={2}
          >
            <FormInput
              label="Procedure Name"
              name="procedureName"
              value={formData.procedureName}
              onChange={(value) => handleChange("procedureName", value)}
            />
            <FormInput
              label="Quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={(value) => handleChange("quantity", value)}
            />
            <FormInput
              label="Price"
              name="price"
              value={formData.price}
              onChange={(value) => handleChange("price", value)}
            />
            <FormInput
              label="Discount"
              name="discount"
              value={formData.discount}
              onChange={(value) => handleChange("discount", value)}
            />
            <FormInput
              type="select"
              label="Covered"
              name="covered"
              value={formData.covered}
              onChange={(value) => handleChange("covered", value)}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
            <FormInput
              label="Deductible"
              type="number"
              name="deductible"
              value={formData.deductible}
              onChange={(value) => handleChange("deductible", value)}
            />
            <FormInput
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={(value) => handleChange("remarks", value)}
            />
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "#007bff" }}
              onClick={handleAddProcedure}
            >
              Add
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#dc3545" }}
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SurgicalProcedures;

