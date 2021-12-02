import React from "react";
import { Route, Switch } from "react-router";
import { MainContext } from "../../../Context/MainContext";
import "./approval-of-jobs.style.scss";
import ApprovalOfJobList from "./ApprovalOfJobList/ApprovalOfJobList";
export default function ApprovalOfJobs() {
  const context = React.useContext(MainContext);
  const { userType } = context;

  return userType === "recruiter" ? (
    <div className="jobs-list-wrapper">
      <h1>No Access</h1>
    </div>
  ) : (
    <Switch>
      <Route path="/dashboard/approveJobs" component={ApprovalOfJobList} />
    </Switch>
  );
}
