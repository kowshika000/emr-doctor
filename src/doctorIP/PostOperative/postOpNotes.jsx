import React, { useState } from "react";
import Notes from "../components/Notes";

const PostOpNotes = () => {
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
      title={"Post-Operative Notes"}
      rows={notes} 
      onAddNote={handleAddNote}  
      onDeleteNote={handleDeleteNote} 
      addBtnName={"Add Post-Operative Notes"}
    />
  );
};

export default PostOpNotes;
