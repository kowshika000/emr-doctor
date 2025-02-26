import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import CustomTable from "../../components/Table"; // Adjust the path as necessary

function ViewAddNote({ handleViewAddNotesModalClose, notesType }) {
  const [isRemarksModalOpen, setRemarksModalOpen] = useState(false);
  const [addData, setAddData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [currentEditId, setCurrentEditId] = useState(null);

  const formik = useFormik({
    initialValues: {
      id: "",
      remarks: "",
      enteredBy: "",
    },
    onSubmit: (values) => {
      if (currentEditId !== null) {
        // Edit existing row
        const updatedData = updateData.map((item) =>
          item.id === currentEditId ? { ...item, ...values } : item
        );
        setUpdateData(updatedData);
        setCurrentEditId(null); // Reset edit mode
      } else {
        // Add new entry
        setAddData((prev) => [...prev, values]);
        setUpdateData((prev) => [...prev, values]);
      }
      handleCloseRemarksModal();
    },
  });

  const handleOpenRemarksModal = () => {
    formik.resetForm();
    setCurrentEditId(null); // Clear edit mode for adding new data
    setRemarksModalOpen(true);
  };

  const handleCloseRemarksModal = () => {
    setRemarksModalOpen(false);
  };

  const rows = updateData;

  const columns = [
    { field: "id", headerName: "S.No", flex: 1 },
    { field: "remarks", headerName: "Remarks", flex: 1 },
    { field: "enteredBy", headerName: "Entered By", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
    },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState([]);

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    if (action === "edit") {
      setCurrentEditId(currentRow.id);
      formik.setValues(currentRow); // Pre-fill the form with row data
      setRemarksModalOpen(true); // Open the dialog for editing
    } else if (action === "delete") {
      const updatedData = updateData.filter(
        (item) => item.id !== currentRow.id
      );
      setUpdateData(updatedData);
    }
    handleClose();
  };

  return (
    <div>
      {/* Main Dialog for View Notes */}
      <Dialog
        open={true}
        onClose={handleViewAddNotesModalClose}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <div className="d-flex justify-content-between mb-4">
            <h6>
              {notesType === "Rad"
                ? "Radiology"
                : notesType === "Lab"
                ? "Laboratory"
                : ""}
            </h6>
            <div className="custom-btn" onClick={handleOpenRemarksModal}>
              Add Remarks
            </div>
          </div>
          <CustomTable
            rows={rows}
            columns={columns}
            onOptionClick={handleClick}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleMenuClick("edit")}>Edit</MenuItem>
            <MenuItem onClick={() => handleMenuClick("delete")}>
              Delete
            </MenuItem>
          </Menu>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewAddNotesModalClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Remarks Dialog */}
      <Dialog
        open={isRemarksModalOpen}
        onClose={handleCloseRemarksModal}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <h6>{currentEditId !== null ? "Edit Remarks" : "Add Remarks"}</h6>
            <TextField
              fullWidth
              label="Id"
              name="id"
              variant="standard"
              margin="normal"
              onChange={formik.handleChange}
              value={formik.values.id}
            />
            <TextField
              fullWidth
              label="Entered By"
              name="enteredBy"
              variant="standard"
              margin="normal"
              onChange={formik.handleChange}
              value={formik.values.enteredBy}
            />
            <TextField
              fullWidth
              label="Remarks"
              name="remarks"
              variant="standard"
              margin="normal"
              multiline
              rows={3}
              onChange={formik.handleChange}
              value={formik.values.remarks}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRemarksModal} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {currentEditId !== null ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ViewAddNote;
