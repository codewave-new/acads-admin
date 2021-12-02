import React from "react";
import CreateFAQ from "../../Dashboard/DashboardContent/CreateFAQ/CreateFAQ";
import "./add-faq.style.scss";
export default function AddFAQ({ closeIt , update}) {
  return (
    <div onClick={() => closeIt()} className="add-faq-main">
      <div onClick={(e) => e.stopPropagation()} className="add-faq-modal">
        <CreateFAQ update={update} closeIt={closeIt} />
      </div>
    </div>
  );
}
