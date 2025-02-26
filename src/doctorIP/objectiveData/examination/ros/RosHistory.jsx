import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomTable from "../../../components/Table";

function RosHistory({
  handleViewHistoryModalClose,
  reviewsAdded,
  setUpdatedReviewRow,
}) {
  const [updatedReviewRowList, setUpdatedReviewRowList] = useState([]);

  const handleAddRos = (row) => {
    setUpdatedReviewRow((prevRos) => [...prevRos, row]);
  };

  const columns = [
    { field: "specialization", headerName: "Entered By", flex: 1 },
    { field: "symptoms", headerName: "Entered Date", flex: 1 },
    { field: "otherSystemResponse", headerName: "Chief Complaint", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
      renderCell: (row) => (
        <Button variant="contained" onClick={() => handleAddRos(row)}>
          Add
        </Button>
      ),
    },
  ];

  useEffect(() => {
    let updatedRowResult = reviewsAdded.map((item, index) => {
      const key = Object.keys(item.checkedItems)[0];
      const values = item.checkedItems[key].join(",");
      const result = `${key} - ${values}`;
      return {
        id: index + 1,
        specialization: item.specialization.label,
        symptoms: item.symptoms,
        otherSystemResponse: result,
      };
    });
    setUpdatedReviewRowList(updatedRowResult);
  }, [reviewsAdded]);

  return (
    <Dialog open={true} onClose={handleViewHistoryModalClose} fullWidth maxWidth="md">    
        <DialogContent>
        <h6 className="mb-3">View Review Of History</h6>
          <CustomTable
            columns={columns}
            rows={updatedReviewRowList}
            onOptionClick={(event, row) => handleAddRos(row)} 
          />
        </DialogContent>
    </Dialog>
  );
}

export default RosHistory;
