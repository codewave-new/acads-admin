import React from 'react'
import { Route, Switch } from 'react-router'
import JobsList from './JobsList/JobsList'
import './manage-jobs.style.scss'
import SelectedJob from './SelectedJob/SelectedJob'
export default function ManageJobs() {
    return (
        <div className="manage-jobs-main">
            <Switch>
                <Route path="/dashboard/manageJobs/:jobId" component={SelectedJob} />
                <Route path="/dashboard/manageJobs" component={JobsList} />
            </Switch>
            
        </div>
    )
}
