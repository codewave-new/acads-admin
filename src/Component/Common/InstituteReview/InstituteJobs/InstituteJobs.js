import React from "react";
import nextId from "react-id-generator";
import { Link } from "react-router-dom";
import "./institute-jobs.style.scss";
export default function InstituteJobs() {
  const handleLink = () => {};
  return (
    <div className="institute-jobs-main">
      <div className="i-j-m-header">
        <h5>Jobs Posted</h5>
      </div>
      <div className="i-j-m-tabs">
        <div className="i-j-m-tabs-header">
          <h6>Active</h6>
          <h6>In-Active</h6>
        </div>
        <div className="i-j-m-tabs-search">
          <div className="input-wrapper">
            <p>Job</p>
            <input placeholder="Search" />
          </div>
          <div className="input-wrapper">
            <p>Job Title</p>
            <input placeholder="Search" />
          </div>
          <div className="input-wrapper">
            <p>Plan</p>
            <input placeholder="Select" />
          </div>
        </div>

        <div className="i-j-m-tabs-table">
          <div className="tabs-table-header">
            {headers.map((obj) => (
              <span key={obj.keyId}>{obj.name}</span>
            ))}
          </div>
          <div className="tabs-table-body">
            {jobList.map((obj) => (
              <div className="tabs-table-row">
                <span>{obj.id}</span>
                <span>{obj.title}</span>
                <span>{obj.months} Months Plan</span>
                <span>View {obj.applicants} applicants</span>
                <span>
                  <Link to={handleLink(obj)}>View Job</Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
const headers = [
  { keyId: nextId(), name: "Job ID" },
  { keyId: nextId(), name: "Job Title" },
  { keyId: nextId(), name: "Plan Chosen" },
  { keyId: nextId(), name: "No of applicants" },
  { keyId: nextId(), name: "" },
];

const jobList = [
  {
    id: "J" + nextId(),
    title: "Maths Tr",
    iId: "I" + nextId(),
    months: "3",
    applicants: "6",
    iName: "DGF",
  },
  {
    id: "J" + nextId(),
    title: "Principal",
    iId: "I" + nextId(),
    months: "3",
    applicants: "6",
    iName: "GSG",
  },
  {
    id: "J" + nextId(),
    title: "Science Tr",
    months: "3",
    iId: "I" + nextId(),
    iName: "KUT",
    applicants: "6",
  },
  {
    id: "J" + nextId(),
    title: "Social Tr",
    months: "3",
    iId: "I" + nextId(),
    iName: "GGH",
    applicants: "6",
  },
  {
    id: "J" + nextId(),
    title: "Hindi Tr",
    months: "3",
    iId: "I" + nextId(),
    iName: "RII",
    applicants: "6",
  },
  {
    id: "J" + nextId(),
    title: "Physics Tr",
    months: "3",
    iId: "I" + nextId(),
    iName: "ALTN",
    applicants: "6",
  },
  {
    id: "J" + nextId(),
    months: "3",
    title: "Social Tr",
    iId: "I" + nextId(),
    iName: "GGH",
    applicants: "6",
  },
  {
    id: "J" + nextId(),
    months: "3",
    title: "Hindi Tr",
    iId: "I" + nextId(),
    iName: "RII",
    applicants: "6",
  },
];
