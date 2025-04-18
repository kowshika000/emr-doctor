import React, { useEffect, useState } from "react";
import Notes from "../../../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { createConfidentialStatement } from "../../../../Redux/slice/DoctSlice/POST/confidentialSlice";
import { fetchConfidentialStatement } from "../../../../Redux/slice/DoctSlice/GET/confidentialSlice";
import { updateConfidentialStatement } from "../../../../Redux/slice/DoctSlice/PUT/confidentialSlice";
import { deleteCofidential } from "../../../../Redux/slice/IpSlice/DELETE/confidential";

function DisplayConfidentalDetails({ patientId }) {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);

  const { data } = useSelector((state) => state?.docEmr?.confidential);

  const handleAddNote = (updatedNotes) => {
    const note = updatedNotes[updatedNotes.length - 1]?.notes || "";
    dispatch(
      createConfidentialStatement({
        confidentialStatement: note,
        patientId,
      })
    ).then(() => dispatch(fetchConfidentialStatement({ patientId })));
  };

  const handleEditNote = (updatedNotes) => {
    const note = updatedNotes[updatedNotes.length - 1]?.notes || "";
    dispatch(
      updateConfidentialStatement({
        confidentialStatement: note,
        patientId,
      })
    ).then(() => dispatch(fetchConfidentialStatement({ patientId })));
  };

  const handleDeleteNote = (deletedNote) => {
    dispatch(deleteCofidential({ id: deletedNote.id }))
      .then(() => dispatch(fetchConfidentialStatement({ patientId })))
      .catch((error) => console.error("Error deleting note:", error));
  };

  useEffect(() => {
    dispatch(fetchConfidentialStatement({ patientId }));
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const formattedNotes = data.map((item, index) => ({
        id: index + 1,
        notes: item.confidentialStatement || "No data",
        enteredDate: item.createdAt || "--",
        enteredBy: item.createdBy || "--",
      }));
      setNotes(formattedNotes);
    } else {
      setNotes([]);
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
