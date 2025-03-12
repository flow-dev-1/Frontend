import React from "react";
import QuestionBox from "../../../../components/QuestionBox";
import ColoredSmallSquaredTextBox from "../../../../components/ColoredSmallSquaredTextBox";

function MultiLineColoredSmallTextBox({ data, answers, setAnswers, setErrorMessage }) {
  const { step, title, info } = data;

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
            [index]: value, // Update specific index with the new value
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
      <div className="d-flex gap-2">
        <h2 className="text-blue">Question: </h2>
        <h2 className="text-gray">{title}</h2>
      </div>

      {/* Use CSS Grid to ensure 3 columns per row */}
      <div
        className="d-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // Ensures 3 columns per row
          gap: "20px", // Adds spacing between elements
          justifyContent: "center",
        }}
      >
        {info.map((field, index) => (
          <div key={index} className="d-flex flex-column align-items-center">
            <div
              className="mt-2 d-flex justify-content-center align-items-center p-2"
              style={{
                borderRadius: "40%",
                backgroundColor: field.colorCode,
                color: "black",
                fontWeight: "bold",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              {field.number}
            </div>

            <ColoredSmallSquaredTextBox
              color={field.colorCode}
              value={answers.find(answer => answer.stepId === step)?.value?.[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    </QuestionBox>
  );
}

export default MultiLineColoredSmallTextBox;
