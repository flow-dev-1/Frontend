import React from "react";
import "./page8.css";
import { useSelector } from "react-redux";
import Button from "../../../components/Button";
import QuestionBox from "../../../components/QuestionBox";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";

function WeekThreePage8() {
  const pageData = useSelector(selectPageData);

  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-3 mb-3">
          <h2 className="text-blue fs-1">Question:</h2>
          <h2 className="text-gray fs-1">{pageData.question}</h2>
        </div>

        <div className="input-container py-5 px-5">
          {[...Array(pageData.numberOfInputs || 5)].map((_, index) => (
            <div key={index}>
              <div className="d-flex gap-3 label-input-container">
                <p className="input-label">{index + 1}.</p>
                <input
                  type="text"
                  placeholder={
                    pageData.inputPlaceholder || "Type your answer here"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </QuestionBox>

      <div className="d-flex justify-content-center gap-96px mt-4">
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </>
  );
}

export default WeekThreePage8;
