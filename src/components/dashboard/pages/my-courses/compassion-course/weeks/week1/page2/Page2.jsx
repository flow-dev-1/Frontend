import React from "react";
import QuestionBox from "../../../components/QuestionBox";
import compassion from "../../../../../../../../assets/compassion.png";
import BigTextBox from "../../../components/BigTextBox";
import Button from "../../../components/Button";

function Page2() {
  return (
    <>
      <QuestionBox>
        <div className="d-flex align-items-center gap-2 ms-5">
          <h2 className="text-blue font-lg">Question: </h2>
          <h2 className="text-gray font-lg">
            What do you understand by the{" "}
            <img src={compassion} alt="compassion" /> ?
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

export default Page2;
