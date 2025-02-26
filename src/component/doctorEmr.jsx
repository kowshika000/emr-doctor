import { Radio } from "antd";
import React, { useState } from "react";
import DoctorIP from "../doctorIP/doctorIP";
import DoctorOp from "../doctorOP/doctorOp";

const DoctorEmr = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState("op"); 

  const handleTabChange = (e) => {
    setActiveTab(e.target.value);
  };

  const getTabStyle = (tab) => ({
    fontSize: "12px",
    backgroundColor: tab === activeTab ? "rgb(155, 211, 211)" : "#f0f2f5",
    color: tab === activeTab ? "#fff" : "#333",
    border:
      tab === activeTab ? "1px solid rgb(155, 211, 211)" : "1px solid #d9d9d9",
  });

  return (
    <div
      className="p-3"
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    >
      <Radio.Group
        value={activeTab}
        onChange={handleTabChange}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="op" style={getTabStyle("op")}>
          OP
        </Radio.Button>
        <Radio.Button value="ip" style={getTabStyle("ip")}>
          IP
        </Radio.Button>
      </Radio.Group>

      {activeTab === "op" ? (
        <DoctorOp navigate={navigate} />
      ) : (
        <DoctorIP navigate={navigate} />
      )}
    </div>
  );
};

export default DoctorEmr;
