import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import AddProvisionalDiagnosis from "./addProvisionalDiagnosis";
import ProvisionalDiagnosisHistory from "./provisionalDiagnosisHistory";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvisionalDiagnosis } from "../../../../Redux/slice/DoctSlice/GET/provisionalSlice";
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Table, Tooltip } from "antd";

function DisplayProvisionalDiagnosis({ appointmentId, patientId }) {
  const dispatch = useDispatch();

  const [addProvisionalDiagnosisModal, setAddProvisionalDiagnosisModal] =
    useState(false);
  const [
    provisionalDiagnosisHistoryModal,
    setProvisionalDiagnosisHistoryModal,
  ] = useState(false);
  const [provisionalDiagnosisAdded, setprovisionalDiagnosisAdded] = useState(
    []
  );
  const [updatedProvisionalDiagnosis, setupdatedProvisionalDiagnosis] =
    useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const { data } = useSelector((state) => state.docEmr?.provisional);

  const getProvisionalDiagnosis = () => {
    dispatch(fetchProvisionalDiagnosis({ patientId }));
  };
  useEffect(() => {
    getProvisionalDiagnosis();
  }, [dispatch]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddProvisionalDiagnosisModalOpen = () => {
    setAddProvisionalDiagnosisModal(true);
  };

  const handleAddProvisionalDiagnosisModalClose = () => {
    setAddProvisionalDiagnosisModal(false);
  };

  const handleProvisionalDiagnosisHistoryModalOpen = () => {
    setProvisionalDiagnosisHistoryModal(true);
  };

  const handleProvisionalDiagnosisHistoryModalClose = () => {
    setProvisionalDiagnosisHistoryModal(false);
  };
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };
  const handleMenuClick = (action) => {
    handleClose();
    if (action === "delete") {
      let deleteDiagnosis = updatedProvisionalDiagnosis.filter(
        (item) => item.id !== currentRow.id
      );
      setupdatedProvisionalDiagnosis(deleteDiagnosis);
    }
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Provisional Diagnosis",
      dataIndex: "provisionalDiagnosis",
      key: "provisionalDiagnosis",
      render: (text) => (text ? text : "--"),
    },
    {
      title: "Entered Date",
      dataIndex: "createdAt",
      key: "createdAt",
      // render: (text) =>
      //   text ? moment(text).format("DD-MM-YYYY hh:mm A") : "--",
    },
    {
      title: "Entered By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (text) => (text ? text : "--"),
    },
    {
      title: "Options",
      key: "options",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this diagnosis?"
          onConfirm={() => handleMenuClick("delete", record)}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip title="Delete">
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Tooltip>
        </Popconfirm>
      ),
    },
  ];

  const ProvisionalDiagnosis = (value) => {
    setprovisionalDiagnosisAdded((prev) => [...prev, value]);
    setupdatedProvisionalDiagnosis((prev) => [...prev, value]);
  };

  return (
    <div>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h6>Provisional Diagnosis</h6>
          <div className="d-flex gap-5">
            <div
              className="custom-btn"
              onClick={handleAddProvisionalDiagnosisModalOpen}
            >
              Add Diagnosis
            </div>
            <div
              className="custom-btn"
              onClick={handleProvisionalDiagnosisHistoryModalOpen}
            >
              View History
            </div>
          </div>
        </div>

        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          pagination={false}
          className="table-container"
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuClick("delete")}>Delete</MenuItem>
        </Menu>
      </div>
      {addProvisionalDiagnosisModal && (
        <AddProvisionalDiagnosis
          handleAddProvisionalDiagnosisModalClose={
            handleAddProvisionalDiagnosisModalClose
          }
          ProvisionalDiagnosis={ProvisionalDiagnosis}
          currentPlanCount={provisionalDiagnosisAdded.length}
          getProvisionalDiagnosis={getProvisionalDiagnosis}
          patientId={patientId}
        />
      )}
      {provisionalDiagnosisHistoryModal && (
        <ProvisionalDiagnosisHistory
          handleProvisionalDiagnosisHistoryModalClose={
            handleProvisionalDiagnosisHistoryModalClose
          }
          provisionalDiagnosisAdded={provisionalDiagnosisAdded}
          setupdatedProvisionalDiagnosis={setupdatedProvisionalDiagnosis}
        />
      )}
    </div>
  );
}

export default DisplayProvisionalDiagnosis;
