import React from "react";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";
import "./dashboard.style.scss";
import DashboardContent from "./DashboardContent/DashboardContent";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";
import { MainContext } from "../Context/MainContext";
export default function Dashboard() {
  const history = useHistory();
  const [access, setAccess] = React.useState(null);
  const context = React.useContext(MainContext);
  const { updateState } = context;
  const setUpAccess = () => {
    let token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
      return;
    }
    let decoded = jwt_decode(token);

    let temp = ["admin", "recruiter", "leader"];
    updateState("userType", decoded.role_type);
    let found = temp.find((x) => {
      return x === decoded.role_type;
    });

    if (!found) {
      history.push("/login");
    } else {
      setAccess(true);
    }
  };

  React.useEffect(() => {
    setUpAccess();
  }, []);
  return !access ? (
    "Loading..."
  ) : (
    <div className="dashboard-main">
      <div className="dm-sidebar-wrapper">
        <DashboardSidebar />
      </div>
      <div className="dm-content-wrapper">
        <DashboardHeader />
        <div className="dm-content-body-wrapper">
          <DashboardContent />
        </div>
      </div>
    </div>
  );
}
