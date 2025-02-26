import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  DialogContent,
  Dialog,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomTable from "../components/Table";

const SurgeryDiagnosis = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [openMdl, setopenMdl] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [rows, setRows] = useState([
    {
      id: 1,
      diagnosis: "Choledocal cyst",
      enteredDate: "2024-11-21",
      category: "Primary",
    },
    {
      id: 2,
      diagnosis: "Appendicitis",
      enteredDate: "2024-11-20",
      category: "Primary",
    },
    {
      id: 3,
      diagnosis: "Gallstones",
      enteredDate: "2024-11-19",
      category: "final",
    },
    {
      id: 4,
      diagnosis: "Hernia",
      enteredDate: "2024-11-18",
      category: "final",
    },
    {
      id: 5,
      diagnosis: "Pancreatitis",
      enteredDate: "2024-11-17",
      category: "final",
    },
  ]);

  const allDiagnoses = [
    "Appendicitis",
    "Cholelithiasis",
    "Hernia",
    "Intestinal Obstruction",
    "Breast Cancer",
    "Colon Cancer",
    "Osteoarthritis",
    "Peptic Ulcer Perforation",
    "Aneurysm",
    "Traumatic Fracture",
    "Pancreatitis",
    "Thyroid Nodules",
    "Diverticulitis",
    "Kidney Stones",
    "Cataracts",
  ];

  const filteredDiagnoses = allDiagnoses.filter((diagnosis) =>
    diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "category", headerName: "Category", flex: 1 },
    { field: "diagnosis", headerName: "Diagnosis", flex: 1 },
    { field: "enteredDate", headerName: "Entered Date", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleMenuOpen(event, params.row)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  const handleMenuOpen = (event, row) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRowId(row.id);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMakePrimary = () => {
    handleMenuClose();
  };

  const handleSelectDiagnosis = (diagnosis) => {
    setSelectedDiagnosis((prev) => (prev === diagnosis ? null : diagnosis));
  };

  return (
    <div>
      <div className="header-container my-4" >
        <div className="h6" >Surgery Diagnosis</div>
        <Box
        
          className=" custom-btn"
          onClick={() => setopenMdl(true)}
        >
          Add Surgery Diagnosis
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
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMakePrimary}>Make diagnosis primary</MenuItem>
        <MenuItem onClick={handleMenuClose}>Move to final diagnosis</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
      </Menu>
      <Dialog open={openMdl} onClose={() => setopenMdl(false)} fullWidth>
        <DialogContent>
          <h6>Add Surgery Diagnosis</h6>
          <TextField
            fullWidth
            label="Search Diagnosis"
            variant="standard"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: 16, marginTop: 5 }}
          />
          <Box>
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
                (filteredDiagnoses.length > 0 ? (
                  filteredDiagnoses.map((diagnosis, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => handleSelectDiagnosis(diagnosis)}
                      sx={{
                        backgroundColor:
                          selectedDiagnosis === diagnosis ? "#d3d3d3" : "white",
                        ":hover": {
                          backgroundColor: "#f1f1f1",
                        },
                      }}
                    >
                      <ListItemText primary={diagnosis} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No items found" />
                  </ListItem>
                ))}
            </List>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "#007bff" }}
              >
                Select
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#dc3545" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SurgeryDiagnosis;
