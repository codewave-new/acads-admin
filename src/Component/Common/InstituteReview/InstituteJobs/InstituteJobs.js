import React, { useEffect, useState } from "react";
import nextId from "react-id-generator";
import { Modal, Button,Pagination,Input } from 'antd';
import { Link } from "react-router-dom";
import "./institute-jobs.style.scss";

import  Candidatelist  from '../CandidateList'
export default function InstituteJobs({jobList,instituteId,jobStatus,job_status,searchTitle,searchTerm,...props}) {

  const [modal,showModal]=useState(false)
  const [jobId,setJobId]=useState('')
  
 
  const handleLink = (obj) => {
    console.log(obj)
  };
  const viewAppilicants=(id)=>{
    setJobId(id)
    showModal(true)
  }

  const handleOk=()=>{
    showModal(false)
  }

  const handleCancel=()=>{
    showModal(false)
  }
  
  return (
    <div className="institute-jobs-main">
      <div className="i-j-m-header">
        <h5>Jobs Posted</h5>
      </div>
      <div className="i-j-m-tabs">
        
        <div className="i-j-m-tabs-search">
          
          <div className="input-wrapper">
            <p>Job Title</p>
            <input placeholder="Search" value={searchTerm} onChange={(e)=>searchTitle(e)} />
          </div>
          <div className="input-wrapper">
            <p>Filter By</p>
            <select style={{"padding":"6px","borderRadius":"4px"}} value={job_status} onChange={(e)=>jobStatus(e)}>
              {/* <option value="draft">Draft</option> */}
              <option value="Active">Active</option>
               <option value="payment-inprogress">Payment in Progress</option>
              <option value="Closed">Closed</option>
              <option value="On Hold">On Hold</option>
              {/* <option value="Not Won">Not Won</option>
             
              <option value="saved">Saved</option> */}
              <option value="payment-failed">Payment Failed</option>
              <option value="under-review" selected>Under Review</option>
              <option value="approved">Approved</option>
              <option value="live">Live</option>
             
             
              </select>
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
                <span>{obj._id}</span>
                <span>{obj.job_title}</span>
               <span> {
                  obj.candidates_applied.length>0?
                  <span onClick={()=>viewAppilicants(obj._id)}>View {obj.candidates_applied.length} applicants</span>:<span>0 applicants</span>
                }
                </span>
               
                <span>
                <Link to={`/dashboard/manageJobs/${obj._id}`}>View Job</Link>
                </span>
              </div>
            ))}
            
          </div>
        </div>
      </div>
      <Modal title="Applicants" visible={modal} onOk={handleOk} onCancel={handleCancel} width={1000}>
            <Candidatelist instituteId={instituteId} jobId={jobId}/>
           
      </Modal>
    </div>
  );
}
const headers = [
  { keyId: nextId(), name: "Job ID" },
  { keyId: nextId(), name: "Job Title" },
 { keyId: nextId(), name: "No of applicants" },
  { keyId: nextId(), name: "" },
];

// const jobList = [
//   {
//     id: "J" + nextId(),
//     title: "Maths Tr",
//     iId: "I" + nextId(),
//     months: "3",
//     applicants: "6",
//     iName: "DGF",
//   },
//   {
//     id: "J" + nextId(),
//     title: "Principal",
//     iId: "I" + nextId(),
//     months: "3",
//     applicants: "6",
//     iName: "GSG",
//   },
//   {
//     id: "J" + nextId(),
//     title: "Science Tr",
//     months: "3",
//     iId: "I" + nextId(),
//     iName: "KUT",
//     applicants: "6",
//   },
//   {
//     id: "J" + nextId(),
//     title: "Social Tr",
//     months: "3",
//     iId: "I" + nextId(),
//     iName: "GGH",
//     applicants: "6",
//   },
//   {
//     id: "J" + nextId(),
//     title: "Hindi Tr",
//     months: "3",
//     iId: "I" + nextId(),
//     iName: "RII",
//     applicants: "6",
//   },
//   {
//     id: "J" + nextId(),
//     title: "Physics Tr",
//     months: "3",
//     iId: "I" + nextId(),
//     iName: "ALTN",
//     applicants: "6",
//   },
//   {
//     id: "J" + nextId(),
//     months: "3",
//     title: "Social Tr",
//     iId: "I" + nextId(),
//     iName: "GGH",
//     applicants: "6",
//   },
//   {
//     id: "J" + nextId(),
//     months: "3",
//     title: "Hindi Tr",
//     iId: "I" + nextId(),
//     iName: "RII",
//     applicants: "6",
//   },
// ];
