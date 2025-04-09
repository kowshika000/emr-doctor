import React, { useEffect } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import DoctorIpSearch from "./doctorIpSearch";
import { useDispatch, useSelector } from "react-redux";
import { fetchIpPatientList } from "../../Redux/slice/IpSlice/GET/patientListSlice";

const DoctorIpDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state?.docEmr?.ipPatientList);

  useEffect(() => {
    dispatch(fetchIpPatientList({ doctorId: 1 }));
  }, [dispatch]);

  const columns = [
    {
      title: "Sl No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Admit Date",
      dataIndex: "admitDate",
      key: "admitDate",
    },
    {
      title: "IP No",
      dataIndex: "ipNo",
      key: "ipNo",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      render: (text, record) => (
        <span
          style={{
            color: "#2b9aca",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => handlePatientClick(record.patientId)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Doctor",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Insurance",
      dataIndex: "subInsurance",
      key: "subInsurance",
    },
    {
      title: "Ward",
      dataIndex: "wardName",
      key: "wardName",
    },
    {
      title: "Room",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Bed",
      dataIndex: "bedNo",
      key: "bedNo",
    },

    {
      title: "Status",
      dataIndex: "bedStatus",
      key: "bedStatus",
    },
  ];

  const handlePatientClick = (id) => {
    navigate(`/secure/doctorEmr/ipDetails/${id}`, {
      state: { patientId: id },
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <h5>In-Patients List</h5>
        <div>Sunday, September 01, 2024 07:39 AM</div>
      </div>
      <DoctorIpSearch />
      <div className="mt-3">
        <Table
          columns={columns}
          dataSource={data?.data || []}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="table-container"
        />
      </div>
    </div>
  );
};

export default DoctorIpDashboard;
