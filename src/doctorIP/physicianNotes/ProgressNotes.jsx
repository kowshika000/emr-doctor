import React, { useEffect, useState } from "react";
import Notes from "../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgressNote } from "../../Redux/slice/IpSlice/GET/progressNote";
import { createProgressNote } from "../../Redux/slice/IpSlice/POST/progressNote";
import { updateProgressNote } from "../../Redux/slice/IpSlice/PUT/progressNote";
import { deleteProgressNote } from "../../Redux/slice/IpSlice/DELETE/progressNote";

const Progress = ({ patientId }) => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const { data } = useSelector((state) => state?.docEmr?.progress);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchProgressNote({ patientId }));
    }
  }, [dispatch, patientId]);

  useEffect(() => {
    if (data) {
      const formattedNotes = data?.map((item, index) => {
        return {
          id: item.EmrNotesId,
          notes: item.notesDescription || "--",
          enteredDate: item.createdAt || "--",
          enteredBy: item.createdBy || "--",
        };
      });

      setNotes(formattedNotes);
    }
  }, [data]);

  const handleAddNote = (updatedNotes) => {
    const note = updatedNotes[updatedNotes.length - 1]?.notes || "";
    dispatch(createProgressNote({ notesDescription: note, patientId }))
      .then(() => dispatch(fetchProgressNote({ patientId })))
      .catch((error) => console.error("Error adding note:", error));
  };

  const handleEditNote = (editedNote) => {
    console.log("Incoming editedNote:", editedNote);

    if (!editedNote || !editedNote.id) {
      console.error("Edit failed: No valid ID found.");
      return;
    }
    const payload = {
      id: editedNote.id,
      newDescription: editedNote.notes,
      patientId,
    };
    dispatch(updateProgressNote(payload))
      .then(() => dispatch(fetchProgressNote({ patientId })))
      .catch((error) => console.error("Error updating note:", error));
  };

  const handleDeleteNote = (deletedNote) => {
    console.log("deletedNote", deletedNote);

    if (!deletedNote || !deletedNote.id) {
      console.error("Delete failed: No valid ID found.");
      return;
    }

    dispatch(deleteProgressNote({ id: deletedNote.id }))
      .then(() => dispatch(fetchProgressNote({ patientId })))
      .catch((error) => console.error("Error deleting note:", error));
  };
  return (
    <Notes
      title={"Progress Notes"}
      rows={notes}
      onAddNote={handleAddNote}
      onDeleteNote={handleDeleteNote}
      onEditNote={handleEditNote}
      addBtnName={"Add Progress Notes"}
    />
  );
};

export default Progress;
