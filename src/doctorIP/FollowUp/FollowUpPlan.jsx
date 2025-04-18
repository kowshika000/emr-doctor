import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowUpPlan } from "../../Redux/slice/IpSlice/GET/followUpPlan";
import FormInput from "../../component/FormInput";
import { Table } from "antd";
import { createFollowUpPlan } from "../../Redux/slice/IpSlice/POST/followUpPlan";

const FollowUpPlan = ({ patientId }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    recallDate: "",
    timeSlot: "20",
    followUpPlan: "",
  });

  const { data } = useSelector((state) => state.docEmr?.followUp);

  useEffect(() => {
    dispatch(fetchFollowUpPlan({ patientId }));
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  const handleChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const columns = [
    { dataIndex: "recallDate", title: "Recall Date" },
    { dataIndex: "followUpPlan", title: "Follow up Plan" },
    { dataIndex: "createdAt", title: "Entered Date" },
    { dataIndex: "createdBy", title: "Entered By" },
  ];

  const handleSave = () => {
    dispatch(createFollowUpPlan({ ...formState, patientId })).then(() => {
      dispatch(fetchFollowUpPlan({ patientId }));
      handleClose();
    });
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
        <h6>Follow Up Plan</h6>
        <Box className="custom-btn" onClick={handleOpen}>
          Add Follow Up Plan
        </Box>
      </div>
      <Table dataSource={data} columns={columns} className="table-container" />
      {/* Dialog Component */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Follow Up Plan</DialogTitle>
        <DialogContent>
          <TextField
            label="Recall Date"
            type="date"
            fullWidth
            value={formState.recallDate}
            onChange={(e) => handleChange("recallDate", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
            size="small"
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Time Slot
          </Typography>
          <RadioGroup
            row
            value={formState.timeSlot}
            onChange={(e) => handleChange("timeSlot", e.target.value)}
            sx={{ mt: 1 }}
          >
            <FormControlLabel value="20" control={<Radio />} label="20 min" />
            <FormControlLabel value="30" control={<Radio />} label="30 min" />
            <FormControlLabel value="40" control={<Radio />} label="40 min" />
          </RadioGroup>
          <TextField
            label="Follow Up Plan"
            fullWidth
            value={formState.followUpPlan}
            onChange={(e) => handleChange("followUpPlan", e.target.value)}
            sx={{ mt: 2 }}
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FollowUpPlan;
