import React from "react";
import { useHistory } from "react-router";
import "./dashboard-header.style.scss";
export default function DashboardHeader() {
    const history = useHistory()
  return (
    <div className="dashboard-header-main">
      <div className="dashboard-header-content">
        <h5>
          {localStorage.getItem("email")}
          <img src="https://img.icons8.com/material-sharp/96/000000/sort-down.png" />
          <button onClick={()=>{localStorage.clear(); history .push("/")}}>Log Out</button>
        </h5>
      </div>
    </div>
  );
}
