import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Box,
  Autocomplete,
  FormControl,
} from "@mui/material";
import { Table, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createSurgeryDiagnosis } from "../../Redux/slice/IpSlice/POST/sugeryDiagnosis";
import { fetchSurgeryDiagnosis } from "../../Redux/slice/IpSlice/GET/sugeryDiagnosis";
import { deleteSurgeryDiagnosis } from "../../Redux/slice/IpSlice/DELETE/sugeryDiagnosis";
import FormButton from "../../component/FormButton";

const SurgeryDiagnosis = ({ patientId }) => {
  const dispatch = useDispatch();
  const [openMdl, setopenMdl] = useState(false);
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
      dataIndex: "createdAt",
      key: "createdAt",
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
          <h6 className="mb-3">Add Surgery Diagnosis</h6>
          <FormControl fullWidth size="small">
            <Autocomplete
              options={diagnosisOptions}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option?.label || ""
              }
              value={selectedDiagnosis}
              onChange={(event, newValue) => {
                setSelectedDiagnosis(newValue);
              }}
              onInputChange={(event, value, reason) => {
                if (reason === "input") {
                  dispatch(fetchSurgeryDiagnosis({ name: value }));
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Diagnosis"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    autoComplete: "off",
                  }}
                />
              )}
            />
          </FormControl>

          <div className="form-button mt-3">
            <FormButton label="Add" type="submit" onClick={handleAdd} />
            <FormButton label="Cancel" onClick={() => setopenMdl(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SurgeryDiagnosis;
