import React from "react";
import { useParams } from "react-router";
import { getInstituteDetails } from "../../../Services/getAPI";
import "./institute-review.style.scss";
import InstituteJobs from "./InstituteJobs/InstituteJobs";
export default function InstituteReview() {
  const { instituteId } = useParams();
  const [instituteDetails, setInstituteDetails] = React.useState(null);
  const setUpInstituteDetails = async () => {
    try {
      let res = await getInstituteDetails(instituteId);
      if (res.data.data) {
        setInstituteDetails(res.data.data);
      } else {
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    setUpInstituteDetails();
  }, []);
  return !instituteDetails ? (
    "Loading..."
  ) : (
    <div className="institutes-review-main">
      <div className="institute-logo">
        {
          <img src={instituteDetails?.institutionDetails?.institute_logo} />
        }
      </div>
      <div className="institutes-details">
        <div className="institute-details-card">
          <h5>Institute Name</h5>
          <p>{instituteDetails?.institution_name || "NA"}</p>
        </div>
        <div className="institute-details-card">
          <h5>Contact Person's Name</h5>
          <p>{instituteDetails?.institution_contact_name || "NA"}</p>
        </div>
        <div className="institute-details-card">
          <h5>Official Email ID</h5>
          <p>{instituteDetails?.institutionContactDetails?.institution_primary_email || "NA"}</p>
        </div>
        <div className="institute-details-card">
          <h5>Alternate Email ID</h5>
          <p>{instituteDetails?.institutionContactDetails?.institution_alternative_email || "NA"}</p>
        </div>
        <div className="institute-details-card">
          <h5>Contact Number</h5>
          <p>{instituteDetails?.institutionContactDetails?.institution_primary_contact_no}</p>
        </div>
        <div className="institute-details-card">
          <h5>Alternate Contact No.</h5>
          <p>{instituteDetails?.institutionContactDetails?.institution_alternative_contact_no}</p>
        </div>
        <div className="institute-details-card">
          <h5>Official Website URL</h5>
          <p>{instituteDetails?.institutionDetails?.institution_website || "NA"}</p>
        </div>
        <div className="institute-details-card">
          <h5>No. Of Staff</h5>
          <p>{instituteDetails?.institutionDetails?.no_of_staff.start +'-'+instituteDetails?.institutionDetails?.no_of_staff.end  || "NA"}</p>
        </div>
        <div className="institute-details-card">
          <h5>Country</h5>
          <p>{instituteDetails?.institutionDetails?.institute_location?.country || "NA"}</p>
        </div>
        <div className="institute-details-card">
          <h5>State </h5>
          <p>{instituteDetails?.institutionDetails?.institute_location?.state || "NA"}</p>
        </div>
        <div className="institute-details-card">
          <h5>City</h5>
          <p>{instituteDetails?.institutionDetails?.institute_location?.city || "NA"}</p>
        </div>
        <div className="institute-details-card">
          <h5>Pincode</h5>
          <p>{instituteDetails?.institutionDetails?.institute_location?.pin || "NA"}</p>
        </div>
      </div>

      <div className="address-section">
        <div className="input-wrapper">
          <p>Institute Address</p>
          <textarea
            disabled
            placeholder={instituteDetails?.institutionDetails?.institute_address}
          ></textarea>
        </div>
        <div className="input-wrapper">
          <p>Google Location</p>
          <textarea
            placeholder={instituteDetails?.institutionDetails?.loc.coordinates}
            disabled
          ></textarea>
             <iframe
              title="map"
              src={
                `https://maps.google.com/maps?q=${instituteDetails?.institutionDetails?.loc.coordinates[1]}, ${instituteDetails?.institutionDetails?.loc.coordinates[0]}&z=8&output=embed`
              }
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
        </div>
        <div className="input-wrapper">
          <p>About Institute</p>
          <textarea
            rows={3}
            disabled
            placeholder={instituteDetails?.institutionDetails?.about}
          ></textarea>
        </div>
      </div>
    
    </div>
  );
}
