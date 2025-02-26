import React from "react";
import { Card, Col, Row } from "antd";
import image from "../../assets/image.png";
import { Tooltip } from "@mui/material";
import "../component/opcomponent.css";

export const CurrentPatient = () => {
  const truncateWithTooltip = (text) => {
    if (text.length > 20) {
      return (
        <Tooltip title={text} arrow>
          <span>{text.substring(0, 20) + "..."}</span>
        </Tooltip>
      );
    }
    return text;
  };
  const boxStyle = {
    backgroundColor: "rgb(197, 212, 143)",
    borderRadius: "4px",
    padding: "5px",
    textAlign: "center",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "12px",
  };

  return (
    <div className=" ">
      <Row
        style={{
          gap: "15px",
        }}
      >
        <Col span={19}>
          <Card
            style={{
              backgroundColor: "rgb(0, 167, 157)",
              color: "white",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "20px", height: "100%" }}>
              {/* Profile Section */}
              <div style={{ display: "flex", gap: "15px", flex: 1 }}>
                <div className="my-auto">
                  <img
                    src={image}
                    alt="Profile"
                    width={100}
                    height={100}
                    style={{ borderRadius: "50px" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h6 style={{borderBottom:"1px solid"}}>Patient Details</h6>
                  <div className="d-flex gap-5">
                    <div className="profile_dispaly">
                      <div
                        className="profile_info_head"
                        style={{ fontWeight: "bold" }}
                      >
                        <div>Name:</div>
                        <div>Age:</div>
                        <div>Gender:</div>
                      </div>
                      <div className="profile_info_body">
                        <div>{truncateWithTooltip("John")}</div>
                        <div>N/A</div>
                        <div>N/A</div>
                      </div>
                    </div>
                    <div className="profile_dispaly">
                      <div
                        className="profile_info_head"
                        style={{ fontWeight: "bold" }}
                      >
                        <div>Address:</div>
                        <div>Mobile:</div>
                        <div>Email:</div>
                      </div>
                      <div className="profile_info_body">
                        <div>N/A</div>
                        <div>N/A</div>
                        <div>{truncateWithTooltip("jon@gmail.com")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance Section */}
              <div style={{ flex: 1 }}>
                <h6 style={{ borderBottom: "1px solid" }}>
                  Insurance Details
                </h6>
                <div className="d-flex gap-5">
                  <div className="profile_dispaly">
                    <div
                      className="profile_info_head"
                      style={{ fontWeight: "bold" }}
                    >
                      <div>Insurance:</div>
                      <div>Sub Insurance:</div>
                      <div>Co Payment:</div>
                    </div>
                    <div className="profile_info_body">
                      <div>N/A</div>
                      <div>N/A</div>
                      <div>N/A</div>
                    </div>
                  </div>
                  <div className="profile_dispaly">
                    <div
                      className="profile_info_head"
                      style={{ fontWeight: "bold" }}
                    >
                      <div>Cash:</div>
                      <div>Pending:</div>
                      <div>Advance:</div>
                    </div>
                    <div className="profile_info_body">
                      <div>N/A</div>
                      <div>N/A</div>
                      <div>N/A</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col style={{ width: "100%" }} span={4}>
          <div style={boxStyle}>Lab/Rad Report</div>
          <div style={boxStyle}>Vital</div>
          <div style={boxStyle}>MRD</div>
        </Col>
      </Row>
    </div>
  );
};
