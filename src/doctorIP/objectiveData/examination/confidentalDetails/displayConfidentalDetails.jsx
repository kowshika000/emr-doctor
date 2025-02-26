import React, { useState } from "react";
import Notes from "../../../components/Notes";

function DisplayConfidentalDetails() {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (updatedNotes) => {
    setNotes(updatedNotes);
  };

  const handleDeleteNote = (deletedNote) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== deletedNote.id)
    );
  };

  return (
    <div className="mb-4">
    <Notes
      title={"Confidential Statement"}
      label={"Confidential Statement"}
      addBtnName={"Add Confidential Statement"}
      rows={notes}
      onDeleteNote={handleDeleteNote}
      onAddNote={handleAddNote}
    />
  </div>
  );
}
export default DisplayConfidentalDetails;
