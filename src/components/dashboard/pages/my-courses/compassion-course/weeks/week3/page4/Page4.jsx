import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import {
  selectCurrentStep,
  selectPageData,
} from "../../../../../../../../redux/reducers/navigationSlice";
import StepIndicator from "../../../components/StepIndicator";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";

function WeekThreePage4() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const pageData = useSelector(selectPageData);
  const totalSteps = pageData?.steps?.length || 0;
  const [selectedOption, setSelectedOption] = useState(null);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );
    setSelectedOption(response?.answer ? response.answer : "");
    return () => {};
  }, [userAnswers]);

  const handleOptionChange = (e) => {
    setErrorMessage("");
    setSelectedOption(e.target.value);
  };

  const saveUserInput = () => {
    if (currentStep === 1) return true;
    // if (!adminDatas.isAdmin && !myAnswer) {
    //   setErrorMessage("Oops! Please enter a valid input!");
    //   return false;
    // }

    if (!selectedOption) {
      setErrorMessage("Please make sure to select an option.");
      return false;
    } else if (selectedOption !== "A") {
      setErrorMessage("Please select the right option to proceed.");
      return false;
    } // Clear error if input is valid
    // Allow flow admin to proceed without input but do not dispatch answer
    if (adminDatas.isAdmin) return true;
    dispatch(
      saveActivity({
        page: pageData.id,
        answer: selectedOption,
      })
    );
    return true;
  };

  const renderStep = () => {
    const scenario = pageData?.steps[currentStep - 1];

    if (!scenario) return null;

    switch (scenario.type) {
      case "question":
        return (
          <div className="">
            <form className="d-flex gap-3 flex-column flex-md-row">
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
                      className="ms-0 ms-md-5 d-flex gap-2 mb-3 align-items-center"
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
                        onClick={() => {
                          setErrorMessage("");
                          setSelectedOption(optionID);
                        }}
                      />
                      <label
                        htmlFor={optionID}
                      >{`${optionID}. ${optionText}`}</label>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
        );
      case "feedback":
        const feedbackMessage =
          scenario.message[selectedOption] ||
          "Please make sure to select an option.";
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
      {currentStep !== 1 && errorMessage && (
        <div className="text-danger">{errorMessage}</div>
      )}
      <StepIndicator totalSteps={totalSteps} />

      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekThreePage4;
