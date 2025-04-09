import React, { useEffect, useState } from "react";
import Notes from "../../../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { createClinicalExamination } from "../../../../Redux/slice/DoctSlice/POST/clinicalExam";
import { fetchClinicalExamination } from "../../../../Redux/slice/DoctSlice/GET/clinicalExamSlice";
import { updateClinicalExamination } from "../../../../Redux/slice/DoctSlice/PUT/clinicalSlice";

function DisplayClinicalExamination({ appointmentId, patientId }) {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);

  const { data } = useSelector((state) => state?.docEmr?.clinical);

  const handleAddNote = (updatedNotes) => {
    const note = updatedNotes[updatedNotes.length - 1]?.notes || "";
    dispatch(
      createClinicalExamination({
        examinationAssessment: note,
        appointmentId,
      })
    ).then(() => dispatch(fetchClinicalExamination({ appointmentId })));
  };

  const handleEditNote = (updatedNotes) => {
    const note = updatedNotes[updatedNotes.length - 1]?.notes || "";
    dispatch(
      updateClinicalExamination({
        examinationAssessment: note,
        appointmentId,
      })
    ).then(() => dispatch(fetchClinicalExamination({ appointmentId })));
  };

  const handleDeleteNote = (deletedNote) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== deletedNote.id)
    );
  };

  useEffect(() => {
    dispatch(fetchClinicalExamination({ appointmentId }));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const formattedNotes = data.map((item, index) => ({
        id: index + 1,
        notes: item.clinicalExamination || "No data",
        enteredDate: new Date().toISOString().split("T")[0],
        enteredBy: "Kowshika",
      }));
      setNotes(formattedNotes);
    }
  }, [data]);

  return (
    <div className="mb-4">
      <Notes
        title={"Clinical Examination / Assessment"}
        label={"Clinical Examination"}
        addBtnName={"Add Clinical Examination"}
        rows={notes}
        onDeleteNote={handleDeleteNote}
        onAddNote={handleAddNote}
        onEditNote={handleEditNote}
      />
    </div>
  );
}

export default DisplayClinicalExamination;
