import React from "react";
import { Tabs } from "antd";
import HistoryOfPresentIllness from "./historyOfPateintIllness";
import MedicalHistory from "./medicalHistory";

const Subjective = ({patientId}) => {
  const items = [
    {
      key: "1",
      label: "History Of Present Illness",
      children: <HistoryOfPresentIllness patientId={patientId} />,
    },
    {
      key: "2",
      label: "Medical History",
      children: <MedicalHistory patientId={patientId} />,
    },
  ];

  return (
    <div style={{ padding: 8 }}>
      <Tabs defaultActiveKey="1" items={items}  type="card" />
    </div>
  );
};

export default Subjective;
