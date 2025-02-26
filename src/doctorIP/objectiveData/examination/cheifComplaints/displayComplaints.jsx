import AddComplaints from "./addComplaints";
import ComplaintsHistory from "./complaintsHistory";
import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Button, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditComplaints from "./editComplaints";
import CustomTable from "../../../components/Table";

function DisplayComplaints() {
  const [addComplaintsModal, setAddComplaintsModal] = useState(false);
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [editComplaintsModal, setEditComplaintsModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintAdded, setComplaintAdded] = useState([]);
  const [updatedComplaints, setUpdatedComplaints] = useState([]);

  const columns = [
    { field: "chiefComplaint", headerName: "Chief Complaint", flex: 1 },
    { field: "duration", headerName: "Duration/Onset", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "quality", headerName: "Quality", flex: 1 },
    { field: "context", headerName: "Context", flex: 1 },
    { field: "timing", headerName: "Timing", flex: 1 },
    { field: "modifyFactor", headerName: "Modify Factor", flex: 1 },
    { field: "remarks", headerName: "Remarks", flex: 1 },
    { field: "severity", headerName: "Severity", flex: 1 },
    { field: "enteredBy", headerName: "Entered By", flex: 1 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
      renderCell: (params) => (
        <OptionsMenu
          row={params.row}
          updatedComplaints={updatedComplaints}
          setUpdatedComplaints={setUpdatedComplaints}
          setEditComplaintsModal={setEditComplaintsModal}
          setSelectedComplaint={setSelectedComplaint}
        />
      ),
    },
  ];

  const handleAddComplaintsModalOpen = () => {
    setAddComplaintsModal(true);
  };

  const handleAddComplaintsModalClose = () => {
    setAddComplaintsModal(false);
  };

  const handleViewHistoryModalOpen = () => {
    setViewHistoryModal(true);
  };

  const handleViewHistoryModalClose = () => {
    setViewHistoryModal(false);
  };

  const complaints = (value) => {
    setComplaintAdded((prevComplaints) => [...prevComplaints, value]);
    setUpdatedComplaints((prevComplaints) => [...prevComplaints, value]);
  };

  const handleEditComplaintsModalClose = () => {
    setEditComplaintsModal(false);
    setSelectedComplaint(null);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box>
          <h6>Chief Complaints</h6>
        </Box>
        <Box className="d-flex gap-3">
          <div className="custom-btn" onClick={handleAddComplaintsModalOpen}>
            Add Chief Complaints
          </div>
          <div className="custom-btn" onClick={handleViewHistoryModalOpen}>
            View History
          </div>
        </Box>
      </Box>
      <div style={{ width: "100%" }}>
        <CustomTable
          rows={updatedComplaints}
          columns={columns}
          onOptionClick={(event, row) => console.log(row)}
        />
      </div>

      {addComplaintsModal && (
        <AddComplaints
          handleAddComplaintsModalClose={handleAddComplaintsModalClose}
          complaints={complaints}
        />
      )}
      {viewHistoryModal && (
        <ComplaintsHistory
          handleViewHistoryModalClose={handleViewHistoryModalClose}
          complaintAdded={complaintAdded}
          setUpdatedComplaints={setUpdatedComplaints}
        />
      )}
      {editComplaintsModal && (
        <EditComplaints
          editSelectedComplaints={selectedComplaint}
          setUpdatedComplaints={setUpdatedComplaints}
          handleEditComplaintsModalClose={handleEditComplaintsModalClose}
          updatedComplaints={updatedComplaints}
        />
      )}
    </div>
  );
}

const OptionsMenu = ({
  row,
  updatedComplaints,
  setUpdatedComplaints,
  setEditComplaintsModal,
  setSelectedComplaint,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    handleClose();
    if (action === "delete") {
      let deleteComplaint = updatedComplaints.filter(
        (item) => item.id !== row.id
      );
      setUpdatedComplaints(deleteComplaint);
    }
    if (action === "edit") {
      setSelectedComplaint(row);
      setEditComplaintsModal(true);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuClick("edit")}>
          Edit Chief Complaints
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("delete")}>
          Delete Chief Complaints
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DisplayComplaints;
