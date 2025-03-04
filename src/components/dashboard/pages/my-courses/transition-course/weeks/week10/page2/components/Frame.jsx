import React, { useState } from "react";
import QuestionBox from "../../../../components/QuestionBox";
import MediumTextBox from "../../../../components/MediumTextBox";
import futureMe from "../../../../../../../../../assets/dearFutureMe.png";

function Frame({ data, answers, setAnswers, setErrorMessage }) {
  const { step, title, questions } = data;

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
      <h2 className="text-blue text-center fs-1">{title}</h2>

      {questions.map((q, index) => {
    
        return (
          <div key={index} className="mb-2">
            <img src={futureMe} alt="Future Me" />

            <div className="d-flex gap-2">
              <h2 className="text-gray">{q.question}</h2>
            </div>
            <MediumTextBox 
              value={answers.find(answer => answer.stepId === step)?.value?.[index] || ""} // Pass the current answer
              onChange={(e) => handleInputChange(index, e.target.value)} // Handle input change
            />
          </div>
        );
      })}
    </QuestionBox>
  );
}

export default Frame;
