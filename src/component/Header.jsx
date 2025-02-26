import React from "react";
import { Box } from "@mui/material";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Radio } from "antd"; // Ant Design Radio
import DoctorIP from "../doctorIP/doctorIP";
import SurgeryOrder from "../doctorIP/SurgeryOrder/SurgeryOrder";
import PreOperative from "../doctorIP/preOperative/preOperative";
import IntraOperative from "../doctorIP/IntraOperative/intraOperative";
import PACUData from "../doctorIP/pacuData/pacuData";
import PostOperative from "../doctorIP/PostOperative/postOperative";
import DischargeSummary from "../doctorIP/DischargeSummary/DischargeSummary";
import FollowUp from "../doctorIP/FollowUp/FollowUp";
import UCAF from "../doctorIP/ucaf/ucaf";
import LifeSupportData from "../doctorIP/LifeSupportData/LifeSupportData";
import DeliveryDetails from "../doctorIP/DeliveryDetails/DeliveryDetails";
import PhysicianNotes from "../doctorIP/physicianNotes/PhysicianNotes";
import ProgressNotes from "../doctorIP/ProgressNotes/ProgressNotes";
import DocumentandRemarkIp from "../doctorIP/Document&Remark/DocumentRemark";
import HistoryOfPresentIllness from "../doctorIP/subjectiveData/historyOfPateintIllness";
import MedicalHistory from "../doctorIP/subjectiveData/medicalHistory";
import VitalSigns from "../doctorIP/objectiveData/vitalSigns";
import NurseNotes from "../doctorIP/objectiveData/nurseNotes";
import ExaminationIp from "../doctorIP/objectiveData/examination";
import DiagnosisIp from "../doctorIP/assessmentData.jsx/Diagnosis";
import Investigation from "../doctorIP/plan/Investigation";
import Treatments from "../doctorIP/plan/Treatments";
import Medication from "../doctorIP/plan/Medication";
import OrderBlood from "../doctorIP/plan/OrderBlood";
import Consumable from "../doctorIP/plan/Consumable";
import OrderSheet from "../doctorIP/plan/OrderSheet";
import Diet from "../doctorIP/plan/Diet";
import "./header.css";
import { DoctorOp } from "../doctorOP/doctorOp";
import PatientDetails from "../doctorOP/patientDetails/patientDetails";

function DoctorTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const showIP = location.pathname.startsWith("/IpDoc/ip");
  const showOP = location.pathname.startsWith("/OpDoc/op");

  const activeTab = location.pathname.startsWith("/OpDoc") ? "op" : "ip";
  const tabs = [
    {
      label: "Subjective  data",
      path: "/IpDoc/ip/subData",
      subTabs: [
        { label: "HOPI", path: "/IpDoc/ip/subData/patientIllness" },
        { label: "Medical History ", path: "/IpDoc/ip/subData/medicalHistory" },
      ],
    },
    {
      label: "Objective  data",
      path: "/IpDoc/ip/objData",
      subTabs: [
        { label: "Vital Signs", path: "/IpDoc/ip/objData/vital" },
        { label: "Nurse Notes", path: "/IpDoc/ip/objData/nurseNote" },
        { label: "Examination", path: "/IpDoc/ip/objData/examination" },
      ],
    },
    {
      label: "Assessment Data",
      path: "/IpDoc/ip/assessmentData",
      subTabs: [
        { label: "Diagnosis", path: "/IpDoc/ip/assessmentData/diagnosis" },
      ],
    },
    {
      label: "Plan",
      path: "/IpDoc/ip/plan",
      subTabs: [
        { label: "Investigation", path: "/IpDoc/ip/plan/investigation" },
        { label: "Treatments", path: "/IpDoc/ip/plan/treatment" },
        { label: "Medication", path: "/IpDoc/ip/plan/medication" },
        { label: "Order Blood", path: "/IpDoc/ip/plan/orderBlood" },
        { label: "Consumables", path: "/IpDoc/ip/plan/consumable" },
        { label: "Order Sheet", path: "/IpDoc/ip/plan/orderSheet" },
        { label: "Diet", path: "/IpDoc/ip/plan/diet" },
      ],
    },
    {
      label: "Physician Notes",
      path: "/IpDoc/ip/physicianNotes",
    },
    {
      label: "Progress Notes",
      path: "/IpDoc/ip/progressNotes",
    },
    {
      label: "Surgery Order",
      path: "/IpDoc/ip/surgery",
    },
    {
      label: "Documents & Remarks",
      path: "/IpDoc/ip/documentsRemarks",
    },
    { label: "Pre-Operative", path: "/IpDoc/ip/preOperative" },
    { label: "Intra-Operative", path: "/IpDoc/ip/intraOperative" },
    { label: "PACU Data", path: "/IpDoc/ip/pacuData" },
    { label: "Post-Operative", path: "/IpDoc/ip/postOperative" },
    { label: "Discharge Summary", path: "/IpDoc/ip/dischargeSummary" },
    { label: "Follow Up", path: "/IpDoc/ip/followUp" },
    { label: "UCAF", path: "/IpDoc/ip/ucaf" },
    { label: "Life Support Data", path: "/IpDoc/ip/lifeSupportData" },
    { label: "Delivery Details", path: "/IpDoc/ip/deliveryDetails" },
  ];

  const handleTabChange = (e) => {
    const selectedTab = e.target.value;
    if (selectedTab === "ip") {
      navigate("/IpDoc");
    } else if (selectedTab === "op") {
      navigate("/OpDoc");
    }
  };
  const radioStyle = {
    fontSize: "12px",
    backgroundColor: "#f0f2f5",
    border: "1px solid #d9d9d9",
    color: "#333",
  };

  const activeStyle = {
    backgroundColor: "rgb(155, 211, 211)",
    color: "#fff",
    border: "1px solid rgb(155, 211, 211)",
  };
  const handleTabClick = (tab) => {
    if (tab.subTabs && tab.subTabs.length > 0) {
      navigate(tab.subTabs[0].path); // Navigate to the first sub-tab if available
    } else {
      navigate(tab.path); // Navigate directly to the main tab path
    }
  };

  const getActiveMainTab = () => {
    return tabs.find((tab) =>
      tab.subTabs
        ? tab.subTabs.some((subTab) =>
            location.pathname.startsWith(subTab.path)
          )
        : location.pathname.startsWith(tab.path)
    );
  };

  const activeMainTab = getActiveMainTab();

  return (
    <Box className="p-3"
    style={{ width: "100%", height: "100%", overflow: "auto" }}>
      {showIP || showOP ? (
        ""
      ) : (
        <Radio.Group
          value={activeTab}
          onChange={handleTabChange}
          style={{ margin: 16 }}
        >
          <Radio.Button
            value="op"
            style={
              activeTab === "op"
                ? { ...radioStyle, ...activeStyle }
                : radioStyle
            }
          >
            OP
          </Radio.Button>
          <Radio.Button
            value="ip"
            style={
              activeTab === "ip"
                ? { ...radioStyle, ...activeStyle }
                : radioStyle
            }
          >
            IP
          </Radio.Button>
        </Radio.Group>
      )}

      <Box
        sx={{
          overflow: "hidden",
          height: "100vh",
          display: "flex",
        }}
      >
        {showIP && (
          <Box
            sx={{
              width: "220px",
              minWidth: "220px",
              bgcolor: "#f0f2f5",
              borderRight: "1px solid #d9d9d9",
              overflowY: "auto",
              padding: 2,
            }}
          >
            {tabs.map((tab) => (
              <Box key={tab.path}>
                {/* Main Tab */}
                <Box
                  sx={{
                    padding: "8px 10px",
                    margin: "5px 0",
                    cursor: "pointer",
                    backgroundColor:
                      activeMainTab && activeMainTab.path === tab.path
                        ? "#52c7c7"
                        : "transparent",
                    color:
                      activeMainTab && activeMainTab.path === tab.path
                        ? "#fff"
                        : "#333",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "#b2e4e4",
                    },
                  }}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.label}
                </Box>

                {/* Sub-Tabs (Only Show if They Exist) */}
                {tab.subTabs &&
                  activeMainTab &&
                  activeMainTab.path === tab.path && (
                    <Box sx={{ paddingLeft: 2 }}>
                      {tab.subTabs.map((subTab) => (
                        <Box
                          key={subTab.path}
                          sx={{
                            padding: "8px 10px",
                            margin: "2px 0",
                            cursor: "pointer",
                            backgroundColor:
                              location.pathname === subTab.path
                                ? "#3d9b9b"
                                : "transparent",
                            color:
                              location.pathname === subTab.path
                                ? "#fff"
                                : "#555",
                            borderRadius: "4px",
                            "&:hover": {
                              backgroundColor: "#6bcfcf",
                            },
                          }}
                          onClick={() => navigate(subTab.path)}
                        >
                          {subTab.label}
                        </Box>
                      ))}
                    </Box>
                  )}
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 1, padding: 1 }}>
          <Routes>
            <>
              <Route path="/" element={<Navigate to="/OpDoc" />} />
              <Route path="/IpDoc" element={<DoctorIP />} />
              <Route
                path="/IpDoc/ip"
                element={<Navigate to="/IpDoc/ip/surgery" />}
              />
              <Route path="/IpDoc/ip/surgery" element={<SurgeryOrder />} />
              <Route path="/IpDoc/ip/preOperative" element={<PreOperative />} />
              <Route
                path="/IpDoc/ip/intraOperative"
                element={<IntraOperative />}
              />
              <Route path="/IpDoc/ip/pacuData" element={<PACUData />} />
              <Route
                path="/IpDoc/ip/postOperative"
                element={<PostOperative />}
              />
              <Route
                path="/IpDoc/ip/dischargeSummary"
                element={<DischargeSummary />}
              />
              <Route path="/IpDoc/ip/followUp" element={<FollowUp />} />
              <Route path="/IpDoc/ip/ucaf" element={<UCAF />} />
              <Route
                path="/IpDoc/ip/lifeSupportData"
                element={<LifeSupportData />}
              />
              <Route
                path="/IpDoc/ip/deliveryDetails"
                element={<DeliveryDetails />}
              />
              <Route
                path="/IpDoc/ip/physicianNotes"
                element={<PhysicianNotes />}
              />
              <Route
                path="/IpDoc/ip/progressNotes"
                element={<ProgressNotes />}
              />
              <Route
                path="/IpDoc/ip/documentsRemarks"
                element={<DocumentandRemarkIp />}
              />
              <Route
                path="/IpDoc/ip/subData/patientIllness"
                element={<HistoryOfPresentIllness />}
              />
              <Route
                path="/IpDoc/ip/subData/medicalHistory"
                element={<MedicalHistory />}
              />
              <Route path="/IpDoc/ip/objData/vital" element={<VitalSigns />} />
              <Route
                path="/IpDoc/ip/objData/nurseNote"
                element={<NurseNotes />}
              />
              <Route
                path="/IpDoc/ip/objData/examination"
                element={<ExaminationIp />}
              />
              <Route
                path="/IpDoc/ip/assessmentData/diagnosis"
                element={<DiagnosisIp />}
              />
              <Route
                path="/IpDoc/ip/plan/investigation"
                element={<Investigation />}
              />
              <Route path="/IpDoc/ip/plan/treatment" element={<Treatments />} />
              <Route
                path="/IpDoc/ip/plan/medication"
                element={<Medication />}
              />
              <Route
                path="/IpDoc/ip/plan/orderBlood"
                element={<OrderBlood />}
              />
              <Route
                path="/IpDoc/ip/plan/consumable"
                element={<Consumable />}
              />
              <Route
                path="/IpDoc/ip/plan/orderSheet"
                element={<OrderSheet />}
              />
              <Route path="/IpDoc/ip/plan/diet" element={<Diet />} />
            </>
            <>
              <Route path="/OpDoc" element={<DoctorOp />} />
              <Route
                path="/OpDoc/op"
                element={<Navigate to="/OpDoc/op/patient" />}
              />
              <Route path="/OpDoc/op/patient" element={<PatientDetails />} />
            </>
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default DoctorTabs;
