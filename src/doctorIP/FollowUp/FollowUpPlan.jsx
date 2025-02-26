import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import CustomTable from "../components/Table";

const FollowUpPlan = () => {
  const [open, setOpen] = useState(false); // State for dialog visibility
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("30");
  const handleOpen = () => {
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  const rows = [
    {
      id: 1,
      recallDate: "11/14/2024",
      followUpPlan: "knk",
      enteredDate: "Dr. Neil Armstrong",
      enteredBy: "Nov 14, 2024 12:18",
      options: "Options Data",
    },
  ];

  const columns = [
    { field: "recallDate", headerName: "Recall Date", flex: 1 },
    { field: "followUpPlan", headerName: "Follow up Plan", flex: 1 },
    { field: "enteredDate", headerName: "Entered Date", flex: 1 },
    { field: "enteredBy", headerName: "Entered By", flex: 1 },
    { field: "options", headerName: "Options", flex: 1 },
  ];
  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value); // Update selected time slot
  };
  return (
    <div>
      <div
        className="my-4 header-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6 >Follow Up Plan</h6>
        <Box
        className="custom-btn"
          onClick={handleOpen} // Open the dialog on click
        >
          Add Follow Up Plan
        </Box>
      </div>
      <CustomTable rows={rows} columns={columns} />

      {/* Dialog Component */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Follow Up Plan</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Recall Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            margin="dense"
            variant="standard"
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Time Slot
          </Typography>
          <RadioGroup
            row
            value={selectedTimeSlot}
            onChange={handleTimeSlotChange}
            sx={{ mt: 1 }}
          >
            <FormControlLabel value="30" control={<Radio />} label="30 min" />
            <FormControlLabel value="60" control={<Radio />} label="60 min" />
          </RadioGroup>
          <TextField
            fullWidth
            label="Follow Up Plan"
            margin="dense"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              /* Save logic here */ handleClose();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FollowUpPlan;
