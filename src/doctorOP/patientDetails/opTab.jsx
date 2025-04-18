import React from "react";
import { Tabs } from "antd";
import SingleSheet from "../singleSheet/singleSheet";
import MedicalHistory from "../../doctorIP/subjectiveData/medicalHistory";
import NurseNotes from "../../doctorIP/objectiveData/nurseNotes";
import VitalSigns from "../../doctorIP/objectiveData/vitalSigns";
import HistoryOfPresentIllness from "../../doctorIP/subjectiveData/historyOfPateintIllness";
import Examination from "../../doctorIP/objectiveData/examination/examination";
import DiagnosisIp from "../../doctorIP/assessmentData.jsx/Diagnosis";
import Investigation from "../../doctorIP/plan/Investigation";
import Treatments from "../../doctorIP/plan/Treatments";
import DocumentandRemarkIp from "../../doctorIP/Document&Remark/DocumentRemark";
import ReferralPage from "../referral/referralPage";

const { TabPane } = Tabs;

const OpTab = ({ patientId }) => {
  const handleTabChange = (key) => {
    // console.log("Selected Tab:", key);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={handleTabChange}
      type="card"
      style={{ marginBottom: "50px" }}
    >
      <TabPane tab="Sigle Case Sheet" key="1">
        <SingleSheet patientId={patientId} />
      </TabPane>
      <TabPane tab="Nurse Sheet" key="2">
        <>
          <MedicalHistory patientId={patientId} />
          <NurseNotes patientId={patientId} />
          <VitalSigns patientId={patientId} />
          <HistoryOfPresentIllness patientId={patientId} />
        </>
      </TabPane>
      <TabPane tab="Referral" key="3">
        <ReferralPage patientId={patientId} />
      </TabPane>
      <TabPane tab="Examination" key="4">
        <Examination patientId={patientId} />
      </TabPane>
      <TabPane tab="Diagnosis/Medication" key="5">
        <DiagnosisIp patientId={patientId} />
      </TabPane>
      <TabPane tab="Investigation/Treatment" key="6">
        <Investigation patientId={patientId} />
        <Treatments patientId={patientId} />
      </TabPane>
      <TabPane tab="Document & Remarks" key="7">
        <DocumentandRemarkIp patientId={patientId} />
      </TabPane>
      <TabPane tab="Medical Form" key="8">
        <div>Content for Tab 5</div>
      </TabPane>
    </Tabs>
  );
};

export default OpTab;
