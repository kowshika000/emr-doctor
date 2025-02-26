import NurseFilter from "./components/nurseFilter";
import NurseDataList from "./components/nurseDataList";
const NurseDashboard = () => {
    return (
        <div
            className="mainContainer"
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
            }}>
            <div className="container">
                <div>
                <NurseFilter />
                </div>
                
                <div>
                <NurseDataList/>
                </div>
            </div>
        </div>
    )
}
export default NurseDashboard;