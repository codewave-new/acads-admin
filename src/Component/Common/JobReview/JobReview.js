import Interweave from "interweave";
import React from "react";
import { useParams } from "react-router";
import { getJobDetails } from "../../../Services/getAPI";
import { updateJob } from "../../../Services/postAPI";
import "./job-review.style.scss";
export default function JobReview() {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = React.useState(null);
  
  const setUpJobDetails = async () => {
  
    let res = await getJobDetails(jobId);
    console.log(res)
    if (res.data.data) {
      setJobDetails(res.data.data);
    } else {
    }
  };
const withold=async ()=>{
  await updateJob({job_status:'On Hold',_id:jobId})
  await setUpJobDetails()
  alert('job updated')
}
const approve=async ()=>{
 await updateJob({job_status:'Active',_id:jobId})
 await setUpJobDetails()
 alert('job updated')
}
  React.useEffect(() => {
    setUpJobDetails();
  }, []);
  return !jobDetails ? (
    "Loading..."
  ) : (
    <div className="job-review-main">
      <header>
        <p>
          Status: <span>{jobDetails.job_status}</span>
        </p>
        <div>
          <button onClick={()=>withold()}>Withhold</button>
          <button onClick={()=>approve()}>Approve</button>
        </div>
      </header>
      {/* <p>
        Plan Chosen: <span>3 Months</span>
      </p> */}
      <div className="job-details-main">
        <button>Logo</button>
        <div>
          <h5>
            Institute Id: <span>{jobDetails?.instituteData?.iSmartID}</span>
          </h5>
          <h5>
            Institute Name: <span>{jobDetails?.instituteData ?.institution_name || "NA"}</span>
          </h5>
        </div>
      </div>
      <div className="job-details-other">
        <p>
          {" "}
          <b>Job Title:</b> {jobDetails?.job_title || "NA"}
        </p>
        <p>
          <b>Subject:</b> {jobDetails?.job_subject || "NA"}
        </p>
        <p>
          <b>Job Role:</b> {jobDetails?.job_role || "NA"}
        </p>
        <p>
          <b>Experience:</b> {jobDetails?.job_experience}{" "}
          years
        </p>
        <p>
          <b>Job Type:</b> {jobDetails?.job_type || "NA"}
        </p>
        <p>
          <b>Qualifications:</b> {jobDetails?.min_qualify || "NA"}
        </p>
      </div>
      <div className="job-description">
        <p>Job Description</p>
        <div>
          <Interweave content={jobDetails?.job_description || ""} />
        </div>
      </div>
      <div className="institute-description">
        <p>Institute Description</p>
        <div>
        <Interweave content={jobDetails?.instituteData?.institutionDetails?.about} />
         
        </div>
      </div>
    </div>
  );
}
