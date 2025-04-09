import React, { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Table } from "antd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import AddInvestigation from "./addInvestigation";
import ViewHistory from "./viewHistory";
import ViewAddNote from "./viewAddLabNotes";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvestigation } from "../../../Redux/slice/OpSlice/GET/investigationSlice";
import { deleteInvestigation } from "../../../Redux/slice/OpSlice/DELETE/investigationSlice";
import { DeleteForever } from "@material-ui/icons";

function DisplayInvestigation({ patientId }) {
  const dispatch = useDispatch();

  const [addInvestigationModal, setaddInvestigationModal] = useState(false);
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [investigationAdded, setinvestigationAdded] = useState([]);
  const [updatedInvestigation, setupdatedInvestigation] = useState([]);
  const [viewAddModal, setViewAddModal] = useState(false);
  const [notesType, setNotesType] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

  const { data } = useSelector((state) => state?.docEmr?.investigation);

  const getInvestigation = () => {
    dispatch(fetchInvestigation({ patientId }));
  };

  useEffect(() => {
    getInvestigation();
  }, [dispatch]);

  const handleDelete = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
    dispatch(deleteInvestigation({ id: row.id }))
      .then(() => {
        getInvestigation();
      })
      .catch((error) => {
        console.error("Error getting investigation:", error);
      });
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Lab Test Name",
      dataIndex: "labTestName",
      key: "labTestName",
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
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (text) => text || "--",
    },
    {
      title: "Options",
      key: "options",
      render: (_, row) => (
        <IconButton onClick={(e) => handleDelete(e, row)}>
          <DeleteForever />
        </IconButton>
      ),
    },
  ];

  const handleAddInvestigationModalOpen = () => setaddInvestigationModal(true);
  const handleAddInvestigationModalClose = () =>
    setaddInvestigationModal(false);

  const handleViewHistoryModalOpen = () => setViewHistoryModal(true);
  const handleViewHistoryModalClose = () => setViewHistoryModal(false);

  const handleViewAddNotesModalOpen = (type) => {
    setNotesType(type);
    setViewAddModal(true);
  };
  const handleViewAddNotesModalClose = () => setViewAddModal(false);

  const investigation = (value) => {
    setinvestigationAdded((prev) => [...prev, value]);
    setupdatedInvestigation((prev) => [...prev, value]);
  };

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center my-4 gap-4">
        <h6>Investigation</h6>
        <div className="d-flex gap-3">
          <div className="custom-btn" onClick={handleAddInvestigationModalOpen}>
            Add Investigation
          </div>
          <div className="custom-btn" onClick={handleViewHistoryModalOpen}>
            View History
          </div>
          <div className="custom-btn">Print Request</div>
          <div
            className="custom-btn"
            onClick={() => handleViewAddNotesModalOpen("Rad")}
          >
            View/Add Rad Notes
          </div>
          <div
            className="custom-btn"
            onClick={() => handleViewAddNotesModalOpen("Lab")}
          >
            View/Add Lab Notes
          </div>
          <div className="custom-btn">Collect Samples</div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record, index) => index}
        pagination={false}
        className="table-container"
      />

      {addInvestigationModal && (
        <AddInvestigation
          handleAddInvestigationModalClose={handleAddInvestigationModalClose}
          investigation={investigation}
          getInvestigation={getInvestigation}
          patientId={patientId}
        />
      )}
      {viewHistoryModal && (
        <ViewHistory
          handleViewHistoryModalClose={handleViewHistoryModalClose}
          investigationAdded={investigationAdded}
          setupdatedInvestigation={setupdatedInvestigation}
        />
      )}
      {viewAddModal && (
        <ViewAddNote
          handleViewAddNotesModalClose={handleViewAddNotesModalClose}
          notesType={notesType}
        />
      )}
    </div>
  );
}

export default DisplayInvestigation;
