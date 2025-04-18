import React, { useEffect, useState } from "react";
import Notes from "../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { fetchTreatmentPlanNote } from "../../Redux/slice/IpSlice/GET/TreatmentPlanNote";
import { createTreatmentPlanNote } from "../../Redux/slice/IpSlice/POST/TreatmentPlanNote";
import { updateTreatmentPlanNoteNote } from "../../Redux/slice/IpSlice/PUT/TreatmentPlanNote";
import { deleteTreatmentPlan } from "../../Redux/slice/IpSlice/DELETE/TreatmentPlanNote";

const TreatementPlan = ({ patientId }) => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const { data } = useSelector((state) => state?.docEmr?.treatmentPlanNote);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchTreatmentPlanNote({ patientId }));
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
    dispatch(createTreatmentPlanNote({ notesDescription: note, patientId }))
      .then(() => dispatch(fetchTreatmentPlanNote({ patientId })))
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
    dispatch(updateTreatmentPlanNoteNote(payload))
      .then(() => dispatch(fetchTreatmentPlanNote({ patientId })))
      .catch((error) => console.error("Error updating note:", error));
  };

  const handleDeleteNote = (deletedNote) => {
    console.log("deletedNote", deletedNote);

    if (!deletedNote || !deletedNote.id) {
      console.error("Delete failed: No valid ID found.");
      return;
    }

    dispatch(deleteTreatmentPlan({ id: deletedNote.id }))
      .then(() => dispatch(fetchTreatmentPlanNote({ patientId })))
      .catch((error) => console.error("Error deleting note:", error));
  };
  return (
    <div>
      <Notes
        title={" Treatment Plan"}
        rows={notes}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
        addBtnName={"Add Treatment Plan"}
        label="Plan of care"
      />
    </div>
  );
};

export default TreatementPlan;
