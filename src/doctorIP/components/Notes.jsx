import React, { useState } from "react";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table } from "antd";
import FormButton from "../../component/FormButton";

const Notes = ({
  title,
  rows,
  onAddNote,
  onEditNote,
  onDeleteNote,
  addBtnName,
  label,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddOrUpdateNote = () => {
    if (newNote.trim()) {
      const updatedRows = [...rows];
      if (isEditing && selectedRow) {
        // Update existing note
        const index = updatedRows.findIndex((row) => row.id === selectedRow.id);
        if (index !== -1) {
          const updatedNote = {
            ...selectedRow,
            notes: newNote,
          };
          updatedRows[index] = updatedNote;

          onEditNote(updatedNote); // Send only the updated note
        }
      } else {
        // Add new note
        const newRow = {
          id: rows.length + 1,
          notes: newNote,
        };
        updatedRows.push(newRow);
        onAddNote(updatedRows); // Add returns full list
      }

      setNewNote("");
      setShowNoteForm(false);
      setIsEditing(false);
      setSelectedRow(null);
    }
  };

  const handleEdit = (row) => {
    console.log("Selected row for edit:", row);
    setNewNote(row.notes);
    setIsEditing(true);
    setShowNoteForm(true);
    setSelectedRow(row);
  };

  // Handle delete button click
  const handleDelete = (row) => {
    onDeleteNote(row);
  };

  // Table columns
  const columns = [
    {
      title: label || "Notes",
      dataIndex: "notes",
      key: "notes",
      render: (text) => (
        <div style={{ whiteSpace: "pre-line", padding: "5px" }}>{text}</div>
      ),
    },
    { title: "Entered Date", dataIndex: "enteredDate", key: "enteredDate" },
    { title: "Entered By", dataIndex: "enteredBy", key: "enteredBy" },
    {
      title: "Options",
      key: "options",
      render: (_, row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <IconButton onClick={() => handleEdit(row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row)} color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div>
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
              setNewNote("");
              setSelectedRow(null);
            }}
          >
            {addBtnName}
          </Box>
        )}
      </div>

      {showNoteForm ? (
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <TextField
              label={label || "Enter Note"}
              variant="filled"
              fullWidth
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
          </Grid>
        </Grid>
      ) : !showNoteForm && rows.length === 0 ? (
        <div style={{ borderBottom: "1px solid gray" }}>
          <p>No notes available</p>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={rows}
          rowKey="id"
          pagination={false}
          className="table-container"
        />
      )}
    </div>
  );
};

export default Notes;
