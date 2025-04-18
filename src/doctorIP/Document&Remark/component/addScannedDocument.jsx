import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createDocument } from "../../../Redux/slice/DoctSlice/POST/documentSlice";

const AddScannedDocument = ({
  handleAddScannedDocModalClose,
  uploadDocuments,
  getFile,
  patientId,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    documentType: "",
    file: null,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const formattedFile = `${file.name}`; 
      handleInputChange("file", formattedFile);
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.documentType) {
      newErrors.documentType = "Please select a document type";
    }
    if (!formData.file) {
      newErrors.file = "Please upload a file";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(createDocument({ ...formData, patientId })).then(() => {
        getFile();
        uploadDocuments(formData);
        handleAddScannedDocModalClose();
      });
    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleAddScannedDocModalClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <h6>Attachment</h6>
          <div className="d-flex gap-4 flex-wrap">
            {/* Document Type Field */}
            <TextField
              select
              fullWidth
              label="Document Type"
              name="documentType"
              value={formData.documentType}
              onChange={(e) =>
                handleInputChange("documentType", e.target.value)
              }
              variant="standard"
              helperText={errors.documentType}
              error={!!errors.documentType}
            >
              <MenuItem value="">Select a document</MenuItem>
              <MenuItem value="Lab">Lab</MenuItem>
              <MenuItem value="Pre Approval">Pre Approval</MenuItem>
            </TextField>

            {/* Conditional File Upload Field */}
            {formData.documentType && (
              <TextField
                type="file"
                fullWidth
                inputProps={{ multiple: true }}
                onChange={handleFileChange}
                helperText={errors.file}
                error={!!errors.file}
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
      </form>
    </Dialog>
  );
};

export default AddScannedDocument;
