import React from "react";
import { Table } from "antd";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CustomTable = ({ columns, rows, onOptionClick }) => {
  // Convert MUI-like columns to AntD columns
  const convertedColumns = columns.map((column) => ({
    title: column.headerName,
    dataIndex: column.field,
    key: column.field,
    width: column.width || "auto",
    render: (text, record) => {
      if (column.field === "options") {
        // Handle the Options column with onOptionClick
        return (
          <IconButton onClick={(event) => onOptionClick(event, record)}>
            <MoreVertIcon />
          </IconButton>
        );
      }
      return column.renderCell
        ? column.renderCell({ value: text, row: record })
        : text;
    },
  }));

  return (
    <Table
      columns={convertedColumns}
      dataSource={rows}
      rowKey="id"
      pagination={false}
      // bordered
      className="table-container"
    />
  );
};

export default CustomTable;
