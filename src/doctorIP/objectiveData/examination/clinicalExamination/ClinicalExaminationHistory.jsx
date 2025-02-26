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

function ClinicalExaminationHistory({
  handleViewHistoryModalClose,
  examinationAdded,
  setUpdatedExamination,
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
    {
      id: 2,
      enteredBy: "Dr. Johnson",
      enteredDate: "3/12/2024",
      chiefComplaint: "Back Pain",
      duration: "1 week",
      location: "Lower back",
      quality: "Sharp",
      context: "Work",
      timing: "Afternoon",
      modifyFactor: "Stretching",
      remarks: "Occasional",
      severity: "Moderate",
    },
  ];

  const columns = [
    { field: "enteredBy", headerName: "Entered By" },
    { field: "enteredDate", headerName: "Entered Date" },
    { field: "chiefComplaint", headerName: "Chief Complaint" },
    { field: "duration", headerName: "Duration" },
    { field: "location", headerName: "Location" },
    { field: "quality", headerName: "Quality" },
    { field: "context", headerName: "Context" },
    { field: "timing", headerName: "Timing" },
    { field: "modifyFactor", headerName: "Modify Factor" },
    { field: "remarks", headerName: "Remarks" },
    { field: "severity", headerName: "Severity" },
    {
      field: "options",
      headerName: "Options",
      renderCell: (row) => (
        <Button variant="contained" onClick={() => handleExamination(row)}>
          Add
        </Button>
      ),
    },
  ];

  const handleExamination = (row) => {
    setUpdatedExamination((prevExamination) => [...prevExamination, row]);
  };

  return (
    <Dialog open onClose={handleViewHistoryModalClose} fullWidth maxWidth="lg">
      <DialogTitle>
        View Complaints
        <IconButton
          aria-label="close"
          onClick={handleViewHistoryModalClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <CustomTable
          rows={rows}
          columns={columns}
          onOptionClick={(event, row) => handleExamination(row)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ClinicalExaminationHistory;
