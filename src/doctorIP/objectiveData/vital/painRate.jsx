import React, { useState } from "react";
import AddPainRate from "./addPainRate";

const PainRate = () => {
  const [addPainrate, setAddPainrate] = useState(false);
  const [painRateData, setPainRateData] = useState([]); // State to store pain rate data

  const handleAddPainRate = (newPainRate) => {
    setPainRateData([...painRateData, newPainRate]); // Add new pain rate to the list
    setAddPainrate(false);
  };

  return (
    <div>
      <div className="header-container my-4">
        <h6>Pain Rate</h6>
        <div className="custom-btn" onClick={() => setAddPainrate(true)}>
          Add Pain Rate
        </div>
      </div>
      <div
        className="data-container"
        style={{ borderBottom: "1px solid gray", padding: "10px 0" }}
      >
        {painRateData.length > 0 ? (
          <ul>
            {painRateData.map((rate, index) => (
              <li key={index}>
                <strong>Pain Rate:</strong> {rate.painRate}
              </li>
            ))}
          </ul>
        ) : (
          <p>No pain rate records found.</p>
        )}
      </div>
      {addPainrate && (
        <AddPainRate
          handleCloseAddVital={() => setAddPainrate(false)}
          onAddPainRate={handleAddPainRate} // Pass function to handle adding pain rate
        />
      )}
    </div>
  );
};

export default PainRate;
