import React from "react";
import CareForm from "../components/CareForm";

const IntraOpCareForm = () => {
  const textFields = [
    { label: "MRN", value: "", onChange: (val) => console.log("MRN:", val) },
    {
      label: "Consult Date",
      value: "",
      onChange: (val) => console.log("Consult Date:", val),
    },
    {
      label: "Patient Name",
      value: "",
      onChange: (val) => console.log("Patient Name:", val),
    },
    {
      label: "Date of Birth",
      value: "",
      onChange: (val) => console.log("Date of Birth:", val),
    },
    {
      label: "National ID",
      value: "",
      onChange: (val) => console.log("National ID:", val),
    },
    {
      label: "Insurance/Company",
      value: "",
      onChange: (val) => console.log("Insurance/Company:", val),
    },
    {
      label: "Doctor",
      value: "",
      onChange: (val) => console.log("Doctor:", val),
    },
    {
      label: "Speciality",
      value: "",
      onChange: (val) => console.log("Speciality:", val),
    },
    {
      label: "Date & Time",
      value: "",
      onChange: (val) => console.log("Date & Time:", val),
    },
  ];

  const checkboxes = [
    {
      id: "intraAnesthesia",
      label: "Intra-Anesthesia Assessment",
      checked: false,
      onChange: (checked) => console.log("Intra-Anesthesia Assessment:", checked),
    },
    {
      id: "infectiousScreening",
      label: "Infectious disease screening",
      checked: false,
      onChange: (checked) =>
        console.log("Infectious disease screening:", checked),
    },
    {
      id: "verificationConsent",
      label: "Verification of consent",
      checked: false,
      onChange: (checked) => console.log("Verification of consent:", checked),
    },
    {
      id: "surgicalChecklist",
      label: "Pre-Op Surgical Checklist",
      checked: false,
      onChange: (checked) => console.log("Pre-Op Surgical Checklist:", checked),
    },
    {
      id: "markingSite",
      label: "Pre-Op Marking of Site",
      checked: false,
      onChange: (checked) => console.log("Pre-Op Marking of Site:", checked),
    },
    {
      id: "medReconciliation",
      label: "Medication Reconciliation",
      checked: false,
      onChange: (checked) => console.log("Medication Reconciliation:", checked),
    },
    {
      id: "preMedication",
      label: "Pre-Medication",
      checked: false,
      onChange: (checked) => console.log("Pre-Medication:", checked),
    },
    {
      id: "ulcerPrevention",
      label: "Pressure Ulcer Prevention",
      checked: false,
      onChange: (checked) => console.log("Pressure Ulcer Prevention:", checked),
    },
    {
      id: "bardenScale",
      label: "Barden Scale",
      checked: false,
      onChange: (checked) => console.log("Barden Scale:", checked),
    },
    {
      id: "familyEducation",
      label: "Patient/Family Education (PFE)",
      checked: false,
      onChange: (checked) =>
        console.log("Patient/Family Education (PFE):", checked),
    },
  ];

  return (
    <CareForm
      title="Intra-Operative Care Form"
      demographicDetailsTitle="Patient Demographic Details"
      textFields={textFields}
      checkboxes={checkboxes}
      onSaveClose={() => console.log("Save & Close clicked")}
      onSaveAcknowledge={() => console.log("Save & Acknowledged clicked")}
      onApproveFinalize={() => console.log("Approve & Finalize clicked")}
      onClose={() => console.log("Close clicked")}
      formBtnName="Add Intra-op Care Form"
    />
  );
};

export default IntraOpCareForm;