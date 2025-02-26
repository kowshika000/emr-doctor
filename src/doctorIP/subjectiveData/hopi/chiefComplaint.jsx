import React, { useState } from "react";
import CustomTable from "../../components/Table";
import AddChiefComplaint from "./AddChiefComplaint";

const ChiefComplaint = () => {
  const [addComplaint, setAddComplaint] = useState(false);
  const columns = [
    { field: "durationOnset", headerName: "Duration/Onset" },
    { field: "location", headerName: "Location" },
    { field: "quality", headerName: "Quality" },
    { field: "context", headerName: "Context" },
    { field: "timing", headerName: "Timing" },
    { field: "modifyingFactor", headerName: "Modifying Factor" },
    { field: "associatedSymptoms", headerName: "Associated Symptoms" },
    { field: "remarks", headerName: "Remarks" },
    { field: "painScale", headerName: "Pain Scale" },
    { field: "severity", headerName: "Severity" },
  ];

  const rows = [
    {
      durationOnset: "Add New Duration",
      location: "Add New Location",
      quality: "Add New Quality",
      context: "Add New Context",
      timing: "Add New Timing",
      modifyingFactor: "Add New Modify Factor",
      associatedSymptoms: "Add New Symptoms",
      remarks: "",
      painScale: "0-10",
      severity: "",
    },
  ];

  return (
    <div>
      <div className="header-container ">
        <div className="header-text">Chief Complaint</div>
        <div className="custom-btn" onClick={() => setAddComplaint(true)}>
          Add Chief Complaint
        </div>
      </div>
      {/* <IpCrud type={"History Of Present Illness"} /> */}
      <CustomTable rows={rows} columns={columns} />
      {addComplaint && (
        <AddChiefComplaint handleClose={() => setAddComplaint(false)} />
      )}
    </div>
  );
};

export default ChiefComplaint;
