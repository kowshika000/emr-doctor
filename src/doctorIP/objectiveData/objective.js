import React from "react";
import { Tabs } from "antd";
import VitalSigns from "./vitalSigns";
import NurseNotes from "./nurseNotes";
import ExaminationIp from "./examination";

const Objective = ({ patientId }) => {
  const items = [
    {
      key: "1",
      label: "Vital Sign",
      children: <VitalSigns patientId={patientId} />,
    },
    {
      key: "2",
      label: "Nurse Notes",
      children: <NurseNotes patientId={patientId} />,
    },
    {
      key: "3",
      label: "Examination",
      children: <ExaminationIp patientId={patientId} />,
    },
  ];

  return (
    <div style={{ padding: 8 }}>
      <Tabs defaultActiveKey="1" items={items} type="card" />
    </div>
  );
};

export default Objective;
