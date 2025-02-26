import React from "react";
import FormInput from "../../component/FormInput";

const DoctorIpSearch = () => {
  const option = [
    { label: "All", value: "all" },
    { label: "Admitted", value: "admitted" },
    { label: "Pre Discharge", value: "preDischarge" },
    { label: "Discharge", value: "discharge" },
  ];
  return (
    <div className="form-container">
      <FormInput label="Search IP No" />
      <FormInput label="Search Admit Date" type="date" />
      <FormInput label="Search Patient Name" />
      <FormInput label="Search Room" />
      <FormInput label="Search Ward" />
      <FormInput label="Search Mobile" />
      <FormInput label="Search Doctor" />
      <FormInput label="Search Insurance" />
      <FormInput label="Search Status" type="select" options={option} />
    </div>
  );
};

export default DoctorIpSearch;
