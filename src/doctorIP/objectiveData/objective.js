import React from "react";
import { Tabs } from "antd";
import VitalSigns from "./vitalSigns";
import NurseNotes from "./nurseNotes";
import ExaminationIp from "./examination";

const Objective = () => {
  const items = [
    {
      key: "1",
      label: "Vital Sign",
      children: <VitalSigns />,
    },
    {
      key: "2",
      label: "Nurse Notes",
      children: <NurseNotes />,
    },
    {
      key: "3",
      label: "Examination",
      children: <ExaminationIp />,
    },
  ];

  return (
    <div style={{ padding: 8 }}>
      <Tabs defaultActiveKey="1" items={items}  type="card" />
    </div>
  );
};

export default Objective;
