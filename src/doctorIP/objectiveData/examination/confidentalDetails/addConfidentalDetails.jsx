import { useFormik } from "formik";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";



function AddConfidentalDetails({ open, onClose, onSubmit }) {
  const formik = useFormik({
    initialValues: {
      confidentaldetails: "",
    },
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Confidential Details</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            id="confidentaldetails"
            name="confidentaldetails"
            
            variant="standard"
            value={formik.values.confidentaldetails}
            onChange={formik.handleChange}
            placeholder="Enter confidential details"
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddConfidentalDetails;