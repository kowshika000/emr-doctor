import { useFormik } from "formik";

function EditPainRate({
  editSelectedComplaints,
  setUpdatedExamination,
  handleEditExaminationModalClose,
  updatedExamination,
}) {
  const formik = useFormik({
    initialValues: editSelectedComplaints,
    enableReinitialize: true,
    onSubmit: (values) => {
      debugger;
      let index = updatedExamination.findIndex((item) => item.id === values.id);
      const newUpdatedExamination = [...updatedExamination];
      if (index !== -1) {
        newUpdatedExamination.splice(index, 1, values);
      } else {
        newUpdatedExamination.push(values);
      }
      setUpdatedExamination(values);
      handleEditExaminationModalClose();
    },
  });

  return (
    <div>
      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Pain Rate</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleEditExaminationModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      name="id"
                      placeholder="Enter ID"
                      onChange={formik.handleChange}
                      value={formik.values.id || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="enteredBy">Pain Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      id="painScale"
                      name="painScale"
                      placeholder="Enter Pain Scale"
                      onChange={formik.handleChange}
                      value={formik.values.painScale || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="enteredBy">Severity</label>
                    <input
                      type="text"
                      className="form-control"
                      id="severity"
                      name="severity"
                      placeholder="Enter Severity"
                      onChange={formik.handleChange}
                      value={formik.values.severity || ""}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleEditExaminationModalClose}
                >
                  Close
                </button>
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPainRate;
