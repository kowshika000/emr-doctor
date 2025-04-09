import React, { useEffect, useState } from "react";
import Notes from "../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { fetchDischargeNote } from "../../Redux/slice/IpSlice/GET/dischargeNote";
import { createDischargeNote } from "../../Redux/slice/IpSlice/POST/dischargeNote";
import { updateDischargeNote } from "../../Redux/slice/IpSlice/PUT/dischargeNote";
import { deleteDischargeNote } from "../../Redux/slice/IpSlice/DELETE/dischargeNote";

const Discharge = ({ patientId }) => {
  const dispatch = useDispatch();

  const [notes, setNotes] = useState([]);
  const { data } = useSelector((state) => state?.docEmr?.dischargeNote);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchDischargeNote({ patientId }));
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
    dispatch(createDischargeNote({ notesDescription: note, patientId }))
      .then(() => dispatch(fetchDischargeNote({ patientId })))
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
    dispatch(updateDischargeNote(payload))
      .then(() => dispatch(fetchDischargeNote({ patientId })))
      .catch((error) => console.error("Error updating note:", error));
  };

  const handleDeleteNote = (deletedNote) => {
    console.log("deletedNote", deletedNote);

    if (!deletedNote || !deletedNote.id) {
      console.error("Delete failed: No valid ID found.");
      return;
    }

    dispatch(deleteDischargeNote({ id: deletedNote.id }))
      .then(() => dispatch(fetchDischargeNote({ patientId })))
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <Notes
      title={"Discharge Notes"}
      rows={notes}
      onAddNote={handleAddNote}
      onDeleteNote={handleDeleteNote}
      onEditNote={handleEditNote}
      addBtnName={"Add Discharge Notes"}
    />
  );
};

export default Discharge;
