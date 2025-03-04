import React from "react";
import QuestionBox from "../../../../components/QuestionBox";

import WhiteStarSmallTextBox from "../../../../components/WhiteStarSmallTextBox";

function SingleWhiteStarFrame({ data, answers, setAnswers, setErrorMessage }) {
  const { step, questions } = data;

  const handleInputChange = (index, value) => {
    setErrorMessage("");
    // Update answers state with the new value
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const stepIndex = updatedAnswers.findIndex((answer) => answer.stepId === step);

      if (stepIndex !== -1) {
        updatedAnswers[stepIndex] = {
          ...updatedAnswers[stepIndex],
          value: {
            ...updatedAnswers[stepIndex].value,
            [index]: value, // Update the specific index with the new value
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

      {questions.map((question, index) => {
        const [key, value] = Object.entries(question)[0]; // extract the key value pair
        return (
          <div key={index} className="mb-2">
            <div className="d-flex gap-2 justify-content-center">
            <h2 className="text-blue">{key}: </h2>
              <h2 className="text-gray">{value}</h2>
            </div>
            <div className="d-flex justify-content-center">
              <WhiteStarSmallTextBox
                value={answers.find(answer => answer.stepId === step)?.value?.[index] || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          </div>
        );
      })}
    </QuestionBox>
  );
}

export default SingleWhiteStarFrame;
