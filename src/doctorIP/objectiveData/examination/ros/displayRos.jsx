import React, { useState, useEffect } from "react";
import RosHistory from "./RosHistory";
import AddRos from "./addRos";
import {
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

function DisplayRos() {
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [addRosModal, setAddRosModal] = useState(false);
  const [reviewsAdded, setReviewsAdded] = useState([]);
  const [updatedReviewRowList, setUpdatedReviewRowList] = useState([]);

  const handleAddRosModalOpen = () => {
    setAddRosModal(true);
  };

  const handleAddRosModalClose = () => {
    setAddRosModal(false);
  };

  const handleViewHistoryModalOpen = () => {
    setViewHistoryModal(true);
  };

  const handleViewHistoryModalClose = () => {
    setViewHistoryModal(false);
  };

  const reviews = (value) => {
    setReviewsAdded((prevReviews) => [...prevReviews, value]);
  };

  useEffect(() => {
    let updatedRowResult = reviewsAdded.map((item, index) => {
      const checkedSymptoms = Object.keys(item.checkedItems)
        .filter((symptom) => item.checkedItems[symptom])
        .join(", ");
      return {
        id: index + 1,
        specialization: item.specialization?.label || item.specialization,
        symptoms: item.symptoms.join(", "),
        otherSystemResponse: checkedSymptoms,
      };
    });
    setUpdatedReviewRowList(updatedRowResult);
  }, [reviewsAdded]);

  return (
    <Box sx={{ paddingY: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <h6>Review Of System</h6>
        <div className="d-flex gap-3">
          <div className="custom-btn" onClick={handleAddRosModalOpen}>Add Review Of System</div>
          <div className="custom-btn" onClick={handleViewHistoryModalOpen}>View ROS History</div>
        </div>
      </Box>

      {updatedReviewRowList.length > 0 ? (
        updatedReviewRowList.map((row) => (
          <Card
            key={row.id}
            sx={{ marginBottom: 1, padding: 0, backgroundColor: "#f5f5f5" }}
          >
            <CardContent>
              <Typography variant="body1">
                <strong>Specialization: </strong> {row.specialization}
              </Typography>
              <Typography variant="body1">
                <strong>Symptoms: </strong> {row.symptoms}
              </Typography>
              <Typography variant="body1">
                <strong>Other System Response: </strong>{" "}
                {row.otherSystemResponse}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card sx={{ padding: 0, backgroundColor: "#f9f9f9" }}>
          <CardContent>
            <Typography variant="body1" color="textSecondary" align="center">
              No data available.
            </Typography>
          </CardContent>
        </Card>
      )}

      {addRosModal && (
        <AddRos
          handleAddRosModalClose={handleAddRosModalClose}
          reviews={reviews}
        />
      )}
      {viewHistoryModal && (
        <RosHistory
          handleViewHistoryModalClose={handleViewHistoryModalClose}
          reviewsAdded={reviewsAdded}
          setUpdatedReviewRow={setUpdatedReviewRowList}
        />
      )}
    </Box>
  );
}

export default DisplayRos;
