import React, { useEffect, useState } from "react";
import Notes from "../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { fetchPreOprNote } from "../../Redux/slice/IpSlice/GET/preOprNote";
import { createPreOprNote } from "../../Redux/slice/IpSlice/POST/preOprNote";
import { updatePreOprNote } from "../../Redux/slice/IpSlice/PUT/preOprNote";
import { deletePreOprNote } from "../../Redux/slice/IpSlice/DELETE/preOprNote";

const PreOpNotes = ({ patientId }) => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const { data } = useSelector((state) => state?.docEmr?.preNote);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchPreOprNote({ patientId }));
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
    dispatch(createPreOprNote({ notesDescription: note, patientId }))
      .then(() => dispatch(fetchPreOprNote({ patientId })))
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
    dispatch(updatePreOprNote(payload))
      .then(() => dispatch(fetchPreOprNote({ patientId })))
      .catch((error) => console.error("Error updating note:", error));
  };

  const handleDeleteNote = (deletedNote) => {
    console.log("deletedNote", deletedNote);

    if (!deletedNote || !deletedNote.id) {
      console.error("Delete failed: No valid ID found.");
      return;
    }

    dispatch(deletePreOprNote({ id: deletedNote.id }))
      .then(() => dispatch(fetchPreOprNote({ patientId })))
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <Notes
      title={"Pre-Operative Notes"}
      rows={notes}
      onAddNote={handleAddNote}
      onDeleteNote={handleDeleteNote}
      onEditNote={handleEditNote}
      addBtnName={"Add Pre-Operative Notes"}
    />
  );
};

export default PreOpNotes;
