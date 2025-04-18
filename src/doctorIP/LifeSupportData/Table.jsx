import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import CustomTable from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { createLifeSupport } from "../../Redux/slice/IpSlice/POST/lifeSupport";
import FormInput from "../../component/FormInput";
import { fetchLifeSupport } from "../../Redux/slice/IpSlice/GET/lifeSupport";

const LifeSupportTbl = ({ patientId }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.docEmr?.lifeSupport);
  console.log("Life Support Data:", data);

  useEffect(() => {
    dispatch(fetchLifeSupport({ patientId }));
  }, [dispatch]);
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
    startDate: "",
    endDate: "",
    totalTime: "",
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
    dispatch(createLifeSupport({ ...formData, patientId }));
    console.log("Form submitted:", formData);
    setDialogOpen(false);
  };

  const handleInputChange = (name, value) => {
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
      name: "",
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

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <h6 className="mb-3">Add Entry</h6>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormInput
              label="Support Value"
              name="name"
              type="select"
              options={[
                { value: "Syring Pump", label: "Syring Pump" },
                { value: "Ventilator", label: "Ventilator" },
                { value: "Infusion Pump", label: "Infusion Pump" },
              ]}
              value={formData.name}
              onChange={(value) => handleInputChange("name", value)}
            />
            <FormInput
              label="Start Date"
              name="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={(value) => handleInputChange("startDate", value)}
              required
            />
            <FormInput
              label="End Date"
              name="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={(value) => handleInputChange("endDate", value)}
              required
            />
            <FormInput
              label="Total Time"
              name="totalTime"
              value={formData.totalTime}
              onChange={(value) => handleInputChange("totalTime", value)}
              disabled
            />
          </Box>
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
