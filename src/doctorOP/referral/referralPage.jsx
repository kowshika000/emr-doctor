import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import FormInput from "../../component/FormInput";
import FormButton from "../../component/FormButton";
import { CaretRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { bedOccupancy } from "../../Redux/slice/OpSlice/GET/bedSlice";

const { Panel } = Collapse;

const ReferralPage = ({ patientId }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.bedAndWard?.allBed);
  const [wardOptions, setWardOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [bedOptions, setBedOptions] = useState([]);

  const [formData, setFormData] = useState({
    referredBy: "",
    referredTo: "",
    speciality: "",
    doctor: "",
    remarks: "",
    admitData: "",
    expDischargeDate: "",
    ward: "",
    roomNo: "",
    bedNo: "",
    bedRate: "",
    encounterType: "",
  });

  useEffect(() => {
    dispatch(bedOccupancy());
  }, [dispatch]);

  useEffect(() => {
    if (data && data.length) {
      const vacantBeds = data.filter((item) => item.bedStatus === "VACANT");
      const wards = [...new Set(vacantBeds.map((item) => item.wardName))].map(
        (wardName) => ({
          label: wardName,
          value: wardName,
        })
      );
      setWardOptions(wards);
    }
  }, [data]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleWardChange = (selectedWard) => {
    handleInputChange("ward", selectedWard);
    handleInputChange("roomNo", "");
    handleInputChange("bedNo", "");
    handleInputChange("bedRate", "");

    const vacantRooms = [
      ...new Set(
        data
          .filter(
            (item) =>
              item.wardName === selectedWard && item.bedStatus === "VACANT"
          )
          .map((item) => item.roomNoOrName)
      ),
    ].map((room) => ({
      label: room,
      value: room,
    }));
    setRoomOptions(vacantRooms);
    setBedOptions([]);
  };

  const handleRoomChange = (selectedRoom) => {
    handleInputChange("roomNo", selectedRoom);
    handleInputChange("bedNo", "");
    handleInputChange("bedRate", "");

    const vacantBeds = data
      .filter(
        (item) =>
          item.wardName === formData.ward &&
          item.roomNoOrName === selectedRoom &&
          item.bedStatus === "VACANT"
      )
      .map((item) => ({
        label: item.bedNo,
        value: item.bedNo,
      }));
    setBedOptions(vacantBeds);
  };

  const handleBedChange = (selectedBed) => {
    handleInputChange("bedNo", selectedBed);

    const selectedBedData = data.find(
      (item) =>
        item.wardName === formData.ward &&
        item.roomNoOrName === formData.roomNo &&
        item.bedNo === selectedBed &&
        item.bedStatus === "VACANT"
    );

    handleInputChange("bedRate", selectedBedData?.rate || "");
  };

  return (
    <div className="m-4">
      <Collapse
        defaultActiveKey={["1", "2", "3", "4"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header="Patient Referred by which Doctor" key="1">
          <div className="form-container">
            <FormInput
              label={"Referred By"}
              value={formData.referredBy}
              onChange={(value) => handleInputChange("referredBy", value)}
            />
          </div>
        </Panel>

        <Panel header="Referred to another Doctor" key="2">
          <div className="form-container">
            <FormInput
              label={"Referred to"}
              value={formData.referredTo}
              onChange={(value) => handleInputChange("referredTo", value)}
            />
            <div className="mt-auto">
              <FormButton label={"Refer Button"} />
            </div>
          </div>
        </Panel>

        <Panel header="Referred to another Clinic" key="3">
          <div className="form-container">
            <FormInput
              label={"Referred to"}
              value={formData.referredTo}
              onChange={(value) => handleInputChange("referredTo", value)}
            />
            <div className="mt-auto">
              <FormButton label={"Refer Button"} />
            </div>
          </div>
        </Panel>

        <Panel header="Referred to IP" key="4">
          <div className="form-container">
            <FormInput
              label={"Admission Date"}
              type="date"
              value={formData.admitData}
              onChange={(value) => handleInputChange("admitData", value)}
            />
            <FormInput
              label={"Expected Discharge Date"}
              type="date"
              value={formData.expDischargeDate}
              onChange={(value) => handleInputChange("expDischargeDate", value)}
            />
            <FormInput
              label={"Encounter Type"}
              value={formData.encounterType}
              onChange={(value) => handleInputChange("encounterType", value)}
            />
            <FormInput
              label={"Ward"}
              type="select"
              options={wardOptions}
              value={formData.ward}
              onChange={handleWardChange}
            />
            <FormInput
              label={"Room No"}
              type="select"
              options={roomOptions}
              value={formData.roomNo}
              onChange={handleRoomChange}
            />
            <FormInput
              label={"Bed No"}
              type="select"
              options={bedOptions}
              value={formData.bedNo}
              onChange={handleBedChange}
            />
            <FormInput
              label={"Bed Rate"}
              value={formData.bedRate}
              readOnly
              // disabled
            />

            <div className="mt-auto">
              <FormButton label={"Refer Patient to Admit"} />
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ReferralPage;
