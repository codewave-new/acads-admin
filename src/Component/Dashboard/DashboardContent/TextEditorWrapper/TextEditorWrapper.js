import React from "react";
import ReactQuill from "react-quill";
import {
  getPrivacyPolicy,
  getTermsAndCondition,
} from "../../../../Services/getAPI";
import {
  createTestimonial,
  createTAndC,
  createPrivacyPolicy,
  createFAQ,
} from "../../../../Services/postAPI";
import { MainContext } from "../../../Context/MainContext";
import "./text-editor-wrapper.style.scss";
export default function TextEditorWrapper({ type, title }) {
  const context = React.useContext(MainContext);
  const { userType } = context;
  const [details, setDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    let res;
    switch (type) {
      case "privacy":
        res = await createPrivacyPolicy({ policy_id: 1, data: details });
        break;
      case "tc":
        res = await createTAndC({ data: details });
        break;
      default:
        break;
    }
    if (res.data.statusCode === 200) {
      alert("added");
    } else {
      alert("Failed");
    }
    setLoading(false);
  };
  const setUpPrivacyContent = async () => {
    let res = await getPrivacyPolicy();
    if (res.data.data) {
      setDetails(res.data?.data?.[0]?.data || "");
    } else {
      setDetails("");
    }
  };
  const setUpTermsCondition = async () => {
    let res = await getTermsAndCondition();
    if (res.data.data) {
      setDetails(res.data?.data?.[0]?.data || "");
    } else {
      setDetails("");
    }
  };

  React.useEffect(() => {
    switch (type) {
      case "privacy":
        setUpPrivacyContent();
        break;
      case "tc":
        setUpTermsCondition();

      default:
        break;
    }
  }, []);

  return userType === "recruiter" ? (
    <div className="jobs-list-wrapper">
      <h1>No Access</h1>
    </div>
  ) : (
    <div className="text-editor-main">
      <header className="text-editor-header">
        <h5>{title}</h5>
      </header>
      <section className="text-editor-body">
        <ReactQuill
          value={details}
          onChange={(val) => setDetails(val)}
          modules={mod}
          modules={TextEditorWrapper.modules}
        />
        <div className="submit-wrapper">
          <button
            disabled={!details}
            onClick={() => handleSubmit()}
            className="submit"
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </div>
      </section>
    </div>
  );
}
TextEditorWrapper.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const mod = {
  toolbar: {
    container: "#toolbar",
  },
};
