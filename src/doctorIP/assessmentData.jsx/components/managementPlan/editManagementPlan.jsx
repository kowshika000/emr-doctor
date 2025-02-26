import { useFormik } from 'formik';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

function EditManagementPlan({
  editSelectedManagementPlan,
  setupdatedManagementPlan,
  handleEditManagementPlanModalClose,
  updatedManagementPlan
}) {
  const formik = useFormik({
    initialValues: editSelectedManagementPlan,
    enableReinitialize: true,
    onSubmit: (values) => {
      // Find the index of the row to update
      let index = updatedManagementPlan.findIndex((item) => item.id === values.id);

      if (index !== -1) {
        // Create a new array with the updated row
        const updatedPlans = [...updatedManagementPlan];
        updatedPlans[index] = values; // Update the existing row
        setupdatedManagementPlan(updatedPlans); // Update the state
      }

      handleEditManagementPlanModalClose(); // Close the dialog
    }
  });

  return (
    <Dialog open={true} onClose={handleEditManagementPlanModalClose} maxWidth="sm" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Edit Management Plan</DialogTitle>
        <DialogContent>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              className="form-control"
              id="id"
              name="id"
              placeholder="Enter ID"
              onChange={formik.handleChange}
              value={formik.values.id || ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="plan">Plan</label>
            <input
              type="text"
              className="form-control"
              id="plan"
              name="plan"
              placeholder="Enter the plan"
              onChange={formik.handleChange}
              value={formik.values.plan || ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="enteredBy">Enter By</label>
            <input
              type="text"
              className="form-control"
              id="enteredBy"
              name="enteredBy"
              placeholder="Enter your name"
              onChange={formik.handleChange}
              value={formik.values.enteredBy || ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="enteredDate">Entered Date and Time </label>
            <input
              type="text"
              className="form-control"
              id="enteredDate"
              name="enteredDate"
              onChange={formik.handleChange}
              value={formik.values.enteredDate || ''}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditManagementPlanModalClose} color="secondary">
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
