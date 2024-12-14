import React from "react";
import { useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import selfCompassion from "../../../../../../../../assets/self-compassion.png";
import BigTextBox from "../../../components/BigTextBox";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";

function WeekThreePage2() {
  const pageData = useSelector(selectPageData);

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
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </>
  );
}

export default WeekThreePage2;
