import React from "react";
import QuestionBox from "../../../../components/QuestionBox";
import MediumTextBox from "../../../../components/MediumTextBox";

function Frame({ data, answers, setAnswers, setErrorMessage }) {
  const { step, info } = data;
  const fieldCount = info.fieldCount || 1; // Default to 1 if not provided

  const handleInputChange = (index, value) => {
    setErrorMessage("");
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const pageIndex = updatedAnswers.findIndex((answer) => answer.stepId === step);
      console.log(`Before update: ${JSON.stringify(updatedAnswers)}`);
      
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
          stepId: step,
          value: { [index]: value },
        });
      }
      console.log(`After update: ${JSON.stringify(updatedAnswers)}`);
      return updatedAnswers;
    });
  };

  return (
    <QuestionBox>
      <div className="d-flex gap-2">
        <h2 className="text-blue">Question: </h2>
        <h2 className="text-gray">{info.question}</h2>
      </div>
      <div className="d-flex flex-column gap-3 justify-content-center">
        {[...Array(fieldCount)].map((_, index) => (
          <MediumTextBox
            key={index}
            value={answers.find((answer) => answer.stepId === step)?.value?.[index] || ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
    </QuestionBox>
  );
}

export default Frame;
