import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createMedicalHistory } from "../../../Redux/slice/DoctSlice/POST/addMedHistorySlice";
import { fetchMedicalHistory } from "../../../Redux/slice/DoctSlice/GET/medicalHistorySlice";

const DisplayMdlHistory = ({ patientId }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.docEmr?.medicalHistory);

  const initialForm = {
    medicalHxDTOs: [{}],
    menstrualHxDTOs: [{}],
    gynecPastIllnessDTOs: [{}],
    presentPregnancyDTOs: [{}],
    familyHxDTOs: [{}],
    birthHxDTOs: [{}],
    pastObstetricalHistoryDTOs: [{}],
    sensitivityAllergyDTOs: [{}],
    medicationHxDTOs: [{}],
    otherHxDTOs: [{}],
  };

  const [formData, setFormData] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!patientId) return;
    dispatch(fetchMedicalHistory({ patientId }));
    // .then((res) => {
    //   if (res?.payload?.data) {
    //     const data = res.payload.data;

    //     const filledData = { ...initialForm };
    //     Object.keys(filledData).forEach((key) => {
    //       filledData[key] = data[key]?.length ? data[key] : [{}];
    //     });

    //     setFormData({ ...filledData });
    //   }
    // });
  }, [patientId, dispatch]);

  const handleChange = (section, index, field, value) => {
    setFormData((prev) => {
      const updatedSection = [...(prev[section] || [{}])];
      updatedSection[index] = {
        ...updatedSection[index],
        [field]: value,
      };
      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };
  const formatLabel = (label) => {
    return label
      .replace(/([A-Z])/g, " $1") // add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // capitalize first letter
      .replace("Hx", "History") // optional: clean up known medical shorthands
      .trim();
  };

  const stripIds = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        newObj[key] = obj[key].map(({ id, ...rest }) => ({ ...rest }));
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };

  const handleSubmit = () => {
    const payload = {
      ...stripIds(formData),
      patientId,
    };

    dispatch(createMedicalHistory(payload)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(fetchMedicalHistory({ patientId }));
        setShowForm(false);
      }
    });
  };

  const renderSection = (title, sectionKey, fields) => (
    <Accordion key={sectionKey} defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ bgcolor: "#f5f5f5" }}
      >
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {(formData[sectionKey] || []).map((entry, index) => (
          <Grid container spacing={2} key={index}>
            {fields.map((field) => (
              <Grid item xs={12} sm={6} md={4} key={field.name}>
                <TextField
                  fullWidth
                  type={field.type || "text"}
                  label={field.label}
                  name={field.name}
                  value={entry?.[field.name] || ""}
                  onChange={(e) =>
                    handleChange(sectionKey, index, field.name, e.target.value)
                  }
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </AccordionDetails>
    </Accordion>
  );

  const sections = [
    {
      title: "Medical History",
      key: "medicalHxDTOs",
      fields: [
        { name: "pastMedicalHx", label: "Past Medical Hx" },
        { name: "pastSurgicalHx", label: "Past Surgical Hx" },
        { name: "specialHabits", label: "Special Habits" },
        { name: "hypertension", label: "Hypertension" },
        { name: "diabetes", label: "Diabetes" },
        { name: "cardiacDisease", label: "Cardiac Disease" },
      ],
    },
    {
      title: "Menstrual History",
      key: "menstrualHxDTOs",
      fields: [
        { name: "lmp", label: "LMP", type: "date" },
        { name: "regular", label: "Regular" },
        { name: "since", label: "Since" },
        { name: "every", label: "Every" },
        { name: "lasting", label: "Lasting" },
        { name: "pain", label: "Pain" },
      ],
    },
    {
      title: "Gynec Past Illness",
      key: "gynecPastIllnessDTOs",
      fields: [
        { name: "operation", label: "Operation" },
        { name: "anesthesiaProblems", label: "Anesthesia Problems" },
        { name: "cardiacProblems", label: "Cardiac Problems" },
      ],
    },
    {
      title: "Present Pregnancy",
      key: "presentPregnancyDTOs",
      fields: [
        { name: "currentMedications", label: "Current Medications" },
        { name: "depressionAnxiety", label: "Depression/Anxiety" },
        { name: "bleeding", label: "Bleeding" },
      ],
    },
    {
      title: "Family History",
      key: "familyHxDTOs",
      fields: [
        { name: "diabetes", label: "Diabetes" },
        { name: "hypertension", label: "Hypertension" },
        { name: "cancer", label: "Cancer" },
      ],
    },
    {
      title: "Birth History",
      key: "birthHxDTOs",
      fields: [{ name: "birthHistory", label: "Birth History" }],
    },
    {
      title: "Past Obstetrical History",
      key: "pastObstetricalHistoryDTOs",
      fields: [
        { name: "g", label: "Gravida" },
        { name: "p", label: "Para" },
        { name: "nvd", label: "NVD" },
        { name: "lscs", label: "LSCS" },
        { name: "babyWeight", label: "Baby Weight" },
      ],
    },
    {
      title: "Sensitivity & Allergy",
      key: "sensitivityAllergyDTOs",
      fields: [
        { name: "drugAllergy", label: "Drug Allergy" },
        { name: "sensitivityAllergy", label: "Sensitivity Allergy" },
      ],
    },
    {
      title: "Medication History",
      key: "medicationHxDTOs",
      fields: [
        { name: "currentMedication", label: "Current Medication" },
        { name: "medicationHx", label: "Medication History" },
      ],
    },
    {
      title: "Other History",
      key: "otherHxDTOs",
      fields: [
        { name: "smearHistory", label: "Smear History" },
        { name: "sonomammogramHistory", label: "Sonomammogram History" },
        { name: "contraception", label: "Contraception" },
      ],
    },
  ];

  return (
    <div>
      <div className="header-container ">
        <div className="h6 ">Medical History</div>
        {!showForm ? (
          <div className="custom-btn" onClick={() => setShowForm(true)}>
            Add Medical History
          </div>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 3 }}
            >
              Save History
            </Button>
          </>
        )}
      </div>
      {showForm &&
        sections.map(({ title, key, fields }) =>
          renderSection(title, key, fields)
        )}
      {!showForm && data && (
        <Box sx={{ mt: 2 }}>
          {sections.map(({ title, key }) => {
            const sectionData = data[key];

            if (!Array.isArray(sectionData) || sectionData.length === 0)
              return null;

            const validEntries = sectionData
              .map((entry) =>
                Object.entries(entry || {}).filter(
                  ([fieldKey, fieldVal]) =>
                    fieldKey !== "id" &&
                    fieldVal &&
                    typeof fieldVal === "string" &&
                    fieldVal.trim() !== "" &&
                    fieldVal.toLowerCase() !== "string"
                )
              )
              .filter((fields) => fields.length > 0);

            if (validEntries.length === 0) return null;

            return (
              <Card
                key={key}
                variant="outlined"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: 2,
                  bgcolor: "#fafafa",
                  borderColor: "#e0e0e0",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {title}
                  </Typography>

                  {validEntries.map((fields, idx) => (
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        mb: 2,
                        p: 1.5,
                        bgcolor: "#fff",
                        borderRadius: 1,
                        boxShadow: 0.5,
                        border: "1px solid #f0f0f0",
                      }}
                      key={idx}
                    >
                      {fields.map(([fieldKey, fieldVal]) => (
                        <Grid item xs={12} sm={6} md={4} key={fieldKey}>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "text.secondary" }}
                          >
                            {formatLabel(fieldKey)}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {String(fieldVal)}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  ))}
                </CardContent>
              </Card>
            );
          })}

          {/* If no valid sections found */}
          {sections.every(({ key }) => {
            const sectionData = data[key];
            const validEntries = (sectionData || [])
              .map((entry) =>
                Object.entries(entry || {}).filter(
                  ([k, v]) =>
                    k !== "id" &&
                    v &&
                    typeof v === "string" &&
                    v.trim() !== "" &&
                    v.toLowerCase() !== "string"
                )
              )
              .filter((fields) => fields.length > 0);
            return validEntries.length === 0;
          }) && (
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                textAlign: "center",
                p: 4,
                color: "text.secondary",
                bgcolor: "#fdfdfd",
                borderStyle: "dashed",
              }}
            >
              <Typography variant="h6">
                No Medical History Data Available
              </Typography>
            </Card>
          )}

          {/* Footer */}
          {data?.createdAt && (
            <Typography
              variant="subtitle2"
              sx={{ mt: 2, textAlign: "right", color: "text.secondary" }}
            >
              Entered Date: {data.createdAt} | Entered By:{" "}
              {data.createdBy || "N/A"}
            </Typography>
          )}
        </Box>
      )}
    </div>
  );
};

export default DisplayMdlHistory;
