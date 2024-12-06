import React from "react";
import "./page8.css";
import Button from "../../../components/Button";
import QuestionBox from "../../../components/QuestionBox";

function WeekThreePage8() {
  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-3 mb-3">
          <h2 className="text-blue fs-1">Question:</h2>
          <h2 className="text-gray fs-1">
            List five (5) other ways you think compassion can be shown to
            others.
          </h2>
        </div>

        <div className="input-container py-5 px-5">
          <div>
            <div className="d-flex gap-3 label-input-container">
              <p className="input-label">1.</p>
              <input type="text" placeholder="Type your answer here" />
            </div>
          </div>
          <div>
            <div className="d-flex gap-3 label-input-container">
              <p className="input-label">2.</p>
              <input type="text" placeholder="Type your answer here" />
            </div>
          </div>
          <div>
            <div className="d-flex gap-3 label-input-container">
              <p className="input-label">3.</p>
              <input type="text" placeholder="Type your answer here" />
            </div>
          </div>
          <div>
            <div className="d-flex gap-3 label-input-container">
              <p className="input-label">4.</p>
              <input type="text" placeholder="Type your answer here" />
            </div>
          </div>
          <div>
            <div className="d-flex gap-3 label-input-container">
              <p className="input-label">5.</p>
              <input type="text" placeholder="Type your answer here" />
            </div>
          </div>
        </div>
      </QuestionBox>

      <div className="d-flex justify-content-center gap-4 mt-4">
        <Button text={"Prev"} />
        <Button text={"Next"} />
      </div>
    </>
  );
}

export default WeekThreePage8;
