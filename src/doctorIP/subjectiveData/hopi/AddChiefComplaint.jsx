import React, { useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import FormInput from "../../../component/FormInput";
import FormButton from "../../../component/FormButton";
import { useDispatch } from "react-redux";
import { fetchAddChiefComplaint } from "../../../Redux/slice/DoctSlice/POST/addChiefSlice";

const AddChiefComplaint = ({
  handleClose,
  getChiefComplaint,
  appointmentId,
}) => {
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({
    chiefComplaint: "",
    duration: "",
    location: "",
    quality: "",
    context: "",
    timing: "",
    modifyFactor: "",
    symptoms: "",
    remarks: "",
    painScale: "",
    severity: "",
  });

  const handleChange = (field) => (value) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value || "",
    }));
  };

  const handleSubmit = () => {
    dispatch(fetchAddChiefComplaint({ ...inputValues, appointmentId }))
      .then(() => getChiefComplaint())
      .finally(() => handleClose());
  };

  return (
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent>
        <div className="header-text">Chief Complaint</div>
        <div className="form-container mt-2">
          <FormInput
            label={"Chief Complaint"}
            value={inputValues.chiefComplaint}
            onChange={handleChange("chiefComplaint")}
          />
          <FormInput
            label={"Add New Duration"}
            value={inputValues.duration}
            onChange={handleChange("duration")}
          />
          <FormInput
            label={"Add New Location"}
            value={inputValues.location}
            onChange={handleChange("location")}
          />
          <FormInput
            label={"Add New Quality"}
            value={inputValues.quality}
            onChange={handleChange("quality")}
          />
          <FormInput
            label={"Add New Context"}
            value={inputValues.context}
            onChange={handleChange("context")}
          />
          <FormInput
            label={"Add New Timing"}
            value={inputValues.timing}
            onChange={handleChange("timing")}
          />
          <FormInput
            label={"Add New Modify Factor"}
            value={inputValues.modifyFactor}
            onChange={handleChange("modifyFactor")}
          />
          <FormInput
            label={"Add New Symptoms"}
            value={inputValues.symptoms}
            onChange={handleChange("symptoms")}
          />
          <FormInput
            label={"Add New Remarks"}
            value={inputValues.remarks}
            onChange={handleChange("remarks")}
          />
          <FormInput
            label={"Pain Scale (0-10)"}
            value={inputValues.painScale}
            onChange={handleChange("painScale")}
          />
          <FormInput
            label={"Severity"}
            value={inputValues.severity}
            onChange={handleChange("severity")}
          />
        </div>
        <div className="mt-4 form-button ">
          <FormButton label="Save" onClick={handleSubmit} />
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
