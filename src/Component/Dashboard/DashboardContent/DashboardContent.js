import React from "react";
import { Redirect, Route, Switch } from "react-router";
import AddPlans from "./AddPlans/AddPlans";
import AddUsers from "./AddUsers/AddUsers";
import AnswersAndQuestion from "./AnswersAndQuestion/AnswersAndQuestion";
import ApprovalOfFields from "./ApprovalOfFields/ApprovalOfFields";
import ApprovalOfJobs from "./ApprovalOfJobs/ApprovalOfJobs";
import CandidateSection from "./CandidateSection/CandidateSection";
import CreateFAQ from "./CreateFAQ/CreateFAQ";
import "./dashboard-content.style.scss";
import ManageInstitute from "./ManageInstitute/ManageInstitute";
import ManageJobs from "./ManageJobs/ManageJobs";
import AddJob from '../../AddJob'
import ManagePlans from "./ManagePlans/ManagePlans";
import ManageUsers from "./ManageUsers/ManageUsers";
import Testimonial from "./Testimonial/Testimonial";
import TestimonialList from "./TestimonialList/TestimonialList";
import TextEditorWrapper from "./TextEditorWrapper/TextEditorWrapper";
import Cart from "../../Cart";
export default function DashboardContent() {
  return (
    <div className="dashboard-content-main">
      <Switch>
        <Route
          path="/dashboard/privacyPolicy"
          component={() => <TextEditorWrapper type="privacy"  title="Privacy Policy" />}
        />
        <Route
          path="/dashboard/termsCondition"
          component={() => <TextEditorWrapper type="tc"  title="Terms & Condition" />}
        />
        <Route
          path="/dashboard/testimonial"
          component={() => <TestimonialList />}
        />
        <Route
          path="/dashboard/faq"
          component={() => <AnswersAndQuestion />}
        />
        <Route path="/dashboard/addPlans" component={AddPlans} />
        <Route path="/dashboard/manageJobs" component={ManageJobs} />
        <Route path="/dashboard/addJobs/:institute_id/:ismart_id" component={AddJob} />
        <Route path="/dashboard/cart/:institute_id" component={Cart} />
        <Route path="/dashboard/managePlans" component={ManagePlans} />
        <Route path="/dashboard/approveJobs" component={ApprovalOfJobs} />
        <Route path="/dashboard/approveFields" component={ApprovalOfFields} />
        <Route
          path="/dashboard/manageInstitutes"
          component={ManageInstitute}
        />
        <Route
          path="/dashboard/manageCandidates"
          component={CandidateSection}
        />
        <Route path="/dashboard/manageUsers" component={ManageUsers} />
        <Route path="/dashboard/addUsers" component={AddUsers} />
        <Redirect to="/dashboard/approveFields" />
      </Switch>
    </div>
  );
}
