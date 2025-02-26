import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomTable from "./Table";

const NotesMdl = ({ title, rows, onAddNote, addBtnName, label }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Open menu for options (Edit/Delete)
  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleAddOrUpdateNote = () => {
    if (newNote.trim()) {
      const updatedRows = [...rows];
      if (isEditing) {
        if (selectedRow && selectedRow.id) {
          // Update existing note
          const index = updatedRows.findIndex(
            (row) => row.id === selectedRow.id
          );
          updatedRows[index] = {
            ...selectedRow,
            notes: newNote,
            enteredDate: new Date().toISOString().split("T")[0], 
            enteredBy: "Kowshika", 
          };
        }
      } else {
        // Add new note
        const newRow = {
          id: rows.length + 1, // You can improve this by using a unique ID generator
          notes: newNote,
          enteredDate: new Date().toISOString().split("T")[0], // Current date
          enteredBy: "Kowshika", // Replace with actual user if needed
        };
        updatedRows.push(newRow);
      }
      onAddNote(updatedRows); // Pass updated notes to the parent
      setNewNote("");
      setDialogOpen(false);
      setIsEditing(false);
    }
  };

  const columns = [
    {
      field: "notes",
      headerName: label ? label : "Notes",
      width: "150px",
      renderCell: (params) => (
        <div style={{ whiteSpace: "pre-line", padding: "5px" }}>
          {params.value}
        </div>
      ),
    },
    { field: "enteredDate", headerName: "Entered Date", flex: 1 },
    { field: "enteredBy", headerName: "Entered By", flex: 1 },
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

  // Show the edit form with the existing note's details
  const handleEdit = () => {
    if (selectedRow && selectedRow.id) {
      setNewNote(selectedRow.notes);
      setIsEditing(true);
      setDialogOpen(true);
      handleMenuClose();
    }
  };

  return (
    <div className="">
      <div className="header-container my-4">
        <h6>{title}</h6>
        <Box
          className="custom-btn"
          onClick={() => {
            setNewNote(""); // Clear previous note
            setIsEditing(false);
            setDialogOpen(true);
          }}
        >
          {addBtnName}
        </Box>
      </div>

      {/* Dialog for adding/editing notes */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth  maxWidth="lg">
        <DialogTitle>{isEditing ? "Edit Note" : "Add Note"}</DialogTitle>
        <DialogContent>
          <TextField
            label={label ? label : "Note"}
            variant="standard"
            fullWidth
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOrUpdateNote}
          >
            {isEditing ? "Update" : "Submit"}
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Show table when not adding/editing */}
      {!dialogOpen && rows?.length === 0 ? (
        <div className="custom-container">
          <p>No notes available</p>
        </div>
      ) : (
        <div>
          <CustomTable
            rows={rows}
            columns={columns}
            onOptionClick={handleMenuOpen}
          />
        </div>
      )}

      {/* Options Menu (Edit/Delete) */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>
    </div>
  );
};

export default NotesMdl;
