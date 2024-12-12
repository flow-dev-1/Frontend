import React from "react";
import "./question.css";

function QuestionBox({ children }) {
  return (
    <div>
      <div className="custom-border-20 px-5 py-5 bg-worksheet question-box-container w-1029px">
        {children}
      </div>
    </div>
  );
}

export default QuestionBox;
