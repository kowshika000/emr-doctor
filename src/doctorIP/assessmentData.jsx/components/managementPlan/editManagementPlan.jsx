import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import FormInput from "../../../../component/FormInput";
import { useDispatch } from "react-redux";
import { updateManagementPlan } from "../../../../Redux/slice/DoctSlice/PUT/managementSlice";

function EditManagementPlan({
  editSelectedManagementPlan,
  setupdatedManagementPlan,
  handleEditManagementPlanModalClose,
  getManagementPlan,
}) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(editSelectedManagementPlan);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: formData.id,
      appointmentId: formData.doctorAppointment?.appointmentId,
      plan: formData.plan,
    };
    dispatch(updateManagementPlan(payload))
      .unwrap()
      .then(() => {
        getManagementPlan();
        setFormData({});
        handleEditManagementPlanModalClose();
      })
      .catch((error) => {
        console.error("Failed to create diagnosis:", error);
      });
  };

  return (
    <Dialog
      open={true}
      onClose={handleEditManagementPlanModalClose}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <h6 className="mb-3">Edit Management Plan</h6>
          <FormInput
            label="Plan"
            id="plan"
            name="plan"
            placeholder="Enter the plan"
            value={formData.plan || ""}
            onChange={(value) => handleChange("plan", value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditManagementPlanModalClose}
            color="secondary"
          >
            Close
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditManagementPlan;
