import React, { useEffect, useState } from "react";
import Notes from "../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { fetchIntraOprNote } from "../../Redux/slice/IpSlice/GET/intraOprNote";
import { deleteIntraOprNote } from "../../Redux/slice/IpSlice/DELETE/intraOprNote";
import { updateIntraOprNote } from "../../Redux/slice/IpSlice/PUT/intraOprNote";
import { createIntraOprNote } from "../../Redux/slice/IpSlice/POST/intraOprNote";

const IntraOpNotes = ({ patientId }) => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const { data } = useSelector((state) => state?.docEmr?.intraNote);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchIntraOprNote({ patientId }));
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
    dispatch(createIntraOprNote({ notesDescription: note, patientId }))
      .then(() => dispatch(fetchIntraOprNote({ patientId })))
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
    dispatch(updateIntraOprNote(payload))
      .then(() => dispatch(fetchIntraOprNote({ patientId })))
      .catch((error) => console.error("Error updating note:", error));
  };

  const handleDeleteNote = (deletedNote) => {
    console.log("deletedNote", deletedNote);

    if (!deletedNote || !deletedNote.id) {
      console.error("Delete failed: No valid ID found.");
      return;
    }

    dispatch(deleteIntraOprNote({ id: deletedNote.id }))
      .then(() => dispatch(fetchIntraOprNote({ patientId })))
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <Notes
      title={"Intra-Operative Notes"}
      rows={notes}
      onAddNote={handleAddNote}
      onDeleteNote={handleDeleteNote}
      onEditNote={handleEditNote}
      addBtnName={"Add Intra-Operative Notes"}
    />
  );
};

export default IntraOpNotes;
