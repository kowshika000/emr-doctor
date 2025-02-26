import React, { useState } from "react";
import Notes from "../components/Notes";

const Consultation = () => {
    const [notes, setNotes] = useState([]);

    const handleAddNote = (updatedNotes) => {
      setNotes(updatedNotes);
    };

  return (
    <Notes
      title={"Consultation Notes"}
      rows={notes} 
      onAddNote={handleAddNote}  
      addBtnName={"Add Consultation Notes"}
    />
  );
};

export default Consultation;
