import React, { useEffect, useState } from "react";
import Notes from "../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { fetchPacuOprNote } from "../../Redux/slice/IpSlice/GET/pacuOprNote";
import { createPacuOprNote } from "../../Redux/slice/IpSlice/POST/pacuOprNote";
import { updatePacuOprNote } from "../../Redux/slice/IpSlice/PUT/pacuOprNote";
import { deletePacuOprNote } from "../../Redux/slice/IpSlice/DELETE/pacuOprNote";

const PACUOpNotes = ({patientId}) => {
   const dispatch = useDispatch();
    const [notes, setNotes] = useState([]);
    const { data } = useSelector((state) => state?.docEmr?.pacuNote);
  
    useEffect(() => {
      if (patientId) {
        dispatch(fetchPacuOprNote({ patientId }));
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
      dispatch(createPacuOprNote({ notesDescription: note, patientId }))
        .then(() => dispatch(fetchPacuOprNote({ patientId })))
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
      dispatch(updatePacuOprNote(payload))
        .then(() => dispatch(fetchPacuOprNote({ patientId })))
        .catch((error) => console.error("Error updating note:", error));
    };
  
    const handleDeleteNote = (deletedNote) => {
      console.log("deletedNote", deletedNote);
  
      if (!deletedNote || !deletedNote.id) {
        console.error("Delete failed: No valid ID found.");
        return;
      }
  
      dispatch(deletePacuOprNote({ id: deletedNote.id }))
        .then(() => dispatch(fetchPacuOprNote({ patientId })))
        .catch((error) => console.error("Error deleting note:", error));
    };

  return (
    <Notes
      title={"PACU-Operative Notes"}
      rows={notes} 
      onAddNote={handleAddNote}
      onDeleteNote={handleDeleteNote}
      onEditNote={handleEditNote}
      addBtnName={"Add PACU-Operative Notes"}
    />
  );
};

export default PACUOpNotes;
