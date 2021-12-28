import React from "react";
import nextId from "react-id-generator";
import { useHistory } from "react-router";
import Pagination from "rc-pagination";
import { getInstituteList } from "../../../../../Services/getAPI";
import "./institution-list.style.scss";
import { MainContext } from "../../../../Context/MainContext";
export default function InstitutionList() {
  const context = React.useContext(MainContext);
  const { userType } = context;
  const history = useHistory();
  const [currentList, setCurrentList] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [pageConfig, setPageConfig] = React.useState({
    current: 1,
    total: 0,
    itemsPerPage: 10,
  });

  const setUpInstituteList = async () => {
    try {
      setLoading(true);
      let res = await getInstituteList();
      if (res.data.statusCode === 200) {
        setCurrentList(res.data.data);
        setPageConfig({
          current: 1,
          total: res?.data?.data?.length || 0,
          itemsPerPage: 10,
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
    setUpInstituteList();
  }, []);
  return userType === "leader" ? (
    <div className="jobs-list-wrapper">
      <h1>No Access</h1>
    </div>
  ) : (
    <div className="institute-list-wrapper">
      <section className="ilw-body">
        <div className="ilw-body-header">
          <h4>Manage Institutes</h4>
          <div className="search-wrapper">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>
        <table className="ilw-table">
          <thead>
            <tr>
              {headers.map((x) => (
                <th key={x._id}>{x.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentList
              
              .filter((x) => {
                return (
                  x?.institution_name
                    ?.toLowerCase()
                    ?.startsWith(searchTerm.toLowerCase()) ||
                  x?.institution_primary_email
                    ?.toLowerCase()
                    ?.startsWith(searchTerm.toLowerCase())
                );
              }).slice((pageConfig.current - 1) * 10, pageConfig.current * 10)
              .map((obj) => (
                <tr >
                  <td>{obj?.iSmartID || "Id"}</td>
                  <td style={{"cursor":"pointer"}}  onClick={() =>
                  history.push(`/dashboard/manageInstitutes/${obj._id}`)
                }><a style={{"color":"#1783a8","fontSize":"15px","fontWeight":"500"}}>{obj?.institution_name || "NA"}</a></td>
                  <td>{obj?.institutionContactDetails?.institution_primary_contact_no || "NA"}</td>
                  <td>{obj?.institutionContactDetails?.institution_primary_email || "NA"}</td>
                  <td>
                    <button
                      onClick={() =>
                        history.push(`/dashboard/addjobs/${obj._id}/${obj.iSmartID}`)
                      }
                      style={{"width":"100%"}}
                    >
                      Add Job
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        history.push(`/dashboard/manageTransaction/${obj._id}`)
                      }
                    >
                     Transactions
                    </button>
                  </td>
                  {/* <td>
                    <button
                      onClick={() =>
                        history.push(`/dashboard/manageInstitutes/${obj._id}`)
                      }
                    >
                      View
                    </button>
                  </td> */}
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

const headers = [
  { _id: nextId(), name: "ISmart id" },
  { _id: nextId(), name: "Name" },
  { _id: nextId(), name: "Contact Number" },
  { _id: nextId(), name: "Email ID" },
  { _id: nextId(), name: "" },
  { _id: nextId(), name: "" },
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
