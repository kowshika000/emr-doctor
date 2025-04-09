import { combineReducers } from "@reduxjs/toolkit";
import vitalReducer from "./slice/DoctSlice/GET/vitalSlice";
import fluidReducer from "./slice/DoctSlice/GET/fluidSlice";
import painRateReducer from "./slice/DoctSlice/GET/painrateSlice";
import chiefComplaintReducer from "./slice/DoctSlice/GET/chiefComplaintSlice";
import viewComplaintReducer from "./slice/DoctSlice/GET/viewComplaintSlice";
import medicalHistoryReducer from "./slice/DoctSlice/GET/medicalHistorySlice";
import rosReducer from "./slice/DoctSlice/GET/rosSlice";
import clinicalExamReducer from "./slice/DoctSlice/GET/clinicalExamSlice";
import confidentialReducer from "./slice/DoctSlice/GET/confidentialSlice";
import nurseNoteReducer from "./slice/DoctSlice/GET/nurseNoteSlice";
import diagnosisReducer from "./slice/DoctSlice/GET/diagnosisSlice";
import managementPlanReducer from "./slice/DoctSlice/GET/managementSlice";
import opPatientListReducer from "./slice/OpSlice/GET/patientListSlice";
import opPatientDetailReducer from "./slice/OpSlice/GET/patientDetailSlice";
import ipPatientListReducer from "./slice/IpSlice/GET/patientListSlice";
import ipPatientDetailReducer from "./slice/IpSlice/GET/patientDetailSlice";
import ipSearchReducer from "./slice/IpSlice/GET/searchPatientSlice";
import medicationReducer from "./slice/OpSlice/GET/medicationSlice";
import investigationReducer from "./slice/OpSlice/GET/investigationSlice";
import provisionalDiagnosisReducer from "./slice/DoctSlice/GET/provisionalSlice";
import treatmentReducer from "./slice/OpSlice/GET/treatmentSlice";
import searchTreatmentReducer from "./slice/OpSlice/GET/searchTreatment";
import documentReducer from "./slice/DoctSlice/GET/documentSlice";
import consultNoteReducer from "./slice/IpSlice/GET/consultationNote";
import progressNoteReducer from "./slice/IpSlice/GET/progressNote";
import dischargeNoteReducer from "./slice/IpSlice/GET/dischargeNote";

const docEmrReducer = combineReducers({
  showVital: vitalReducer,
  showFluid: fluidReducer,
  showPainrate: painRateReducer,
  cheifComplaint: chiefComplaintReducer,
  viewComplaint: viewComplaintReducer,
  medicalHistory: medicalHistoryReducer,
  ros: rosReducer,
  clinical: clinicalExamReducer,
  confidential: confidentialReducer,
  nurseNote: nurseNoteReducer,
  diagnosis: diagnosisReducer,
  management: managementPlanReducer,
  document: documentReducer,

  opPatientList: opPatientListReducer,
  opPatientDetail: opPatientDetailReducer,
  medication: medicationReducer,
  investigation: investigationReducer,
  provisional: provisionalDiagnosisReducer,
  opTreatment: treatmentReducer,
  opSearchTreatment: searchTreatmentReducer,

  ipPatientList: ipPatientListReducer,
  ipPatientDetail: ipPatientDetailReducer,
  ipSearchPatient: ipSearchReducer,

  consultation: consultNoteReducer,
  progress: progressNoteReducer,
  dischargeNote: dischargeNoteReducer,
});

export default docEmrReducer;
