import React from "react";
import QuestionBox from "../../../../components/QuestionBox";
import CustomDropDown from "./CustomDropDown";

function Frame({ data, answers, setAnswers, setErrorMessage }) {
  const { step, question, dropdownOptions } = data;

  const handleInputChange = (field, value) => {
    setErrorMessage("");
    setAnswers((prevAnswers) => {
      const updated = [...prevAnswers];
      const index = updated.findIndex((item) => item.stepId === step);

      if (index !== -1) {
        updated[index] = {
          ...updated[index],
          value: {
            ...updated[index].value,
            [field]: value,
          },
        };
      } else {
        updated.push({
          stepId: step,
          value: { [field]: value },
        });
      }

      return updated;
    });
  };

  const stepData = answers.find((a) => a.stepId === step)?.value || {};

  return (
    <QuestionBox extraStyle={"bg-step-active"}>
      <div className="p-1 p-md-5">
        <div className="text-center mb-5 mt-4 mt-md-0">
          <h2 className="text-white bg-blue py-2 px-4 fs-2 font-bold rounded-3 d-inline display-4 text-center font-bold">
            Question {step}
          </h2>
        </div>

        <h2 className="text-gray fs-3 fs-md-1 font-bold text-center">
          {question}
        </h2>

        <div className="d-flex gap-2 flex-column flex-md-row justify-content-between">
          <div className="mt-4 w-50">
            <h3 className="text-center text-blue mb-2">Energy Level</h3>
            <CustomDropDown
              value={stepData.energyLevel || ""}
              onChange={(val) => handleInputChange("energyLevel", val)}
              options={dropdownOptions.energyLevel}
            />
          </div>

          <div className="mt-4 w-50">
            <h3 className="text-center text-blue mb-2">Zone of Regulation</h3>
            <CustomDropDown
              value={stepData.zone || ""}
              onChange={(val) => handleInputChange("zone", val)}
              options={dropdownOptions.zoneOfRegulation}
            />
          </div>
        </div>
      </div>
    </QuestionBox>
  );
}

export default Frame;
