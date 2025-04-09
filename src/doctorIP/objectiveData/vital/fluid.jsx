import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import { fetchFluid } from "../../../Redux/slice/DoctSlice/GET/fluidSlice";
import { AddFluid } from "./addFluid";

const Fluid = ({ appointmentId, patientId }) => {
  const dispatch = useDispatch();
  const [addFluid, setAddFluid] = useState(false);

  const data = useSelector((state) => state.docEmr?.showFluid?.fluiddata);

  const getFluid = () => {
    dispatch(fetchFluid({ appointmentId }));
  };

  useEffect(() => {
    getFluid();
  }, [dispatch]);

  const columns = [
    {
      title: "Intake",
      children: [
        {
          title: "Type 1",
          dataIndex: "intake1Type",
          key: "intake1Type",
        },
        {
          title: "Volume 1 (mL)",
          dataIndex: "intake1Volume",
          key: "intake1Volume",
        },
        {
          title: "Type 2",
          dataIndex: "intake2Type",
          key: "intake2Type",
        },
        {
          title: "Volume 2 (mL)",
          dataIndex: "intake2Volume",
          key: "intake2Volume",
        },
        {
          title: "Type 3",
          dataIndex: "intake3Type",
          key: "intake3Type",
        },
        {
          title: "Volume 3 (mL)",
          dataIndex: "intake3Volume",
          key: "intake3Volume",
        },
      ],
    },
    {
      title: "Output",
      children: [
        {
          title: "Drain 1 (mL)",
          dataIndex: "drain1",
          key: "drain1",
        },
        {
          title: "Drain 2 (mL)",
          dataIndex: "drain2",
          key: "drain2",
        },
        {
          title: "Drain 3 (mL)",
          dataIndex: "drain3",
          key: "drain3",
        },
        {
          title: "NG/Vomitus (mL)",
          dataIndex: "ngVomitus",
          key: "ngVomitus",
        },
        {
          title: "Urine (mL)",
          dataIndex: "urine",
          key: "urine",
        },
        {
          title: "Stool/Stoma (mL)",
          dataIndex: "stoolStoma",
          key: "stoolStoma",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="header-container my-4 d-flex justify-content-between">
        <h6>Fluid Signs</h6>
        <div className="custom-btn" onClick={() => setAddFluid(true)}>
          Add Fluid Signs
        </div>
      </div>

      <Table
        dataSource={data || []}
        columns={columns}
        pagination={false}
        className="table-container"
        bordered
      />

      {addFluid && (
        <AddFluid
          handleCloseAddFluid={() => setAddFluid(false)}
          appointmentId={appointmentId}
          getFluid={getFluid}
        />
      )}
    </div>
  );
};

export default Fluid;
