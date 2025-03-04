import React, { useState } from "react";
import QuestionBox from "../../../../components/QuestionBox";
import SmallTextBox from "../../../../components/SmallTextBox";
import ColoredSmallSquaredTextBox from "../../../../components/ColoredSmallSquaredTextBox";
import ColoredSmallCircledTextBox from "../../../../components/ColoredSmallCircledTextBox";

function Frame({ data, answers, setAnswers, setErrorMessage }) {
  const { step, title, questions } = data;

  const handleInputChange = (index, value) => {
    setErrorMessage("");
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const stepIndex = updatedAnswers.findIndex((answer) => answer.stepId === step);

      if (stepIndex !== -1) {
        updatedAnswers[stepIndex] = {
          ...updatedAnswers[stepIndex],
          value: {
            ...updatedAnswers[stepIndex].value,
            [index]: value,
          },
        };
      } else {
        updatedAnswers.push({
          stepId: step,
          value: {
            [index]: value,
          },
        });
      }

      return updatedAnswers;
    });
  };

  return (
    <QuestionBox>
      <h2 className="text-blue text-center fs-1">Situation: {title}</h2>

      {questions.map((q, index) => (
        <div key={index} className="mb-2">
          {q.type === "smallText" ? (
            <>
              <h2 className="text-gray">{q.question}</h2>
              <SmallTextBox
                value={answers.find(answer => answer.stepId === step)?.value?.[index] || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </>
          ) : q.type === "circle" ? (
            <div className="d-flex flex-column align-items-center">
              <ColoredSmallCircledTextBox
                color={q.colorCode}
                value={answers.find(answer => answer.stepId === step)?.value?.[index] || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <h2 className="text-gray">{q.question}</h2>
            </div>
          ) : q.type === "square" ? (
            <div className="d-flex flex-column align-items-center">
              <ColoredSmallSquaredTextBox
                color={q.colorCode}
                value={answers.find(answer => answer.stepId === step)?.value?.[index] || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <h2 className="text-gray">{q.question}</h2>
            </div>
          ) : null}
        </div>
      ))}
    </QuestionBox>
  );
}

export default Frame;
