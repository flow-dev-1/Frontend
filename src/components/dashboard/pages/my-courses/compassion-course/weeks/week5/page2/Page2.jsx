import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import QuestionBox from "../../../components/QuestionBox";
import StepIndicator from "../../../components/StepIndicator";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";

const getScenarioOptionIds = (scenario) =>
  scenario?.options?.map((option) => option.id) || [];

const hasValidAnswerForScenario = (scenario, answers) => {
  const optionIds = getScenarioOptionIds(scenario);
  const answer = answers.find((option) => option.id === scenario?.id);

  return Boolean(answer && optionIds.includes(answer.value));
};

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
    if (!userAnswers) return;
    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );
    if (response?.answer) {
      const answerCopy = response.answer.filter((answer) => {
        const scenario = pageData?.scenarios?.find(
          (item) => item.id === answer.id && item.type === "question"
        );

        return hasValidAnswerForScenario(scenario, response.answer);
      });
      setSelectedOption(answerCopy);
    } else {
      const draftAnswer = getActivityDraft(userAnswers, pageData.id);
      if (Array.isArray(draftAnswer)) {
        const validDraftAnswer = draftAnswer.filter((answer) => {
          const scenario = pageData?.scenarios?.find(
            (item) => item.id === answer.id && item.type === "question"
          );

          return hasValidAnswerForScenario(scenario, draftAnswer);
        });
        setSelectedOption(validDraftAnswer);
        return;
      }
    }
    return () => {};
  }, [pageData?.scenarios, pageData.id, userAnswers]);

  const handleOptionChange = (id, value) => {
    setErrorMessage("");
    setSelectedOption((prevOptions) => {
      const existingOptionIndex = prevOptions.findIndex(
        (option) => option.id === id
      );
      if (existingOptionIndex > -1) {
        const updatedOptions = [...prevOptions];
        updatedOptions[existingOptionIndex].value = value;
        saveActivityDraft(userAnswers, pageData.id, updatedOptions);
        return updatedOptions;
      } else {
        const updatedOptions = [...prevOptions, { id, value }];
        saveActivityDraft(userAnswers, pageData.id, updatedOptions);
        return updatedOptions;
      }
    });
  };

  const saveUserInput = () => {
    // if (!adminDatas.isAdmin && !myAnswer) {
    //   setErrorMessage("Oops! Please enter a valid input!");
    //   return false;
    // }
    if (adminDatas.isAdmin) return true;
    const currentScenario = pageData?.scenarios?.[currentStep - 1];
    const questionScenarios =
      pageData?.scenarios?.filter((scenario) => scenario.type === "question") ||
      [];

    if (currentScenario?.type === "feedback") {
      const previousQuestionScenario = pageData?.scenarios
        ?.slice(0, currentStep - 1)
        .reverse()
        .find((scenario) => scenario.type === "question");

      if (!hasValidAnswerForScenario(previousQuestionScenario, selectedOption)) {
        setErrorMessage("Please make sure to select an option!");
        return false;
      }
    }

    if (currentStep === totalSteps) {
      const hasAllAnswers = questionScenarios.every((scenario) =>
        hasValidAnswerForScenario(scenario, selectedOption)
      );

      if (!hasAllAnswers) {
        setErrorMessage("Please make sure to select an option!");
        return false;
      }

      dispatch(
        saveActivity({
          page: pageData.id,
          answer: selectedOption,
        })
      );
      clearActivityDraft(userAnswers, pageData.id);
    }

    setErrorMessage("");
    return true;
  };

  // console.log(selectedOption,"The selected")

  const renderStep = () => {
    // console.log(pageData,"Page data")
    const scenario = pageData?.scenarios[currentStep - 1];

    if (!scenario) return null;
    switch (scenario.type) {
      case "question":
        return (
          <div>
            <form className="d-flex gap-3  flex-column flex-md-row">
              <h2 className="text-blue fs-1">{scenario.title}: </h2>
              <div className="">
                <h3 className="fs-1">{scenario.question}</h3>
                {scenario.options.map((option, index) => {
                  const optionText = option.text;
                  const optionID = option.id;
                  const optionKey = `${scenario.id}-${optionID}`;
                  const isChecked = selectedOption?.some(
                    (selected) =>
                      selected.id === scenario.id && selected.value === optionID
                  );

                  return (
                    <div
                      key={index}
                      className="ms-0 ms-md-5 d-flex gap-2 mb-3 align-items-center"
                    >
                      <input
                        type="radio"
                        id={optionKey}
                        name="options"
                        value={optionID}
                        checked={isChecked}
                        onChange={(e) =>
                          handleOptionChange(scenario.id, e.target.value)
                        }
                        style={{ display: "none" }}
                      />
                      <img
                        src={isChecked ? checkedImage : uncheckedImage}
                        alt={optionKey}
                        style={{ width: 20, height: 20, cursor: "pointer" }}
                        onClick={() =>
                          handleOptionChange(scenario.id, optionID)
                        }
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
        const selectedValue =
          selectedOption?.find((option) => option.id === currentStep - 1) || {};
        const feedbackMessage =
          scenario.feedback[selectedValue?.value] ||
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
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <StepIndicator totalSteps={totalSteps} />

      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekFivePage2;
