import React, { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import FormButton from "../../../../component/FormButton";
import FormInput from "../../../../component/FormInput";
import { useDispatch } from "react-redux";
import { createManagementPlan } from "../../../../Redux/slice/DoctSlice/POST/managementSlice";

function AddManagementPlan({
  handleAddManagementPlanModalClose,
  getManagementPlan,
  appointmentId,
}) {
  const dispatch = useDispatch();
  const [plan, setPlan] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlan = {
      plan,
      appointmentId,
    };
    dispatch(createManagementPlan(newPlan))
      .unwrap()
      .then(() => {
        getManagementPlan();
        setPlan("");
        handleAddManagementPlanModalClose();
      })
      .catch((error) => {
        console.error("Failed to create diagnosis:", error);
      });
  };

  return (
    <Dialog
      open
      onClose={handleAddManagementPlanModalClose}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <h6>Add Management Plan</h6>
          <div className="row">
            <FormInput
              label="Plan"
              id="plan"
              name="plan"
              placeholder="Enter the plan"
              onChange={(value) => setPlan(value)}
              value={plan}
            />
          </div>
          <div className="form-button mt-4">
            <FormButton label="Add" type="submit" />
            <FormButton
              label="Close"
              onClick={handleAddManagementPlanModalClose}
            />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddManagementPlan;
