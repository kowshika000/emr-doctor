import React, { useState, useEffect } from "react";
import AddPainRate from "./addPainRate";
import { fetchPainRate } from "../../../Redux/slice/DoctSlice/GET/painrateSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"; // for formatting date/time

const PainRate = ({ patientId }) => {
  const dispatch = useDispatch();
  const [addPainrate, setAddPainrate] = useState(false);

  const data = useSelector((state) => state.docEmr?.showPainrate?.paindata);

  const getPainrate = () => {
    dispatch(fetchPainRate({ patientId }));
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
        {data && data.length > 0 ? (
          <ul style={{ paddingLeft: "16px" }}>
            {data.map((rate, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                <strong>Pain Rate: {rate.painRate}</strong> <br />
                <div>
                  Entered Date: {rate.createdAt ? rate.createdAt : "N/A"}
                </div>{" "}
                <br />
                <div>Entered By: {rate.createdBy || "N/A"}</div>
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
          patientId={patientId}
          getPainrate={getPainrate}
        />
      )}
    </div>
  );
};

export default PainRate;
