import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import {
  selectPageData,
  selectCurrentStep,
  setCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import QuestionBox from "../../../components/QuestionBox";
import StepIndicator from "../../../components/StepIndicator";
import { userAnswer, saveActivity } from "../../../../../../../../redux/reducers/userAnswersReducer";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";

function WeekFivePage2() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const totalSteps = pageData?.scenarios?.length || 0;
  const [selectedOption, setSelectedOption] = useState([]);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const [errorMessage, setErrorMessage] = useState("");

  const currentStep = useSelector(selectCurrentStep);

  useEffect(() => {

    if (!userAnswers) return
    const response = userAnswers?.activities?.find(item => (item.page === pageData.id))
    if (response?.answer) {
      const answerCopy = [...response.answer];
      setSelectedOption(answerCopy)
      if(currentStep === 1){
        dispatch(setCurrentStep(totalSteps))
      }
    }else{
      dispatch(setCurrentStep(1))
    }
    return () => { }

  }, [userAnswers])

  const handleOptionChange = (id, value) => {
    setErrorMessage("");
    setSelectedOption(prevOptions => {
      const existingOptionIndex = prevOptions.findIndex(option => option.id === id);
      if (existingOptionIndex > -1) {
        const updatedOptions = [...prevOptions];
        updatedOptions[existingOptionIndex].value = value;
        return updatedOptions;
      } else {
        return [...prevOptions, { id, value }];
      }
    });
  };

  const saveUserInput = () => {
    // if (!adminDatas.isAdmin && !myAnswer) {
    //   setErrorMessage("Oops! Please enter a valid input!");
    //   return false;
    // }
    if ([2, 4, 6, 8].includes(currentStep)) {
      const currentSelectedOption = selectedOption.find(option => option.id === currentStep - 1);
      if (!currentSelectedOption || !currentSelectedOption.value) {
        setErrorMessage("Please make sure to select an option!");
        return false;
      } else {
        setErrorMessage("");
        // Allow flow admin to proceed without input but do not dispatch answer
        if (adminDatas.isAdmin) return true
        if(currentStep === totalSteps){
          dispatch(saveActivity({
            page: pageData.id,
            answer: selectedOption
          }))
        }
    
      }
    }
    return true
  }


  // console.log(selectedOption,"The selected")

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
                  const isChecked = selectedOption?.some(selected => (selected.id === scenario.id && selected.value === optionID));

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
                        onChange={(e) => handleOptionChange(scenario.id, e.target.value)}
                        style={{ display: "none" }}
                      />
                      <img
                        src={isChecked ? checkedImage : uncheckedImage}
                        alt={optionKey}
                        style={{ width: 20, height: 20, cursor: "pointer" }}
                        onClick={() => handleOptionChange(scenario.id, optionID)}
                      />
                      <label
                        htmlFor={optionKey}
                      >{`${optionID}. ${optionText}`}</label>
                    </div>
                  );
                })}
              </div>
            </form>

          </div>

        );
      case "feedback":
        const selectedValue = selectedOption?.find(option => option.id === currentStep - 1) || {};
        const feedbackMessage = scenario.feedback[selectedValue?.value] || "Please make sure to select an option.";
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
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <StepIndicator totalSteps={totalSteps} />

      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        <Button text="Prev" />
        <Button text="Next"
          customOnClick={saveUserInput}
        />
      </div>
    </>
  );
}

export default WeekFivePage2;
