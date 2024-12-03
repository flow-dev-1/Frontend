import React from "react";
import QuestionBox from "../../../components/QuestionBox";
import WordBox from "../../../components/WordBox";
import BigTextBox from "../../../components/BigTextBox";

function Page2() {
  return (
    <QuestionBox>
      <div className="d-flex align-items-center gap-2 ms-5">
        <h2 className="text-blue font-lg">Question: </h2>
        <h2 className="text-gray font-lg">
          What do you understand by the word {<WordBox text={"COMPASSION"} />} ?
        </h2>
      </div>
      <BigTextBox />
    </QuestionBox>
  );
}

export default Page2;
