import React from "react";
import nextId from "react-id-generator";
import Pagination from "rc-pagination";
import { useHistory } from "react-router";
import { getAllCandidates } from "../../../../../Services/getAPI";
import "./manage-candidate.style.scss";
import { MainContext } from "../../../../Context/MainContext";
export default function ManageCandidate() {
  const context = React.useContext(MainContext);
  const { userType } = context;
  const history = useHistory();
  const [currentList, setCurrentList] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [pageConfig, setPageConfig] = React.useState({
    current: 0,
    total: 0,
    itemsPerPage: 10,
  });
  const setUpCandidateList = async () => {
    try {
      setLoading(true);
      let res = await getAllCandidates(searchTerm,pageConfig.current,pageConfig.itemsPerPage);
      if (res.data.statusCode === 200) {
        setCurrentList(res.data.data);
        setPageConfig({
          ...pageConfig,
         total: res?.data?.count
         
        });

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setUpCandidateList();
  }, [pageConfig.current]);

  return userType === "leader" ? (
    <div className="jobs-list-wrapper">
      <h1>No Access</h1>
    </div>
  ) : (
    <div className="manage-candidate-main">
      <section className="mcm-body">
        <div className="mcm-body-header">
          <h4>Manage Candidates</h4>
          <div className="search-wrapper">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>
        <section className="mcm-table-wrapper">
          <table className="mcm-table">
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
                //     x?.candidate_full_name
                //       ?.toLowerCase()
                //       ?.startsWith(searchTerm.toLowerCase()) ||
                //     x?.candidate_email
                //       ?.toLowerCase()
                //       ?.startsWith(searchTerm.toLowerCase())
                //   );
                // })
                .map((obj) => (
                  <tr>
                    <td>{obj.candidate_id || "Id"}</td>
                    <td>{obj.candidate_full_name}</td>
                    <td>{obj.candidate_primary_contact_no}</td>
                    <td>{obj.candidate_email}</td>
                    <td>
                      <button
                        onClick={() =>
                          history.push(`/dashboard/manageCandidates/${obj._id}`)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <Pagination
          total={pageConfig.total}
          itemsPerPage={pageConfig.itemsPerPage}
          current={pageConfig.current+1}
          onChange={(obj) => setPageConfig({ ...pageConfig, current: obj-1 })}
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

const headers = [
  { _id: nextId(), name: "ID" },
  { _id: nextId(), name: "Name" },
  { _id: nextId(), name: "Contact Number" },
  { _id: nextId(), name: "Email ID" },
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
  {
    _id: nextId(),
    name: "Sanjana V k",
    number: "+91 89898989899",
    email: "sanjana@gmail.com",
  },
];
