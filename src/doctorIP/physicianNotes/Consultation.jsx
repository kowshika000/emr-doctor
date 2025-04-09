import React, { useEffect, useState } from "react";
import Notes from "../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { fetchConsultNote } from "../../Redux/slice/IpSlice/GET/consultationNote";
import { createConsultNote } from "../../Redux/slice/IpSlice/POST/consultationNote";
import { updateConsultationNote } from "../../Redux/slice/IpSlice/PUT/consultaionNote";
import { deleteConsultNote } from "../../Redux/slice/IpSlice/DELETE/consultNote";

const Consultation = ({ patientId }) => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const { data } = useSelector((state) => state?.docEmr?.consultation);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchConsultNote({ patientId }));
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
    dispatch(createConsultNote({ notesDescription: note, patientId }))
      .then(() => dispatch(fetchConsultNote({ patientId })))
      .catch((error) => console.error("Error adding note:", error));
  };

  const handleEditNote = (editedNote) => {
    console.log("Incoming editedNote:", editedNote); // debug

    if (!editedNote || !editedNote.id) {
      console.error("Edit failed: No valid ID found.");
      return;
    }
    const payload = {
      id: editedNote.id,
      newDescription: editedNote.notes,
      patientId,
    };
    dispatch(updateConsultationNote(payload))
      .then(() => dispatch(fetchConsultNote({ patientId })))
      .catch((error) => console.error("Error updating note:", error));
  };

  const handleDeleteNote = (deletedNote) => {
    console.log("deletedNote", deletedNote);

    if (!deletedNote || !deletedNote.id) {
      console.error("Delete failed: No valid ID found.");
      return;
    }

    dispatch(deleteConsultNote({ id: deletedNote.id }))
      .then(() => dispatch(fetchConsultNote({ patientId })))
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <Notes
      title={"Consultation Notes"}
      rows={notes}
      onAddNote={handleAddNote}
      onDeleteNote={handleDeleteNote}
      onEditNote={handleEditNote}
      addBtnName={"Add Consultation Notes"}
    />
  );
};

export default Consultation;
