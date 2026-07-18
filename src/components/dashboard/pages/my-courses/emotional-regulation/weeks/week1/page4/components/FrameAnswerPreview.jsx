import React from "react";
import QuestionBox from "../../../../components/QuestionBox";

function FrameAnswerPreview({ answer }) {
  return (
    <QuestionBox>
      <div className="d-flex gap-3 flex-column flex-md-row flex-md-nowrap ">
        <h2 className="text-blue fs-1 mb-0 flex-shrink-0 question-text">
          Answer:
        </h2>

        <div className="">
          <h2 className="text-gray fs-1 mb-0 flex-grow-1 md:text-truncate mb-5">
            Thank you for trying
          </h2>
          <h2 className="text-gray fs-1 mb-0 flex-grow-1 md:text-truncate">
            {answer}
          </h2>
        </div>
      </div>
    </QuestionBox>
  );
}

export default FrameAnswerPreview;
