import React,{useState} from "react";
import Notes from "../components/Notes";

const NurseNotes = () => {
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
    <div className="full-screen-scrollable">
    <Notes
      title={"Nurse Notes"}
      rows={notes}
      onAddNote={handleAddNote}
      onDeleteNote={handleDeleteNote}
      addBtnName={"Add Post-Operative Notes"}
    />
    </div>
  );
};
export default NurseNotes;
