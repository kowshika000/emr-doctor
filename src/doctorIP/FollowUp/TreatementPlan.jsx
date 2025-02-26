import React, { useState } from "react";
import Notes from "../components/Notes";

const TreatementPlan = () => {
  const [plan, setPlan] = useState([]);

  // Add new note or update an existing note
  const handleAddPlan = (updatedPlan) => {
    setPlan(updatedPlan);
  };

  // Handle note deletion
  const handleDeletePlan = (deletedPlan) => {
    setPlan((prevPlan) =>
      prevPlan.filter((note) => note.id !== deletedPlan.id)
    );
  };

  return (
    <div>
      <Notes
        title={" Treatment Plan"}
        rows={plan}
        onAddNote={handleAddPlan}
        onDeleteNote={handleDeletePlan}
        addBtnName={"Add Treatment Plan"}
        label="Plan of care"
      />
    </div>
  );
};

export default TreatementPlan;
