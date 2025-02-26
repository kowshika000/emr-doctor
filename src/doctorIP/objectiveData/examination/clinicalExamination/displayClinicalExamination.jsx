import React, { useState } from "react";
import Notes from "../../../components/Notes";

function DisplayClinicalExamination() {
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
        title={"Clinical Examination / Assessment"}
        label={"Clinical Examination"}
        addBtnName={"Add Clinical Examination"}
        rows={notes}
        onDeleteNote={handleDeleteNote}
        onAddNote={handleAddNote}
      />
    </div>
  );
}

export default DisplayClinicalExamination;
