import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notes from "../../../components/Notes";
import { deleteManagementPlan } from "../../../../Redux/slice/DoctSlice/DELETE/managementSlice";
import { fetchManagementPlan } from "../../../../Redux/slice/DoctSlice/GET/managementSlice";
import { createManagementPlan } from "../../../../Redux/slice/DoctSlice/POST/managementSlice";
import { updateManagementPlan } from "../../../../Redux/slice/DoctSlice/PUT/managementSlice";

const MangementPlan = ({ patientId }) => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);

  const { data } = useSelector((state) => state?.docEmr?.management);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchManagementPlan({ patientId }));
    }
  }, [dispatch, patientId]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const formattedNotes = data.map((item) => ({
        id: item.id,
        notes: item.plan || "--",
        enteredDate: item.createdAt || "--",
        enteredBy: item.createdBy || "--",
      }));
      setNotes(formattedNotes);
    } else {
      setNotes([]); 
    }
  }, [data]);

  const handleAddNote = (updatedNotes) => {
    const note = updatedNotes[updatedNotes.length - 1]?.notes || "";
    dispatch(createManagementPlan({ plan: note, patientId }))
      .then(() => dispatch(fetchManagementPlan({ patientId })))
      .catch((error) => console.error("Error adding note:", error));
  };

  const handleEditNote = (editedNote) => {
    console.log("Incoming editedNote:", editedNote);
    if (!editedNote || !editedNote.id) {
      console.error("Edit failed: No valid ID found.");
      return;
    }

    dispatch(
      updateManagementPlan({
        id: editedNote.id,
        plan: editedNote.notes,
        patientId,
      })
    )
      .then(() => dispatch(fetchManagementPlan({ patientId })))
      .catch((error) => console.error("Error updating note:", error));
  };

  const handleDeleteNote = (deletedNote) => {
    console.log("deletedNote", deletedNote);

    if (!deletedNote || !deletedNote.id) {
      console.error("Delete failed: No valid ID found.");
      return;
    }

    dispatch(deleteManagementPlan({ id: deletedNote.id }))
      .then(() => dispatch(fetchManagementPlan({ patientId })))
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <div className="full-screen-scrollable">
      <Notes
        title={"Manegment Plan"}
        rows={notes}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        addBtnName={"Add Manegment Plan"}
        onEditNote={handleEditNote}
        label={"Plan"}
      />
    </div>
  );
};

export default MangementPlan;
