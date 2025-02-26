import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DoctorEmr from "./component/doctorEmr";
import DoctorIP from "./doctorIP/doctorIP";
import DoctorOp from "./doctorOP/doctorOp";
import DoctorIpTabs from "./doctorIP/landingPage/doctorIpTabs";
import PatientDetails from "./doctorOP/patientDetails/patientDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/doctorEmr/ip" />} />
        <Route path="/doctorEmr" element={<DoctorEmr />}>
          <Route path="ip" element={<DoctorIP />} />
          <Route path="op" element={<DoctorOp />} />
        </Route>
        <Route path="/doctorEmr/ip/ipDetails" element={<DoctorIpTabs />} />
        <Route path="/doctorEmr/op/opDetails" element={<PatientDetails />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("doctor-app"));
root.render(<App />);
export default App;
