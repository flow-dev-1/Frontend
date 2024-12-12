import React from "react";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import MediumTextBox from "../../../components/MediumTextBox";
import getPageContent from "../../data";

function WeekFourPage2() {
  const currentWeek = 4;
  const currentPage = 2;
  const pageData = getPageContent(currentWeek, currentPage);

  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-3 mb-3">
          <h2 className="text-blue fs-1">Question:</h2>
          <h2 className="text-gray fs-1">{pageData.question}</h2>
        </div>
        <MediumTextBox />
      </QuestionBox>
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        {pageData.navigation.prev && <Button text={"Prev"} />}
        {pageData.navigation.next && <Button text={"Next"} />}
      </div>
    </>
  );
}

export default WeekFourPage2;
