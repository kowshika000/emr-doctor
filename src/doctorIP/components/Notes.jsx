import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomTable from "./Table";
import FormButton from "../../component/FormButton";

const Notes = ({ title, rows, onAddNote, onDeleteNote, addBtnName, label }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Open menu for options (Edit/Delete)
  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      // Ensure selectedRow is not null
      const updatedRows = rows.filter((row) => row.id !== selectedRow.id);
      onDeleteNote(selectedRow); // Pass deleted note to the parent
      handleMenuClose();
    }
  };

  // Handle form submission and adding a new note or updating an existing note
  const handleAddOrUpdateNote = () => {
    if (newNote.trim()) {
      const updatedRows = [...rows];
      if (isEditing) {
        if (selectedRow && selectedRow.id) {
          // Ensure selectedRow is not null
          // Update existing note
          const index = updatedRows.findIndex(
            (row) => row.id === selectedRow.id
          );
          updatedRows[index] = {
            ...selectedRow,
            notes: newNote,
            enteredDate: new Date().toISOString().split("T")[0], // Current date
            enteredBy: "Kowshika", // Replace with actual user if needed
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
      onAddNote(updatedRows);
      setNewNote("");
      setShowNoteForm(false);
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
      setShowNoteForm(true);
      handleMenuClose();
    }
  };

  return (
    <div className="">
      <div className="header-container my-4">
        <h6>{title}</h6>
        {showNoteForm ? (
          <FormButton
            label={isEditing ? "Update / Close" : "Submit / Close"}
            onClick={handleAddOrUpdateNote}
          />
        ) : (
          <Box
            className="custom-btn"
            onClick={() => {
              setShowNoteForm(true);
              setIsEditing(false);
            }}
          >
            {addBtnName}
          </Box>
        )}
      </div>

      {showNoteForm && (
        <div className="" >
          <Grid container  justifyContent="center">
            <Grid item xs={12} >
              <TextField
                label={label ? label : "Enter Note"}
                variant="filled"
                fullWidth
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={4} container justifyContent="flex-end">
              <Box alignSelf={"center"}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddOrUpdateNote}
                >
                  {isEditing ? "Update" : "Submit"}
                </Button>
              </Box>
            </Grid> */}
          </Grid>
        </div>
      )}
      {showNoteForm ? (
        " "
      ) : rows?.length === 0 ? (
        <div style={{ borderBottom: "1px solid gray" }}>
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default Notes;
