import React from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

function EditClinicalExamination({
  editSelectedComplaints,
  setUpdatedExamination,
  handleEditExaminationModalClose,
  updatedExamination,
}) {
  const formik = useFormik({
    initialValues: editSelectedComplaints,
    enableReinitialize: true,
    onSubmit: (values) => {
      let index = updatedExamination.findIndex((item) => item.id === values.id);
      const newUpdatedExamination = [...updatedExamination];
      if (index !== -1) {
        newUpdatedExamination.splice(index, 1, values);
      } else {
        newUpdatedExamination.push(values);
      }
      setUpdatedExamination(newUpdatedExamination);
      handleEditExaminationModalClose();
    },
  });

  return (
    <Dialog
      open={true}
      onClose={handleEditExaminationModalClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Edit Clinical Examination</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="ID"
              name="id"
              value={formik.values.id || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Clinical Examination"
              name="clinicalExamination"
              value={formik.values.clinicalExamination || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditExaminationModalClose} color="secondary">
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

export default EditClinicalExamination;
