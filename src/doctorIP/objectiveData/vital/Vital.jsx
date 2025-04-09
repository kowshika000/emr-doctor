import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import { fetchVital } from "../../../Redux/slice/DoctSlice/GET/vitalSlice";
import { AddVital } from "./AddVital"; // Assuming AddVital is your custom component for adding vitals

export const Vital = ({ appointmentId, patientId }) => {
  const dispatch = useDispatch();
  const [addVital, setAddVital] = useState(false);

  const data = useSelector((state) => state?.docEmr?.showVital.vitaldata);

  const getVital = () => {
    dispatch(fetchVital({ appointmentId }));
  };

  useEffect(() => {
    getVital();
  }, [dispatch]);

  const columns = [
    {
      title: "Temperature (°C)",
      dataIndex: "temperature",
      key: "temperature",
    },
    {
      title: "B.P (Systolic) (mmHg)",
      dataIndex: "bpSystolic",
      key: "bpSystolic",
    },
    {
      title: "B.P (Diastolic) (mmHg)",
      dataIndex: "bpDiastolic",
      key: "bpDiastolic",
    },
    {
      title: "Pulse (BPM)",
      dataIndex: "pulse",
      key: "pulse",
    },
    {
      title: "Respiratory (rpm)",
      dataIndex: "respiratory",
      key: "respiratory",
    },
    {
      title: "O₂ Saturation (%)",
      dataIndex: "o2Saturation",
      key: "o2Saturation",
    },
    {
      title: "Entered Data",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (text) => (text ? text : "--"),
    },
    {
      title: "Entered By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (text) => (text ? text : "--"),
    },
  ];

  return (
    <div>
      <div className="header-container my-4 d-flex justify-content-between">
        <h6>Vital Signs</h6>
        <div className="custom-btn" onClick={() => setAddVital(true)}>
          Add Vital Signs
        </div>
      </div>

      <Table
        dataSource={data || []}
        columns={columns}
        pagination={false}
        className="table-container"
      />

      {addVital && (
        <AddVital
          handleCloseAddVital={() => setAddVital(false)}
          appointmentId={appointmentId}
          getVital={getVital}
        />
      )}
    </div>
  );
};
