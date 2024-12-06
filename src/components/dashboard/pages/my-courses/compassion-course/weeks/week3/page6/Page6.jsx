import React from "react";
import QuestionBox from "../../../components/QuestionBox";
import MediumTextBox from "../../../components/MediumTextBox";
import Button from "../../../components/Button";

function WeekThreePage6() {
  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-3 mb-3">
          <h2 className="text-blue fs-1">Question:</h2>
          <h2 className="text-gray fs-1">
            Think about a time when someone helped you when you were feeling
            down. How did it make you feel?
          </h2>
        </div>
        <MediumTextBox />
      </QuestionBox>
      <div className="d-flex justify-content-center gap-4 mt-4">
        <Button text={"Prev"} />
        <Button text={"Next"} />
      </div>
    </>
  );
}

export default WeekThreePage6;
