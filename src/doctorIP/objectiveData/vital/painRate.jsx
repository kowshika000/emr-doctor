import React, { useState } from "react";
import AddPainRate from "./addPainRate";
import { useEffect } from "react";
import { fetchPainRate } from "../../../Redux/slice/DoctSlice/GET/painrateSlice";
import { useDispatch, useSelector } from "react-redux";

const PainRate = ({ appointmentId, patientId }) => {
  const dispatch = useDispatch();
  const [addPainrate, setAddPainrate] = useState(false);
  // const [painRateData, setPainRateData] = useState([]);

  const data = useSelector((state) => state.docEmr?.showPainrate?.paindata);

  const getPainrate = () => {
    dispatch(fetchPainRate({ appointmentId }));
  };
  useEffect(() => {
    getPainrate();
  }, [dispatch]);
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
        {data ? (
          <ul>
            {data?.map((rate, index) => (
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
          handleClose={() => setAddPainrate(false)}
          appointmentId={appointmentId}
          getPainrate={getPainrate}
        />
      )}
    </div>
  );
};

export default PainRate;
