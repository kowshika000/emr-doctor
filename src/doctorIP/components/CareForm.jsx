import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Dialog,
  DialogContent,
  Box,
} from "@mui/material";

const CareForm = ({
  title,
  demographicDetailsTitle,
  textFields,
  checkboxes,
  onSaveClose,
  onSaveAcknowledge,
  onApproveFinalize,
  onClose,
  formBtnName,
}) => {
  const [showForm, setShowForm] = useState(false);
  // Local state for checkboxes
  const [checkboxStates, setCheckboxStates] = useState(
    checkboxes.reduce((state, checkbox) => {
      state[checkbox.id] = checkbox.checked || false;
      return state;
    }, {})
  );

  // Handle checkbox toggle
  const handleCheckboxChange = (id) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      <div className="header-container my-4">
        <div className="h6">{title}</div>
        <Box className="custom-btn" onClick={() => setShowForm(true)}>
          {formBtnName}
        </Box>
      </div>
      <div className="custom-container">
        <p>No data available</p>
      </div>
      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="lg">
        <DialogContent>
          <h6>{demographicDetailsTitle}</h6>
          <Grid
            container
            spacing={2}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100%",
              margin: "0",
              paddingRight: "24px",
              paddingBottom: "24px",
            }}
          >
            {textFields.map((field, index) => (
              <Grid item xs={12} sm={2} key={index}>
                <TextField
                  label={field.label}
                  fullWidth
                  variant="standard"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </Grid>
            ))}
          </Grid>
          {title === "Post-Operative Care Form" ? (
            " "
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "20px",
                maxHeight: "260px",
                overflowY: "auto",
              }}
              className="mt-4"
            >
              <div
                style={{
                  display: "flex",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "4px",
                }}
              >
                {/* Dynamically render the header row */}
                {[
                  "Plan",
                  "Goal",
                  "Anticipated Intervention",
                  "Expected Outcome",
                ].map((header, index) => (
                  <div key={index} style={{ flex: 1, padding: "8px" }}>
                    {header}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  marginBottom: "8px",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "4px",
                }}
              >
                <div style={{ flex: 1, padding: "8px" }}>Intra-Op Care</div>
                <div style={{ flex: 2, padding: "8px" }}>
                  Patient will be prepared safely for Surgery
                </div>
                <div style={{ flex: 2, padding: "8px" }}>
                  {checkboxes.map((checkbox) => (
                    <div key={checkbox.id}>
                      <input
                        type="checkbox"
                        id={checkbox.id}
                        checked={checkboxStates[checkbox.id]}
                        onChange={() => handleCheckboxChange(checkbox.id)}
                        aria-label={checkbox.label}
                      />{" "}
                      <label htmlFor={checkbox.id}>{checkbox.label}</label>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 2, padding: "8px" }}>
                  Prepared safely for Surgery
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
              justifyContent: "end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#007bff" }}
              onClick={onSaveClose}
            >
              Save & Close
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#28a745" }}
              onClick={onSaveAcknowledge}
            >
              Save & Acknowledge
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ffc107" }}
              onClick={onApproveFinalize}
            >
              Approve & Finalize
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#dc3545" }}
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CareForm;
