import React, { useEffect, useState } from "react";
import Notes from "../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { createNurseNote } from "../../Redux/slice/DoctSlice/POST/nurseNoteSlice";
import { fetchNurseNote } from "../../Redux/slice/DoctSlice/GET/nurseNoteSlice";
import { updateNurseNote } from "../../Redux/slice/DoctSlice/PUT/nurseNoteSlice";
import { deleteNurseNote } from "../../Redux/slice/DoctSlice/DELETE/nurseNoteSlice";

const NurseNotes = ({ patientId, appointmentId }) => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);

  const { data } = useSelector((state) => state?.docEmr?.nurseNote);

  useEffect(() => {
    if (appointmentId) {
      dispatch(fetchNurseNote({ appointmentId }));
    }
  }, [dispatch, appointmentId]);

  useEffect(() => {
    const loginUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(loginUser);

    if (data) {
      const formattedNotes = data.map((item, index) => {
        return {
          id: item.id,
          notes: item.nurseNotes || "No data",
          enteredDate: "--",
          enteredBy:  "--",
        };
      });

      setNotes(formattedNotes);
    }
  }, [data]);

  const handleAddNote = (updatedNotes) => {
    const note = updatedNotes[updatedNotes.length - 1]?.notes || "";
    dispatch(createNurseNote({ nurseNotes: note, appointmentId }))
      .then(() => dispatch(fetchNurseNote({ appointmentId })))
      .catch((error) => console.error("Error adding note:", error));
  };

  const handleEditNote = (editedNote) => {
    console.log("Incoming editedNote:", editedNote); // debug

    if (!editedNote || !editedNote.id) {
      console.error("Edit failed: No valid ID found.");
      return;
    }

    dispatch(
      updateNurseNote({
        id: editedNote.id,
        nurseNotes: editedNote.notes,
        appointmentId,
      })
    )
      .then(() => dispatch(fetchNurseNote({ appointmentId })))
      .catch((error) => console.error("Error updating note:", error));
  };

  const handleDeleteNote = (deletedNote) => {
    console.log("deletedNote", deletedNote);

    if (!deletedNote || !deletedNote.id) {
      console.error("Delete failed: No valid ID found.");
      return;
    }

    dispatch(deleteNurseNote({ nurseNoteId: deletedNote.id }))
      .then(() => dispatch(fetchNurseNote({ appointmentId })))
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <div className="full-screen-scrollable">
      <Notes
        title={"Nurse Notes"}
        rows={notes}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        addBtnName={"Add Post-Operative Notes"}
        onEditNote={handleEditNote}
      />
    </div>
  );
};

export default NurseNotes;
