import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { Table } from "antd";

function MedicationHistory({
  handlePrescribedMedicationModalClose,
  medicationAdded,
  setupdatedMedication,
  data,
}) {
  const [currentRow, setCurrentRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionsClick = (event, row) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleAddMedication = () => {
    setupdatedMedication((prev) => [...prev, currentRow]);
    handleClose();
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Trade Name",
      dataIndex: "tradeName",
      key: "tradeName",
      render: (text) => text || "--",
    },
    {
      title: "Ingredient Name",
      dataIndex: "ingredientName",
      key: "ingredientName",
      render: (text) => text || "--",
    },
    {
      title: "Status/Type",
      dataIndex: "status",
      key: "status",
      render: (text) => text || "--",
    },
    {
      title: "Drug Form/Order Type",
      dataIndex: "orderType",
      key: "orderType",
      render: (text) => text || "--",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
      render: (text) => text || "--",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      render: (text) => text || "--",
    },
    {
      title: "ROA",
      dataIndex: "roa",
      key: "roa",
      render: (text) => text || "--",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text) => text || "--",
    },
    {
      title: "Remarks",
      dataIndex: "instructions",
      key: "instructions",
      render: (text) => text || "--",
    },
    {
      title: "Options",
      key: "options",
      render: (_, record) => (
        <Button
          variant="outlined"
          onClick={(e) => handleOptionsClick(e, record)}
        >
          Options
        </Button>
      ),
    },
  ];

  return (
    <Dialog
      open={true}
      onClose={handlePrescribedMedicationModalClose}
      maxWidth="lg"
      fullWidth
    >
      <form>
        <DialogTitle>View Medications</DialogTitle>
        <DialogContent>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record, index) => index}
            pagination={false}
            className="table-container"
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAddMedication}>Add</MenuItem>
          </Menu>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePrescribedMedicationModalClose}
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default MedicationHistory;
