import React from "react";
import { Tabs } from "antd";
import Investigation from "./Investigation";
import Treatments from "./Treatments";
import Medication from "./Medication";
import OrderBlood from "./OrderBlood";
import Consumable from "./Consumable";
import OrderSheet from "./OrderSheet";
import Diet from "./Diet";

const Plan = () => {
  const tabItems = [
    { key: "1", label: "Investigation", children: <Investigation /> },
    { key: "2", label: "Treatments", children: <Treatments /> },
    { key: "3", label: "Medication", children: <Medication /> },
    { key: "4", label: "Order Blood", children: <OrderBlood /> },
    { key: "5", label: "Consumables", children: <Consumable /> },
    { key: "6", label: "Order Sheet", children: <OrderSheet /> },
    { key: "7", label: "Diet", children: <Diet /> },
  ];

  return (
    <div style={{ padding: 0 }}>
      <Tabs defaultActiveKey="1" items={tabItems}  type="card" />
    </div>
  );
};

export default Plan;
