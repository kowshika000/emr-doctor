import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Select,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomTable from "../components/Table";

const SurgicalProcedures = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      slNo: 1,
      procedureName: "Soft tissue Injection Depomedrone [20552]",
      insurance: "Not Applicable",
      preApp: "Not Applicable",
      quantity: 1,
      price: 16,
      coPayment: 0,
      deductible: 16,
      enteredByServiceDate: "Administrator\n9/1/2024 10:01",
      surgeryOrder: "",
    },
    {
      id: 2,
      slNo: 2,
      procedureName: "Soft tissue Injection Depomedrone [20552]",
      insurance: "Not Applicable",
      preApp: "Not Applicable",
      quantity: 2,
      price: 16,
      coPayment: 0,
      deductible: 16,
      enteredByServiceDate: "Administrator\n9/1/2024 10:01",
      surgeryOrder: "",
    },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State for Dialog
  const [searchQuery, setSearchQuery] = useState(""); // State for Search
  const [selectedProcedure, setSelectedProcedure] = useState(null);

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

  // Filter procedures based on search query
  const filteredProcedures = allProcedures.filter((procedure) =>
    procedure.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleDelete = () => {
    // Confirm deletion before proceeding
    if (window.confirm("Are you sure you want to delete this procedure?")) {
      setRows((prevRows) =>
        prevRows.filter((row) => row.id !== selectedRow.id)
      );
    }
    handleMenuClose();
  };

  const handleAddProcedure = () => {
    if (selectedProcedure) {
      setRows((prevRows) => [
        ...prevRows,
        {
          id: prevRows.length + 1,
          procedureName: selectedProcedure,
          slNo: prevRows.length + 1,
          quantity: formData.quantity,
          price: formData.price,
          coPayment: formData.coPayment,
          deductible: formData.deductible,
          enteredByServiceDate: "Admin\n9/1/2024 10:01",
          surgeryOrder: "",
        },
      ]);
      // Reset the form data and selected procedure
      setFormData({
        quantity: 1,
        price: "",
        discount: "",
        covered: "Yes",
        deductible: 0.0,
        preApp: "Not Required",
        serviceBy: "Dr. Nicola Tesla (Gynecologist)",
        remarks: "",
      });
      setSelectedProcedure(null);
      setOpenDialog(false);
    }
  };

  const columns = [
    { field: "slNo", headerName: "Sl No", width: 100 },
    { field: "procedureName", headerName: "Procedure Name", width: 250 },
    { field: "insurance", headerName: "Insurance", width: 150 },
    { field: "preApp", headerName: "Pre App", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "coPayment", headerName: "Co Payment", width: 120 },
    { field: "deductible", headerName: "Deductible", width: 120 },
    {
      field: "enteredByServiceDate",
      headerName: "Entered By / Service Date",
      width: 200,
    },
    { field: "surgeryOrder", headerName: "Surgery Order", width: 150 },
    {
      field: "options",
      headerName: "Options",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleMenuOpen(event, params.row)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  const [formData, setFormData] = useState({
    quantity: 1,
    price: "",
    discount: "",
    covered: "",
    deductible: 0.0,
    preApp: "Not Required",
    serviceBy: "Dr. Nicola Tesla (Gynecologist)",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div
        className="my-4 header-container"
      >
        <h6 style={{alignSelf:"center",margin:0}}>Surgical Procedures</h6>
        <Box
         
          className=" custom-btn"
          onClick={() => setOpenDialog(true)}
        >
          Add Surgical Procedures
        </Box>
      </div>
      <div>
        <CustomTable
          rows={rows}
          columns={columns}
          onOptionClick={handleMenuOpen}
        />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      {/* Dialog for adding surgical procedures */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogContent>
          <h6>Add Surgical Procedure</h6>
          <TextField
            fullWidth
            label="Search Procedure"
            variant="standard"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: 16, marginTop: 5 }}
          />
          <List
            style={{
              height: 200,
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: 4,
              marginBottom: 16,
            }}
          >
            {searchQuery &&
              (filteredProcedures.length > 0 ? (
                filteredProcedures.map((procedure, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => setSelectedProcedure(procedure)}
                    sx={{
                      backgroundColor:
                        selectedProcedure === procedure ? "#d3d3d3" : "white",
                      ":hover": {
                        backgroundColor: "#f1f1f1",
                      },
                    }}
                  >
                    <ListItemText primary={procedure} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No procedures found" />
                </ListItem>
              ))}
          </List>
          <Box>
            <h6>Normal Rate</h6>
            <Grid container spacing={2}>
              {/* Quantity Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  variant="standard"
                />
              </Grid>

              {/* Price Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  variant="standard"
                />
              </Grid>

              {/* Discount Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  variant="standard"
                />
              </Grid>

              {/* Covered Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Covered"
                  name="covered"
                  value={formData.covered}
                  onChange={handleChange}
                  variant="standard"
                />
              </Grid>

              {/* Deductible Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Deductible"
                  type="number"
                  name="deductible"
                  variant="standard"
                  value={formData.deductible}
                  onChange={handleChange}
                />
              </Grid>

              {/* Remarks Field */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: 2,
            }}
          >
            <Button variant="contained" style={{ backgroundColor: "#007bff" }}>
              Select
            </Button>
            <Button variant="contained" style={{ backgroundColor: "#dc3545" }}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SurgicalProcedures;
