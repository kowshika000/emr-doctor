import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Table, Dropdown, Button as AntButton } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import AddTreatment from "./addTreatment";
import ViewHistory from "./viewHistory";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchTreatment } from "../../../Redux/slice/OpSlice/GET/treatmentSlice";

function DisplayTreatment({ patientId }) {
  const dispatch = useDispatch();
  const [addTreatmentModal, setaddTreatmentModal] = useState(false);
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [treatmentAdded, setTreatmentAdded] = useState([]);
  const [updatedTreatment, setupdatedTreatment] = useState([]);

  const { data } = useSelector((state) => state?.docEmr.opTreatment);

  const getTreatment = () => {
    dispatch(fetchTreatment({ patientId }));
  };

  useEffect(() => {
    getTreatment();
  }, [dispatch]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Procedure Name",
      dataIndex: "procedureName",
      key: "procedureName",
      render: (text) => text || "--",
    },
    {
      title: "Insurance",
      dataIndex: "insurance",
      key: "insurance",
      render: (text) => text || "--",
    },
    {
      title: "Pre App",
      dataIndex: "preApp",
      key: "preApp",
      render: (text) => text || "--",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => text || "--",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => text || "--",
    },
    {
      title: "Service Status",
      dataIndex: "serviceStatus",
      key: "serviceStatus",
      render: (text) => text || "--",
    },
    {
      title: "Bill Status",
      dataIndex: "billStatus",
      key: "billStatus",
      render: (text) => text || "--",
    },
    {
      title: "Dosage Details",
      dataIndex: "dosageDetails",
      key: "dosageDetails",
      render: (text) => text || "--",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (text) => text || "--",
    },
    {
      title: "Options",
      key: "options",
      render: (_, row) => (
        <DeleteOutlined
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => {
            const updated = updatedTreatment.filter(
              (item) => item.id !== row.id
            );
            setupdatedTreatment(updated);
          }}
        />
      ),
    },
  ];

  const handleAddTreatmentModalOpen = () => setaddTreatmentModal(true);
  const handleAddTreatmentModalClose = () => setaddTreatmentModal(false);
  const handleViewHistoryModalOpen = () => setViewHistoryModal(true);
  const handleViewHistoryModalClose = () => setViewHistoryModal(false);

  const treatment = (value) => {
    setTreatmentAdded((prev) => [...prev, value]);
    setupdatedTreatment((prev) => [...prev, value]);
  };

  return (
    <div>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h6>Treatment</h6>
          <div className="d-flex gap-3">
            <div className="custom-btn" onClick={handleAddTreatmentModalOpen}>
              Add Procedure
            </div>
            <div className="custom-btn" onClick={handleViewHistoryModalOpen}>
              View History
            </div>
            <div className="custom-btn">Print Request</div>
            <div className="custom-btn">Update Procedure Status</div>
            <div className="custom-btn">Print Treatment Request</div>
          </div>
        </div>

        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          className="table-container"
        />
      </div>

      {addTreatmentModal && (
        <AddTreatment
          handleAddTreatmentModalClose={handleAddTreatmentModalClose}
          treatment={treatment}
          getTreatment={getTreatment}
          patientId={patientId}
        />
      )}

      {viewHistoryModal && (
        <ViewHistory
          handleViewHistoryModalClose={handleViewHistoryModalClose}
          treatmentAdded={treatmentAdded}
          setupdatedTreatment={setupdatedTreatment}
        />
      )}
    </div>
  );
}

export default DisplayTreatment;
