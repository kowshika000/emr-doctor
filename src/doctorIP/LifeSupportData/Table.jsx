import React, { useState } from "react";
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
  Select,
  MenuItem as DropdownMenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CustomTable from "../components/Table";

const LifeSupportTbl = () => {
  const rows = [
    {
      id: 1,
      name: "Syring Pump",
      startTime: "11/19/2024 12:00",
      endTime: "11/20/2024 12:00",
      totalTime: "24 hrs",
      enteredDate: "11/14/2024 0:39",  
      enteredBy: "Dr. Neil Armstrong",
      options: "View / Edit",
    },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    totalTime: "",
    enteredDate: "",
    enteredBy: "",
  });

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    { field: "totalTime", headerName: "Total Time", flex: 1 },
    { field: "enteredDate", headerName: "Entered Date", flex: 1 },
    { field: "enteredBy", headerName: "Entered By", flex: 1 },
  ];

  const calculateTotalTime = (start, end) => {
    if (start && end) {
      const startTime = new Date(start);
      const endTime = new Date(end);
      const difference = endTime - startTime;
      if (difference > 0) {
        const hours = difference / (1000 * 60 * 60);
        return `${hours} hrs`;
      }
    }
    return "";
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSubmit = () => {
    console.log("Form submitted:", formData);
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };
      if (name === "startDate" || name === "endDate") {
        updatedForm.totalTime = calculateTotalTime(
          updatedForm.startDate,
          updatedForm.endDate
        );
      }
      return updatedForm;
    });
  };

  const handleAddClick = () => {
    setFormData({
      supportValue: "",
      startDate: "",
      endDate: "",
      totalTime: "",
    }); // Reset form for adding new entry
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="header-container my-4">
        <h6>Life Support</h6>
        <div className="custom-btn" onClick={handleAddClick}>
          Add
        </div>
      </div>

      <div>
        <CustomTable rows={rows} columns={columns} />
      </div>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Entry</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="standard">
            <InputLabel id="supportValue-label">Support Value</InputLabel>
            <Select
              labelId="supportValue-label"
              name="supportValue"
              value={formData.supportValue}
              onChange={handleInputChange}
            >
              <DropdownMenuItem value="Syring Pump">
                Syring Pump
              </DropdownMenuItem>
              <DropdownMenuItem value="Ventilator">Ventilator</DropdownMenuItem>
              <DropdownMenuItem value="Infusion Pump">
                Infusion Pump
              </DropdownMenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Start Date*"
            name="startDate"
            type="datetime-local"
            value={formData.startDate}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date*"
            name="endDate"
            type="datetime-local"
            value={formData.endDate}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Total Time"
            name="totalTime"
            value={formData.totalTime}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
          <Button
            onClick={handleDialogSubmit}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LifeSupportTbl;
