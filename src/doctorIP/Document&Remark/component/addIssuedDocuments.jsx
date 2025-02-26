import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import jsPDF from "jspdf";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

function getDate() {
  const today = new Date();
  return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
}

const AddIssuedDocument = ({
  handleAddIssuedDocModalClose,
  uploadDocuments,
  documentType,
}) => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [value, setValue] = useState("");

  const initialValues = {
    document: "",
    date: "",
    speciality: "",
    doctor: "",
    startDate: null,
    endDate: null,
  };

  const getTemplateForSpeciality = (
    speciality,
    documentType,
    startDate,
    endDate,
    doctor
  ) => {
    return `
      <h3>${speciality === "" || undefined ? "" : speciality} Report</h3>
      <p><strong>Document Type:</strong> ${
        documentType === "" || undefined ? "" : documentType
      }</p>
      <p><strong>Start Date:</strong> ${
        startDate === "" || undefined ? "" : startDate
      }</p>
      <p><strong>End Date:</strong> ${
        endDate === "" || undefined ? "" : endDate
      }</p>
      <p><strong>Doctor:</strong> ${
        doctor === "" || undefined ? "" : doctor
      }</p>
      <p>Patient Signature: _________________________</p>
    `;
  };

  const handleFileSave = (content, fileName) => {
    const blob = new Blob([content], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = fileURL;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(fileURL);
  };

  const handleSubmit = (values) => {
    // Prevent form submission as we don't need to submit it yet
  };

  const handleUpdate = (values) => {
    // Ensure startDate and endDate are valid Date objects
    const startDate = values.startDate ? new Date(values.startDate) : null;
    const endDate = values.endDate ? new Date(values.endDate) : null;
  
    const template = getTemplateForSpeciality(
      values.speciality,
      values.document,
      startDate ? startDate.toLocaleDateString() : "",  // Convert to string if valid
      endDate ? endDate.toLocaleDateString() : "",      // Convert to string if valid
      values.doctor
    );
  
    setValue(template); // Populate the Quill editor with the updated template
  };
  

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const textContent = value.replace(/<[^>]+>/g, ""); // Remove HTML tags
    doc.text(textContent, 50, 50);
    doc.save("Issued_document.pdf"); // Name of the file
    handleAddIssuedDocModalClose()
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, values }) => (
        <Form>
          <Dialog
            open={true} // Ensure the dialog is open
            onClose={handleAddIssuedDocModalClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>{documentType}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Document Type"
                    select
                    fullWidth
                    name="document"
                    variant="standard"
                    onChange={(e) => setFieldValue("document", e.target.value)}
                  >
                    <MenuItem value="">Select a document</MenuItem>
                    <MenuItem value="Lab">Lab</MenuItem>
                    <MenuItem value="Pre Approval">Pre Approval</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>Date</label>
                  <div className="d-flex align-items-center">
                    <TextField
                      type="date"
                      fullWidth
                      name="startDate"
                      value={
                        values.startDate
                          ? new Date(values.startDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setFieldValue("startDate", e.target.value)
                      }
                      variant="standard"
                      placeholder="Select start date"
                    />
                    <TextField
                      type="date"
                      fullWidth
                      name="endDate"
                      value={
                        values.endDate
                          ? new Date(values.endDate).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => setFieldValue("endDate", e.target.value)}
                      variant="standard"
                      placeholder="Select end date"
                      inputProps={{
                        min: values.startDate
                          ? new Date(values.startDate)
                              .toISOString()
                              .split("T")[0]
                          : "",
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Doctor"
                    select
                    fullWidth
                    name="doctor"
                    variant="standard"
                    onChange={(e) => setFieldValue("doctor", e.target.value)}
                  >
                    <MenuItem value="">Select a doctor</MenuItem>
                    <MenuItem value="Punithaa">Punithaa</MenuItem>
                    <MenuItem value="Shree">Shree</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Speciality"
                    select
                    fullWidth
                    name="speciality"
                    variant="standard"
                    onChange={(e) =>
                      setFieldValue("speciality", e.target.value)
                    }
                  >
                    <MenuItem value="">Select a speciality</MenuItem>
                    <MenuItem value="Cardio">Cardio</MenuItem>
                    <MenuItem value="General Practice">
                      General Practice
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} mt={4}>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleAddIssuedDocModalClose}
                    >
                      Close
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(values)} // Only update with the speciality value
                    >
                      Update
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} mt={4}>
                  <ReactQuill theme="snow" value={value} onChange={setValue} />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddIssuedDocModalClose} color="secondary">
                Close
              </Button>
              <Button onClick={handleDownloadPDF} color="primary">
                File Save
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default AddIssuedDocument;
