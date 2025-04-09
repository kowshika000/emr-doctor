import React from "react";
import { Tabs } from "antd";
import Subjective from "../subjectiveData/subjective";
import Objective from "../objectiveData/objective";
import DiagnosisIp from "../assessmentData.jsx/Diagnosis";
import Plan from "../plan/plan";
import PhysicianNotes from "../physicianNotes/PhysicianNotes";
import ProgressNotes from "../ProgressNotes/ProgressNotes";
import DocumentandRemarkIp from "../Document&Remark/DocumentRemark";
import SurgeryOrder from "../SurgeryOrder/SurgeryOrder";
import PreOperative from "../preOperative/preOperative";
import IntraOperative from "../IntraOperative/intraOperative";
import PACUData from "../pacuData/pacuData";
import PostOperative from "../PostOperative/postOperative";
import UCAF from "../ucaf/ucaf";
import DischargeSummary from "../DischargeSummary/DischargeSummary";
import FollowUp from "../FollowUp/FollowUp";
import LifeSupportData from "../LifeSupportData/LifeSupportData";
import DeliveryDetails from "../DeliveryDetails/DeliveryDetails";
import { useLocation } from "react-router-dom";

const DoctorIpTabs = () => {
  const location = useLocation();
  const patientId = location.state?.patientId;
  const items = [
    {
      key: "1",
      label: "Subjective Data",
      children: <Subjective patientId={patientId} />,
    },
    {
      key: "2",
      label: "Objective Data",
      children: <Objective patientId={patientId} />,
    },
    {
      key: "3",
      label: "Assessment Data",
      children: <DiagnosisIp patientId={patientId} />,
    },
    {
      key: "4",
      label: "Plan",
      children: <Plan patientId={patientId} />,
    },

    {
      key: "5",
      label: "Physician Notes",
      children: <PhysicianNotes patientId={patientId} />,
    },
    {
      key: "6",
      label: "Progress Notes",
      children: <ProgressNotes patientId={patientId} />,
    },
    {
      key: "7",
      label: "Documents & Remarks",
      children: <DocumentandRemarkIp patientId={patientId} />,
    },
    {
      key: "8",
      label: "Surgery Order",
      children: <SurgeryOrder patientId={patientId} />,
    },
    {
      key: "9",
      label: "Pre-Operative Data",
      children: <PreOperative patientId={patientId} />,
    },
    {
      key: "10",
      label: "Intra-Operative Data",
      children: <IntraOperative patientId={patientId} />,
    },
    {
      key: "11",
      label: " PACU Data",
      children: <PACUData patientId={patientId} />,
    },
    {
      key: "12",
      label: "Post-Operative Data",
      children: <PostOperative patientId={patientId} />,
    },
    {
      key: "13",
      label: "UCAF",
      children: <UCAF patientId={patientId} />,
    },
    {
      key: "14",
      label: "Discharge Summary",
      children: <DischargeSummary patientId={patientId} />,
    },
    {
      key: "15",
      label: "Follow Up",
      children: <FollowUp patientId={patientId} />,
    },
    {
      key: "16",
      label: "Life Support Data",
      children: <LifeSupportData patientId={patientId} />,
    },
    {
      key: "17",
      label: "Delivery Details",
      children: <DeliveryDetails patientId={patientId} />,
    },
  ];

  return (
    <div className="w-100 p-3" style={{ overflow: "auto" }}>
      <Tabs defaultActiveKey="1" items={items} type="card" />
    </div>
  );
};

export default DoctorIpTabs;
