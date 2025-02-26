import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useFormik } from "formik";
import CustomTable from "./Table";

const IpCrud = ({ type }) => {
  const [isRemarksModalOpen, setRemarksModalOpen] = useState(false);
  const [addData, setAddData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null); // Track current row for editing

  const formik = useFormik({
    initialValues: {
      id: "",
      text: "",
      enteredBy: "",
    },
    onSubmit: (values) => {
      if (currentEditId !== null) {
        // Edit existing row
        const updatedData = updateData.map((item) =>
          item.id === currentEditId ? { ...item, ...values } : item
        );
        setUpdateData(updatedData);
        setCurrentEditId(null);
      } else {
        // Add new entry with a unique ID
        const newEntry = { ...values, id: new Date().getTime() }; // Example for generating unique ID
        setAddData((prev) => [...prev, newEntry]);
        setUpdateData((prev) => [...prev, newEntry]);
      }
      handleCloseRemarksModal();
    },
  });
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenRemarksModal = () => {
    formik.resetForm();
    setCurrentEditId(null);
    setRemarksModalOpen(true);
  };

  const handleCloseRemarksModal = () => {
    setRemarksModalOpen(false);
  };

  const handleMenuClick = (action) => {
    if (action === "edit" && currentRow) {
      setCurrentEditId(currentRow.id);
      formik.setValues(currentRow); // Set form fields with current row data
      setRemarksModalOpen(true); // Open the modal for editing
    } else if (action === "delete" && currentRow) {
      const updatedData = updateData.filter(
        (item) => item.id !== currentRow.id
      );
      setUpdateData(updatedData);
    }
    setAnchorEl(null); // Close the menu
  };

  const rows = updateData;

  const columns = [
    { field: "id", headerName: "S.No", flex: 1 },
    { field: "text", headerName: "Entry", flex: 1 },
    { field: "enteredBy", headerName: "Entered By", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleClick(event, params.row)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div>
      <div className=" mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <div>
            <h6>{type}</h6>
          </div>
          <div className="custom-btn" onClick={handleOpenRemarksModal}>
            Add {type}
          </div>
        </div>

        <div>
          <CustomTable
            rows={rows}
            columns={columns}
            onOptionClick={handleClick}
          />
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuClick("edit")}>Edit</MenuItem>
          <MenuItem onClick={() => handleMenuClick("delete")}>Delete</MenuItem>
        </Menu>
      </div>

      {/* Add/Edit Remarks Modal using MUI Dialog */}
      <Dialog
        open={isRemarksModalOpen}
        onClose={handleCloseRemarksModal}
        fullWidth
        maxWidth="lg"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            {currentEditId !== null ? "Edit Remarks" : "Add Remarks"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Id"
              name="id"
              variant="standard"
              fullWidth
              value={formik.values.id}
              disabled={currentEditId !== null} // Disable ID field during edit
              onChange={formik.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Entered By"
              name="enteredBy"
              variant="standard"
              fullWidth
              value={formik.values.enteredBy}
              onChange={formik.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Entry"
              name="text"
              placeholder="Enter your remarks here"
              multiline
              rows={3}
              variant="standard"
              fullWidth
              value={formik.values.text}
              onChange={formik.handleChange}
              //   style={{ marginBottom: "10px" }}
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
};

// const OptionsMenu = ({ row, setAnchorEl, setCurrentRow }) => {
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//     setCurrentRow(row); // Set the current row for editing or deletion
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <IconButton onClick={handleClick}>
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         anchorEl={setAnchorEl}
//         open={Boolean(setAnchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={() => handleClick("edit")}>Edit</MenuItem>
//         <MenuItem onClick={() => handleClick("delete")}>Delete</MenuItem>
//       </Menu>
//     </div>
//   );
// };

export default IpCrud;
