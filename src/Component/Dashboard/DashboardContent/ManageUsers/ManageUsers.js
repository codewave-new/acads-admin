import React from "react";
import { Route, Switch } from "react-router";
import "./manage-users.style.scss";
import UserProfile from "./UserProfile/UserProfile";
import UsersList from "./UsersList/UsersList";
export default function ManageUsers() {
  return (
    <div className="manage-users-main">
      <Switch>
        <Route path="/dashboard/manageUsers/:userId" component={UserProfile} />
        <Route path="/dashboard/manageUsers" component={UsersList} />
      </Switch>
    </div>
  );
}
