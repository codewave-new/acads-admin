import React from "react";
import {
  deleteTestimonials,
  getAllTestimonials,
} from "../../../../Services/getAPI";
import AddTestimonial from "../../../Common/AddTestimonial/AddTestimonial";
import ConfirmationModal from "../../../Common/ConfirmationModal/ConfirmationModal";
import { MainContext } from "../../../Context/MainContext";
import "./testimonial-list.style.scss";
export default function TestimonialList() {
  const context = React.useContext(MainContext);
  const { userType } = context;
  const [addModal, setAddModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState("");
  const [currentList, setCurrentList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const setUpCurrentList = async () => {
    try {
      setLoading(true);
      let res = await getAllTestimonials();
      if (res.data.statusCode === 200) {
        setCurrentList(res.data.data);
        setLoading(false);
      } else {
        setCurrentList([]);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteTestimonial = async () => {
    try {
      let res = await deleteTestimonials(deleteModal);
      if (res.data.statusCode === 200) {
        setUpCurrentList();
        alert("Deleted");
      } else {
        alert("Failed");
      }
      setDeleteModal("");
    } catch (error) {
      alert("Failed");

      setDeleteModal("");
    }
  };
  React.useEffect(() => {
    setUpCurrentList();
  }, []);
  return userType === "recruiter" ? (
    <div className="jobs-list-wrapper">
      <h1>No Access</h1>
    </div>
  ) : (
    <div className="testimonial-list-main">
      {addModal && (
        <AddTestimonial
          closeIt={() => setAddModal(false)}
          setUpCurrentList={() => {
            setUpCurrentList();
            setAddModal(false);
          }}
        />
      )}
      {deleteModal && (
        <ConfirmationModal
          closeIt={() => setDeleteModal("")}
          handleClick={() => deleteTestimonial()}
        />
      )}
      <header className="tlm-header">
        <h5>Testimonials</h5>
        <button onClick={() => setAddModal(true)}>Add</button>
      </header>
      <section className="tlm-body">
        {currentList.map((obj) => (
          <div className="testimonial-card-wrapper">
            <div className="testimonial-card">
              <header>
                <h6>{obj.name || "NA"}</h6>
                <div>
                  <button className={obj.testimonial_type}>
                    {obj?.testimonial_type?.toUpperCase()}
                  </button>
                  <button
                    onClick={() => setDeleteModal(obj._id)}
                    className="delete-button"
                  >
                    <img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png" />
                  </button>
                </div>
              </header>
              <div>
                <p>{obj.testimonial || "NA"}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
