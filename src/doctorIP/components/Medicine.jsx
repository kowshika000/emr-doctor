import React from "react";

const Medicine = () => {
  return (
    <div>
      <div className="header-container my-4">
        <h6>Medicine/Other Consumables</h6>
        <div className="d-flex gap-2">
          <div className="custom-btn">Add Consumables</div>
          <div className="custom-btn">Add Other Consumables</div>
        </div>
      </div>
      <div className="custom-container">
        <p>No data available</p>
      </div>
    </div>
  );
};

export default Medicine;
