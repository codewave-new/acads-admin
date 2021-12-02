import React from "react";
import nextId from "react-id-generator";
import { createUser } from "../../../../Services/postAPI";
import Dropdown from "../../../Common/Dropdown/Dropdown";
import "./add-users.style.scss";
export default function AddUsers() {
  const [details, setDetails] = React.useState({
    name: "",
    email: "",
    password: "",
    role_type: "",
  });
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      let res = await createUser(details);
      if (res.data.statusCode === 200) {
        alert("User Added");
        setDetails({
          name: "",
          email: "",
          password: "",
          role_type: "",
        });
        setLoading(false);
      } else {
        alert("Something went wrong.");
        setLoading(false);
      }
    } catch (error) {
      alert("Something went wrong.");
      setLoading(false);
    }
  };
  return (
    <div className="add-users-main">
      <header className="aum-header">
        <h4>Add Users</h4>
      </header>
      <div className="aum-body">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="input-wrapper">
            <h6>Name</h6>
            <input
              onChange={(e) => {
                setDetails({ ...details, name: e.target.value });
              }}
              required
              value={details.name}
              placeholder=""
            />
          </div>
          <div className="input-wrapper">
            <h6>Email ID</h6>
            <input
              onChange={(e) => {
                setDetails({ ...details, email: e.target.value });
              }}
              value={details.email}
              type="email"
              required
              placeholder=""
            />
          </div>
          <div className="input-wrapper">
            <h6>Role</h6>
            <Dropdown
              changeSelected={(obj) =>
                setDetails({ ...details, role_type: obj.id })
              }
              list={roles}
              style={{ width: "80%" }}
            />
          </div>
          <div className="input-wrapper">
            <h6>Password</h6>
            <input
              required
              onChange={(e) => {
                setDetails({ ...details, password: e.target.value });
              }}
              value={details.password}
              placeholder=""
            />
          </div>
          <div className="submit-wrapper">
            <button disabled={!details.role_type}>
              {loading ? "Adding....." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
const roles = [
  { _id: nextId(), name: "Admin", id: "admin" },
  { _id: nextId(), name: "Recruiter", id: "recruiter" },
  { _id: nextId(), name: "Leader", id: "leader" },
];
