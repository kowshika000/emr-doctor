import { Box, Dialog, DialogContent, } from "@mui/material";
import React, { useState } from "react";
import FormInput from "../../../component/FormInput";
import FormButton from "../../../component/FormButton";

export const AddFluid = ({ handleCloseAddFluid, onAddFluid }) => {
  const [fluidData, setFluidData] = useState({
    intake1Type: "",
    intake1Volume: "",
    intake2Type: "",
    intake2Volume: "",
    intake3Type: "",
    intake3Volume: "",
    drain1: "",
    drain2: "",
    drain3: "",
    ngVomitus: "",
    urine: "",
    stoolStoma: "",
  });

  const handleChange = (field, value) => {
    setFluidData({ ...fluidData, [field]: value });
  };

  const handleSubmit = () => {
    onAddFluid(fluidData);
    handleCloseAddFluid();
  };

  return (
    <Dialog open={true} onClose={handleCloseAddFluid} maxWidth="md">
      <DialogContent>
        <form>
          {/* INTAKE HEADER */}
          <Box sx={{ mb: 2 }}>
            <strong>INTAKE (mL)</strong>
          </Box>
          <div className="form-container">
            <FormInput
              label="Intake 1 Type"
              value={fluidData.intake1Type}
              onChange={(e) => handleChange("intake1Type", e.target.value)}
            />

            <FormInput
              label="Intake 1 Volume (mL)"
              value={fluidData.intake1Volume}
              onChange={(e) => handleChange("intake1Volume", e.target.value)}
            />

            <FormInput
              label="Intake 2 Type"
              value={fluidData.intake2Type}
              onChange={(e) => handleChange("intake2Type", e.target.value)}
            />

            <FormInput
              label="Intake 2 Volume (mL)"
              value={fluidData.intake2Volume}
              onChange={(e) => handleChange("intake2Volume", e.target.value)}
            />

            <FormInput
              label="Intake 3 Type"
              value={fluidData.intake3Type}
              onChange={(e) => handleChange("intake3Type", e.target.value)}
            />

            <FormInput
              label="Intake 3 Volume (mL)"
              value={fluidData.intake3Volume}
              onChange={(e) => handleChange("intake3Volume", e.target.value)}
            />
          </div>

          {/* OUTPUT HEADER */}
          <Box sx={{ mt: 3, mb: 2 }}>
            <strong>OUTPUT (mL)</strong>
          </Box>

          <div className="form-container">
            <FormInput
              label="Drain 1"
              value={fluidData.drain1}
              onChange={(e) => handleChange("drain1", e.target.value)}
            />

            <FormInput
              label="Drain 2"
              value={fluidData.drain2}
              onChange={(e) => handleChange("drain2", e.target.value)}
            />

            <FormInput
              label="Drain 3"
              value={fluidData.drain3}
              onChange={(e) => handleChange("drain3", e.target.value)}
            />

            <FormInput
              label="NG/Vomitus"
              value={fluidData.ngVomitus}
              onChange={(e) => handleChange("ngVomitus", e.target.value)}
            />

            <FormInput
              label="Urine"
              value={fluidData.urine}
              onChange={(e) => handleChange("urine", e.target.value)}
            />

            <FormInput
              label="Stool/Stoma"
              value={fluidData.stoolStoma}
              onChange={(e) => handleChange("stoolStoma", e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <FormButton label="Add" onClick={handleSubmit} />
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

