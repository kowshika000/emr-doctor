import { Radio } from "antd";
import React, { useState, useEffect } from "react";
import DoctorIP from "../doctorIP/doctorIP";
import DoctorOp from "../doctorOP/doctorOp";
import { useSelector, useDispatch } from "react-redux";
import { allDoctors } from "../Redux/slice/OpSlice/GET/allDoctorsSlice";
import Loading from "./Loading";

const DoctorEmr = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState("op");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { doctorData, loading } = useSelector((state) => state?.allDoctor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allDoctors());
  }, [dispatch]);

  const handleDoctorClick = (doctorId) => {
    setSelectedDoctor(doctorId);
    setActiveTab("op");
  };

  const handleTabChange = (e) => {
    setActiveTab(e.target.value);
  };

  const getTabStyle = (tab) => ({
    fontSize: "12px",
    backgroundColor: tab === activeTab ? "#a0d8ef" : "#f0f2f5",
    color: tab === activeTab ? "#fff" : "#333",
    border: tab === activeTab ? "1px solid #a0d8ef" : "1px solid #d9d9d9",
  });

  const specialtyColors = [
    "#cce5ff",
    "#e1d5e7",
    "#ffe7ba",
    "#b2f5ea",
    "#d3f9d8",
    "#ffccd5",
    "#d6e4ff",
    "#ffb3ba",
    "#ffeaa7",
    "#a5d6a7",
  ];

  // Assign color per specialty
  const specialtyColorMap = {};
  let colorIndex = 0;
  doctorData?.data?.forEach((doc) => {
    const spec = doc.specialityName;
    if (!specialtyColorMap[spec]) {
      specialtyColorMap[spec] =
        specialtyColors[colorIndex % specialtyColors.length];
      colorIndex++;
    }
  });

  // Group by doctor ID
  const groupedDoctors = {};
  doctorData?.data?.forEach((doc) => {
    if (!groupedDoctors[doc.doctorId]) {
      groupedDoctors[doc.doctorId] = {
        doctorId: doc.doctorId,
        doctorName: doc.doctorName,
        imageUrl: doc.imageUrl || null,
        specialties: new Set(),
      };
    }
    groupedDoctors[doc.doctorId].specialties.add(doc.specialityName);
  });

  const doctorList = Object.values(groupedDoctors).map((doc) => ({
    ...doc,
    specialties: Array.from(doc.specialties),
  }));

  const getCardBackground = (specialties) => {
    if (specialties.length === 1) {
      return specialtyColorMap[specialties[0]] || "#f0f2f5";
    }

    // Generate gradient if multiple specialties
    const colorStops = specialties
      .map((s) => specialtyColorMap[s])
      .filter(Boolean)
      .slice(0, 3); // max 3 for clean gradient

    return `linear-gradient(135deg, ${colorStops.join(", ")})`;
  };

  const defaultImg = "https://cdn-icons-png.flaticon.com/512/3870/3870822.png";

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div
      className="p-3"
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    >
      <Loading loading={loading} />
      {!selectedDoctor && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {doctorList.map((doctor) => {
            const bgStyle = getCardBackground(doctor.specialties);
            return (
              <div
                key={doctor.doctorId}
                onClick={() => handleDoctorClick(doctor.doctorId)}
                style={{
                  cursor: "pointer",
                  padding: "16px",
                  borderRadius: "12px",
                  background: bgStyle,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.08)")
                }
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <img
                    src={doctor.imageUrl || defaultImg}
                    alt={doctor.doctorName}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid white",
                    }}
                  />
                  <h4 style={{ margin: 0, fontSize: "16px", color: "#333" }}>
                    {doctor.doctorName}
                  </h4>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {doctor.specialties.map((spec) => (
                    <span
                      key={spec}
                      style={{
                        backgroundColor: "#ffffff99",
                        padding: "4px 10px",
                        borderRadius: "16px",
                        fontSize: "12px",
                        color: "#333",
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedDoctor && (
        <>
          <Radio.Group
            value={activeTab}
            onChange={handleTabChange}
            style={{ margin: "16px 0" }}
          >
            <Radio.Button value="op" style={getTabStyle("op")}>
              OP
            </Radio.Button>
            <Radio.Button value="ip" style={getTabStyle("ip")}>
              IP
            </Radio.Button>
          </Radio.Group>

          {activeTab === "op" ? (
            <DoctorOp navigate={navigate} doctorId={selectedDoctor} />
          ) : (
            <DoctorIP navigate={navigate} doctorId={selectedDoctor} />
          )}
        </>
      )}
    </div>
  );
};

export default DoctorEmr;
