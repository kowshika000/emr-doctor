import React, { useEffect, useState } from "react";
import { Table } from "antd";
import AddChiefComplaint from "./AddChiefComplaint";
import { useDispatch, useSelector } from "react-redux";
import { fetchChiefComplaint } from "../../../Redux/slice/DoctSlice/GET/chiefComplaintSlice";

const ChiefComplaint = ({ patientId, appointmentId }) => {
  const dispatch = useDispatch();
  const [addComplaint, setAddComplaint] = useState(false);

  const { data } = useSelector((state) => state.docEmr?.cheifComplaint);

  const getChiefComplaint = () => {
    dispatch(fetchChiefComplaint({ appointmentId }));
  };

  useEffect(() => {
    getChiefComplaint();
  }, [dispatch]);

  const columns = [
    {
      dataIndex: "chiefComplaint",
      title: "Chief Complaint",
      render: (text) => text || "--",
    },
    {
      dataIndex: "duration",
      title: "Duration/Onset",
      render: (text) => text || "--",
    },
    {
      dataIndex: "location",
      title: "Location",
      render: (text) => text || "--",
    },
    { dataIndex: "quality", title: "Quality", render: (text) => text || "--" },
    { dataIndex: "context", title: "Context", render: (text) => text || "--" },
    { dataIndex: "timing", title: "Timing", render: (text) => text || "--" },
    {
      dataIndex: "modifyFactor",
      title: "Modifying Factor",
      render: (text) => text || "--",
    },
    {
      dataIndex: "symptoms",
      title: "Associated Symptoms",
      render: (text) => text || "--",
    },
    { dataIndex: "remarks", title: "Remarks", render: (text) => text || "--" },
    {
      dataIndex: "painScale",
      title: "Pain Scale",
      render: (text) => text || "--",
    },
    {
      dataIndex: "severity",
      title: "Severity",
      render: (text) => text || "--",
    },
    {
      dataIndex: "createdBy",
      title: "Entered By",
      render: (text) => text || "--",
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
      <div className="header-container">
        <div className="header-text">Chief Complaint</div>
        <div className="custom-btn" onClick={() => setAddComplaint(true)}>
          Add Chief Complaint
        </div>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        className="table-container"
      />
      {addComplaint && (
        <AddChiefComplaint
          handleClose={() => setAddComplaint(false)}
          getChiefComplaint={getChiefComplaint}
          appointmentId={appointmentId}
        />
      )}
    </div>
  );
};

export default ChiefComplaint;
