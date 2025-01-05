import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import QuestionBox from "../../../components/QuestionBox";
import StepIndicator from "../../../components/StepIndicator";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import { userAnswer, saveActivity } from "../../../../../../../../redux/reducers/userAnswersReducer";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../assets/uncheckedBox.png";

function WeekFivePage2() {
  const pageData = useSelector(selectPageData);
  const totalSteps = pageData?.scenarios?.length || 0;
  const [selectedOption, setSelectedOption] = useState(null);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const [errorMessage, setErrorMessage] = useState("");

  const currentStep = useSelector(selectCurrentStep);

  const handleOptionChange = (e) => {
    setErrorMessage("")
    setSelectedOption(e.target.value);
  };

  const renderStep = () => {
    // console.log(pageData,"Page data")
    const scenario = pageData?.scenarios[currentStep - 1];

    if (!scenario) return null;

    switch (scenario.type) {
      case "question":

        return (
          <div>
            <form className="d-flex gap-3">
              <h2 className="text-blue fs-1">{scenario.title}: </h2>
              <div className="">
                <h3 className="fs-1">{scenario.question}</h3>
                {scenario.options.map((option, index) => {
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
      case "feedback":
        const feedbackMessage = scenario.feedback[selectedOption] || "Please make sure to select an option.";
        return (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <h3 className="fs-1 text-center">{feedbackMessage}</h3>
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

      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </>
  );
}

export default WeekFivePage2;
