import React from "react";
import { getAllPlans } from "../../../../Services/getAPI";
import EditPlans from "../../../Common/EditPlans/EditPlans";
import { MainContext } from "../../../Context/MainContext";
import "./manage-plans.style.scss";
export default function ManagePlans() {
  const context = React.useContext(MainContext);
  const { userType } = context;
  const [planList, setPlanList] = React.useState([]);
  const [editModal, setEditModal] = React.useState({
    status: false,
    data: null,
  });

  const setUpPlanList = async () => {
    let res = await getAllPlans();
    if (res.data.data) {
      setPlanList(res.data.data);
    } else {
    }
  };
  React.useEffect(() => {
    setUpPlanList();
  }, []);
  return userType === "recruiter" ? (
    <div className="jobs-list-wrapper">
      <h1>No Access</h1>
    </div>
  ) : !planList ? (
    ""
  ) : (
    <div className="manage-plans-main">
      {editModal.status && (
        <EditPlans
          updateList={() => setUpPlanList()}
          data={editModal.data}
          closeIt={() => setEditModal({ status: false, data: null })}
        />
      )}
      <div className="manage-plans-header">
        <h4>Manage Plans</h4>
      </div>
      <div className="manage-plans-body">
        {planList.map((obj) => (
          <div className="manage-plan-card-wrapper">
            <div className="manage-plan-card">
              <button
                onClick={() => setEditModal({ status: true, data: obj })}
                className="edit-card"
              >
                <img src="https://img.icons8.com/material-sharp/96/000000/edit--v1.png" />
              </button>
              <h4>{obj.plan_duration} month plan</h4>
              <p>{obj.no_of_job_post} Job post</p>
              <span>
                {" "}
                <b>$20</b> per post @ <b>{obj.plan_discount}%</b> discount
              </span>
              <span>
                <b>{obj.plan_duration * 28}</b> days validity
              </span>
              <button className="deactivate">Deactivate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
