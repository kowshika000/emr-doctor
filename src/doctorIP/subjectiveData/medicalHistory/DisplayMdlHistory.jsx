import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import FormInput from "../../../component/FormInput";

const DisplayMdlHistory = () => {
  const [addHistoryMdl, setAddHistoryMdl] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [nilSignificant, setNilSignificant] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [formData, setFormData] = useState({});

  const InputField = (label, id) => (
    <Grid item xs={12} sm={6} md={3} mb={1} key={id}>
      <TextField
        fullWidth
        label={label}
        variant="filled"
        size="small"
        multiline
        // rows={2}
        value={formData[id] || ""}
        onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
      />
    </Grid>
  );

  const historyData = [
    {
      id: 1,
      title: "Medical History",
      fields: [
        "Past Medical History",
        "Past Surgical History",
        "Past Treatment History",
        "Special Habits",
        "Occupational Hazards",
        "Socio-economic History",
        "Hypertension (B P)",
        "Diabetes (Sugar)",
        "Hyper Acidity",
        "Cardiac Disease (Heart)",
        "Birth Weight",
        "Pregnancy",
        "Delivery",
        "Neonatal",
        "Development History",
        "Diet History",
        "Medical History",
        "Pacemaker",
      ],
    },
    {
      id: 2,
      title: "Menstrual History",
      fields: [
        "LMP (date)",
        "Regular",
        "Since",
        "Every",
        "Lasting",
        "Pain",
        "Comments",
      ],
    },
    {
      id: 3,
      title: "Gynec - Past Illness",
      fields: [
        "Operation",
        "Anesthesia Problems",
        "Blood/Products",
        "Respiratory Issues",
        "Renal Disease",
        "Diabetes",
        "Cardiac Problems",
        "Gynecologic Issues",
        "Thromboembolism",
        "Hypertension",
        "CNS Disorder/Migraine",
        "Psychiatric or Eating Disorder",
        "Substance Use",
        "STI",
        "EDD",
        "Others",
      ],
    },
    {
      id: 4,
      title: "Present Pregnancy",
      fields: [
        "Current Medications",
        "Pre-pregnancy Medication",
        "Pre-conceptual Folic Acid",
        "Depression/Anxiety",
        "Bleeding",
        "Received Immune Globulin",
        "Pyrexia",
        "Infection (e.g., UTI, STI)",
        "Nausea/Vomiting",
        "Smoking Pre-preg (per day)",
        "Wishing to Quit",
        "Alcohol Use",
        "Substance Use",
        "Threatened Preterm Labour",
        "fFN Sent",
        "LMP",
        "Others",
      ],
    },
    {
      id: 5,
      title: "Family History",
      fields: ["Diabetes", "Hypertension", "Thrombosis", "Cancer", "Others"],
    },
    {
      id: 6,
      title: "Birth History",
      fields: ["Birth History"],
    },
    {
      id: 7,
      title: "Past Obstetrical History",
      fields: [
        "G",
        "P",
        "NVD",
        "LSCS",
        "Mode",
        "Baby's Weight",
        "Baby's Sex",
        "Remarks",
        "Miscarriage",
      ],
    },
    {
      id: 8,
      title: "Sensitivity / Allergy",
      fields: ["Drug Allergy", "Sensitivity/Allergy"],
    },
    {
      id: 9,
      title: "Medication History",
      fields: ["Current Medications", "Medication History"],
    },
    {
      id: 10,
      title: "Other History",
      fields: [
        "Smear History",
        "Sonomammogram History",
        "Contraception",
        "Bowel History",
        "Urinary History",
        "Other History",
      ],
    },
  ];

  const handleAccordionToggle = (id) => {
    if (!nilSignificant[id]) {
      setExpanded((prev) => (prev === id ? null : id));
    }
  };

  const handleCheckboxChange = (id) => {
    setNilSignificant((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = () => {
    const groupedData = historyData.reduce((acc, item) => {
      const filteredFields = item.fields
        .map((field) => {
          const key = `${item.title}-${field}`;
          return formData[key] ? { label: field, value: formData[key] } : null;
        })
        .filter(Boolean);

      if (filteredFields.length > 0) {
        acc.push({ title: item.title, fields: filteredFields });
      }
      return acc;
    }, []);
    setSubmittedData((prev) => [...prev, ...groupedData]);
    setFormData({});
    setAddHistoryMdl(false);
  };

  return (
    <div>
      <div className="header-container my-4">
        <h6>Medical History</h6>
        {addHistoryMdl ? (
          <div className="custom-btn" onClick={() => setAddHistoryMdl(false)}>
            Hide
          </div>
        ) : (
          <div className="custom-btn" onClick={() => setAddHistoryMdl(true)}>
            Add Medical History
          </div>
        )}
      </div>

      {addHistoryMdl ? (
        <Box my={2}>
          {historyData.map((item) => (
            <Box
              key={item.id}
              sx={{
                borderBottom: "1px solid #ddd",
                marginBottom: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 1,
                  cursor: "pointer",
                  backgroundColor:
                    expanded === item.id ? "#f0f0f0" : "transparent",
                }}
                onClick={() => handleAccordionToggle(item.id)}
              >
                <Typography
                  sx={{
                    color: "black",
                    fontWeight: "medium",
                    bgcolor: "lightBlue",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  {item.title}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={!!nilSignificant[item.id]}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  }
                  label="Nil Significant"
                />
              </Box>
              {expanded === item.id && (
                <Box sx={{ padding: 2, backgroundColor: "#f9f9f9" }}>
                  <Grid container spacing={2}>
                    {item.fields.map((field, index) =>
                      InputField(field, `${item.title}-${field}`)
                    )}
                  </Grid>
                </Box>
              )}
            </Box>
          ))}
          <Box display={"flex"} justifyContent={"end"} my={3}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save/Close
            </Button>
          </Box>
        </Box>
      ) : (
        <div>
          {!submittedData || submittedData.length === 0 ? (
            <div
              className="text-center"
              style={{ borderBottom: "1px solid gray" }}
            >
              No Medical History found
            </div>
          ) : (
            <div className="p-2 ">
              {submittedData.map((data, index) => (
                <Box key={index} my={2}>
                  <div
                    className="mb-3 h6"
                    style={{
                      color: "rgb(144, 189, 204)",
                      // fontWeight: "medium",
                      // backgroundColor: "lightBlue",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      // width: "fit-content",
                      borderBottom: "2px solid lightGray",
                    }}
                  >
                    {data.title}
                  </div>
                  {data.fields.map((field, idx) => (
                    <div className="d-flex  w-100" key={idx}>
                      <div className="h6  w-25 mx-2 "> {field.label} </div>
                      <div
                        className=" w-75 ps-2"
                        style={{
                          // backgroundColor: "#e4e4e4",
                          // borderRadius: "4px",
                          borderLeft:"2px solid gray"
                        }}
                      >
                        {field.value}
                      </div>
                    </div>
                  ))}
                </Box>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayMdlHistory;
