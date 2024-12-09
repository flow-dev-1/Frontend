import React from "react";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import MediumTextBox from "../../../components/MediumTextBox";

function WeekFourPage2() {
  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-3 mb-3">
          <h2 className="text-blue fs-1">Question:</h2>
          <h2 className="text-gray fs-1">
            If a stranger you never knew walked up to you and asked you to share
            your lunch with them because they were hungry. What would you do?
            Would you  share your food with them to show compassion?
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

export default WeekFourPage2;
