import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import Frame from "./components/Frame";
import Button from "../../../components/Button";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";
import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import StepIndicator from "../../../components/StepIndicator";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";

function WeekSixPage11() {
  const dispatch = useDispatch(); // Initialize dispatch
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData?.steps?.length || 0;
  const [answers, setAnswers] = useState([]); // State to hold answers
  const answersRef = useRef(answers);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const step = pageData?.steps[currentStep - 1];
  const userAnswers = useSelector(userAnswer);
  const adminDatas = useSelector(adminData);
  // console.log(userAnswers)

  const updateAnswers = (nextAnswersOrUpdater) => {
    const nextAnswers =
      typeof nextAnswersOrUpdater === "function"
        ? nextAnswersOrUpdater(answersRef.current)
        : nextAnswersOrUpdater;

    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);
    saveActivityDraft(userAnswers, pageData.id, nextAnswers);
  };

  useEffect(() => {
    if (!userAnswers || !pageData?.id) return;
    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );
    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    const nextAnswers = Array.isArray(response?.answer)
      ? response.answer
      : Array.isArray(draftAnswer)
        ? draftAnswer
        : [];

    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);
  }, [pageData?.id, userAnswers]);

  const saveUserInput = () => {
    if (currentStep === 1) return true;
    if (adminDatas.isAdmin) return true;

    const latestAnswers = answersRef.current;
    const stepData = latestAnswers.find((item) => item.stepId === currentStep);

    if (!stepData?.value) {
      setErrorMessage("Oops! Please select an answer.");
      return false;
    }

    setErrorMessage(""); // Clear error if input is valid

    const activityData = {
      page: pageData.id,
      answer: latestAnswers,
    };
    dispatch(saveActivity(activityData)); // Dispatch the saveActivity action
    clearActivityDraft(userAnswers, pageData.id);

    return true;
  };

  // console.log(answers, "Answers")

  const renderStep = () => {
    // const step = pageData?.steps[currentStep - 1];
    // console.log(currentStep, step, "step")
    if (!step) return <div>Invalid Step</div>;

    switch (step.type) {
      case "instruction":
        return (
          <QuestionBox>
            <div className="text-center mb-5 mt-4 mt-md-0">
              <h2 className="text-white bg-blue p-4 fs-1 rounded d-inline">
                {step.title}
              </h2>
            </div>
            <h2 className="text-gray fs-1">{step.instructions[0]}</h2>
            <h2 className="text-gray mt-5 fs-1">
              {step.instructions[1]}{" "}
              <joe className="text-blue">{step.options}</joe>
            </h2>
          </QuestionBox>
        );
      case "dropdownScenario":
        return (
          <Frame
            data={{
              step: step.stepId,
              question: step.question,
              options: step.options,
            }}
            setErrorMessage={setErrorMessage}
            answers={answers}
            setAnswers={updateAnswers}
          />
        );
      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <>
      {renderStep()}
      {currentStep !== 1 && errorMessage && (
        <div className="text-danger">{errorMessage}</div>
      )}{" "}
      {/* Display error message */}
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekSixPage11;
