import QuestionBox from "../../../../components/QuestionBox";
import Button from "../../../../components/Button";
import checkedImage from "../../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../../assets/uncheckedBox.png";
import { useState } from "react";
import getPageContent from "../../../data";

function ScenariosThree() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  // Get the first scenario from Week 5, Page 2
  const currentWeek = 5;
  const currentPage = 2;
  const pageData = getPageContent(currentWeek, currentPage);
  const scenarioData = pageData.scenarios[2]; // Third scenario

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <form className="d-flex gap-3">
              <h2 className="text-blue fs-1">Scenario 1: </h2>
              <div className="">
                <h3 className="fs-1">{scenarioData.question}</h3>
                {scenarioData.options.map((option, index) => {
                  const optionKey = Object.keys(option)[0];
                  const optionText = option.text;
                  const optionID = option.id;
                  const isChecked = selectedOption === optionID;

                  return (
                    <div
                      key={index}
                      className="ms-5 d-flex gap-2 mb-3 align-items-center"
                    >
                      <input
                        type="radio"
                        id={optionKey}
                        name="options"
                        value={optionKey}
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
                        htmlFor={optionKey}
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
      case 2:
        return (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <h3 className="fs-1 text-center">
              {scenarioData.feedback.A}
            </h3>
          </div>
        );
      case 3:
        return (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <h3 className="fs-1 text-center">
              {scenarioData.feedback.B}
            </h3>
          </div>
        );
      case 4:
        return (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <h3 className="fs-1 text-center">
              {scenarioData.feedback.C}
            </h3>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <QuestionBox>{renderStep()}</QuestionBox>
    </>
  );
}

export default ScenariosThree;
