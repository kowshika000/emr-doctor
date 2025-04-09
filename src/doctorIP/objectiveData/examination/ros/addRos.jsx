import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Chip,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";
import FormInput from "../../../../component/FormInput";
import FormButton from "../../../../component/FormButton";
import { useDispatch } from "react-redux";
import { createROS } from "../../../../Redux/slice/DoctSlice/POST/addrosSlice";

const options = [
  { value: "Genitourinary", label: "Genitourinary" },
  { value: "Allergic/Immunologic", label: "Allergic/Immunologic" },
  { value: "Musculoskeletal", label: "Musculoskeletal" },
  { value: "Integumentary", label: "Integumentary" },
  { value: "Neurological", label: "Neurological" },
];

const symptomsList = [
  "Constitutional Symptoms",
  "Eyes",
  "E N M T",
  "Cardiovascular",
  "Respiratory",
  "Gastrointestinal",
  "Genitourinary",
  "Musculoskeletal",
  "Neurological",
  "Psychiatric",
  "Endocrine",
  "Hematologic/Lymphatic",
  "Allergic/Immunologic",
  "Integumentary",
  "Test",
];

function AddRos({ handleAddRosModalClose, reviews, getROS }) {
  const dispatch = useDispatch();
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [newSymptom, setNewSymptom] = useState("");

  const handleSymptomKeyDown = (event) => {
    if (event.key === "Enter" && newSymptom.trim() !== "") {
      setSymptoms((prev) => [...prev, newSymptom.trim()]);
      setNewSymptom(""); // Clear input after adding
      event.preventDefault(); // Prevent form submission
    }
  };

  const handleCheckboxChange = (symptom) => {
    setCheckedItems((prev) => ({
      ...prev,
      [symptom]: !prev[symptom],
    }));
  };

  const handleSelectAll = () => {
    const allChecked = !selectAll;
    setSelectAll(allChecked);
    const newCheckedItems = {};
    symptomsList.forEach((symptom) => {
      newCheckedItems[symptom] = allChecked;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleSave = () => {
    const formattedData = {
      specialization: selectedSpecialization || "",
      symptoms: symptoms.join(", "),
      constitutionalSymptoms: checkedItems["Constitutional Symptoms"] || false,
      eyes: checkedItems["Eyes"] || false,
      enmt: checkedItems["E N M T"] || false,
      cardiovascular: checkedItems["Cardiovascular"] || false,
      respiratory: checkedItems["Respiratory"] || false,
      gastrointestinal: checkedItems["Gastrointestinal"] || false,
      genitourinary: checkedItems["Genitourinary"] || false,
      musculoskeletal: checkedItems["Musculoskeletal"] || false,
      neurological: checkedItems["Neurological"] || false,
      psychiatric: checkedItems["Psychiatric"] || false,
      endocrine: checkedItems["Endocrine"] || false,
      hematologicLymphatic: checkedItems["Hematologic/Lymphatic"] || false,
      allergicImmunologic: checkedItems["Allergic/Immunologic"] || false,
      integumentary: checkedItems["Integumentary"] || false,
      test: checkedItems["Test"] || false,
      appointmentId: 707,
    };
    dispatch(createROS(formattedData))
      .then(() => {
        getROS(); // Fetch updated data after creation
        handleAddRosModalClose(); // Close modal after success
      })
      .catch((error) => {
        console.error("Error saving ROS:", error);
      });
  };

  return (
    <Dialog open onClose={handleAddRosModalClose} fullWidth maxWidth="md">
      <DialogContent>
        <h6>Add Chief Complaints</h6>
        <div className="form-inputs mb-4">
          <FormInput
            label="Specialization"
            type="select"
            value={selectedSpecialization}
            onChange={(value) => setSelectedSpecialization(value)}
            options={options}
          />
          <FormInput
            label="Add Symptoms"
            value={newSymptom}
            onChange={(value) => setNewSymptom(value)}
            onKeyPress={handleSymptomKeyDown}
            style={{ marginRight: 8, marginLeft: 8 }}
          />
        </div>
        <div className="m-3">
          {symptoms.map((symptom, index) => (
            <Chip
              key={index}
              label={symptom}
              onDelete={() =>
                setSymptoms(symptoms.filter((s) => s !== symptom))
              }
              style={{ marginRight: 8, marginBottom: 8 }}
            />
          ))}
        </div>
        <div className="header-container">
          <h6>Other Review Systems</h6>
          <Button
            variant={selectAll ? "contained" : "outlined"}
            onClick={handleSelectAll}
            size="small"
          >
            {selectAll ? "Unselect All" : "Select All"}
          </Button>
        </div>
        <div className="form-container mb-4">
          {symptomsList.map((symptom, index) => (
            <div key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems[symptom] || false}
                    onChange={() => handleCheckboxChange(symptom)}
                    size="small"
                  />
                }
                label={symptom}
              />
            </div>
          ))}
        </div>

        <div className="form-button">
          <FormButton label="Save Changes" onClick={handleSave} />
          <FormButton label="Close" onClick={handleAddRosModalClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddRos;
