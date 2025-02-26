import React, { useState } from "react";
import {AddFluid} from "./addFluid"

const Fluid = () => {
  const [addFluid, setAddFluid] = useState(false);
  const [fluidRecords, setFluidRecords] = useState([]);

  const handleCloseAddFluid = () => {
    setAddFluid(false);
  };

  const handleAddFluid = (newFluid) => {
    setFluidRecords([...fluidRecords, newFluid]);
  };

  return (
    <div>
      <div className="header-container my-4">
        <h6>Fluid Signs</h6>
        <div className="custom-btn" onClick={() => setAddFluid(true)}>
          Add Fluid Signs
        </div>
      </div>

      <div style={{ borderBottom: "1px solid gray", padding: "1rem 0" }}>
        {fluidRecords.length > 0 ? (
          <ul style={{ padding: 0, listStyle: "none" }}>
            {fluidRecords.map((fluid, index) => (
              <li key={index} className="mb-3">
              <div className="fw-bold">Intake:</div>
              <div className="d-flex flex-wrap gap-3 ms-3">
                <div>Type 1: <span className="text-primary"><strong>{fluid.intake1Type}</strong></span>, Volume: <span className="text-primary"><strong>{fluid.intake1Volume} </strong> mL</span></div>
                <div>Type 2: <span className="text-primary"><strong>{fluid.intake2Type}</strong></span>, Volume: <span className="text-primary"><strong>{fluid.intake2Volume} </strong> mL</span></div>
                <div>Type 3: <span className="text-primary"><strong>{fluid.intake3Type}</strong></span>, Volume: <span className="text-primary"><strong>{fluid.intake3Volume} </strong> mL</span></div>
              </div>
              <div className="fw-bold mt-2">Output:</div>
              <div className="d-flex flex-wrap gap-3 ms-3">
                <div>Drain 1: <span className="text-primary"><strong>{fluid.drain1} </strong> mL</span></div>
                <div>Drain 2: <span className="text-primary"><strong>{fluid.drain2} </strong> mL</span></div>
                <div>Drain 3: <span className="text-primary"><strong>{fluid.drain3} </strong> mL</span></div>
                <div>NG/Vomitus: <span className="text-primary"><strong>{fluid.ngVomitus} </strong> mL</span></div>
                <div>Urine: <span className="text-primary"><strong>{fluid.urine} </strong> mL</span></div>
                <div>Stool/Stoma: <span className="text-primary"><strong>{fluid.stoolStoma} </strong> mL</span></div>
              </div>
            </li>
            
            ))}
          </ul>
        ) : (
          <p>No fluid records found.</p>
        )}
      </div>

      {addFluid && (
        <AddFluid
          handleCloseAddFluid={handleCloseAddFluid}
          onAddFluid={handleAddFluid}
        />
      )}
    </div>
  );
};

export default Fluid;
