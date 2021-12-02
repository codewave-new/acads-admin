import React from "react";
import nextId from "react-id-generator";
import { Link } from "react-router-dom";
import Pagination from "rc-pagination";
import { getAllUsers } from "../../../../../Services/getAPI";
import "./users-list.style.scss";
export default function UsersList() {
  const [currentList, setCurrentList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pageConfig, setPageConfig] = React.useState({
    current: 1,
    total: 0,
    itemsPerPage: 10,
  });

  const setUpCurrentList = async () => {
    try {
      setLoading(true);
      let res = await getAllUsers();
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
    setUpCurrentList();
  }, []);
  return loading ? (
    "Loading..."
  ) : (
    <div className="user-list-main">
      <section className="ulm-body">
        <div className="ulm-body-header">
          <h4>Manage Users</h4>
          <div className="search-wrapper">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>
        <table className="ulm-table">
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
                return (
                  x.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
                  x.email.toLowerCase().startsWith(searchTerm.toLowerCase())
                );
              })
              .map((obj) => (
                <tr>
                  <td>{obj._id}</td>
                  <td>{obj?.role_type?.toUpperCase()}</td>
                  <td>{obj.name}</td>
                  <td>{obj.number || "NA"}</td>
                  <td>{obj.email}</td>
                  <td>
                    <Link to={`/dashboard/manageUsers/${obj._id}`}>View</Link>
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

const headers = [
  { _id: nextId(), name: "ID" },
  { _id: nextId(), name: "Role" },
  { _id: nextId(), name: "Name" },
  { _id: nextId(), name: "Contact Number" },
  { _id: nextId(), name: "Email ID" },
  { _id: nextId(), name: "" },
];
