import React, { useEffect, useState } from "react";
import { Table, Menu, DatePicker, Dropdown } from "antd";
import { Chip } from "@mui/material";
import {
  MoreOutlined,
  UserAddOutlined,
  HomeOutlined,
  FileTextOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpPatientList } from "../../Redux/slice/OpSlice/GET/patientListSlice";
import { fetchOpPatientDetail } from "../../Redux/slice/OpSlice/GET/patientDetailSlice";

const DoctorOpDashboard = ({ navigate }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [startedPatients, setStartedPatients] = useState({});
  const { data } = useSelector((state) => state?.docEmr?.opPatientList);

  useEffect(() => {
    const todayKey = dayjs().format("YYYY-MM-DD");
    const saved = localStorage.getItem(`startedPatients-${todayKey}`);
    if (saved) {
      setStartedPatients(JSON.parse(saved));
    }
  }, []);

  const saveStartedPatients = (updated) => {
    const todayKey = dayjs().format("YYYY-MM-DD");
    localStorage.setItem(
      `startedPatients-${todayKey}`,
      JSON.stringify(updated)
    );
  };

  const handlePatientClick = (id) => {
    localStorage.setItem("docPatientId", id);
    dispatch(fetchOpPatientDetail({ doctorId: 3, patientId: id }));
    navigate(`/secure/doctorEmr/opDetails/${id}`);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isToday = dayjs().isSame(selectedDate, "day");

  useEffect(() => {
    dispatch(fetchOpPatientList({ doctorId: 3 }));
  }, [dispatch]);

  const toggleEncounter = (patientId) => {
    setStartedPatients((prev) => {
      const isStarting = !prev[patientId];
      const updated = { ...prev, [patientId]: isStarting };

      saveStartedPatients(updated);

      if (isStarting) {
        // Delay navigation slightly to ensure state updates complete
        setTimeout(() => {
          handlePatientClick(patientId);
        }, 0);
      }

      return updated;
    });
  };

  const menu = (record) => {
    const isStarted = startedPatients[record.patientId];
    const hasInsurance = record.insuranceName;

    return (
      <Menu>
        <Menu.Item
          key="toggleEncounter"
          onClick={() => toggleEncounter(record.patientId)}
        >
          {isStarted ? "Stop Encounter" : "Start Encounter"}
        </Menu.Item>

        {/* Only show claim form if insuranceName is available */}
        {hasInsurance && (
          <Menu.Item key="viewClaimForm">
            <FileTextOutlined /> View Claim Form
          </Menu.Item>
        )}

        <Menu.Item key="referToOP">
          <UserAddOutlined /> Refer To OP (Consultation)
        </Menu.Item>

        <Menu.Item key="referToIP">
          <HomeOutlined /> Refer To IP (Admission)
        </Menu.Item>

        <Menu.Item key="viewConsentForm">
          <FileDoneOutlined /> View Consent Form
        </Menu.Item>
      </Menu>
    );
  };

  const renderOrDash = (text) => (text ? text : "--");

  const columns = [
    {
      title: "Sl No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Consultation Date",
      dataIndex: "consultationDate",
      key: "consultationDate",
      align: "center",
      render: renderOrDash,
    },
    {
      title: "MRD No",
      dataIndex: "mrdNo",
      key: "mrdNo",
      align: "center",
      render: renderOrDash,
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      align: "center",
      render: (text, record) => {
        const isStarted = startedPatients[record.patientId];

        if (isStarted) {
          return (
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
          );
        }

        return <span>{text}</span>;
      },
    },

    {
      title: "View Procedure Status",
      dataIndex: "procedureStatus",
      key: "procedureStatus",
      align: "center",
      render: renderOrDash,
    },
    {
      title: "Insurance",
      dataIndex: "insuranceName",
      key: "insuranceName",
      align: "center",
      render: renderOrDash,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: renderOrDash,
    },
    {
      title: "Options",
      key: "options",
      align: "center",
      render: (text, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <MoreOutlined
            style={{ fontSize: 20, cursor: "pointer" }}
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div className="overall-container mb-4">
        <Chip label="Today Appointment 50" variant="outlined" />
        <Chip label="Revenue 100k" variant="outlined" />
        <Chip label="Emergency Patient 5" variant="outlined" />
        <Chip label="Waiting List 15" variant="outlined" />
        <Chip label="Telemedicine Appointment 30" variant="outlined" />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <h6>Out-Patients List</h6>
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          format="dddd, MMMM DD, YYYY"
          showTime={isToday}
          style={{ minWidth: "250px" }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={data || []}
        pagination={false}
        rowKey="id"
        className="table-container"
      />
    </div>
  );
};

export default DoctorOpDashboard;
