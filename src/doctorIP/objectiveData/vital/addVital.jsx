import { Dialog, DialogContent, Box } from "@mui/material";
import React, { useState } from "react";
import FormInput from "../../../component/FormInput";
import FormButton from "../../../component/FormButton";
import { useDispatch } from "react-redux";
import { fetchAddVital } from "../../../Redux/slice/DoctSlice/POST/addVitalSlice";

export const AddVital = ({ handleCloseAddVital, patientId, getVital }) => {
  const dispatch = useDispatch();
  const [vitalData, setVitalData] = useState({
    temperature: "",
    bpSystolic: "",
    bpDiastolic: "",
    pulse: "",
    respiratory: "",
    o2Saturation: "",
    bloodSugar: "",
  });

  const handleChange = (field) => (value) => {
    setVitalData((prev) => ({
      ...prev,
      [field]: value || "", 
    }));
  };

  const handleAdd = () => {
    dispatch(fetchAddVital({ ...vitalData, patientId }))
      .then(() => getVital()) // Ensure data is fetched after adding
      .finally(() => handleCloseAddVital()); // Close dialog after completion
  };
  return (
    <Dialog open={true} onClose={handleCloseAddVital} maxWidth="md" fullWidth>
      <DialogContent>
        <Box>
          <div className="header-text">Add Vital Sign</div>
          <div className="form-container form-bg mt-2">
            <FormInput
              label="Temperature (°C)"
              value={vitalData.temperature}
              onChange={handleChange("temperature")}
            />
            <FormInput
              label="B.P (Systolic) (mmHg)"
              value={vitalData.bpSystolic}
              onChange={handleChange("bpSystolic")}
            />
            <FormInput
              label="B.P (Diastolic) (mmHg)"
              value={vitalData.bpDiastolic}
              onChange={handleChange("bpDiastolic")}
            />
            <FormInput
              label="Pulse (BPM)"
              value={vitalData.pulse}
              onChange={handleChange("pulse")}
            />
            <FormInput
              label="Respiratory (rpm)"
              value={vitalData.respiratory}
              onChange={handleChange("respiratory")}
            />
            <FormInput
              label="O2 Saturation (%)"
              value={vitalData.o2Saturation}
              onChange={handleChange("o2Saturation")}
            />
            <FormInput
              label="Blood Sugar (mmol/L)"
              value={vitalData.bloodSugar}
              onChange={handleChange("bloodSugar")}
            />
          </div>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <FormButton label="Add" onClick={handleAdd} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
