import React, { useEffect, useState } from "react";
import CustomTable from "../components/Table"; // Assuming you have a reusable table component
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Table } from "antd";
import FormInput from "../../component/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchfinalDiagnosis } from "../../Redux/slice/IpSlice/GET/finalDiagnosis";
import { createFinalDiagnosis } from "../../Redux/slice/IpSlice/POST/finalDiagnosis";
import { deleteFinalDiagnosis } from "../../Redux/slice/IpSlice/DELETE/finalDiagnosis";
import { Delete } from "@material-ui/icons";

const DiagnosisTable = ({ patientId }) => {
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    diagnosis: "",
  });

  const { data } = useSelector((state) => state.docEmr?.finalDiagnosis);

  useEffect(() => {
    dispatch(fetchfinalDiagnosis({ patientId }));
  }, [dispatch]);

  const columns = [
    {
      dataIndex: "slNo",
      title: "Sl No",
      render: (text) => text || "--",
    },
    {
      dataIndex: "category",
      title: "Category",
      render: (text) => text || "--",
    },
    {
      dataIndex: "icdCode",
      title: "ICD Code",
      render: (text) => text || "--",
    },
    {
      dataIndex: "diagnosis",
      title: "Diagnosis",
      render: (text) => text || "--",
    },
    {
      dataIndex: "createdOn",
      title: "Entered Date",
      render: (text) => text || "--",
    },
    {
      dataIndex: "createdBy",
      title: "Entered By",
      render: (text) => text || "--",
    },
    {
      dataIndex: "options",
      title: "Options",
      render: (_, row) => (
        <IconButton onClick={() => handleDelete(row.id)}>
          <Delete />
        </IconButton>
      ),
    },
  ];

  const handleDelete = (id) => {
    dispatch(deleteFinalDiagnosis({ id }))
      .then((result) => {
        dispatch(fetchfinalDiagnosis({ patientId }));
        setDialogOpen(false);
      })
      .catch((err) => {
        console.error("Error delete final diagnosis:", err);
      });
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    dispatch(createFinalDiagnosis({ ...formData, patientId }))
      .then((result) => {
        dispatch(fetchfinalDiagnosis({ patientId }));
        setDialogOpen(false);
      })
      .catch((err) => {
        console.error("Error creating final diagnosis:", err);
      });
  };

  return (
    <div>
      <div className="header-container my-4">
        <h6>Final Diagnosis</h6>
        <div className="custom-btn" onClick={handleDialogOpen}>
          Add Final Diagnosis
        </div>
      </div>

      <div>
        <Table
          dataSource={data || []}
          columns={columns}
          className="table-container"
        />
      </div>

      {/* Dialog for Adding Final Diagnosis */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Final Diagnosis</DialogTitle>
        <DialogContent>
          <FormInput
            label="Diagnosis"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={(value) => handleFormChange("diagnosis", value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DiagnosisTable;
