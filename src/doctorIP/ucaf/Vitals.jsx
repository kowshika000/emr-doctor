import React, { useState } from "react";
import CustomTable from "../components/Table";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";

const VitalHistoryTable = () => {
  const [open, setOpen] = useState(false);

  const rows = [
    {
      enteredOn: "10-05-2024 03:00",
      temperature: "36.2 °C",
      systolicBP: "128 mmHg",
      diastolicBP: "78 mmHg",
      enteredBy: "Deepthy Kumaran",
    },
    {
      enteredOn: "10-05-2024 01:00",
      temperature: "36.2 °C",
      systolicBP: "128 mmHg",
      diastolicBP: "78 mmHg",
      enteredBy: "Deepthy Kumaran",
    },
    {
      enteredOn: "10-05-2024 12:00",
      temperature: "36.2 °C",
      systolicBP: "128 mmHg",
      diastolicBP: "78 mmHg",
      enteredBy: "Deepthy Kumaran",
    },
  ];

  const columns = [
    { field: "enteredOn", headerName: "Entered On", flex: 1 },
    { field: "temperature", headerName: "Temperature", flex: 1 },
    { field: "systolicBP", headerName: "B.P (Systolic)", flex: 1 },
    { field: "diastolicBP", headerName: "B.P (Diastolic)", flex: 1 },
    { field: "enteredBy", headerName: "Entered By", flex: 1 },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="header-container my-4">
        <h6>Vital</h6>
        <div className="custom-btn" onClick={handleOpen}>
          Add Vital
        </div>
      </div>
      <div>
        <CustomTable rows={rows} columns={columns} />
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle className="h6">Add New Vital</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Temperature"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Systolic B.P"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Diastolic B.P"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Entered By"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VitalHistoryTable;
