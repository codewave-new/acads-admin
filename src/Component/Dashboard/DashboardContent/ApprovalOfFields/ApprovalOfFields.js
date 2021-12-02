import React from "react";
import nextId from "react-id-generator";
import Pagination from "rc-pagination";
import {
  getAllColleges,
  getAllCourses,
  getAllSpecialization,
  getAllUniversities,
} from "../../../../Services/getAPI";
import {
  editColleges,
  editCourse,
  editSpecialization,
  editUniversities,
} from "../../../../Services/postAPI";
import Dropdown from "../../../Common/Dropdown/Dropdown";
import "./approval-of-fields.style.scss";
import { MainContext } from "../../../Context/MainContext";
export default function ApprovalOfFields() {
  const context = React.useContext(MainContext);
  const { userType } = context;
  const [selectedType, setSelectedType] = React.useState(types[0]);
  const [editField, setEditField] = React.useState(null);
  const [currentList, setCurrentList] = React.useState(fieldList);
  const [allList, setAllList] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pageConfig, setPageConfig] = React.useState({
    current: 1,
    total: 0,
    itemsPerPage: 10,
  });

  const getAllDropdownData = async () => {
    let apiOne = getAllSpecialization();
    let apiTwo = getAllColleges();
    let apiThree = getAllUniversities();
    let apiFour = getAllCourses();
    try {
      let res = await Promise.all([apiOne, apiTwo, apiThree, apiFour]);
      let tempOne = res[0].data.data.map((obj) => {
        return {
          ...obj,
          name: obj.specialization_name,
          approved: obj.specialization_approval === "approved",
        };
      });
      let tempTwo = res[1].data.data.map((obj) => {
        return {
          ...obj,
          name: obj.college_name,
          approved: obj.college_approval === "approved",
        };
      });
      let tempThree = res[2].data.data.map((obj) => {
        return {
          ...obj,
          name: obj.university_name,
          approved: obj.university_approval === "approved",
        };
      });
      let tempFour = res[3].data.data.map((obj) => {
        return {
          ...obj,
          name: obj.course_name,
          approved: obj.course_approval === "approved",
        };
      });
      let temp = {
        specializations: [...tempOne],
        colleges: [...tempTwo],
        universities: [...tempThree],
        courses: [...tempFour],
      };
      setAllList({ ...temp });
    } catch (error) {
      let temp = {
        specializations: [],
        colleges: [],
        universities: [],
        courses: [],
      };
      setAllList({ ...temp });
    }
  };

  const handleSave = (obj) => {
    let temp = currentList.map((x) => {
      if (obj._id === x._id) {
        return { ...x, field: "" };
      } else {
        return { ...x };
      }
    });

    setCurrentList([...temp]);
    setEditField(null);
  };
  const handleApprove = async (obj, edit) => {
    let res;
    switch (selectedType.id) {
      case "courses":
        res = await editCourse(
          {
            ...obj,
            course_name: obj.name,
            course_approval: edit
              ? obj.course_approval
              : obj.course_approval === "approved"
              ? "pending"
              : "approved",
          },
          obj._id
        );
        break;
      case "specializations":
        res = await editSpecialization(
          {
            ...obj,
            specialization_name: obj.name,
            specialization_approval: edit
              ? obj.specialization_approval
              : obj.specialization_approval === "approved"
              ? "pending"
              : "approved",
          },
          obj._id
        );
        break;
      case "universities":
        res = await editUniversities(
          {
            ...obj,
            university_name: obj.name,
            university_approval: edit
              ? obj.university_approval
              : obj.university_approval === "approved"
              ? "pending"
              : "approved",
          },
          obj._id
        );
        break;
      case "colleges":
        res = await editColleges(
          {
            ...obj,
            college_name: obj.name,
            college_approval: edit
              ? obj.college_approval
              : obj.college_approval === "approved"
              ? "pending"
              : "approved",
          },
          obj._id
        );
        break;

      default:
        break;
    }
    if (res.data.data) {
      alert("Updated");
      let temp = currentList.map((x) => {
        if (obj._id === x._id) {
          return {
            ...x,
            approved: edit ? x.approved : !x.approved,
            name: obj.name,
          };
        } else {
          return { ...x };
        }
      });
      setCurrentList([...temp]);
      setEditField(null);
    } else {
      alert("Failed");
      setEditField(null);
    }
  };

  React.useEffect(() => {
    if (!allList) return;
    setPageConfig({
      ...pageConfig,
      current: 1,
      total: allList[selectedType.id].length,
    });
    setCurrentList(allList[selectedType.id]);
  }, [allList, selectedType]);
  React.useEffect(() => {
    getAllDropdownData();
  }, []);
  return userType === "recruiter" ? (
    <div className="jobs-list-wrapper">
      <h1>No Access</h1>
    </div>
  ) : !allList ? (
    "Loading...."
  ) : (
    <div className="approval-of-fields-main">
      <section className="aofm-body">
        <div className="aofm-body-header">
          <h4>Approvals</h4>
          <div className="search-wrapper">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
          </div>
          <Dropdown
            selected={selectedType}
            changeSelected={setSelectedType}
            list={types}
            style={{ width: "200px" }}
          />
        </div>
        <table className="aofm-table">
          <thead>
            <tr>
              {headers.map((x) => (
                <th key={x._id}>{x.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentList
              .slice((pageConfig.current - 1) * 10, pageConfig.current * 10)
              .filter((x) => {
                return x.name
                  .toLowerCase()
                  .startsWith(searchTerm.toLowerCase());
              })
              .map((obj) => (
                <tr>
                  <td>{obj._id}</td>
                  <td>{obj.course_created_by}</td>
                  <td>
                    {obj._id === editField?._id ? (
                      <input
                        onChange={(e) =>
                          setEditField({ ...editField, name: e.target.value })
                        }
                        autoFocus
                        value={editField?.name || ""}
                      />
                    ) : (
                      obj.name
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleApprove(obj)}
                      className={obj.approved ? "approved" : ""}
                    >
                      {obj.approved ? "Approved" : "Approve"}
                    </button>
                    <button
                      onClick={() => {
                        if (editField?._id === obj._id) {
                          handleApprove({ ...editField }, true);
                          return;
                        } else if (editField === null) {
                          setEditField(obj);
                        } else {
                          setEditField(null);
                        }
                      }}
                      className={
                        obj._id === editField?._id ? "active-button" : ""
                      }
                    >
                      {obj._id === editField?._id ? "Save" : "Edit"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          total={pageConfig.total}
          itemsPerPage={pageConfig.itemsPerPage}
          current={pageConfig.current}
          onChange={(obj) => setPageConfig({ ...pageConfig, current: obj })}
          className="pagination-section"
          prevIcon={() => (
            <img src="https://img.icons8.com/ios/50/000000/less-than.png" />
          )}
          nextIcon={() => (
            <img src="https://img.icons8.com/ios/50/000000/more-than.png" />
          )}
        />
      </section>
    </div>
  );
}
const fieldList = [
  {
    _id: `C${nextId()}`,
    name: "Sanjana VK",
    field: "Qual Name 1",
    approved: true,
  },
  {
    _id: `C${nextId()}`,
    name: "Sanjana VK",
    field: "Qual Name 1",
    approved: false,
  },
  {
    _id: `C${nextId()}`,
    name: "Sanjana VK",
    field: "Qual Name 1",
    approved: false,
  },
  {
    _id: `C${nextId()}`,
    name: "Sanjana VK",
    field: "Qual Name 1",
    approved: false,
  },
  {
    _id: `C${nextId()}`,
    name: "Sanjana VK",
    field: "Qual Name 1",
    approved: false,
  },
  {
    _id: `C${nextId()}`,
    name: "Sanjana VK",
    field: "Qual Name 1",
    approved: false,
  },
  {
    _id: `C${nextId()}`,
    name: "Sanjana VK",
    field: "Qual Name 1",
    approved: false,
  },
  {
    _id: `C${nextId()}`,
    name: "Sanjana VK",
    field: "Qual Name 1",
    approved: false,
  },
  {
    _id: `C${nextId()}`,
    name: "Sanjana VK",
    field: "Qual Name 1",
    approved: false,
  },
  {
    _id: `C${nextId()}`,
    name: "Sanjana VK",
    field: "Qual Name 1",
    approved: false,
  },
  {
    _id: `C${nextId()}`,
    name: "Sanjana VK",
    field: "Qual Name 1",
    approved: false,
  },
  {
    _id: `C${nextId()}`,
    name: "Sanjana VK",
    field: "Qual Name 1",
    approved: false,
  },
];

const types = [
  { _id: nextId(), name: "Qualification", id: "courses" },
  { _id: nextId(), name: "Specialization", id: "specializations" },
  { _id: nextId(), name: "University", id: "universities" },
  { _id: nextId(), name: "College", id: "colleges" },
];
const headers = [
  { _id: nextId(), name: "ID" },
  { _id: nextId(), name: "Created By (ID)" },
  { _id: nextId(), name: "Value" },
  { _id: nextId(), name: "Status" },
];
