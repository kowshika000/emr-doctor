import DisplayComplaints from "../../../doctorEMR/examination/components/cheif complaints/displayComplaints";
import DisplayClinicalExamination from "../../../doctorEMR/examination/components/cheif complaints/displayClinicalExamination";
import DisplayDiagnosis from "../../../doctorEMR/diagnosis/components/diagnosis/displayDiagnosis";
import DisplayMedication from "../../../doctorEMR/diagnosis/components/medication/displayMedication";
import DisplayInvestigation from "../../../doctorEMR/investigationTreatment/component/Investigation/displayInvestigation";
import DisplayTreatment from "../../../doctorEMR/investigationTreatment/component/Treatment/displayTreatment";
import { Box } from "@mui/material";
import FreeStyleCrud from "../../../doctorEMR/UI Component/FreeStyleCrud";

const NurseCaseSheet = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          borderRadius: "8px",
          backgroundColor: "#f5fcff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          margin: " auto",
          maxWidth: "auto",
          marginTop: "15px",
          height: "600px",
          overflowY: "auto",
        }}
      >
        <div class="row">
          <div class="col-12 ">
            <DisplayComplaints />
          </div>
          <div class="col-12 ">
            <DisplayClinicalExamination />
          </div>
          <div class="col-12 ">
            <DisplayDiagnosis />
          </div>
          <div class="col-12 ">
            <DisplayMedication />
          </div>
          <div class="col-12 ">
            <DisplayInvestigation />
          </div>
          <div class="col-12 ">
            <DisplayTreatment />
          </div>
          <div class="col-12 ">
            <FreeStyleCrud type={"HOPI"} />
          </div>
          <div class="col-12 ">
            <FreeStyleCrud type={"Past Medical History"} />
          </div>
          <div class="col-12 ">
            <FreeStyleCrud type={"Past Surgical History"} />
          </div>
          <div class="col-12 ">
            <FreeStyleCrud type={"Family History"} />
          </div>
          <div class="col-12 ">
            <FreeStyleCrud type={"Treatment Plan"} />
          </div>
          <div class="col-12 ">
            <FreeStyleCrud type={"Progress Note"} />
          </div>
          <div class="col-12 ">
            <FreeStyleCrud type={"Follow Up Note"} />
          </div>
        </div>
      </Box>
    </>
  );
};
export default NurseCaseSheet;
