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

const DoctorIpTabs = () => {
  const items = [
    {
      key: "1",
      label: "Subjective Data",
      children: <Subjective />,
    },
    {
      key: "2",
      label: "Objective Data",
      children: <Objective />,
    },
    {
      key: "3",
      label: "Assessment Data",
      children: <DiagnosisIp />,
    },
    {
      key: "4",
      label: "Plan",
      children: <Plan />,
    },

    {
      key: "5",
      label: "Physician Notes",
      children: <PhysicianNotes />,
    },
    {
      key: "6",
      label: "Progress Notes",
      children: <ProgressNotes />,
    },
    {
      key: "7",
      label: "Documents & Remarks",
      children: <DocumentandRemarkIp />,
    },
    {
      key: "8",
      label: "Surgery Order",
      children: <SurgeryOrder />,
    },
    {
      key: "9",
      label: "Pre-Operative Data",
      children: <PreOperative />,
    },
    {
      key: "10",
      label: "Intra-Operative Data",
      children: <IntraOperative />,
    },
    {
      key: "11",
      label: " PACU Data",
      children: <PACUData />,
    },
    {
      key: "12",
      label: "Post-Operative Data",
      children: <PostOperative />,
    },
    {
      key: "13",
      label: "UCAF",
      children: <UCAF />,
    },
    {
      key: "14",
      label: "Discharge Summary",
      children: <DischargeSummary />,
    },
    {
      key: "15",
      label: "Follow Up",
      children: <FollowUp />,
    },
    {
      key: "16",
      label: "Life Support Data",
      children: <LifeSupportData />,
    },
    {
      key: "17",
      label: "Delivery Details",
      children: <DeliveryDetails />,
    },
  ];

  return (
    <div className="w-100 p-3" style={{ overflow: "auto" }}>
      <Tabs defaultActiveKey="1" items={items} type="card" />
    </div>
  );
};

export default DoctorIpTabs;
