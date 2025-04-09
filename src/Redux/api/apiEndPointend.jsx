export const API_ENDPOINTS = {
  GET_VITAL: "doctorEmr/getVitalSigns",
  ADD_VITAL: "doctorEmr/createVitalSigns",

  GET_PAINRATE: "doctorEmr/getPainRate",
  Add_PAINRATE: "doctorEmr/createPainRate",

  GET_FLUID: "doctorEmr/getFluidSigns",
  Add_FLUID: "doctorEmr/createFluidSigns",

  GET_CHIEFCOMPLAINT: "doctorEmr/getChiefComplaint",
  ADD_CHIEFCOMPLAINT: "doctorEmr/createChiefComplaint",
  VIEW_CHIEFCOMPLAINT: "doctorEmr/viewHistory",

  ADD_MEDICAL_HISTORY: "doctorEmr/createMedicalHistory",
  GET_MEDICAL_HISTORY: "doctorEmr/getMedicalHistory",

  GET_ROS: "doctorEmr/getReviewOfSystem",
  ADD_ROS: "doctorEmr/createReviewOfSystem",

  GET_CLINICAL_EXAM: "doctorEmr/getClinicalExamination",
  ADD_CLINICAL_EXAM: "doctorEmr/createClinicalExamination",
  EDIT_CLINICAL_EXAM: "doctorEmr/editClinicalExamination",

  GET_CONFIDENTIAL_STATEMENT: "doctorEmr/getConfidentialStatement",
  ADD_CONFIDENTIAL_STATEMENT: "doctorEmr/createConfidentialStatement",
  EDIT_CONFIDENTIAL_STATEMENT: "doctorEmr/editConfidentialStatement",

  GET_NURSE_NOTE: "doctorEmr/getNurseNotes",
  ADD_NURSE_NOTE: "doctorEmr/createNurseNotes",
  EDIT_NURSE_NOTE: "doctorEmr/editNurseNotes",
  DELETE_NURSE_NOTE: "doctorEmr/deleteNurseNotes",

  GET_MANAGEMENT_PLAN: "doctorEmr/getManagementPlan",
  ADD_MANAGEMENT_PLAN: "doctorEmr/createManagementPlan",
  EDIT_MANAGEMENT_PLAN: "doctorEmr/editManagementPlan",
  DELETE_MANAGEMENT_PLAN: "doctorEmr/deleteManagementPlan",

  GET_DIAGNOSIS: "doctorEmr/getDiagnosis",
  ADD_DIAGNOSIS: "doctorEmr/createDiagnosis",
  EDIT_DIAGNOSIS: "doctorEmr/editDiagnosis",
  DELETE_DIAGNOSIS: "doctorEmr/deleteDiagnosis",

  GET_OP_LIST: "opPatient/getOpPatientList",
  GET_OP_PATIENT_DETAILS: "opPatient/getOpPatientDetails",

  GET_MEDICATION: "opPatient/getMedication",
  ADD_MEDICATION: "opPatient/createMedication",

  GET_PROVISIONAL: "opPatient/getProvisionalDiagnosis",
  ADD_PROVISIONAL: "opPatient/createProvisionalDiagnosis",

  GET_INVESTIGATION: "opPatient/getInvestigation",
  ADD_INVESTIGATION: "opPatient/createInvestigation",
  // EDIT_INVESTIGATION: "opPatient/updateInvestigation",
  DELETE_INVESTIGATION: "opPatient/deleteInvestigation",

  GET_OP_TREATMENT: "treatmentApi/getTreatment",
  ADD_OP_TREATMENT: "treatmentApi/createTreatment",
  // EDIT_OP_TREATMENT: "treatmentApi/updateTreatment",
  DELETE_OP_TREATMENT: "treatmentApi/deleteTreatment",
  SEARCH_OP_TREATMENT: "treatmentApi/searchLasTest",

  ADD_DOCUMENT: "opPatient/uploadDocument",
  GET_DOCUMENT: "opPatient/getDocuments",

  GET_IP_LIST: "patientApi/getIpPatientList",
  GET_IP_PATIENT_DETAILS: "patientApi/getIpPatientDetails",
  GET_IP_SEARCH_PATIENT: "patientApi/searchInPatients",

  GET_CONSULTATION_NOTE: "patientApi/getConsultationNotes",
  ADD_CONSULTATION_NOTE: "patientApi/createConsultationNotes",
  DELETE_CONSULTATION_NOTE: "patientApi/softDeleteConsultationNote",
  EDIT_CONSULTATION_NOTE: "patientApi/updateConsultationNote",

  GET_PROGRESS_NOTE: "patientApi/getProgressNotes",
  ADD_PROGRESS_NOTE: "patientApi/createProgressNotes",
  DELETE_PROGRESS_NOTE: "patientApi/softDeleteProgressNote",
  EDIT_PROGRESS_NOTE: "patientApi/updateProgressNote",

  GET_DISCHARGE_NOTE: "patientApi/getConsultationNotes",
  ADD_DISCHARGE_NOTE: "patientApi/createConsultationNotes",
  DELETE_DISCHARGE_NOTE: "patientApi/softDeleteConsultationNote",
  EDIT_DISCHARGE_NOTE: "patientApi/updateConsultationNote",

};
