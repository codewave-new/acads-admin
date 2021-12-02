import React from "react";
import { useHistory, useParams } from "react-router";
import { getCandidateInfo } from "../../../../../Services/getAPI";
import { deleteCandidate } from "../../../../../Services/postAPI";
import ConfirmationModal from "../../../../Common/ConfirmationModal/ConfirmationModal";
import "./candidate-profile.style.scss";
export default function CandidateProfile() {
  const { candidateId } = useParams();
  const history = useHistory();
  const [candidateInfo, setCandidateInfo] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOPenModal] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const setUpCandidateInfo = async () => {
    setLoading(true);

    let res = await getCandidateInfo(candidateId);
    if (res.data.statusCode === 200) {
      setCandidateInfo(res.data.data);
      setLoading(false);
    } else {
      setLoading(false);
      setCandidateInfo({});
    }
  };
  const handleDelete = async () => {
    setOPenModal(false)
    setDeleting(true);
    try {
      let res = await deleteCandidate(candidateInfo._id);
      if (res.data.statusCode === 200) {
        alert("Account Deleted");
        setDeleting(false);
        history.push("/dashboard/manageCandidates");
      } else {
        alert("Something Went wrong");
        setDeleting(false);
      }
    } catch (error) {
      setDeleting(false);
    }
  };

  React.useEffect(() => {
    setUpCandidateInfo();
  }, []);

  return loading ? (
    "Loading..."
  ) : (
    <div className="candidate-profile-main">
      {openModal && (
        <ConfirmationModal
          handleClick={() => {
            handleDelete();
          }}
          closeIt={() => setOPenModal(false)}
        />
      )}
      <div className="candidate-basic-info">
        <div className="cbi-left">
          <div className="cbil-profile">
            <img
              src={
                candidateInfo?.candidate_img ||
                "https://assets.vogue.com/photos/606fdd82a2b7c03119469b39/4:3/w_656,h_492,c_limit/Screen%20Shot%202021-04-09%20at%2012.47.01%20AM%20(1).png"
              }
            />
          </div>
          <div className="cbil-info">
            <h5>{candidateInfo?.candidate_full_name || "Not available"}</h5>
            <p>{candidateInfo?.candidate_email || "Not available"}</p>
            <button onClick={() => setOPenModal(!openModal)}>
              {deleting ? "Deactivating..." : "Deactivate"}
            </button>
          </div>
        </div>
        <div className="cbi-right">
          <div>
            <span>
              <img src="https://img.icons8.com/ios/50/000000/name.png" />
              Full Name
            </span>
            <span>{candidateInfo?.candidate_full_name || "Not available"}</span>
          </div>
          <div>
            <span>
              <img src="https://img.icons8.com/material-outlined/24/000000/contact-card.png" />
              Phone number
            </span>
            <span>
              {candidateInfo?.candidate_primary_contact_no || "Not available"}
            </span>
          </div>
          <div>
            <span>
              <img src="https://img.icons8.com/material-outlined/24/000000/email.png" />
              Email ID
            </span>
            <span>{candidateInfo?.candidate_email || "Not available"}</span>
          </div>
          <div>
            <span>
              <img src="https://img.icons8.com/ios/24/000000/gender.png" />
              Gender
            </span>
            <span>{candidateInfo?.candidate_gender || "NA"}</span>
          </div>
        </div>
      </div>
      <div className="candidate-qualification-info">
        <h5 className="cqi-header">Qualification Details</h5>
        <div className="cqi-body">
          {candidateInfo?.candidate_qualification.map((obj) => (
            <div className="qualification-wrapper">
              <div className="qw-left">
                <img src="https://img.icons8.com/ios-filled/100/000000/contract.png" />
              </div>
              <div className="qw-right">
                <h6>Teaching</h6>
                <h6>M. Sc</h6>
                <p>{obj.college}</p>
                {/* <p>Reva Institute</p>
                <p>{obj.college}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="candidate-qualification-info">
        <h5 className="cqi-header">Employment Details</h5>
        <div className="cqi-body">
          {candidateInfo?.candidate_employment.map((obj) => (
            <div className="qualification-wrapper">
              <div className="qw-left">
                <img src="https://img.icons8.com/ios-glyphs/90/000000/find-matching-job.png" />
              </div>
              <div className="qw-right">
                <h6>{obj.pricipal}</h6>
                <h6>{obj.institute_name}</h6>
                <p>CBSE</p>
                <p>CLass {obj.class.replace("_", "-")}</p>
                <p>2015 - Present</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="candidate-qualification-info">
        <h5 className="cqi-header">Preference Details</h5>
        <div className="cqi-body">
          <div className="qualification-wrapper">
            <div className="preference-section">
              <div>
                <h6>Expected Salary:</h6>
                <p>₹{candidateInfo?.candidate_expected_salary}</p>
              </div>
              <div>
                <h6>Preferred Location:</h6>
                <p>{candidateInfo?.candidate_current_location}</p>
              </div>
              <div>
                <h6>Preferred Sub - location:</h6>
                <p>Banshankari</p>
              </div>
              <div>
                <h6>Distance Range:</h6>
                <p>12 km</p>
              </div>
              <div>
                <h6>Prefer Online Coaching?:</h6>
                <p>Yes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
