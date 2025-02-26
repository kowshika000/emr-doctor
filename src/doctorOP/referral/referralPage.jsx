import React from "react";
import { Collapse } from "antd";
import FormInput from "../../component/FormInput";
import FormButton from "../../component/FormButton";
import { CaretRightOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const ReferralPage = () => {
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
            <FormInput label={"MRD No"} />
            <FormInput label={"Revisit/Walk-In"} />
            <FormInput label={"Patient Name"} />
            <FormInput label={"Gender"} />
            <FormInput label={"Age"} />
            <FormInput label={"DOB"} />
            <FormInput label={"Mobile"} />
            <FormInput label={"Nationality"} />
            <FormInput label={"Referred By"} />
          </div>
        </Panel>

        <Panel header="Referred to another Doctor" key="2">
          <div className="form-container">
            <FormInput label={"MRD No"} />
            <FormInput label={"Revisit/Walk-In"} />
            <FormInput label={"Patient Name"} />
            <FormInput label={"Gender"} />
            <FormInput label={"Age"} />
            <FormInput label={"DOB"} />
            <FormInput label={"Mobile"} />
            <FormInput label={"Nationality"} />
            <FormInput label={"Referred to"} />
            <div className="mt-auto">
              <FormButton label={"Refer Button"} />
            </div>
          </div>
        </Panel>

        <Panel header="Referred to another Clinic" key="3">
          <div className="form-container">
            <FormInput label={"MRD No"} />
            <FormInput label={"Revisit/Walk-In"} />
            <FormInput label={"Patient Name"} />
            <FormInput label={"Gender"} />
            <FormInput label={"Age"} />
            <FormInput label={"DOB"} />
            <FormInput label={"Mobile"} />
            <FormInput label={"Nationality"} />
            <FormInput label={"Referred to"} />
            <div className="mt-auto">
              <FormButton label={"Refer Button"} />
            </div>
          </div>
        </Panel>

        <Panel header="Referred to IP" key="4">
          <div className="form-container">
            <FormInput label={"MRD No"} />
            <FormInput label={"Revisit/Walk-In"} />
            <FormInput label={"Patient Name"} />
            <FormInput label={"Gender"} />
            <FormInput label={"Age"} />
            <FormInput label={"DOB"} />
            <FormInput label={"Mobile"} />
            <FormInput label={"Nationality"} />
            <FormInput label={"Speciality"} />
            <FormInput label={"Doctor"} />
            <FormInput label={"Remarks"} />
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
