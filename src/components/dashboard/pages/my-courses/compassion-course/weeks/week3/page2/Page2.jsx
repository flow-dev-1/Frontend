import React from "react";
import QuestionBox from "../../../components/QuestionBox";
import selfCompassion from "../../../../../../../../assets/self-compassion.png";
import BigTextBox from "../../../components/BigTextBox";
import Button from "../../../components/Button";

function WeekThreePage2() {
  return (
    <>
      <QuestionBox>
        <div className="d-flex align-items-center gap-2 ms-5">
          <h2 className="text-blue font-lg">Question: </h2>
          <h2 className="text-gray font-lg">
           Do you remember what{" "}
            <img src={selfCompassion} alt="self-compassion" /> is ?
          </h2>
        </div>
        <BigTextBox />
      </QuestionBox>
      <div className="d-flex justify-content-center gap-4 mt-4">
        <Button text={"Prev"} />
        <Button text={"Next"} />
      </div>
    </>
  );
}

export default WeekThreePage2;
