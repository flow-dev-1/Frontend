import React from "react";
import QuestionBox from "../../../components/QuestionBox";
import MediumTextBox from "../../../components/MediumTextBox";
import Button from "../../../components/Button";
import getPageContent from "../../data";

function WeekThreePage6() {
  const currentWeek = 3;
  const currentPage = 6;
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

export default WeekThreePage6;
