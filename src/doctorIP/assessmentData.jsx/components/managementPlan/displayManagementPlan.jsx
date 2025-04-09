import React, { useEffect, useState } from "react";
import { Table, Menu, Dropdown, Button } from "antd";
import AddManagementPlan from "./addManagementPlan";
import ManagementPlanHistory from "./managementPlanHistory";
import EditManagementPlan from "./editManagementPlan";
import CustomTable from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagementPlan } from "../../../../Redux/slice/DoctSlice/GET/managementSlice";
import { deleteManagementPlan } from "../../../../Redux/slice/DoctSlice/DELETE/managementSlice";
import { MoreOutlined } from "@ant-design/icons";

function DisplayManagementPlan({ appointmentId, patientId }) {
  const dispatch = useDispatch();
  const [addManagementPlanModal, setAddManagementPlanModal] = useState(false);
  const [managementPlanHistoryModal, setManagementPlanHistoryModal] =
    useState(false);
  const [managementPlan, setManagementPlan] = useState([]);
  const [updatedManagementPlan, setupdatedManagementPlan] = useState([]);
  const [editManagementPlanModal, setManagementPlanModal] = useState(false);
  const [selectedManagementPlan, setSelectedManagementPlan] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const { data } = useSelector((state) => state.docEmr?.management);

  const getManagementPlan = () => {
    dispatch(fetchManagementPlan({ appointmentId }));
  };

  useEffect(() => {
    getManagementPlan();
  }, [dispatch]);

  const handleAddManagementPlanModalOpen = () => {
    setAddManagementPlanModal(true);
  };

  const handleAddManagementPlanModalClose = () => {
    setAddManagementPlanModal(false);
  };

  const handleManagementPlanHistoryModalOpen = () => {
    setManagementPlanHistoryModal(true);
  };

  const handleManagementPlanHistoryModalClose = () => {
    setManagementPlanHistoryModal(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteManagementPlan({ id }))
      .unwrap()
      .then(() => {
        getManagementPlan();
      })
      .catch((error) => {
        console.error("Failed to delete diagnosis:", error);
      });
  };

  const handleEdit = (id) => {
    const selectedPlan = data.find((item) => item.id === id);
    setSelectedManagementPlan(selectedPlan);
    setManagementPlanModal(true);
  };

  const menu = (row) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleEdit(row.id)}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(row.id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: "Entered By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Entered Date",
      dataIndex: "createdOn",
      key: "createdOn",
    },
    {
      title: "Options",
      key: "options",
      render: (text, row) => (
        <Dropdown overlay={menu(row)} trigger={["click"]}>
          <MoreOutlined />
        </Dropdown>
      ),
    },
  ];
  const managementPlansData = data.map((item, index) => ({
    key: item.id,
    sno: index + 1,
    id: item.id,
    plan: item.plan,
    createdBy: item?.createdBy || "N/A",
    createdOn: item?.createdOn
      ? new Date(item.createdOn).toLocaleDateString()
      : "N/A",
    appointmentId: appointmentId || "N/A",
  }));

  const handleEditManagementPlanModalClose = () => {
    setManagementPlanModal(false);
    setSelectedManagementPlan(null);
  };

  return (
    <div>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h6>Management Plan</h6>
          <div className="d-flex gap-4">
            <div
              className="custom-btn"
              onClick={handleAddManagementPlanModalOpen}
            >
              Add Management Plan
            </div>
            <div
              className="custom-btn"
              onClick={handleManagementPlanHistoryModalOpen}
            >
              View History
            </div>
          </div>
        </div>

        <Table
          dataSource={managementPlansData}
          columns={columns}
          rowKey="id"
          className="table-container"
        />
      </div>
      {addManagementPlanModal && (
        <AddManagementPlan
          handleAddManagementPlanModalClose={handleAddManagementPlanModalClose}
          getManagementPlan={getManagementPlan}
          appointmentId={appointmentId}
        />
      )}
      {managementPlanHistoryModal && (
        <ManagementPlanHistory
          handleManagementPlanHistoryModalClose={
            handleManagementPlanHistoryModalClose
          }
          managementPlan={managementPlansData}
          setupdatedManagementPlan={setupdatedManagementPlan}
        />
      )}
      {editManagementPlanModal && selectedManagementPlan && (
        <EditManagementPlan
          editSelectedManagementPlan={selectedManagementPlan}
          setupdatedManagementPlan={setupdatedManagementPlan}
          handleEditManagementPlanModalClose={
            handleEditManagementPlanModalClose
          }
          getManagementPlan={getManagementPlan}
          appointmentId={appointmentId}
        />
      )}
    </div>
  );
}

export default DisplayManagementPlan;
