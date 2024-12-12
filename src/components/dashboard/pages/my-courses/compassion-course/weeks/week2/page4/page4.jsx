import React from "react";
import "./page4.css";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import getPageContent from "../../data";

function WeekTwoPage4() {
  const currentWeek = 2;
  const currentPage = 4;
  const pageData = getPageContent(currentWeek, currentPage);

  return (
    <>
      <QuestionBox>
        <h2 className="text-center text-blue fs-1">{pageData.title}</h2>
        <div className="letter-container">
          <div className="letter-info">
            {pageData.instructions.map((instruction, index) => (
              <h3 key={index} className="fs-2 mb-2">
                {instruction}
              </h3>
            ))}
          </div>
          <div className="letter-content">
            <label className="w-100 p-5 border-0">
              <textarea
                className="border-0 w-100 bg-transparent border-outline-0 no-scrollbar pt-3 px-3 resize-none"
                cols={pageData.textareaConfig.cols}
                rows={pageData.textareaConfig.rows}
                placeholder={pageData.textareaConfig.placeholder}
                style={{
                  maxWidth: pageData.textareaConfig.styles.maxWidth,
                  fontSize: pageData.textareaConfig.styles.fontSize,
                }}
              ></textarea>
            </label>
          </div>
        </div>
      </QuestionBox>
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        {pageData.navigation.prev && <Button text={"Prev"} />}
        {pageData.navigation.next && <Button text={"Next"} />}
      </div>
    </>
  );
}

export default WeekTwoPage4;
