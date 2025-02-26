import React, { useState } from "react";
import Notes from "../components/Notes";

const Discharge = () => {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (updatedNotes) => {
    setNotes(updatedNotes);
  };

  return (
    <Notes
      title={"Discharge Notes"}
      rows={notes}
      onAddNote={handleAddNote}
      addBtnName={"Add Discharge Notes"}
    />
  );
};

export default Discharge;
