import React from "react";
import QuestionBox from "../../../../components/QuestionBox";
import BigTextBox from "../../../../components/BigTextBox";
import emotionalRegulation from "../../../../../../../../../assets/emotional-regulation-images/emotionalRegulation.png";

function FrameTextBox({ step, answer, setAnswer, setErrorMessage }) {
  const handleChange = (e) => {
    setErrorMessage("");
    setAnswer(e.target.value);
  };

  return (
    <QuestionBox>
      <div className="d-flex gap-3 flex-column flex-md-row flex-md-nowrap align-items-center">
        <h2 className="text-blue fs-1 mb-0 flex-shrink-0 question-text">
          Question:
        </h2>

        <div className="d-flex align-items-center flex-grow-1 min-w-0">
          <h2 className="text-gray fs-1 mb-0 flex-grow-1 md:text-truncate">
            {step.question}
            {step.hasImage && (
              <>
                <img
                  src={emotionalRegulation}
                  alt="Question Visual"
                  className="ms-2 d-none d-md-inline-block question-image resilience-question-image img-fluid"
                />
                <h2 className="ms-1 d-none d-md-inline-block text-gray fs-1 mb-0">
                  {step.continuation}
                </h2>

                <span className="d-inline-block d-md-none">
                  <img
                    src={emotionalRegulation}
                    alt="Question Visual"
                    className="ms-2 mt-2 align-middle question-image resilience-question-image img-fluid"
                  />
                  <span className="ms-1">{step.continuation}</span>
                </span>
              </>
            )}

            {!step.hasImage && <span className="ms-1">?</span>}
          </h2>
        </div>
      </div>

      <BigTextBox handleChange={handleChange} value={answer} />
    </QuestionBox>
  );
}

export default FrameTextBox;
