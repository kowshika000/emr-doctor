import React, { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import FormInput from "../../../component/FormInput";
import FormButton from "../../../component/FormButton";

const AddChiefComplaint = ({ handleClose }) => {
  const [inputValues, setInputValues] = useState({
    chiefComplaint: "",
    duration: "",
    location: "",
    quality: "",
    context: "",
    timing: "",
    modifyingFactor: "",
    associatedSymptoms: "",
    remarks: "",
    painScale: "",
    severity: "",
  });

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      // fullWidth
      maxWidth="md"
      // sx={{ overflowX: "hidden" }}
    >
      <DialogContent>
        <div className="header-text">Chief Complaint</div>
        <div className="form-container">
          <FormInput label={"Chief Complaint"} />
          <FormInput label={"Add New Duration"} />
          <FormInput label={"Add New Location"} />
          <FormInput label={"Add New Quality"} />
          <FormInput label={"Add New Context"} />
          <FormInput label={"Add New Timing"} />
          <FormInput label={"Add New Modify Factor"} />
          <FormInput label={"Add New Symptoms"} />
          <FormInput label={"Add New Remarks"} />
          <FormInput label={"Pain Scale (0-10)"} />
          <FormInput label={"Severity"} />
        </div>
        <div className="mt-4 form-button ">
          <FormButton label="Save" onClick={handleClose} />
          <FormButton
            label="Close"
            onClick={handleClose}
            bgColor={"rgb(224, 126, 123)"}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddChiefComplaint;
