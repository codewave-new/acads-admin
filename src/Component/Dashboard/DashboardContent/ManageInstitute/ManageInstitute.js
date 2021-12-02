import React from "react";
import { Route, Switch } from "react-router";
import InstitutionList from "./InstitutionList/InstitutionList";
import "./manage-institute.style.scss";
import SelectedInstitution from "./SelectedInstitution/SelectedInstitution";
export default function ManageInstitute() {
  return (
    <div className="manage-institutes-section">
      <Switch>
        <Route
          path="/dashboard/manageInstitutes/:instituteId"
          component={SelectedInstitution}
        />
        <Route path="/dashboard/manageInstitutes" component={InstitutionList} />
      </Switch>
    </div>
  );
}
