import React, { useState } from "react";
import Notes from "../components/Notes";

const IntraOpNotes = () => {
  const [notes, setNotes] = useState([]);

  // Add new note or update an existing note
  const handleAddNote = (updatedNotes) => {
    setNotes(updatedNotes);
  };

  // Handle note deletion
  const handleDeleteNote = (deletedNote) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== deletedNote.id));
  };

  return (
    <Notes
      title={"Intra-Operative Notes"}
      rows={notes} 
      onAddNote={handleAddNote}  
      onDeleteNote={handleDeleteNote} 
      addBtnName={"Add Intra-Operative Notes"}
    />
  );
};

export default IntraOpNotes;
