import React from "react";
import nextId from "react-id-generator";
import { createPlan } from "../../../../Services/postAPI";
import Dropdown from "../../../Common/Dropdown/Dropdown";
import { MainContext } from "../../../Context/MainContext";
import "./add-plans.style.scss";
export default function AddPlans() {
  const context = React.useContext(MainContext);
  const { userType } = context;
  const [selectedForm, setSelectedForm] = React.useState(types[0]);
  const [loading, setLoading] = React.useState(false);

  const [details, setDetails] = React.useState({
    plan_name: "",
    plan_description: "",
    plan_price_per_job_post: "",
    plan_gst: "",
    no_of_job_post: "",
    plan_duration: "",
    plan_discount: "",
  });
  const handleSubmit = async () => {
   
    if (selectedForm.id !== "jobPost") return;
    try {
      setLoading(true);
      let res = await createPlan({ ...details,plan_discount_amount:parseInt(2542*details.no_of_job_post) - parseInt(details.plan_price_per_job_post*details.no_of_job_post),price:parseInt((details.plan_price_per_job_post*details.no_of_job_post)*(1+0.18)) });

      if (res.data.data) {
        alert("Plan Added Successfully");
        setDetails({
          plan_name: "",
          plan_description: "",
          plan_price_per_job_post: "",
          plan_gst: "",
          no_of_job_post: "",
          plan_duration: "",
          plan_discount: "",
        });
      } else {
        alert(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Failed");
    }
  };
  return userType === "recruiter" ? (
    <div className="jobs-list-wrapper">
      <h1>No Access</h1>
    </div>
  ) :  (

    <div className="add-plans-main">
      <div className="add-plans-header">
        <h4>Add Plans</h4>
        <Dropdown
          list={types}
          selected={selectedForm}
          changeSelected={(obj) => setSelectedForm(obj)}
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="add-plans-body"
      >
        {forms[selectedForm.id].map((obj) => (
          <div className="input-wrapper">
            <p>{obj.name}</p>
            <div className="input-section">
              {obj.id === "plan_description" ? (
                <textarea
                  required
                  name={obj.id}
                  value={details[obj.id]}
                  onChange={(e) =>
                    setDetails({ ...details, [e.target.name]: e.target.value })
                  }
                />
              ) : (
                <input
                  required
                  name={obj.id}
                  value={details[obj.id]}
                  onChange={(e) =>
                    setDetails({ ...details, [e.target.name]: e.target.value })
                  }
                />
              )}
            </div>
          </div>
        ))}
        <button>{loading ? "Adding..." : "Add Plan"}</button>
      </form>
    </div>
  );
}
const forms = {
  jobPost: [
    { _id: nextId(), name: "Plan Name", id: "plan_name" },
    { _id: nextId(), name: "No. of job Posts", id: "no_of_job_post" },
    { _id: nextId(), name: "Plan Duration (in months)", id: "plan_duration" },
    { _id: nextId(), name: "Cost per job post", id: "plan_price_per_job_post" },
    { _id: nextId(), name: "GST", id: "plan_gst" },
    { _id: nextId(), name: "Discount %", id: "plan_discount" },
    { _id: nextId(), name: "Plan description", id: "plan_description" },
  ],
  virtualHR: [
    { _id: nextId(), name: "Plan Name", id: "planName" },
    { _id: nextId(), name: "Head count range", id: "headCount" },
    { _id: nextId(), name: "Cost per head post", id: "costPerPost" },
    { _id: nextId(), name: "Unit Price Cost", id: "upc" },
    { _id: nextId(), name: "GST", id: "gst" },
    { _id: nextId(), name: "Discount %", id: "discount" },
  ],
};
const types = [
  { _id: nextId(), name: "Add Job Post Plan", id: "jobPost" },
  { _id: nextId(), name: "Add Virtual HR Plan", id: "virtualHR" },
];
