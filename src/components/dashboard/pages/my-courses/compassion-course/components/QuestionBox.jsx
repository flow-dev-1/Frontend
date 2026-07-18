import React from "react";
import "./question.css";

function QuestionBox({ children }) {
  return (
    <div className="custom-border-20 p-2 px-md-5 py-md-5 bg-worksheet question-box-container h-450px">
      {children}
    </div>
  );
}

export default QuestionBox;
