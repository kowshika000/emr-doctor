import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomTable from "../../../components/Table";

function ComplaintsHistory({
  handleViewHistoryModalClose,
  complaintAdded,
  setUpdatedComplaints,
}) {
  const rows = [
    {
      id: 1,
      enteredBy: "Dr. Smith",
      enteredDate: "2/10/2024",
      chiefComplaint: "Headache",
      duration: "2 days",
      location: "Forehead",
      quality: "Throbbing",
      context: "Stress",
      timing: "Morning",
      modifyFactor: "Rest",
      remarks: "Recurring",
      severity: "Mild",
    },
  ];

  const columns = [
    { field: "enteredBy", headerName: "Entered By", flex: 1 },
    { field: "enteredDate", headerName: "Entered Date", flex: 1 },
    { field: "chiefComplaint", headerName: "Chief Complaint", flex: 1 },
    { field: "duration", headerName: "Duration/Onset", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "quality", headerName: "Quality", flex: 1 },
    { field: "context", headerName: "Context", flex: 1 },
    { field: "timing", headerName: "Timing", flex: 1 },
    { field: "modifyFactor", headerName: "Modify Factor", flex: 1 },
    { field: "remarks", headerName: "Remarks", flex: 1 },
    { field: "severity", headerName: "Severity", flex: 1 },

    {
      field: "options",
      headerName: "Options",
      flex: 1,
      renderCell: (params) => (
        <Button variant="contained" onClick={() => handleAddComplaints(params)}>
          Add
        </Button>
      ),
    },
  ];

  const handleAddComplaints = (params) => {
    setUpdatedComplaints((prevComplaints) => [...prevComplaints, params.row]);
  };

  return (
    <Dialog open onClose={handleViewHistoryModalClose} fullWidth maxWidth="lg">
      <DialogContent dividers>
        <div className="header-text mb-3"> View Complaints</div>
        <CustomTable
          rows={complaintAdded}
          columns={columns}
          onOptionClick={(event, row) => handleAddComplaints(row)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ComplaintsHistory;
