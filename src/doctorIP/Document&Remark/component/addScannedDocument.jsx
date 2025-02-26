import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const AddScannedDocument = ({
  handleAddScannedDocModalClose,
  uploadDocuments,
}) => {
  const initialValues = {
    docuement: "",
    file: null,
  };

  const handleSubmit = (values) => {
    let errors = {};

    if (!values.docuement) {
      errors.docuement = "Please select a document type";
    }
    if (!values.file) {
      errors.file = "Please upload a file";
    }

    if (Object.keys(errors).length > 0) {
      alert("Please fill out all required fields");
      return;
    }

    uploadDocuments(values);
    handleAddScannedDocModalClose(); // Close the modal after successful upload
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, values, errors, touched }) => (
        <Dialog
          open={true}
          onClose={handleAddScannedDocModalClose}
          fullWidth
          maxWidth="sm"
        >
          <Form>
            <DialogContent>
              <h6>Attachment</h6>
              <div className="d-flex gap-4 flex-wrap">
                {/* Document Type Field */}
                <Field
                  as={TextField}
                  select
                  fullWidth
                  label="Document Type"
                  name="docuement"
                  variant="standard"
                  helperText={errors.docuement && touched.docuement && errors.docuement}
                  error={errors.docuement && touched.docuement}
                >
                  <MenuItem value="">Select a document</MenuItem>
                  <MenuItem value="Lab">Lab</MenuItem>
                  <MenuItem value="Pre Approval">Pre Approval</MenuItem>
                </Field>

                {/* Conditional File Upload Field */}
                {values.docuement && (
                  <TextField
                    type="file"
                    fullWidth
                    inputProps={{ multiple: true }}
                    onChange={(event) => {
                      const file = event.currentTarget.files;
                      setFieldValue("file", file);
                    }}
                    helperText={errors.file && touched.file && errors.file}
                    error={errors.file && touched.file}
                    variant="standard"
                  />
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddScannedDocModalClose} color="secondary">
                Close
              </Button>
              <Button type="submit" color="primary">
                Upload
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default AddScannedDocument;
