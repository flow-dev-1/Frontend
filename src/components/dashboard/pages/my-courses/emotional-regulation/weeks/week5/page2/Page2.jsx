import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import DragAndDropFrame from "./components/DragAndDropFrame";
import Button from "../../../components/Button";

import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import StepIndicator from "../../../components/StepIndicator";
import {
  userAnswer,
  removeActivity,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";

const InternalStepIndicator = ({ totalSteps, currentStep }) => {
  return (
    <div className="emotional-dnd-progress-strip">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`${
            index + 2 <= currentStep ? "bg-step-active" : "bg-step"
          }`}
          style={{
            borderRadius: "8px",
            cursor: index <= currentStep ? "pointer" : "default",
          }}
        />
      ))}
    </div>
  );
};

function WeekFivePage2() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData?.steps?.length || 0;
  const [answers, setAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const step = pageData?.steps[currentStep - 1];
  const userAnswers = useSelector(userAnswer);
  const adminDatas = useSelector(adminData);
  const [dragDropImageLength, setDragDropImageLength] = useState(20);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const updateAnswers = (nextAnswers) => {
    setAnswers((previousAnswers) => {
      const resolvedAnswers =
        typeof nextAnswers === "function"
          ? nextAnswers(previousAnswers)
          : nextAnswers;

      saveActivityDraft(userAnswers, pageData.id, resolvedAnswers);

      return resolvedAnswers;
    });
  };

  useEffect(() => {
    if (!userAnswers) return;

    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );
    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    const savedAnswer = response?.answer || draftAnswer;

    setAnswers(Array.isArray(savedAnswer) ? savedAnswer : []);
  }, [pageData.id, userAnswers]);

  const saveUserInput = () => {
    if (adminDatas.isAdmin) return true;
    if (currentStep === 1) return true;

    const stepData = answers.find((item) => item.stepId === currentStep);

    if (!stepData) {
      setErrorMessage("Oops! All coping skills must be placed in the zones.");
      return false;
    }

    // Check total items dropped
    const totalDropped =
      (stepData.value.blue?.length || 0) +
      (stepData.value.green?.length || 0) +
      (stepData.value.yellow?.length || 0) +
      (stepData.value.red?.length || 0);

    if (totalDropped !== dragDropImageLength) {
      setErrorMessage(
        `Please place all ${dragDropImageLength} coping skills in the zones.`
      );
      return false;
    }

    setErrorMessage("");

    const activityData = {
      page: pageData.id,
      answer: answers,
    };
    dispatch(saveActivity(activityData));
    clearActivityDraft(userAnswers, pageData.id);

    return true;
  };

  const resetDragAndDrop = () => {
    setErrorMessage("");
    updateAnswers([]);
    clearActivityDraft(userAnswers, pageData.id);
    dispatch(removeActivity(pageData.id));
    setCurrentImageIndex(0);
  };

  const renderStep = () => {
    if (!step) return <div>Invalid Step</div>;

    switch (step.type) {
      case "instruction":
        return (
          <QuestionBox extraStyle="bg-blue">
            <div className="text-center mb-5 mt-5 mt-md-4">
              <h1 className="text-white bg-blue py-2 px-5 rounded d-inline mt-5">
                Instruction
              </h1>
            </div>

            <div className="text-center mb-5 mt-3 mt-md-0">
              <h2 className="text-gray text-center py-2 px-5 rounded d-inline-block">
                {step.challenge}
              </h2>
            </div>
          </QuestionBox>
        );
      case "copingSkillsDragDrop":
        return (
          <DragAndDropFrame
            info={{
              skills: step.skills,
              zones: step.zones,
              instruction: step.instruction,
            }}
            setErrorMessage={setErrorMessage}
            answers={answers}
            setAnswers={updateAnswers}
            setCurrentImageIndex1={setCurrentImageIndex}
            setDragDropImageLength={setDragDropImageLength}
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
        <div className="text-danger text-center mt-3">{errorMessage}</div>
      )}
      <div className="emotional-dnd-indicators">
        <div className="emotional-dnd-main-indicator">
          <StepIndicator totalSteps={totalSteps} />
        </div>
        <InternalStepIndicator
          totalSteps={dragDropImageLength}
          currentStep={currentImageIndex + 1}
        />
      </div>
      {currentStep !== 1 && (
        <p
          className="fs-5 d-flex justify-content-center gap-3 align-items-center mt-3"
          onClick={resetDragAndDrop}
          style={{ cursor: "pointer" }}
        >
          <Icon className="ml-3" icon="teenyicons:refresh-solid" />
          Refresh
        </p>
      )}
      <div className="d-flex justify-content-center gap-96px mt-3 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekFivePage2;
