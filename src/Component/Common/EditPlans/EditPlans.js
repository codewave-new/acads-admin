import React from "react";
import nextId from "react-id-generator";
import { editPlan } from "../../../Services/postAPI";
import Dropdown from "../Dropdown/Dropdown";
import "./edit-plans.style.scss";
export default function EditPlans({ data = {}, closeIt, updateList }) {
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
    try {
      setLoading(true);
      let res = await editPlan({ ...details,plan_discount_amount:parseInt(2542*details.no_of_job_post) - parseInt(details.plan_price_per_job_post*details.no_of_job_post),price:parseInt((details.plan_price_per_job_post*details.no_of_job_post)*(1+0.18)) }, details._id);
      if (res.data.data) {
        alert("Plan Edited Successfully");
        updateList();
        setDetails({
          plan_name: "",
          plan_description: "",
          plan_price_per_job_post: "",
          plan_gst: "",
          no_of_job_post: "",
          plan_duration: "",
          plan_discount: "",
        });
        closeIt();
      } else {
        alert(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Failed");
    }
  };
  React.useEffect(() => {
    if (!data) return;
    setDetails({ ...details, ...data });
  }, [data]);

  return (
    <div className="edit-plans-main">
      <div className="edit-plans-modal">
        <div className="epm-header">
          <h5>Edit Plan</h5>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="add-plans-body"
        >
          {jobPost.map((obj) => (
            <div className="input-wrapper">
              <p>{obj.name}</p>
              <div className="input-section">
                {obj.id === "plan_description" ? (
                  <textarea
                    required
                    name={obj.id}
                    value={details[obj.id]}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                ) : (
                  <input
                    required
                    name={obj.id}
                    value={details[obj.id]}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                )}
              </div>
            </div>
          ))}
          <div className="submit-wrapper">
            <button>{loading ? "Editing..." : "Edit Plan"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
const jobPost = [
  { _id: nextId(), name: "Plan Name", id: "plan_name" },
  { _id: nextId(), name: "No. of job Posts", id: "no_of_job_post" },
  { _id: nextId(), name: "Plan Duration (in months)", id: "plan_duration" },
  { _id: nextId(), name: "Cost per job post", id: "plan_price_per_job_post" },
  { _id: nextId(), name: "GST", id: "plan_gst" },
  { _id: nextId(), name: "Discount %", id: "plan_discount" },
  { _id: nextId(), name: "Plan description", id: "plan_description" },
];
