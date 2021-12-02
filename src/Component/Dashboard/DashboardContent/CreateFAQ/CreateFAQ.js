import React from "react";
import nextId from "react-id-generator";
import { createFAQ } from "../../../../Services/postAPI";
import Dropdown from "../../../Common/Dropdown/Dropdown";
import { MainContext } from "../../../Context/MainContext";
import "./create-faq.style.scss";
export default function CreateFAQ({ closeIt, update }) {
  const context = React.useContext(MainContext);
  const { userType } = context;
  const [loading, setLoading] = React.useState(false);
  const [details, setDetails] = React.useState({
    question: "",
    answer: "",
    faq_type: "",
  });
  const handleSubmit = async () => {
    if ( !details.faq_type) {
      alert("incomplete");
      return;
    }
    setLoading(true);
    let res = await createFAQ(details);
    if (res.data.statusCode === 200) {
      update();
      alert("Added");
      closeIt();
      setDetails({
        question: "",
        answer: "",
        faq_type: "",
      });
    } else {
      alert("Failed");
      closeIt();
      setDetails({
        question: "",
        answer: "",
        faq_type: "",
      });
    }
    setLoading(false);
    closeIt();
  };
  return userType === "recruiter" ? (
    <div className="jobs-list-wrapper">
      <h1>No Access</h1>
    </div>
  ) : (
    <div className="create-faq-main">
      <header className="create-faq-header">
        <h5>FAQ</h5>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="create-faq-body"
      >
        <div className="input-wrapper">
          <p>Question</p>
          <div className="input-section">
            <input
              required
              value={details.question}
              onChange={(e) =>
                setDetails({ ...details, question: e.target.value })
              }
            />
          </div>
        </div>
        <div className="input-wrapper">
          <p>Answer</p>
          <div className="input-section">
            <input
              required
              value={details.answer}
              onChange={(e) =>
                setDetails({ ...details, answer: e.target.value })
              }
            />
          </div>
        </div>
        <div className="input-wrapper">
          <p>FAQ Type</p>
          <Dropdown
            list={type}
            changeSelected={(obj) =>
              setDetails({ ...details, faq_type: obj.id })
            }
          />
        </div>
        <button onClick={() => handleSubmit()}>
          {loading ? "Submitting...." : "Submit"}
        </button>
      </form>
    </div>
  );
}

const type = [
  { _id: nextId(), name: "Candidate", id: "candidate" },
  { _id: nextId(), name: "Institution", id: "institution" },
];
