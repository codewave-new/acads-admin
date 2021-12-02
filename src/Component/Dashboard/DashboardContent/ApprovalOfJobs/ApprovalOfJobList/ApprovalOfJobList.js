import Pagination from "rc-pagination";
import React from "react";
import nextId from "react-id-generator";
import { Link } from "react-router-dom";
import { getAllJobs } from "../../../../../Services/getAPI";
import './approval-of-job-list.style.scss'
export default function ApprovalOfJobList() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState(types[0]);
  const [currentList, setCurrentList] = React.useState(null);
  const [pageConfig, setPageConfig] = React.useState({
    total:0,
    pageNo: 0,
    pageSize: 20
  });

  const changePage=(page)=>{
    setPageConfig({...pageConfig,pageNo:page})
  }
  
  const setUpJobList = async () => {
    try {
      
      let res = await getAllJobs(pageConfig);
      console.log(res)
      if (res.data.data.jobData) {
        setCurrentList(res.data.data.jobData);
        setPageConfig({
          ...pageConfig,
          total:res.data.data.count
        })
      }
    } catch (error) {
      setCurrentList([]);
    }
  };
  React.useEffect(() => {
    setUpJobList();
  }, [pageConfig.pageNo]);

  return !currentList ? (
    "Loading..."
  ) : (
    <div className="approval-of-jobs-main">
      <section className="aojm-body">
        <div className="aojm-body-header">
          <h4>Approvals</h4>
          <div className="search-wrapper">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
          </div>
          {/* <Dropdown
              selected={selectedType}
              changeSelected={setSelectedType}
              list={types}
              style={{ width: "200px" }}
            /> */}
        </div>
        <table className="aojm-table">
          <thead>
            <tr>
              {headers.map((x) => (
                <th key={x._id}>{x.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentList
              // .slice((pageConfig.current - 1) * 10, pageConfig.current * 10)
              // .filter((x) => {
              //   return (
              //     x?.clientName
              //       ?.toLowerCase()
              //       ?.startsWith(searchTerm.toLowerCase()) ||
              //     x?.jobTitle
              //       ?.toLowerCase()
              //       ?.startsWith(searchTerm.toLowerCase())
              //   );
              // })
              .map((obj) => (
                <tr>
                  <td>{obj.jobId}</td>
                  <td>{obj.jobTitle}</td>
                  <td>{obj.iId || "NA"}</td>
                  <td>{obj.clientName}</td>
                  <td>
                    <Link to={`/dashboard/manageJobs/${obj._id}`}>REVIEW</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          total={pageConfig.total}
          itemsPerPage={pageConfig.pageSize}
          current={pageConfig.pageNo}
          onChange={(obj) => changePage(obj)}
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

const types = [
  { _id: nextId(), name: "Jobs", id: "jobApprovals" },
  { _id: nextId(), name: "Fields", id: "fieldApprovals" },
];
const headers = [
  { _id: nextId(), name: "Job ID" },
  { _id: nextId(), name: "Job Title" },
  { _id: nextId(), name: "Institute ID" },
  { _id: nextId(), name: "Institute Name" },
  { _id: nextId(), name: "Action" },
];

const jobList = [
  { _id: "J" + nextId(), title: "Maths Tr", iId: "I" + nextId(), iName: "DGF" },
  {
    _id: "J" + nextId(),
    title: "Principal",
    iId: "I" + nextId(),
    iName: "GSG",
  },
  {
    _id: "J" + nextId(),
    title: "Science Tr",
    iId: "I" + nextId(),
    iName: "KUT",
  },
  {
    _id: "J" + nextId(),
    title: "Social Tr",
    iId: "I" + nextId(),
    iName: "GGH",
  },
  { _id: "J" + nextId(), title: "Hindi Tr", iId: "I" + nextId(), iName: "RII" },
  {
    _id: "J" + nextId(),
    title: "Physics Tr",
    iId: "I" + nextId(),
    iName: "ALTN",
  },
  {
    _id: "J" + nextId(),
    title: "Social Tr",
    iId: "I" + nextId(),
    iName: "GGH",
  },
  { _id: "J" + nextId(), title: "Hindi Tr", iId: "I" + nextId(), iName: "RII" },
  { _id: "J" + nextId(), title: "Hindi Tr", iId: "I" + nextId(), iName: "RII" },
  { _id: "J" + nextId(), title: "Hindi Tr", iId: "I" + nextId(), iName: "RII" },
  { _id: "J" + nextId(), title: "Hindi Tr", iId: "I" + nextId(), iName: "RII" },
  { _id: "J" + nextId(), title: "Hindi Tr", iId: "I" + nextId(), iName: "RII" },
  { _id: "J" + nextId(), title: "Hindi Tr", iId: "I" + nextId(), iName: "RII" },
  { _id: "J" + nextId(), title: "Hindi Tr", iId: "I" + nextId(), iName: "RII" },
  { _id: "J" + nextId(), title: "Hindi Tr", iId: "I" + nextId(), iName: "RII" },
];
