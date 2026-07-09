import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import ChallengeFrame from "./components/ChallengeFrame";
import DragAndDropFrame from "./components/DragAndDropFrame";
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

function WeekNinePage6() {
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

  const updateAnswers = (nextAnswersOrUpdater) => {
    const nextAnswers =
      typeof nextAnswersOrUpdater === "function"
        ? nextAnswersOrUpdater(answersRef.current)
        : nextAnswersOrUpdater;

    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);
    saveActivityDraft(userAnswers, pageData.id, nextAnswers);
  };

  const saveUserInput = () => {
    if (adminDatas.isAdmin) return true;
    if (currentStep === 1) return true;

    const latestAnswers = answersRef.current;
    const stepData = latestAnswers.find((item) => item.stepId === currentStep);

    if (!stepData) {
      setErrorMessage("Oops! All inputs must be filled out.");
      return false;
    }

    const values = Object.values(stepData.value);
    if (values.length < 1) {
      setErrorMessage("At least 1 value are required!");
      return false;
    }

    if (currentStep !== 1 && currentStep !== 6) {
      const emptyInputs = values.filter((value) => value?.trim() === "");
      if (emptyInputs.length > 0) {
        setErrorMessage(
          `Please fill out all inputs. ${emptyInputs.length} input(s) are missing.`
        );
        return false;
      }
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
    if (!step) return <div>Invalid Step</div>;

    switch (step.type) {
      case "instruction":
        return (
          <QuestionBox>
            <div className="text-center mb-5 mt-3 mt-md-0">
              <h2 className="text-white bg-blue py-2 px-5 fs-1 rounded d-inline ">
                Example
              </h2>
            </div>
            <div className="d-flex flex-column gap-3">
              <div className="mb-3">
                <h2 className="text-white bg-red py-2 px-5 fs-1 rounded d-inline">
                  Challenge
                </h2>
              </div>
              <h2 className="text-gray mb-5 fs-1 d-inline-block w-auto">
                {step.challenge}
              </h2>
              <div className="mb-3">
                <h2 className="text-white bg-green py-2 px-4 fs-1 rounded d-inline text-nowrap">
                  Your YET Statement:
                </h2>
              </div>
              <h2 className="text-gray fs-1 d-inline-block w-auto">
                {step.statement}
              </h2>
            </div>
          </QuestionBox>
        );
      case "scenario":
        return (
          <ChallengeFrame
            data={{
              step: step.stepId,
              challenge: step.challenge,
              info: step,
            }}
            setErrorMessage={setErrorMessage}
            answers={answers}
            setAnswers={updateAnswers}
          />
        );
      case "imageDragAndDrop":
        return (
          <DragAndDropFrame
            info={{
              images: step.images,
              buckets: step.buckets,
              instruction: step.instruction,
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

export default WeekNinePage6;
