import React from "react";
import {
  deleteQuestion,
  getAllQuestionAnswers,
} from "../../../../Services/getAPI";
import AddFAQ from "../../../Common/AddFAQ/AddFAQ";
import ConfirmationModal from "../../../Common/ConfirmationModal/ConfirmationModal";
import { MainContext } from "../../../Context/MainContext";
import "./answer-and-question.style.scss";
export default function AnswersAndQuestion() {
  const context = React.useContext(MainContext);
  const { userType } = context;
  const [currentList, setCurrentList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [confirm, setConfirm] = React.useState(false);
  const [addModal, setModal] = React.useState(false);

  const setUpCurrentList = async () => {
    try {
      let res = await getAllQuestionAnswers();
      if (res.data.statusCode === 200) {
        setCurrentList(res.data.data);
        setLoading(false);
      } else {
        setCurrentList([]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    let res = await deleteQuestion(confirm);
    if (res.data.statusCode === 200) {
      setConfirm("");
      alert("Deleted");
      setUpCurrentList();
    } else {
      setConfirm("");
      alert("Failed");
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
    <div className="answer-and-question-main">
      {addModal ? (
        <AddFAQ
          update={() => setUpCurrentList()}
          closeIt={() => setModal(false)}
        />
      ) : (
        ""
      )}
      {confirm ? (
        <ConfirmationModal
          handleClick={() => handleDelete()}
          closeIt={() => setConfirm("")}
        />
      ) : (
        ""
      )}
      <header className="aaqm-header">
        <h5>FAQ</h5>
        <button onClick={() => setModal(true)}>Add</button>
      </header>
      <section className="aaqm-body">
        {currentList.map((obj) => (
          <div className="qna-card">
            <button onClick={() => setConfirm(obj._id)} className="delete">
              <img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/50/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png" />
            </button>
            <h5>Q.{obj.question}</h5>

            <p>A.{obj.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
