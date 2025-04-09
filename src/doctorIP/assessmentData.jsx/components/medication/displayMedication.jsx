import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddMedication from "./addMedication";
import MedicationHistory from "./medicationHistory";
import CustomTable from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedication } from "../../../../Redux/slice/OpSlice/GET/medicationSlice";
import { Table } from "antd";

function DisplayMedication({ patientId }) {
  const dispatch = useDispatch();

  const getMedication = () => {
    dispatch(fetchMedication({ patientId }));
  };
  const { data } = useSelector((state) => state.docEmr?.medication);
  useEffect(() => {
    getMedication();
  }, [dispatch]);

  const [prescribeMedicationModal, setPrescribeMedicationModal] =
    useState(false);
  const [
    prescribedMedicationHistoryModal,
    setprescribedMedicationHistoryModal,
  ] = useState(false);
  const [medicationAdded, setmedicationAdded] = useState([]);
  const [updatedMedication, setupdatedMedication] = useState([]);

  const handleprescribeMedicationModalOpen = () => {
    setPrescribeMedicationModal(true);
  };

  const handleprescribeMedicationModalClose = () => {
    setPrescribeMedicationModal(false);
  };

  const handlePrescribedMedicationModalOpen = () => {
    setprescribedMedicationHistoryModal(true);
  };

  const handlePrescribedMedicationModalClose = () => {
    setprescribedMedicationHistoryModal(false);
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
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
    { title: "Status/Type", dataIndex: "status", key: "status" },
    { title: "Drug Form/Order Type", dataIndex: "orderType", key: "orderType" },
    { title: "Dosage", dataIndex: "dosage", key: "dosage" },
    { title: "Frequency", dataIndex: "frequency", key: "frequency" },
    { title: "ROA", dataIndex: "roa", key: "roa" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Remarks", dataIndex: "instructions", key: "instructions" },
  ];

  const prescribedMedicines = (value) => {
    setmedicationAdded((prev) => [...prev, value]);
    setupdatedMedication((prev) => [...prev, value]);
  };

  return (
    <div>
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h6>Medication</h6>
          <div className="d-flex gap-3">
            <div
              className="custom-btn"
              onClick={handleprescribeMedicationModalOpen}
            >
              Prescribe Medicine{" "}
            </div>
            <div
              className="custom-btn"
              onClick={handleprescribeMedicationModalOpen}
            >
              {" "}
              Finalize Prescription{" "}
            </div>
            <div
              className="custom-btn "
              style={{ backgroundColor: "#ddd" }}
              onClick={handlePrescribedMedicationModalOpen}
            >
              View History
            </div>
            <div className="custom-btn" style={{ backgroundColor: "#ddd" }}>
              Prescription Note{" "}
            </div>
            <div className="custom-btn" style={{ backgroundColor: "#ddd" }}>
              Submit Prescription to eRx Hub{" "}
            </div>
          </div>
        </div>

        <Table
          dataSource={data || []}
          columns={columns}
          pagination={false}
          className="table-container"
        />
      </div>
      {prescribeMedicationModal && (
        <AddMedication
          handleprescribeMedicationModalClose={
            handleprescribeMedicationModalClose
          }
          prescribedMedicines={prescribedMedicines}
          patientId={patientId}
          getMedication={getMedication}
        />
      )}
      {prescribedMedicationHistoryModal && (
        <MedicationHistory
          handlePrescribedMedicationModalClose={
            handlePrescribedMedicationModalClose
          }
          medicationAdded={medicationAdded}
          setupdatedMedication={setupdatedMedication}
          data={data}
        />
      )}
    </div>
  );
}

export default DisplayMedication;
