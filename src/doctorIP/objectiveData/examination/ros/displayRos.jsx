import React, { useState, useEffect } from "react";
import RosHistory from "./RosHistory";
import AddRos from "./addRos";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchROS } from "../../../../Redux/slice/DoctSlice/GET/rosSlice";

function DisplayRos({ patientId }) {
  const dispatch = useDispatch();
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [addRosModal, setAddRosModal] = useState(false);
  const [reviewsAdded, setReviewsAdded] = useState([]);

  const { data } = useSelector((state) => state?.docEmr?.ros);

  const getROS = () => {
    dispatch(fetchROS({ patientId }));
  };

  useEffect(() => {
    getROS();
  }, [dispatch]);

  const handleAddRosModalOpen = () => setAddRosModal(true);
  const handleAddRosModalClose = () => setAddRosModal(false);

  const handleViewHistoryModalOpen = () => setViewHistoryModal(true);
  const handleViewHistoryModalClose = () => setViewHistoryModal(false);

  const reviews = (value) => {
    setReviewsAdded((prevReviews) => [...prevReviews, value]);
  };

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
          <div className="custom-btn" onClick={handleAddRosModalOpen}>
            Add Review Of System
          </div>
          <div className="custom-btn" onClick={handleViewHistoryModalOpen}>
            View ROS History
          </div>
        </div>
      </Box>

      {data?.length > 0 ? (
        data.map((row) => {
          const otherSymptoms = Object.keys(row)
            .filter(
              (key) =>
                row[key] === true &&
                ![
                  "id",
                  "specialization",
                  "symptoms",
                  "doctorAppointment",
                ].includes(key)
            )
            .map((key) => key.replace(/([A-Z])/g, " $1").trim())
            .join(", ");

          return (
            <>
              <Card
                key={row.id}
                sx={{ marginBottom: 1, backgroundColor: "#f5f5f5" }}
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
                    {otherSymptoms || "None"}
                  </Typography>
                </CardContent>
              </Card>
              <Typography
                variant="subtitle2"
                sx={{ mt: 2, textAlign: "right", color: "text.secondary" }}
              >
                Entered Date: {row.createdAt} | Entered By: {row.createdBy || "N/A"}
              </Typography>
            </>
          );
        })
      ) : (
        <Card sx={{ backgroundColor: "#f9f9f9" }}>
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
          getROS={getROS}
          patientId={patientId}
        />
      )}

      {viewHistoryModal && (
        <RosHistory
          handleViewHistoryModalClose={handleViewHistoryModalClose}
          reviewsAdded={reviewsAdded}
          patientId={patientId}
        />
      )}
    </Box>
  );
}

export default DisplayRos;
