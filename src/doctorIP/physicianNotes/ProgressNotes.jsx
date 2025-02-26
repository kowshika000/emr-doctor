import React, { useState } from "react";
import Notes from "../components/Notes";

const Progress = () => {
    const [notes, setNotes] = useState([]);

    const handleAddNote = (updatedNotes) => {
      setNotes(updatedNotes);
    };
  
    const handleDeleteNote = (deletedNote) => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== deletedNote.id));
    };
  return (
    <Notes
      title={"Progress Notes"}
      rows={notes} 
      onAddNote={handleAddNote}  
      onDeleteNote={handleDeleteNote} 
      addBtnName={"Add Progress Notes"}
    />
  );
};

export default Progress;
