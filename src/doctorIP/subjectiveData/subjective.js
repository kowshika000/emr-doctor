import React from "react";
import { Tabs } from "antd";
import HistoryOfPresentIllness from "./historyOfPateintIllness";
import MedicalHistory from "./medicalHistory";

const Subjective = () => {
  const items = [
    {
      key: "1",
      label: "History Of Present Illness",
      children: <HistoryOfPresentIllness />,
    },
    {
      key: "2",
      label: "Medical History",
      children: <MedicalHistory />,
    },
  ];

  return (
    <div style={{ padding: 8 }}>
      <Tabs defaultActiveKey="1" items={items}  type="card" />
    </div>
  );
};

export default Subjective;
