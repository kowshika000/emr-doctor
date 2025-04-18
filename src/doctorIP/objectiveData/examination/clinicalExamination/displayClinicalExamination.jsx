import React, { useEffect, useState } from "react";
import Notes from "../../../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { createClinicalExamination } from "../../../../Redux/slice/DoctSlice/POST/clinicalExam";
import { fetchClinicalExamination } from "../../../../Redux/slice/DoctSlice/GET/clinicalExamSlice";
import { updateClinicalExamination } from "../../../../Redux/slice/DoctSlice/PUT/clinicalSlice";
import { deleteClinical } from "../../../../Redux/slice/IpSlice/DELETE/clinical";

function DisplayClinicalExamination({ patientId }) {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);

  const { data } = useSelector((state) => state?.docEmr?.clinical);

  const handleAddNote = (updatedNotes) => {
    const note = updatedNotes[updatedNotes.length - 1]?.notes || "";
    dispatch(
      createClinicalExamination({
        examinationAssessment: note,
        patientId,
      })
    ).then(() => dispatch(fetchClinicalExamination({ patientId })));
  };

  const handleEditNote = (updatedNotes) => {
    const note = updatedNotes[updatedNotes.length - 1]?.notes || "";
    dispatch(
      updateClinicalExamination({
        examinationAssessment: note,
        patientId,
      })
    ).then(() => dispatch(fetchClinicalExamination({ patientId })));
  };

  const handleDeleteNote = (deletedNote) => {
    dispatch(deleteClinical({ id: deletedNote.id }))
      .then(() => dispatch(fetchClinicalExamination({ patientId })))
      .catch((error) => console.error("Error deleting note:", error));
  };

  useEffect(() => {
    dispatch(fetchClinicalExamination({ patientId }));
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const formattedNotes = data.map((item, index) => ({
        id: index + 1,
        notes: item.examinationAssessment || "--",
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
