import React from "react";
import nextId from "react-id-generator";
import { createTestimonial } from "../../../../Services/postAPI";
import Dropdown from "../../../Common/Dropdown/Dropdown";
import { MainContext } from "../../../Context/MainContext";
import "./testmonial.style.scss";
export default function Testimonial({ setUpCurrentList }) {
  const context = React.useContext(MainContext);
  const { userType } = context;
  const [loading, setLoading] = React.useState(false);
  const [details, setDetails] = React.useState({
    name: "",
    testimonial: "",
    testimonial_type: "",
    designation: "",
  });
  const handleSubmit = async () => {
    setLoading(true);
    let res = await createTestimonial(details);
    if (res.data.statusCode === 200) {
      setUpCurrentList();
      alert("Added");
      setDetails({
        name: "",
        testimonial: "",
        testimonial_type: "",
        designation: "",
      });
    } else {
      alert("Failed");
      setDetails({
        name: "",
        testimonial: "",
        testimonial_type: "",
        designation: "",
      });
    }
    setLoading(false);
  };
  return userType === "recruiter" ? (
    <div className="jobs-list-wrapper">
      <h1>No Access</h1>
    </div>
  ) : (
    <div className="testimonial-main">
      <header className="testimonial-header">
        <h5>Add Testimonial</h5>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="testimonial-body"
      >
        <div className="input-wrapper">
          <p>Name</p>
          <div className="input-section">
            <input
              required
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
          </div>
        </div>
        <div className="input-wrapper">
          <p>Testimonial</p>
          <div className="input-section">
            <textarea
              minLength={100}
              required
              value={details.testimonial}
              onChange={(e) =>
                setDetails({ ...details, testimonial: e.target.value })
              }
            />
          </div>
        </div>
        <div className="input-wrapper">
          <p>Testimonial Type</p>
          <Dropdown
            list={type}
            changeSelected={(obj) => {
              setDetails({ ...details, testimonial_type: obj.id });
            }}
          />
        </div>
        <div className="input-wrapper">
          <p>Designation</p>
          <div className="input-section">
            <input
              required
              value={details.designation}
              onChange={(e) =>
                setDetails({ ...details, designation: e.target.value })
              }
            />
          </div>
        </div>
        <button disabled={!details.testimonial_type}>
          {loading ? "Adding...." : "Add"}
        </button>
      </form>
    </div>
  );
}
const type = [
  { _id: nextId(), name: "Candidate", id: "candidate" },
  { _id: nextId(), name: "Institution", id: "institute" },
];
