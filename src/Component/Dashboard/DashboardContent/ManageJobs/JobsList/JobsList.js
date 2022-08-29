import React, { useState } from "react";
import nextId from "react-id-generator";
import { useHistory } from "react-router";
import { getAllJobs, getInstituteList } from "../../../../../Services/getAPI";
import { updateJob } from "../../../../../Services/postAPI";
import Pagination from "rc-pagination";
import { Modal, Button } from "antd";
import "./jobs-list.style.scss";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { MainContext } from "../../../../Context/MainContext";
import ReactSelect from "react-select";
export default function JobsList() {
  const history = useHistory();
  const context = React.useContext(MainContext);
  const { userType } = context;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentList, setCurrentList] = React.useState(null);
  const [cityModal, setCityModal] = React.useState(false);
  const [job, setJob] = React.useState("");
  const [city, setCity] = React.useState("");
  const [pageConfig, setPageConfig] = React.useState({
    pageNo: 0,
    pageSize: 10,
    job_status: "under-review",
    search: "",
    institution_id: "",
  });
  const [options, setOptions] = useState([]);
  const searchQuery = (e, key) => {
    if (key) {
      setPageConfig({ ...pageConfig, [key]: e.target.value });
    } else {
      setSearchTerm(e.target.value);
    }
  };
  const editCity = (obj) => {
    setJob(obj);
    setCityModal(true);
  };
  const handleOk = async () => {
    if (city.label === undefined) {
      alert("city is required");
    } else {
      let job_data = { ...job, city: city.label };
      await updateJob(job_data);
      await setUpJobList();
      setCityModal(false);
      setCity("");
    }
  };
  const handleCancel = () => {
    setCityModal(false);
    setCity("");
  };
  const setSearchForTitle = (e) => {
    setPageConfig({ ...pageConfig, search: e.target.value });
  };
  const changePage = (page) => {
    setPageConfig({ ...pageConfig, pageNo: page - 1 });
  };
  const jobStatus = (e) => {
    setPageConfig({ ...pageConfig, job_status: e.target.value });
  };
  const changeInstitute = (e) => {
    setPageConfig({ ...pageConfig, institution_id: e.value });
  };
  const onCityPlaceSelected = (val) => {
    setCity(val);
  };
  const setUpJobList = async () => {
    try {
      let res = await getAllJobs(pageConfig);
      if (res.data.data.jobData) {
        setCurrentList(res.data.data.jobData);
        setPageConfig({
          ...pageConfig,
          total: res.data.data.count,
        });
      }
    } catch (error) {
      setCurrentList([]);
    }
  };

  const setUpInstitute = async () => {
    try {
      let res = await getInstituteList();
      if (res.data.statusCode === 200) {
        let newRes = res.data.data.map((item) => {
          item.value = item.userID;
          item.label = item.institution_name;
          return item;
        });
        setOptions(newRes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    setUpInstitute();
  }, []);
  React.useEffect(() => {
    setUpJobList();
  }, [
    pageConfig.pageNo,
    pageConfig.job_status,
    pageConfig.search,
    pageConfig.institution_id,
  ]);
  return userType === "leader" ? (
    <div className="jobs-list-wrapper">
      <h1>No Access</h1>
    </div>
  ) : !currentList ? (
    "Loading..."
  ) : (
    <div className="jobs-list-wrapper">
      <section className="jlw-body">
        <div className="jlw-body-header">
          <h4>Manage Jobs</h4>
          <div style={{ width: "50%", float: "left" }}>
            <div style={{ width: "50%", float: "left" }}>
              <select onChange={(e) => jobStatus(e)}>
                {/* <option value="draft">Draft</option> */}
                <option value="Active">Active</option>
                <option value="payment-inprogress">Payment in Progress</option>
                <option value="Closed">Closed</option>
                <option value="On Hold">On Hold</option>
                {/* <option value="Not Won">Not Won</option> */}

                <option value="saved">Saved</option>
                <option value="payment-failed">Payment Failed</option>
                <option value="under-review" selected>
                  Under Review
                </option>
                <option value="approved">Approved</option>
                <option value="live">Live</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <input
                value={searchTerm}
                onChange={(e) => {
                  searchQuery(e);
                  setSearchForTitle(e);
                }}
                placeholder="Search title"
              />
            </div>
            <div style={{ width: "40%", marginLeft: "50%", height: "30px",marginTop:"10px" }}>
              <ReactSelect
                defaultValue={options[0]}
                options={options}
                onChange={(e) => {
                  changeInstitute(e);
                }}
                placeholder="Search by Institue id"
              />
            </div>
          </div>
        </div>
        <table className="jlw-table">
          <thead>
            <tr>
              {headers.map((x) => (
                <th key={x._id}>{x.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentList.map((obj) => (
              <tr>
                <td>{obj?.instituteData?.iSmartID || "Id"}</td>
                <td>{obj?.instituteData?.institution_name || "NA"}</td>
                <td>
                  <div>
                    {obj?.city || "NA"}
                    <span onClick={() => editCity(obj)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pen"
                        viewBox="0 0 16 16"
                      >
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                      </svg>
                    </span>
                  </div>{" "}
                </td>
                <td>{obj?.job_title || "NA"}</td>
                <td>
                  <button
                    onClick={() =>
                      history.push(`/dashboard/manageJobs/${obj._id}`)
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pageConfig && (
          <Pagination
            total={pageConfig.total}
            itemsPerPage={pageConfig.pageSize}
            current={pageConfig.pageNo + 1}
            onChange={(obj) => changePage(obj)}
            className="pagination-section"
            prevIcon={() => (
              <img src="https://img.icons8.com/ios/50/000000/less-than.png" />
            )}
            nextIcon={() => (
              <img src="https://img.icons8.com/ios/50/000000/more-than.png" />
            )}
          />
        )}
      </section>
      <Modal
        title="Change city"
        visible={cityModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <GooglePlacesAutocomplete
          apiKey={"AIzaSyD-5YWBDClngYlPVMGfpmDQPJ05XaiMNck"}
          style={{ zIndex: "99999999" }}
          inputClassName="searchbar-inputStyle"
          autocompletionRequest={{
            types: ["(cities)"],
          }}
          selectProps={{
            isClearable: true,
            maxLengthAutocomplete: 3,
            maxLength: 3,
            isMulti: false,
            value: city,
            placeholder: "Enter City",
            onChange: (val) => {
              onCityPlaceSelected(val);
            },
          }}
        />
      </Modal>
    </div>
  );
}

const headers = [
  { _id: nextId(), name: "ID" },
  { _id: nextId(), name: "Name" },
  { _id: nextId(), name: "City" },
  { _id: nextId(), name: "Job title" },
  { _id: nextId(), name: "" },
];
const candidateList = [
  {
    _id: nextId(),
    name: "Sanjana V k",
    number: "+91 89898989899",
    email: "sanjana@gmail.com",
  },
  {
    _id: nextId(),
    name: "Sanjana V k",
    number: "+91 89898989899",
    email: "sanjana@gmail.com",
  },
];
