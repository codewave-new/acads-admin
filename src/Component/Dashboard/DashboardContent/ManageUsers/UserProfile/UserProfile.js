import React from "react";
import { useHistory, useParams } from "react-router";
import { getUserInfo } from "../../../../../Services/getAPI";
import { deleteUser } from "../../../../../Services/postAPI";
import ConfirmationModal from "../../../../Common/ConfirmationModal/ConfirmationModal";
import "./user-profile.style.scss";
export default function UserProfile() {
  const { userId } = useParams();
  const history = useHistory();
  const [openModal, setOpenModal] = React.useState(false);
  const [details, setDetails] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const setUpUserInfo = async () => {
    setLoading(true);
    try {
      let res = await getUserInfo(userId);
      if (res.data.statusCode) {
        setDetails(res.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    setOpenModal(false)
    try {
      setDeleting(true);
      let res = await deleteUser(userId);
      if (res.data.statusCode === 200) {
        alert("Account Deactivated");
        history.push("/dashboard/manageUsers");
        setDeleting(false);
      } else {
        alert("Something went wrong.");
        setDeleting(false);
      }
    } catch (error) {
      alert("Something went wrong.");
      setDeleting(false);
    }
  };
  React.useEffect(() => {
    setUpUserInfo();
  }, []);

  return loading ? (
    "Loading...."
  ) : (
    <div className="user-profile-main">
      {openModal && (
        <ConfirmationModal
          handleClick={() => handleDelete()}
          closeIt={() => setOpenModal(false)}
        />
      )}
      <div className="user-profile-wrapper">
        <div className="user-profile-left">
          <div className="profile-wrapper">
            <img src="https://www.wallpapers4u.org/wp-content/uploads/girl_face_brown-eyed_smiling_young_69435_1920x1080.jpg" />
          </div>
          <div className="profile-info">
            <h6>{details?.name || "NA"}</h6>
            <p>{"NA"}</p>
            <p>{details?.email || "NA"}</p>
            <p>{details?.role_type?.toUpperCase() || "NA"}</p>
          </div>
        </div>
        <div className="profile-button-wrapper">
          <button onClick={() => setOpenModal(!openModal)}>
            {deleting ? "Deleting..." : "Deactivate"}
          </button>
          {/* <button>Reset Password</button> */}
        </div>
      </div>
    </div>
  );
}
