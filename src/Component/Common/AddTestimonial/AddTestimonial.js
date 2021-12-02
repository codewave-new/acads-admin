import React from "react";
import ReactDOM from "react-dom";
import Testimonial from "../../Dashboard/DashboardContent/Testimonial/Testimonial";
import "./add-testimonial.style.scss";
export default function AddTestimonial({ closeIt, setUpCurrentList }) {
  return ReactDOM.createPortal(
    <div onClick={() => closeIt()} className="add-testimonial-modal-wrapper">
      <div
        onClick={(e) => e.stopPropagation()}
        className="add-testimonial-modal"
      >
        <Testimonial setUpCurrentList={setUpCurrentList} />
      </div>
    </div>,
    document.body
  );
}
