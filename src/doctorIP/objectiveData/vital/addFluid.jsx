import { Box, Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";
import FormInput from "../../../component/FormInput";
import FormButton from "../../../component/FormButton";
import { useDispatch } from "react-redux";
import { fetchAddFluid } from "../../../Redux/slice/DoctSlice/POST/addFluidSlice";

export const AddFluid = ({ handleCloseAddFluid, patientId, getFluid }) => {
  const dispatch = useDispatch();

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

  const handleChange = (field) => (value) => {
    setFluidData((prev) => ({
      ...prev,
      [field]: value || "",
    }));
  };

  const handleSubmit = () => {
    const payload = { ...fluidData, patientId };
    dispatch(fetchAddFluid(payload))
      .then(() => getFluid())
      .finally(() => handleCloseAddFluid());
  };

  return (
    <Dialog open={true} onClose={handleCloseAddFluid} maxWidth="md" fullWidth>
      <DialogContent>
        <form>
          {/* INTAKE HEADER */}
          <Box sx={{ mb: 2 }}>
            <strong>INTAKE (mL)</strong>
          </Box>
          <div className="form-container mt-2">
            <FormInput
              label="Intake 1 Type"
              value={fluidData.intake1Type}
              onChange={handleChange("intake1Type")}
            />

            <FormInput
              label="Intake 1 Volume (mL)"
              value={fluidData.intake1Volume}
              onChange={handleChange("intake1Volume")}
            />

            <FormInput
              label="Intake 2 Type"
              value={fluidData.intake2Type}
              onChange={handleChange("intake2Type")}
            />

            <FormInput
              label="Intake 2 Volume (mL)"
              value={fluidData.intake2Volume}
              onChange={handleChange("intake2Volume")}
            />

            <FormInput
              label="Intake 3 Type"
              value={fluidData.intake3Type}
              onChange={handleChange("intake3Type")}
            />

            <FormInput
              label="Intake 3 Volume (mL)"
              value={fluidData.intake3Volume}
              onChange={handleChange("intake3Volume")}
            />
          </div>

          {/* OUTPUT HEADER */}
          <Box sx={{ mt: 3, mb: 2 }}>
            <strong>OUTPUT (mL)</strong>
          </Box>

          <div className="form-container mt-2">
            <FormInput
              label="Drain 1"
              value={fluidData.drain1}
              onChange={handleChange("drain1")}
            />

            <FormInput
              label="Drain 2"
              value={fluidData.drain2}
              onChange={handleChange("drain2")}
            />

            <FormInput
              label="Drain 3"
              value={fluidData.drain3}
              onChange={handleChange("drain3")}
            />

            <FormInput
              label="NG/Vomitus"
              value={fluidData.ngVomitus}
              onChange={handleChange("ngVomitus")}
            />

            <FormInput
              label="Urine"
              value={fluidData.urine}
              onChange={handleChange("urine")}
            />

            <FormInput
              label="Stool/Stoma"
              value={fluidData.stoolStoma}
              onChange={handleChange("stoolStoma")}
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
