import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import React from "react";
import { Table } from "antd";

function ManagementPlanHistory({
  handleManagementPlanHistoryModalClose,
  managementPlan,
}) {
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
  ];

  return (
    <Dialog
      open={true}
      onClose={handleManagementPlanHistoryModalClose}
      maxWidth="lg"
      fullWidth
    >
      <form>
        <DialogTitle>View History</DialogTitle>
        <DialogContent>
          <Table
            dataSource={managementPlan}
            columns={columns}
            rowKey="id"
            className="table-container"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleManagementPlanHistoryModalClose}
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ManagementPlanHistory;
