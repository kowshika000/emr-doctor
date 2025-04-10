import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Autocomplete,
} from "@mui/material";
import { Table, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createSurgeryDiagnosis } from "../../Redux/slice/IpSlice/POST/sugeryDiagnosis";
import { fetchSearchSurgeryDiagnosis } from "../../Redux/slice/IpSlice/GET/searchSurgeryDiagnosis";
import FormInput from "../../component/FormInput";
import { fetchSurgeryDiagnosis } from "../../Redux/slice/IpSlice/GET/sugeryDiagnosis";
import { deleteSurgeryDiagnosis } from "../../Redux/slice/IpSlice/DELETE/sugeryDiagnosis";

const SurgeryDiagnosis = ({ patientId }) => {
  const dispatch = useDispatch();
  const [openMdl, setopenMdl] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const { data } = useSelector((state) => state.docEmr?.searchSurgeryDiagnosis);
  const rowData = useSelector((state) => state.docEmr?.surgeryDiagnosis?.data);

  const diagnosisOptions = data.map((item) => ({
    value: item.diagnosis,
    label: item.diagnosis,
  }));

  useEffect(() => {
    dispatch(fetchSurgeryDiagnosis({ patientId }));
  }, [dispatch]);

  const handleMakePrimary = () => {
    const updatedRows = rows.map((row) =>
      row.id === selectedRowId ? { ...row, category: "Primary" } : row
    );
    setRows(updatedRows);
  };

  const handleMoveToFinal = () => {
    const updatedRows = rows.map((row) =>
      row.id === selectedRowId ? { ...row, category: "final" } : row
    );
    setRows(updatedRows);
  };

  const handleDelete = (id) => {
    dispatch(deleteSurgeryDiagnosis({ id })).then(() =>
      dispatch(fetchSurgeryDiagnosis({ patientId }))
    );
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => (text ? text : "--"),
    },
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
      render: (text) => (text ? text : "--"),
    },
    {
      title: "Entered Date",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (text) => (text ? text : "--"),
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
      render: (_, record) => {
        const menu = (
          <Menu
            onClick={({ key }) => {
              if (key === "makePrimary") handleMakePrimary(record);
              else if (key === "moveFinal") handleMoveToFinal(record);
              else if (key === "delete") handleDelete(record.id);
            }}
            items={[
              { key: "makePrimary", label: "Make diagnosis primary" },
              { key: "moveFinal", label: "Move to final diagnosis" },
              { key: "delete", label: "Delete" },
            ]}
          />
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <MoreOutlined style={{ fontSize: 20, cursor: "pointer" }} />
          </Dropdown>
        );
      },
    },
  ];

  const handleAdd = () => {
    if (!selectedDiagnosis) return;
    dispatch(
      createSurgeryDiagnosis({ patientId, diagnosis: selectedDiagnosis?.value })
    ).then(() => dispatch(fetchSurgeryDiagnosis({ patientId })));
    setopenMdl(false);
    setSelectedDiagnosis(null);
  };

  return (
    <div>
      <div className="header-container my-4">
        <div className="h6">Surgery Diagnosis</div>
        <Box className="custom-btn" onClick={() => setopenMdl(true)}>
          Add Surgery Diagnosis
        </Box>
      </div>

      <Table
        dataSource={rowData || []}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="table-container"
      />

      <Dialog open={openMdl} onClose={() => setopenMdl(false)} fullWidth>
        <DialogContent>
          <h6>Add Surgery Diagnosis</h6>
          <Autocomplete
            options={diagnosisOptions}
            getOptionLabel={(option) => option.label}
            value={selectedDiagnosis}
            onChange={(event, newValue) => {
              setSelectedDiagnosis(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Diagnosis"
                variant="standard"
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                  dispatch(fetchSearchSurgeryDiagnosis({ diagnosis: value }));
                }}
              />
            )}
            fullWidth
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
          />

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#007bff" }}
              onClick={handleAdd}
            >
              Select
            </Button>
            <Button variant="contained" style={{ backgroundColor: "#dc3545" }}>
              Cancel
            </Button>
          </Box>
          {/* </Box> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SurgeryDiagnosis;
