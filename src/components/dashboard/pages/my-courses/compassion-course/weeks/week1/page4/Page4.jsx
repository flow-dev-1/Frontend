import React from "react";
import { useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import BigTextBox from "../../../components/BigTextBox";
import theory from "../../../../../../../../assets/theory.png";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";

function Page4() {
  const pageData = useSelector(selectPageData);

  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-2 ms-5 align-items-center">
          <h2 className="text-blue font-lg">Question: </h2>
          <h2 className="text-gray font-lg">
            {pageData.question}{" "}
            {pageData.hasImage && <img src={theory} alt="theory" />} ?
          </h2>
        </div>
        <BigTextBox />
      </QuestionBox>
      <div className="d-flex justify-content-center gap-96px mt-4">
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </>
  );
}

export default Page4;
