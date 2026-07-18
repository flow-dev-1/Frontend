import React from "react";
import QuestionBox from "../../../../components/QuestionBox";
import "./ListQuestionFrame.css";

function ListQuestionFrame({ data, answers, setAnswers, setErrorMessage }) {
  const { stepId, question, numberOfInputs } = data;

  // console.log(stepId, question, numberOfInputs, "data")

  const handleInputChange = (index, value) => {
    setErrorMessage("");
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const pageIndex = updatedAnswers.findIndex(
        (answer) => answer.stepId === stepId
      );

      if (pageIndex !== -1) {
        updatedAnswers[pageIndex] = {
          ...updatedAnswers[pageIndex],
          value: {
            ...updatedAnswers[pageIndex].value,
            [index]: value,
          },
        };
      } else {
        updatedAnswers.push({
          stepId: stepId,
          value: { [index]: value },
        });
      }
      return updatedAnswers;
    });
  };

  return (
    <QuestionBox>
      <div className="d-flex gap-2 flex-column flex-md-row">
        <h2 className="text-blue fs-1">Question: </h2>
        <h2 className="text-gray fs-1">{question}</h2>
      </div>

      <div className="week7-list-input-container">
        {[...Array(numberOfInputs || 5)].map((_, index) => (
          <div key={index} className="week7-list-input-row">
            <p className="week7-list-input-label">{index + 1}.</p>
            <input
              className="week7-list-input"
              type="text"
              placeholder={"Type your answer here"}
              value={
                answers.find((answer) => answer.stepId === stepId)?.value?.[
                  index
                ] || ""
              }
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    </QuestionBox>
  );
}

export default ListQuestionFrame;
