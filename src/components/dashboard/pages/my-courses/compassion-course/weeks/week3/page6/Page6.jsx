import React from "react";
import { useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import MediumTextBox from "../../../components/MediumTextBox";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";

function WeekThreePage6() {
  const pageData = useSelector(selectPageData);

  return (
    <>
      <QuestionBox>
        <div className="d-flex flex-column gap-3 justify-content-center">
          <div className="d-flex gap-3 mb-3">
            <h2 className="text-blue fs-1">Question:</h2>
            <h2 className="text-gray fs-1">{pageData.question}</h2>
          </div>
          <MediumTextBox />
        </div>
      </QuestionBox>
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </>
  );
}

export default WeekThreePage6;
