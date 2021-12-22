import React from "react";
import nextId from "react-id-generator";
import { useHistory } from "react-router";
import { Images } from "../../../Assets/0a-exporter";
import "./dashboard-sidebar.style.scss";
export default function DashboardSidebar() {
  const history = useHistory();
  const [openedTabs, setOpenedTabs] = React.useState("");
  const handleClick = (obj) => {
    history.push(`/dashboard/${obj.id}`);
  };
  return (
    <div className="dashboard-sidebar-main">
      <div className="dsm-header-title">
        <img src={Images.mainLogo} alt="main" />
      </div>
      <div className="dsm-body">
        <p className="dsmb-title">PAGES</p>
        {sidebarList.map((obj) => (
          <div
            className={`sidebar-single-section ${
              openedTabs === obj._id ? "open-it" : ""
            }`}
          >
            <div
              onClick={() =>
                openedTabs === obj._id
                  ? setOpenedTabs("")
                  : setOpenedTabs(obj._id)
              }
              className="sss-title"
            >
              <p>
                <img src={obj.icon} />
                {obj.name}
              </p>
              <img
                className="dropdown"
                src="https://img.icons8.com/ios/30/000000/expand-arrow--v2.png"
              />
            </div>
            <ul
              style={
                openedTabs === obj._id
                  ? { height: `${obj.list.length * 7}vh` }
                  : { height: 0 }
              }
              className="sss-list-wrapper"
            >
              {obj.list.map((x) => (
                <li onClick={() => handleClick(x)}>
                  <span>
                    <img src="https://img.icons8.com/material-outlined/48/000000/circled.png" />
                  </span>
                  <p> {x.name}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
const sidebarList = [
  {
    _id: nextId(),
    name: "Approvals",
    id: "approvals",
    icon: "https://img.icons8.com/material-outlined/48/000000/approval.png",
    list: [
     
      { _id: nextId(), name: "Approvals of fields", id: "approveFields" },
    ],
  },
  {
    _id: nextId(),
    name: "Jobs",
    id: "jobs",
    icon: "https://img.icons8.com/ios/50/000000/find-matching-job.png",
    list: [
      { _id: nextId(), name: "Manage Jobs", id: "manageJobs" },
      
      // {
      //   _id: nextId(),
      //   name: "Jobs with due payment",
      //   id: "jobsWithDuePayment",
      // },
    ],
  },
  {
    _id: nextId(),
    name: "Candidates",
    id: "candidates",
    icon: "https://img.icons8.com/ios/50/000000/contract-job.png",
    list: [
      { _id: nextId(), name: "Manage Candidates", id: "manageCandidates" },
    ],
  },
  {
    _id: nextId(),
    name: "Institutes",
    id: "institutes",
    icon: "https://img.icons8.com/ios-glyphs/50/000000/student-center.png",
    list: [
      { _id: nextId(), name: "Manage Institutes", id: "manageInstitutes" },
    ],
  },
  {
    _id: nextId(),
    name: "Plans",
    id: "plans",
    icon: "https://img.icons8.com/windows/32/000000/new-year-calendar.png",
    list: [
      { _id: nextId(), name: "Manage Plans", id: "managePlans" },
      { _id: nextId(), name: "Add Plans", id: "addPlans" },
    ],
  },
  {
    _id: nextId(),
    name: "User Management",
    id: "management",
    icon: "https://img.icons8.com/dotty/80/000000/commercial-development-management.png",
    list: [
      { _id: nextId(), name: "Manage Users", id: "manageUsers" },
      { _id: nextId(), name: "Add Users", id: "addUsers" },
    ],
  },
  {
    _id: nextId(),
    name: "Product Management",
    id: "products",
    icon: "https://img.icons8.com/material-outlined/80/000000/product.png",
    list: [
      // { _id: nextId(), name: "Candidate profile form", id: "cProfileForm" },
      // { _id: nextId(), name: "Institute profile form", id: "iProfileForm" },
      // { _id: nextId(), name: "Add Job Form", id: "addJob" },
      { _id: nextId(), name: "Testimonial", id: "testimonial" },
      { _id: nextId(), name: "Privacy Policy", id: "privacyPolicy" },
      { _id: nextId(), name: "Terms & Condition", id: "termsCondition" },
      { _id: nextId(), name: "FAQ", id: "faq" },
    ],
  },
];
