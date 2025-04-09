import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../../component/FormInput";
import { fetchIpSearch } from "../../Redux/slice/IpSlice/GET/searchPatientSlice";
import { debounce } from "lodash";

const DoctorIpSearch = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useState({
    ipNo: "",
    admitDate: "",
    patientName: "",
    room: "",
    ward: "",
    phoneNo: "",
    doctorName: "",
    insuranceName: "",
    status: "",
  });

  const fetchData = useCallback(
    debounce((filters) => {
      dispatch(fetchIpSearch(filters));
    }, 500),
    [dispatch]
  );

  const handleChange = (name, value) => {
    setSearchParams((prev) => {
      const updatedFilters = { ...prev, [name]: value };

      const filteredParams = {
        doctorId: 1,
        ...Object.fromEntries(
          Object.entries(updatedFilters).filter(([_, v]) => v !== "")
        ),
      };

      fetchData(filteredParams);
      return updatedFilters;
    });
  };
  const options = [
    { label: "All", value: "all" },
    { label: "Admitted", value: "admitted" },
    { label: "Pre Discharge", value: "preDischarge" },
    { label: "Discharge", value: "discharge" },
  ];

  return (
    <div className="form-container">
      <FormInput
        label="Search IP No"
        value={searchParams.ipNo}
        onChange={(value) => handleChange("ipNo", value)}
      />
      <FormInput
        label="Search Admit Date"
        type="date"
        value={searchParams.admitDate}
        onChange={(value) => handleChange("admitDate", value)}
      />
      <FormInput
        label="Search Patient Name"
        value={searchParams.patientName}
        onChange={(value) => handleChange("patientName", value)}
      />
      <FormInput
        label="Search Room"
        value={searchParams.room}
        onChange={(value) => handleChange("room", value)}
      />
      <FormInput
        label="Search Ward"
        value={searchParams.ward}
        onChange={(value) => handleChange("ward", value)}
      />
      <FormInput
        label="Search Mobile"
        value={searchParams.phoneNo}
        onChange={(value) => handleChange("phoneNo", value)}
      />
      <FormInput
        label="Search Doctor"
        value={searchParams.doctorName}
        onChange={(value) => handleChange("doctorName", value)}
      />
      <FormInput
        label="Search Insurance"
        value={searchParams.insuranceName}
        onChange={(value) => handleChange("insuranceName", value)}
      />
      <FormInput
        label="Search Status"
        type="select"
        options={options}
        value={searchParams.status}
        onChange={(value) => handleChange("status", value)}
      />
    </div>
  );
};

export default DoctorIpSearch;
