import React from "react";
import "./question.css";

export default function QuestionBox({ children }) {
  // console.log("Full screen width:", screen.width);
  // console.log("Full screen height:", screen.height);
  return (
    <div className="custom-border-20 bg-worksheet resilience-question-box-container">
      {children}
    </div>
  );
}
