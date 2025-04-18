import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FormInput from "../../component/FormInput";
import FormButton from "../../component/FormButton";
import { useDispatch, useSelector } from "react-redux";
import { bedOccupancy } from "../../Redux/slice/OpSlice/GET/bedSlice";
import { allDoctors } from "../../Redux/slice/OpSlice/GET/allDoctorsSlice";

const ReferToIp = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.bedAndWard?.allBed);
  const { doctorData } = useSelector((state) => state?.allDoctor);

  const allDoctorData = doctorData?.data || [];

  const [specialityOptions, setSpecialityOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);

  const [wardOptions, setWardOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [bedOptions, setBedOptions] = useState([]);

  const [formData, setFormData] = useState({
    speciality: "",
    doctor: "",
    admitData: "",
    expDischargeDate: "",
    ward: "",
    roomNo: "",
    bedNo: "",
    bedRate: "",
    encounterType: "",
  });

  useEffect(() => {
    dispatch(allDoctors());
  }, []);

  useEffect(() => {
    dispatch(bedOccupancy());
  }, [dispatch]);

  useEffect(() => {
    const specialities = [
      ...new Set(allDoctorData.map((doctor) => doctor.specialityName)),
    ].map((name) => ({ label: name, value: name }));

    setSpecialityOptions(specialities);
  }, [allDoctorData]);

  useEffect(() => {
    if (formData.speciality) {
      const filteredDoctors = allDoctorData
        .filter((doctor) => doctor.specialityName === formData.speciality)
        .map((doctor) => ({
          label: doctor.doctorName,
          value: doctor.doctorId,
        }));

      setDoctorOptions(filteredDoctors);
    } else {
      setDoctorOptions([]);
    }
  }, [formData.speciality, allDoctorData]);

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
    <div>
      <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
        {/* <DialogTitle>{"Refer to IP"}</DialogTitle> */}
        <DialogContent>
          <h6 className="mb-3">Refer to IP (Admission) </h6>
          <div className="form-container">
            <FormInput
              label={"Speciality"}
              type="select"
              options={specialityOptions}
              value={formData.speciality}
              onChange={(value) => handleInputChange("speciality", value)}
            />
            <FormInput
              label={"Doctor"}
              type="select"
              options={doctorOptions}
              value={formData.doctor}
              onChange={(value) => handleInputChange("doctor", value)}
            />
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

            {/* <div className="mt-auto">
              <FormButton label={"Refer Patient to Admit"} />
            </div>*/}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReferToIp;
