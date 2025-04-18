import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useEffect, useState } from "react";
import AddScannedDocument from "./addScannedDocument";
import { Collapse, Typography, Row, Col } from "antd";
import { FileOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocument } from "../../../Redux/slice/DoctSlice/GET/documentSlice";

const { Panel } = Collapse;

const ScannedDocuments = ({ patientId }) => {
  const dispatch = useDispatch();

  const [addScannedDocModal, setAddScannedDocModal] = useState(false);
 

  const { data } = useSelector((state) => state.docEmr?.document);

  const handleAddScannedDocModalOpen = () => setAddScannedDocModal(true);
  const handleAddScannedDocModalClose = () => setAddScannedDocModal(false);

  const getFile = () => {
    dispatch(fetchDocument({ patientId }));
  };

  useEffect(() => {
    getFile();
  }, [dispatch]);

  const uploadDocuments = (values) => {
    if (values.docuementType === "Lab") {
      setUploadLabDocDataList((prev) => [...prev, values]);
    } else if (values.docuementType === "Pre Approval") {
      setUploadApprovalDocDataList((prev) => [...prev, values]);
    }
  };

  // ✅ Guess MIME type based on file extension
  const getMimeTypeFromFileName = (fileName) => {
    if (!fileName) return "application/octet-stream";
    const ext = fileName.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return "application/pdf";
      case "png":
        return "image/png";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "gif":
        return "image/gif";
      default:
        return "application/octet-stream";
    }
  };

  // 🔁 Convert base64 to Blob URL with correct mime type
  const base64ToBlobURL = (base64, mimeType = "application/octet-stream") => {
    try {
      const byteString = atob(base64);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeType });
      return URL.createObjectURL(blob);
    } catch (err) {
      console.error("Error converting base64 to blob:", err);
      return "#";
    }
  };

  // ✅ Updated renderAPIDocuments
  const renderAPIDocuments = (dataList, documentType) => {
    if (!dataList?.length) return null;

    const filtered = dataList.filter(
      (item) => item.documentType === documentType
    );

    if (!filtered.length) {
      return (
        <Typography.Text type="secondary">No documents found</Typography.Text>
      );
    }

    return (
      <Row gutter={[16, 16]}>
        {filtered.map((item, index) => {
          const mimeType = getMimeTypeFromFileName(item.fileName);
          const url = item.fileData
            ? base64ToBlobURL(item.fileData, mimeType)
            : "#";

          return (
            <Col span={3} key={index}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center" }}
                download={item.fileName} // triggers download with correct name
              >
                <FileOutlined style={{ marginRight: 8 }} />
                {item.fileName || "Document"}
              </a>
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Typography.Title level={5} style={{ margin: 0 }}>
          Scanned Documents
        </Typography.Title>
        <div className="custom-btn" onClick={handleAddScannedDocModalOpen}>
          Issue Documents
        </div>
      </div>

      <Collapse
        accordion
        bordered={false}
        style={{ background: "#fff", borderRadius: "8px" }}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header="Lab" key="1">
          {renderAPIDocuments(data, "Lab")}
        </Panel>
        <Panel header="Pre Approval" key="2">
          {renderAPIDocuments(data, "Pre Approval")}
        </Panel>
      </Collapse>

      {addScannedDocModal && (
        <AddScannedDocument
          handleAddScannedDocModalClose={handleAddScannedDocModalClose}
          uploadDocuments={uploadDocuments}
          documentType={"Scanned Documents"}
          getFile={getFile}
          patientId={patientId}
        />
      )}
    </div>
  );
};

export default ScannedDocuments;
