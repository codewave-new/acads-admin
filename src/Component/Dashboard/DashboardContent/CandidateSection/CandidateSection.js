import React from "react";
import { Route, Switch } from "react-router";
import "./candidate-section.style.scss";
import CandidateProfile from "./CandidateProfile/CandidateProfile";
import ManageCandidate from "./ManageCandidate/ManageCandidate";
export default function CandidateSection() {
  return (
    <div className="candidate-section-main">
      <Switch>
        <Route path="/dashboard/manageCandidates/:candidateId" component={CandidateProfile} />
        <Route path="/dashboard/manageCandidates" component={ManageCandidate} />
      </Switch>
    </div>
  );
}
