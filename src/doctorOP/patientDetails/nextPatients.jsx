import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import image from "../../assets/image.png";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const NextPatients = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const onChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div
      style={{
        // height: "98vh",
        overflow: "auto",
        maxWidth: "350px",
        padding: "10px",
        backgroundColor: isVisible ? "#00a79d" : "",
        borderRadius: "4px",
        margin: isVisible ? "10px" : "",
        color: "white",
      }}
    >
      <Box>
        <button
          onClick={toggleVisibility}
          style={{
            backgroundColor: "#F0F8F8",
            color: "#333",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            fontSize: "12px",
            transition:
              "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#E0E8E8";
            e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#F0F8F8";
            e.currentTarget.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {isVisible ? (
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <ChevronLeft />
              {/* <span style={{ fontWeight: "500" }}>Filter Calendar</span> */}
              {/* <FilterAlt /> */}
            </div>
          ) : (
            <ChevronRight />
          )}
        </button>
      </Box>

      {isVisible && (
        <Box mt={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={onChange}
              variant="borderless"
            />
          </LocalizationProvider>

          {/* Next Patient Card */}
          <h6 className="mt-3">Next Patient</h6>
          <Card
            sx={{
              mb: 1,
              width: "150px",
              height: "180px",
              backgroundColor: "#f0f0f0",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <img
                src={image}
                alt="patient"
                style={{
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                  marginBottom: "10px",
                }}
              />
              <Typography variant="subtitle1">Fatima</Typography>
              <Typography variant="body2">15 Years | Diabetic</Typography>
            </CardContent>
          </Card>

          {/* Waiting List Cards */}
          <h6 className="mt-3">Waiting List (10)</h6>
          <Card
            sx={{
              mb: 1,
              width: "150px",
              height: "180px",
              backgroundColor: "#f0f0f0",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <img
                src={image}
                alt="waiting patient"
                style={{
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                  marginBottom: "10px",
                }}
              />
              <Typography variant="subtitle1">Fatima</Typography>
              <Typography variant="body2">15 Years | Diabetic</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
};

export default NextPatients;
