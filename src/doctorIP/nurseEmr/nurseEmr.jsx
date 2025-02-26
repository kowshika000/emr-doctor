import NurseNotes from "./components/nurseNotes";
import Vitals from "./components/vitals";
import HistoryOfPresentIllness from "./components/hopi";
import PainRate from "./components/painRate";

const NurseEmr = () => {
  return (
    <div
      className="mainContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div className="container">
        <div>
          <NurseNotes />
        </div>
        <div>
          <Vitals />
        </div>
        <div>
          <HistoryOfPresentIllness />
        </div>
        <div>
          <PainRate />
        </div>
      </div>
    </div>
  );
};
export default NurseEmr;
