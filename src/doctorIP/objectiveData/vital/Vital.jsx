import React, { useState } from "react";
import { AddVital } from "./addVital";

export const Vital = () => {
  const [addVital, setAddVital] = useState(false);
  const [vitalSigns, setVitalSigns] = useState([]);

  const handleCloseAddVital = () => {
    setAddVital(false);
  };

  const handleAddVital = (newVital) => {
    setVitalSigns([...vitalSigns, newVital]);
  };

  return (
    <div>
      <div className="header-container my-4">
        <h6>Vital Signs</h6>
        <div className="custom-btn" onClick={() => setAddVital(true)}>
          Add Vital Signs
        </div>
      </div>
      <div className="" style={{ borderBottom: "1px solid gray" }}>
        {vitalSigns.length > 0 ? (
          <ul>
            {vitalSigns.map((vital, index) => (
              <li key={index} className="d-flex gap-2">
                <div>
                  Temperature :{" "}
                  <strong>
                    {" "}
                    <span className="text-primary">
                      {" "}
                      {vital.temperature}{" "}
                    </span>{" "}
                    &nbsp; °C
                  </strong>
                </div>
                -
                <div>
                  B.P (Systolic) :{" "}
                  <strong>
                    {" "}
                    <span className="text-primary">
                      {vital.systolicBP}{" "}
                    </span>{" "}
                    &nbsp; mmHg
                  </strong>
                </div>
                -
                <div>
                  B.P (Diastolic) :{" "}
                  <strong>
                    {" "}
                    <span className="text-primary">
                      {vital.diastolicBP}{" "}
                    </span>{" "}
                    &nbsp; mmHg
                  </strong>
                </div>
                -
                <div>
                  Pulse :{" "}
                  <strong>
                    {" "}
                    <span className="text-primary">{vital.pulse} </span> &nbsp;
                    BPM
                  </strong>
                </div>
                -
                <div>
                  Respiratory :{" "}
                  <strong>
                    {" "}
                    <span className="text-primary">
                      {vital.respiratoryRate}{" "}
                    </span>{" "}
                    &nbsp; rpm
                  </strong>
                </div>
                -
                <div>
                  O2 Saturation :{" "}
                  <strong>
                    {" "}
                    <span className="text-primary">
                      {vital.o2Saturation}{" "}
                    </span>{" "}
                    &nbsp; %
                  </strong>
                </div>
                -
                <div>
                  Blood Sugar :{" "}
                  <strong>
                    {" "}
                    <span className="text-primary">
                      {vital.bloodSugar}{" "}
                    </span>{" "}
                    &nbsp; mmol/L
                  </strong>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No vital signs recorded.</p>
        )}
      </div>
      {addVital && (
        <AddVital
          handleCloseAddVital={handleCloseAddVital}
          onAddVital={handleAddVital}
        />
      )}
    </div>
  );
};
