import React from "react";
import QuestionBox from "../../../../components/QuestionBox";
import BigTextBox from "../../../../components/BigTextBox";

function QuestionFrame({ data, answers, setAnswers, setErrorMessage }) {
  const { stepId, scenarioNumber, questionNumber, question } = data;

  const handleInputChange = (value) => {
    setErrorMessage("");

    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const stepIndex = updatedAnswers.findIndex(
        (answer) => answer.stepId === stepId
      );

      if (stepIndex !== -1) {
        updatedAnswers[stepIndex] = {
          ...updatedAnswers[stepIndex],
          stepId: stepId,
          scenarioNumber,
          questionNumber,
          type: "question",
          value,
        };
      } else {
        updatedAnswers.push({
          stepId: stepId,
          scenarioNumber,
          questionNumber,
          type: "question",
          value,
        });
      }

      return updatedAnswers;
    });
  };

  return (
    <QuestionBox extraStyle="bg-custom-blue">
      <div className="p-1 p-md-5">
        {/* <div className="text-center mb-4 mt-4 mt-md-0">
          <h2 className="text-white bg-blue py-2 px-4 fs-2 font-bold rounded-3 d-inline display-4 text-center tot-week-2-question-text">
            Scenario {scenarioNumber} - Question {questionNumber}
          </h2>
        </div> */}

        <div className="d-flex gap-2 flex-column flex-md-row mb-4 mt-5">
          <h2 className="text-gray fs-5 fs-md-1 tot-week-2-question-text">
            <span className="text-blue fw-bold">Prompt: </span> {question}
          </h2>
        </div>

        <BigTextBox
          value={
            answers.find((answer) => answer.stepId === stepId)?.value || ""
          }
          handleChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
    </QuestionBox>
  );
}

export default QuestionFrame;
