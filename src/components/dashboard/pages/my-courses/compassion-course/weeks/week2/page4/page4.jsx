import React from "react";
import "./page4.css";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";

function WeekTwoPage4() {
  return (
    <>
      <QuestionBox>
        <h2 className="text-center text-blue fs-1">
          Write a letter to yourself.
        </h2>
        <div className="letter-container">
          <div className="letter-info">
            <h3 className="fs-2 mb-2">
              Remember a time you made a mistake and judged yourself without
              empathy.
            </h3>
            <h3 className="fs-2">
              Write a letter showing empathy and encouragement for yourself.
            </h3>
          </div>
          <div className="letter-content">
            {" "}
            <label className=" w-100 p-5 border-0">
              <textarea
                className=" border-0 w-100 bg-transparent border-outline-0 no-scrollbar pt-3 px-3 resize-none"
                cols={80}
                rows={5}
                placeholder="Type your answer here..."
                style={{
                  maxWidth: "100%",
                  fontSize: "25px",
                }}
              ></textarea>
            </label>
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

export default WeekTwoPage4;
