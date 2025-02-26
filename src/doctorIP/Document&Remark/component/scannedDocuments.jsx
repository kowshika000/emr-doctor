import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState } from "react";
import AddScannedDocument from "./addScannedDocument";
import { Collapse, Typography, Row, Col } from "antd";
import { FileOutlined } from "@ant-design/icons";
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const ScannedDocuments = () => {
  const [addScannedDocModal, setAddScannedDocModal] = useState(false);
  const [uploadDocLabDataList, setUploadLabDocDataList] = useState([]);
  const [uploadDocApprovalDataList, setUploadApprovalDocDataList] = useState(
    []
  );

  const handleAddScannedDocModalOpen = () => setAddScannedDocModal(true);
  const handleAddScannedDocModalClose = () => setAddScannedDocModal(false);

  const uploadDocuments = (values) => {
    if (values.docuement === "Lab") {
      setUploadLabDocDataList((prev) => [...prev, values]);
    } else if (values.docuement === "Pre Approval") {
      setUploadApprovalDocDataList((prev) => [...prev, values]);
    }
  };

  const getFileURL = (file) => {
    try {
      return URL.createObjectURL(file);
    } catch (error) {
      console.error("Invalid file:", file);
      return "#";
    }
  };

  const renderDocuments = (dataList, documentType) => {
    if (dataList.length === 0) {
      return (
        <Typography.Text type="secondary">No documents found</Typography.Text>
      );
    }

    return (
      <Row gutter={[16, 16]}>
        {dataList.map((item) =>
          item.docuement === documentType && item.file
            ? Object.keys(item.file).map((key) => (
                <Col span={3} key={key}>
                  <a
                    href={getFileURL(item.file[key])}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FileOutlined style={{ marginRight: 8 }} />
                    {item.file[key].name}
                  </a>
                </Col>
              ))
            : null
        )}
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
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Panel header="Lab" key="1">
          {renderDocuments(uploadDocLabDataList, "Lab")}
        </Panel>
        <Panel header="Pre Approval" key="2">
          {renderDocuments(uploadDocApprovalDataList, "Pre Approval")}
        </Panel>
      </Collapse>

      {addScannedDocModal && (
        <AddScannedDocument
          handleAddScannedDocModalClose={handleAddScannedDocModalClose}
          uploadDocuments={uploadDocuments}
          documentType={"Scanned Documents"}
        />
      )}
    </div>
  );
};

export default ScannedDocuments;
