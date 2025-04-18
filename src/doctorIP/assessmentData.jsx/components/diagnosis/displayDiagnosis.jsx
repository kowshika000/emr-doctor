import React, { useEffect, useState } from "react";
import { Table, Menu, Dropdown } from "antd";
import AddDiagnosis from "./addDiagnosis";
import DiagnosisHistory from "./diagnosisHistory";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiagnosis } from "../../../../Redux/slice/DoctSlice/GET/diagnosisSlice";
import { deleteDiagnosis } from "../../../../Redux/slice/DoctSlice/DELETE/diagnosisSlice";
import { MoreOutlined } from "@ant-design/icons";
import { updateDiagnosis } from "../../../../Redux/slice/DoctSlice/PUT/diagnosisSlice";

function DisplayDiagnosis({ patientId }) {
  const dispatch = useDispatch();
  const [addDiagnosisModal, setAddDiagnosisModal] = useState(false);
  const [diagnosisHistoryModal, setDiagnosisHistoryModal] = useState(false);

  const { data } = useSelector((state) => state.docEmr?.diagnosis);

  const getDiagnosis = () => {
    dispatch(fetchDiagnosis({ patientId }));
  };

  useEffect(() => {
    getDiagnosis();
  }, [dispatch]);

  const handleAddDiagnosisModalOpen = () => setAddDiagnosisModal(true);
  const handleAddDiagnosisModalClose = () => setAddDiagnosisModal(false);

  const handleDiagnosisHistoryModalOpen = () => setDiagnosisHistoryModal(true);
  const handleDiagnosisHistoryModalClose = () =>
    setDiagnosisHistoryModal(false);

  const handleDelete = (id) => {
    dispatch(deleteDiagnosis({ id }))
      .unwrap()
      .then(() => {
        getDiagnosis();
      })
      .catch((error) => {
        console.error("Failed to delete diagnosis:", error);
      });
  };

  const handleMakePrimary = (id) => {
    dispatch(updateDiagnosis({ id, patientId }))
      .unwrap()
      .then(() => {
        getDiagnosis();
      })
      .catch((error) => {
        console.error("Failed to update diagnosis:", error);
      });
  };

  const menu = (row) => (
    <Menu>
      {row.category !== "Primary" && (
        <Menu.Item key="primary" onClick={() => handleMakePrimary(row.id)}>
          Make Diagnosis Primary
        </Menu.Item>
      )}
      <Menu.Item key="delete" onClick={() => handleDelete(row.id)}>
        Delete Diagnosis
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "S.No",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "ICD Code",
      dataIndex: "icdCode",
      key: "icdCode",
    },
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
    },
    {
      title: "Entered By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (text) => (text ? text : "--"),
    },
    {
      title: "Entered Date",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (text) => (text ? text : "--"),
    },
    {
      title: "Options",
      key: "options",
      render: (text, row) => (
        <Dropdown overlay={menu(row)} trigger={["click"]}>
          <MoreOutlined style={{ fontSize: 20, cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  const sortedData = data?.slice().sort((a, b) => {
    if (a.category === "Primary" && b.category !== "Primary") return -1;
    if (a.category !== "Primary" && b.category === "Primary") return 1;
    return 0;
  });

  return (
    <div>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h6>Diagnosis</h6>
          <div className="d-flex gap-4">
            <div className="custom-btn" onClick={handleAddDiagnosisModalOpen}>
              Add Diagnosis
            </div>
            <div
              className="custom-btn"
              onClick={handleDiagnosisHistoryModalOpen}
            >
              View History
            </div>
          </div>
        </div>
        <div className="card-body">
          <Table
            dataSource={sortedData}
            columns={columns}
            rowKey="id"
            className="table-container"
          />
        </div>
      </div>

      {addDiagnosisModal && (
        <AddDiagnosis
          handleAddDiagnosisModalClose={handleAddDiagnosisModalClose}
          getDiagnosis={getDiagnosis}
          patientId={patientId}
        />
      )}

      {diagnosisHistoryModal && (
        <DiagnosisHistory
          handleDiagnosisHistoryModalClose={handleDiagnosisHistoryModalClose}
          data={data}
        />
      )}
    </div>
  );
}

export default DisplayDiagnosis;
