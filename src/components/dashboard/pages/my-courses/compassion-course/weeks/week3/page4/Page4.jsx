import React, { useState } from "react";
import { useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import { selectCurrentStep, selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";
import StepIndicator from "../../../components/StepIndicator";


function WeekThreePage4() {
  const currentStep = useSelector(selectCurrentStep);
  const pageData = useSelector(selectPageData);
   const totalSteps = pageData?.steps?.length || 0;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderStep = () => {
    const scenario = pageData?.steps[currentStep - 1];

    if (!scenario) return null;

    switch (scenario.type) {
      case "question":
        return (
          <div className="">
            <form className="d-flex gap-3">
              <h2 className="text-blue fs-1">Question: </h2>
              <div className="">
                <h3 className="fs-1">{scenario.question}</h3>
                {scenario.options.map((option, index) => {
                  const optionKey = Object.keys(option);
                  const optionID = option[optionKey[0]];
                  const optionText = option[optionKey[1]];
                  const isChecked = selectedOption === optionID;

                  return (
                    <div
                      key={index}
                      className="ms-5 d-flex gap-2 mb-3 align-items-center"
                    >
                      <input
                        type="radio"
                        id={optionID}
                        name="optionID"
                        value={optionID}
                        checked={isChecked}
                        onChange={handleOptionChange}
                        style={{ display: "none" }}
                      />
                      <img
                        src={isChecked ? checkedImage : uncheckedImage}
                        alt={optionKey}
                        style={{ width: 20, height: 20, cursor: "pointer" }}
                        onClick={() => setSelectedOption(optionID)}
                      />
                      <label
                        htmlFor={optionID}
                      >{`${optionID}. ${optionText}`}</label>
                    </div>
                  );
                })}
              </div>
            </form>

            <p>
              Selected Option for testing purpose:{" "}
              {selectedOption ? selectedOption : "None"}
            </p>
          </div>
        );
      case "feedback":
        return (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <h3 className="fs-1 text-center">{scenario.message}</h3>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <QuestionBox>{renderStep()}</QuestionBox>

      <StepIndicator totalSteps={totalSteps} />

      <div className="d-flex justify-content-center gap-96px mt-4 ">
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </>
  );
}

export default WeekThreePage4;
