import React from "react";
import { Tabs } from "antd";
import Investigation from "./Investigation";
import Treatments from "./Treatments";
import Medication from "./Medication";
import OrderBlood from "./OrderBlood";
import Consumable from "./Consumable";
import OrderSheet from "./OrderSheet";
import Diet from "./Diet";

const Plan = ({ patientId }) => {
  const tabItems = [
    {
      key: "1",
      label: "Investigation",
      children: <Investigation patientId={patientId} />,
    },
    {
      key: "2",
      label: "Treatments",
      children: <Treatments patientId={patientId} />,
    },
    {
      key: "3",
      label: "Medication",
      children: <Medication patientId={patientId} />,
    },
    {
      key: "4",
      label: "Order Blood",
      children: <OrderBlood patientId={patientId} />,
    },
    {
      key: "5",
      label: "Consumables",
      children: <Consumable patientId={patientId} />,
    },
    {
      key: "6",
      label: "Order Sheet",
      children: <OrderSheet patientId={patientId} />,
    },
    { key: "7", label: "Diet", children: <Diet patientId={patientId} /> },
  ];

  return (
    <div style={{ padding: 0 }}>
      <Tabs defaultActiveKey="1" items={tabItems} type="card" />
    </div>
  );
};

export default Plan;
