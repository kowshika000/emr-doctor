import { Add, Delete } from "@material-ui/icons";
import React from "react";
import human from "../../assets/human.jpg";
import FormInput from "../../component/FormInput";

const SingleSheet = ({patientId}) => {
  return (
    <div className="d-flex " style={{ justifyContent: "space-between" }}>
      <div className="sigleSheet-container-1">
        <div className="sigleSheet-container-2">
          <div style={{ width: "130px" }}>Chief Complaint</div>
          <div>
            <FormInput placeholder="Chief Complaint" />
          </div>
          <div>
            <Add /> <Delete />
          </div>
        </div>
        <div className="sigleSheet-container-2">
          <div style={{ width: "130px" }}>HOPI</div>
          <div>
            <FormInput placeholder="Enter HOPI" />
          </div>
          <div>
            <Add /> <Delete />
          </div>
        </div>
        <div className="sigleSheet-container-2">
          <div style={{ width: "130px" }}>Past Medical History</div>
          <div>
            <FormInput placeholder="Enter Past Medical History" />
          </div>
          <div>
            <Add /> <Delete />
          </div>
        </div>
        <div className="sigleSheet-container-2">
          <div style={{ width: "130px" }}>Past Surgical History</div>
          <div>
            <FormInput placeholder="Enter Past Surgical History" />
          </div>
          <div>
            <Add /> <Delete />
          </div>
        </div>
        <div className="sigleSheet-container-2">
          <div style={{ width: "130px" }}>Family History</div>
          <div>
            <FormInput placeholder="Enter Family History" />
          </div>
          <div>
            <Add /> <Delete />
          </div>
        </div>
        <div className="sigleSheet-container-2">
          <div style={{ width: "130px" }}>Examination</div>
          <div>
            <FormInput placeholder="Enter Examination" />
          </div>
          <div>
            <Add /> <Delete />
          </div>
        </div>
        <div className="sigleSheet-container-2">
          <div style={{ width: "130px" }}>Treatment Plan</div>
          <div>
            <FormInput placeholder="Enter Treatment Plan" />
          </div>
          <div>
            <Add /> <Delete />
          </div>
        </div>
        <div className="sigleSheet-container-2">
          <div style={{ width: "130px" }}>Progress Notes</div>
          <div>
            <FormInput placeholder="Enter Progress Notes" />
          </div>
          <div>
            <Add /> <Delete />
          </div>
        </div>
        <div className="sigleSheet-container-2">
          <div style={{ width: "130px" }}>Follow Up Notes</div>
          <div>
            <FormInput placeholder="Enter Up Notes" />
          </div>
          <div>
            <Add /> <Delete />
          </div>
        </div>
      </div>
      <div>
        <img src={human} width={"200px"} height={"400px"} />
      </div>
    </div>
  );
};

export default SingleSheet;
