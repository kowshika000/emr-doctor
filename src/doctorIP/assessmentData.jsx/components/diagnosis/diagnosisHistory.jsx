import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Table } from "antd";

function DiagnosisHistory({ handleDiagnosisHistoryModalClose, data }) {


  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
    },
    // {
    //   title: "Options",
    //   key: "options",
    //   render: (text, row) => <Button onClick={handleAddDiagnosis}>Add</Button>,
    // },
  ];
  return (
    <Dialog
      open={true}
      onClose={handleDiagnosisHistoryModalClose}
      maxWidth="md"
      fullWidth
    >
      <form>
        <DialogTitle>View Complaints</DialogTitle>
        <DialogContent>
          <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            className="table-container"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiagnosisHistoryModalClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DiagnosisHistory;
