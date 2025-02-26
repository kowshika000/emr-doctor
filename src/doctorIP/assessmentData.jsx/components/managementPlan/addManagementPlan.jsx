import { useFormik } from "formik";
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
} from "@mui/material";
import FormButton from "../../../../component/FormButton";
import FormInput from "../../../../component/FormInput";

function AddManagementPlan({
  handleAddManagementPlanModalClose,
  ManagementPlan,
  currentPlanCount, // Pass the current count from the parent
}) {
  const formik = useFormik({
    initialValues: {
      id: currentPlanCount + 1, // S. No. will be the next count
      plan: "",
      enteredBy: "doctor",
      enteredDate: new Date().toLocaleString(), // Format the date as a string
    },
    onSubmit: (values) => {
      ManagementPlan(values); // Pass the form data to the parent component
      console.log(values, "Submitted Values");
      formik.resetForm(); // Reset the form
      handleAddManagementPlanModalClose();
    },
  });

  return (
    <Dialog
      open
      onClose={handleAddManagementPlanModalClose}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <h6>Add Management Plan</h6>
          <div className="row">
            
            <FormInput
              label="Plan"
              id="plan"
              name="plan"
              placeholder="Enter the plan"
              onChange={formik.handleChange}
              value={formik.values.plan}
            />
          </div>
          <div className="form-button mt-4">
            <FormButton label={"Add"} />
            <FormButton
              label={"Close"}
              onClick={handleAddManagementPlanModalClose}
            />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddManagementPlan;
