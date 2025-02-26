import React from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

function AddClinicalExamination({
  handleAddExaminationModalClose,
  Examination,
}) {
  const formik = useFormik({
    initialValues: {
      id: "",
      clinicalExamination: "",
    },
    onSubmit: (values) => {
      Examination(values);
      handleAddExaminationModalClose();
    },
  });

  return (
    <Dialog
      open
      onClose={handleAddExaminationModalClose}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>Add Clinical Examination</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="id"
                name="id"
                label="ID"
                placeholder="Enter ID"
                onChange={formik.handleChange}
                value={formik.values.id}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="clinicalExamination"
                name="clinicalExamination"
                label="Clinical Examination"
                placeholder="Enter clinical examination"
                onChange={formik.handleChange}
                value={formik.values.clinicalExamination}
                variant="standard"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddExaminationModalClose} color="secondary">
            Close
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddClinicalExamination;
