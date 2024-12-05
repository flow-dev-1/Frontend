import React from "react";
import QuestionBox from "../../../components/QuestionBox";
import BigTextBox from "../../../components/BigTextBox";
import WordBox from "../../../components/WordBox";
import Button from "../../../components/Button";

function Page4() {
  return (
    <>
      <QuestionBox>
        <div className="d-flex align-items-center gap-2 ms-5">
          <h2 className="text-blue font-lg">Question: </h2>
          <h2 className="text-gray font-lg">
            What do you understand by the word {<WordBox text={"THEORY"} />} ?
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

export default Page4;
