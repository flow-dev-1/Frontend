import React from "react";
import QuestionBox from "../../../components/QuestionBox";
import selfCompassion from "../../../../../../../../assets/self-compassion.png";
import BigTextBox from "../../../components/BigTextBox";
import Button from "../../../components/Button";
import getPageContent from "../../data";

function WeekThreePage2() {
  const currentWeek = 3;
  const currentPage = 2;
  const pageData = getPageContent(currentWeek, currentPage);

  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-2 ms-5">
          <h2 className="text-blue font-lg">Question: </h2>
          <h2 className="text-gray font-lg">
            {pageData.question}{" "}
            {pageData.hasImage && (
              <img src={selfCompassion} alt="self-compassion" />
            )}{" "}
            ?
          </h2>
        </div>
        <BigTextBox />
      </QuestionBox>
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        {pageData.navigation.prev && <Button text={"Prev"} />}
        {pageData.navigation.next && <Button text={"Next"} />}
      </div>
    </>
  );
}

export default WeekThreePage2;
