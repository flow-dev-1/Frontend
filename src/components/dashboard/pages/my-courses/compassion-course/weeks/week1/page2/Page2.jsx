import React from "react";
import QuestionBox from "../../../components/QuestionBox";
import compassion from "../../../../../../../../assets/compassion.png";
import BigTextBox from "../../../components/BigTextBox";
import Button from "../../../components/Button";
import getPageContent from "../../data";

function Page2() {
  const currentWeek = 1;
  const currentPage = 2;
  const pageData = getPageContent(currentWeek, currentPage);

  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-2 ms-5">
          <h2 className="text-blue font-lg ">Question: </h2>
          <h2 className="text-gray font-lg">
            {pageData.question}{" "}
            {pageData.hasImage && <img src={compassion} alt="compassion" />} ?
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

export default Page2;
