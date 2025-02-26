import { useFormik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

function EditComplaints({
  editSelectedComplaints,
  setUpdatedComplaints,
  handleEditComplaintsModalClose,
  updatedComplaints,
}) {
  const formik = useFormik({
    initialValues: editSelectedComplaints,
    enableReinitialize: true,
    onSubmit: (values) => {
      let index = updatedComplaints.findIndex((item) => item.id === values.id);
      const newUpdatedComplaints = [...updatedComplaints];
      if (index !== -1) {
        newUpdatedComplaints.splice(index, 1, values);
      } else {
        newUpdatedComplaints.push(values);
      }
      setUpdatedComplaints(newUpdatedComplaints);
      handleEditComplaintsModalClose();
    },
  });

  return (
    <Dialog open={true} onClose={handleEditComplaintsModalClose} maxWidth="lg">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Edit Chief Complaints</DialogTitle>
        <DialogContent>
          <div className="form-container">
            <TextField
              label="ID"
              id="id"
              name="id"
              value={formik.values.id || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Entered By"
              id="enteredBy"
              name="enteredBy"
              value={formik.values.enteredBy || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Entered Date"
              id="enteredDate"
              name="enteredDate"
              value={formik.values.enteredDate || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Chief Complaint"
              id="chiefComplaint"
              name="chiefComplaint"
              value={formik.values.chiefComplaint || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Duration/Onset"
              id="duration"
              name="duration"
              value={formik.values.duration || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quality"
              id="quality"
              name="quality"
              value={formik.values.quality || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Timing"
              id="timing"
              name="timing"
              value={formik.values.timing || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Associated Symptoms"
              id="symptoms"
              name="symptoms"
              value={formik.values.symptoms || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Location"
              id="location"
              name="location"
              value={formik.values.location || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Context"
              id="context"
              name="context"
              value={formik.values.context || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Modifying Factor"
              id="modifyFactor"
              name="modifyFactor"
              value={formik.values.modifyFactor || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Pain Scale"
              id="painScale"
              name="painScale"
              value={formik.values.painScale || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
              type="number"
              inputProps={{ min: 1, max: 10 }}
            />
            <TextField
              label="Remarks"
              id="remarks"
              name="remarks"
              value={formik.values.remarks || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Severity"
              id="severity"
              name="severity"
              value={formik.values.severity || ""}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditComplaintsModalClose} color="secondary">
            Close
          </Button>
          <Button type="submit" color="primary">
            Edit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditComplaints;
