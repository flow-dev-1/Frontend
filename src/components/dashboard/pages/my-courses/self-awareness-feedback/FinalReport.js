import React, { useState } from "react";
import "./FinalReport.css";

const FinalReport = ({ rate }) => {

  const [expanded, setExpanded] = useState(false);

  const toggleWeek = () => {
    setExpanded(!expanded);
  };

  // Function to determine the report message based on the rate
  const getReportMessage = (rate) => {
    if (rate >= 90) {
      return "Excellent job! You've demonstrated outstanding performance and dedication.";
    } else if (rate >= 70) {
      return "Good work! You're performing well, but there is room for improvement.";
    } else if (rate >= 50) {
      return "Satisfactory performance. Consider focusing on areas that need improvement.";
    } else if (rate >= 30) {
      return "Needs improvement. Review your goals and strategies to enhance performance.";
    } else {
      return "Poor performance. Significant changes and focus are needed to improve.";
    }
  };

  return (
    <div className="final-report">
      <div>
        <h4 style={{ fontSize: "20px", color: "#fff" }}>Weekly Report</h4>
        <h1 className="icon-box">{rate}%</h1>
      </div>

      <div className="text-box">
        <br />
        {getReportMessage(rate)}
      </div>
    </div>
  );
};

export default FinalReport;
