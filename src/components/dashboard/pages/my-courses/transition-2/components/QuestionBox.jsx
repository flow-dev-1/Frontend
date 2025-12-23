import React from "react";
import "./question.css";

export default function QuestionBox({ children, extraMobileStyle }) {
  // console.log("Full screen width:", screen.width);
  // console.log("Full screen height:", screen.height);

  console.log(extraMobileStyle, "extraMobileStyle in QuestionBox");
  return (
    <div className={`custom-border-20 bg-worksheet resilience-question-box-container ${extraMobileStyle}`}>
      {children}
    </div>
  );
}
