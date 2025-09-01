import React from "react";
import QuestionBox from "../../../../components/QuestionBox";
import ColoredTextField from "../../../../components/ColoredTextField";
import "../page10.css"
function MultiLineColoredSmallTextBox({
  data,
  answers,
  setAnswers,
  setErrorMessage,
}) {
  const { step, title, info } = data;

  const handleInputChange = (index, value) => {

    setErrorMessage("");
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const stepIndex = updatedAnswers.findIndex(
        (answer) => answer.stepId === step
      );

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
      <div className="container resilience-multi-colored-small-text-box mt-5">
        <div className="row justify-content-between align-items-start g-4">
          {info?.map((field, index) => (
            <div
              key={index}
              className="col-12 col-md-6 d-flex flex-column mb-3"
              style={{ gap: "15px" }}
            >
              {/* Label */}
              <h2
                className="d-flex justify-content-center align-items-center p-3 text-nowrap label-box"
                style={{
                  borderRadius: "2em",
                  backgroundColor: field.colorCode,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "clamp(18px, 2vw, 32px)",   // ✅ scales with screen size
                  textAlign: "center",
                  minHeight: "60px",
                  margin: index === 0 ? "0 4vw 0 2vw" : "0 2vw 0 4vw", // ✅ use %/vw instead of px
                }}
              >
                {field.number}
              </h2>

              {/* Expanding Textarea */}
              <div className={`flex-grow-1 d-flex ${index == 0 ? "me-5" : "ms-5"}`}>
                <ColoredTextField
                  index={index}
                  color={field.textFieldColor}
                  value={
                    answers.find((answer) => answer.stepId === step)?.value?.[index] || ""
                  }
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </QuestionBox>

  );
}

export default MultiLineColoredSmallTextBox;
