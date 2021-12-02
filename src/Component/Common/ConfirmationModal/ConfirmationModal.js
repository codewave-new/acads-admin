import React from "react";
import ReactDOM from "react-dom";
import "./confirmation-modal.style.scss";
export default function ConfirmationModal({
  message = "Are you sure?",
  closeIt,
  handleClick,
}) {
  return ReactDOM.createPortal(
    <div onClick={() => closeIt()} className="confirmation-modal-main">
      <div onClick={(e) => e.stopPropagation()} className="confirmation-modal">
        <h5>{message}</h5>
        <div>
          <button onClick={() => handleClick(true)}>Yes</button>
          <button onClick={() => closeIt()}>No </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
