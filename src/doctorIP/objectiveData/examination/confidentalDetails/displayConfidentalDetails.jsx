import React, { useEffect, useState } from "react";
import Notes from "../../../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { createConfidentialStatement } from "../../../../Redux/slice/DoctSlice/POST/confidentialSlice";
import { fetchConfidentialStatement } from "../../../../Redux/slice/DoctSlice/GET/confidentialSlice";
import { updateConfidentialStatement } from "../../../../Redux/slice/DoctSlice/PUT/confidentialSlice";

function DisplayConfidentalDetails({ appointmentId, patientId }) {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);

  const { data } = useSelector((state) => state?.docEmr?.confidential);

  const handleAddNote = (updatedNotes) => {
    const note = updatedNotes[updatedNotes.length - 1]?.notes || "";
    dispatch(
      createConfidentialStatement({
        confidentialStatement: note,
        appointmentId,
      })
    ).then(() => dispatch(fetchConfidentialStatement({ appointmentId })));
  };

  const handleEditNote = (updatedNotes) => {
    const note = updatedNotes[updatedNotes.length - 1]?.notes || "";
    dispatch(
      updateConfidentialStatement({
        confidentialStatement: note,
        appointmentId,
      })
    ).then(() => dispatch(fetchConfidentialStatement({ appointmentId })));
  };

  const handleDeleteNote = (deletedNote) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== deletedNote.id)
    );
  };

  useEffect(() => {
    dispatch(fetchConfidentialStatement({ appointmentId }));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const formattedNotes = data.map((item, index) => ({
        id: index + 1,
        notes: item.confidentialStatement || "No data",
        enteredDate: new Date().toISOString().split("T")[0],
        enteredBy: "Kowshika",
      }));
      setNotes(formattedNotes);
    }
  }, [data]);

  return (
    <div className="mb-4">
      <Notes
        title={"Confidential Statement"}
        label={"Confidential Statement"}
        addBtnName={"Add Confidential Statement"}
        rows={notes}
        onDeleteNote={handleDeleteNote}
        onAddNote={handleAddNote}
        onEditNote={handleEditNote}
      />
    </div>
  );
}
export default DisplayConfidentalDetails;
