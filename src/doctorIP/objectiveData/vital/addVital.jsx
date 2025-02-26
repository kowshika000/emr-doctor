import { Dialog, DialogContent, Box } from "@mui/material";
import React, { useState } from "react";
import FormInput from "../../../component/FormInput";
import FormButton from "../../../component/FormButton";

export const AddVital = ({ handleCloseAddVital, onAddVital }) => {
  const [vitalData, setVitalData] = useState({
    temperature: "",
    systolicBP: "",
    diastolicBP: "",
    pulse: "",
    respiratoryRate: "",
    o2Saturation: "",
    bloodSugar: "",
  });

  const handleChange = (field, value) => {
    setVitalData({ ...vitalData, [field]: value });
  };

  const handleAdd = () => {
    onAddVital(vitalData);
    handleCloseAddVital();
  };

  return (
    <Dialog open={true} onClose={handleCloseAddVital} maxWidth="md">
      <DialogContent>
        <Box>
          <div className="header-text">Add Vital Sign</div>
          <div className="form-container form-bg">
            <FormInput
              label={"Temperature (°C)"}
              value={vitalData.temperature}
              onChange={(e) => handleChange("temperature", e.target.value)}
            />
            <FormInput
              label={"B.P (Systolic) (mmHg)"}
              value={vitalData.systolicBP}
              onChange={(e) => handleChange("systolicBP", e.target.value)}
            />
            <FormInput
              label={"B.P (Diastolic) (mmHg)"}
              value={vitalData.diastolicBP}
              onChange={(e) => handleChange("diastolicBP", e.target.value)}
            />
            <FormInput
              label={"Pulse (BPM)"}
              value={vitalData.pulse}
              onChange={(e) => handleChange("pulse", e.target.value)}
            />
            <FormInput
              label={"Respiratory (rpm)"}
              value={vitalData.respiratoryRate}
              onChange={(e) => handleChange("respiratoryRate", e.target.value)}
            />
            <FormInput
              label={"O2 Saturation (%)"}
              value={vitalData.o2Saturation}
              onChange={(e) => handleChange("o2Saturation", e.target.value)}
            />
            <FormInput
              label={"Blood Sugar (mmol/L)"}
              value={vitalData.bloodSugar}
              onChange={(e) => handleChange("bloodSugar", e.target.value)}
            />
          </div>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <FormButton label={"Add"} onClick={handleAdd} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
