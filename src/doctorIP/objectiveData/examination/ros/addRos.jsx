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

function AddRos({ handleAddRosModalClose, reviews }) {
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const handleChange = (name, value) => {
    if (name === "specialization") {
      setSelectedSpecialization(value);
    }
  };

  const handleSymptomKeyPress = (event) => {
    if (event.key === "Enter" && event.target.value) {
      setSymptoms((prev) => [...prev, event.target.value]);
      event.target.value = "";
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
    const formData = {
      specialization: selectedSpecialization,
      symptoms: symptoms,
      checkedItems: checkedItems,
    };
    reviews(formData); // Pass formData back to DisplayRos
    handleAddRosModalClose();
  };

  return (
    <Dialog open onClose={handleAddRosModalClose} fullWidth maxWidth="md">
      <DialogContent>
        <h6>Add Chief Complaints</h6>
        <div className="form-container mb-4">
          <FormInput
            label="Specialization"
            type="select"
            value={selectedSpecialization}
            onChange={(value) => handleChange("specialization", value)}
            options={options}
          />
          <FormInput label="Symptoms" onKeyPress={handleSymptomKeyPress} />
          <div className="mt-auto">
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
        </div>
        <div className="header-container">
          <h6>Other Review Systems</h6>
          <Button
            variant={selectAll ? "contained" : "outlined"}
            onClick={handleSelectAll}
            size="small"
          >
            {selectAll ? "Unselect" : "Select"}
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
