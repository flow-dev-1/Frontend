import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import DragAndDropFrame from "./components/DragAndDropFrame";
import DropdownFrame from "./components/DropdownFrame";
import Button from "../../../components/Button";
import StepIndicator from "../../../components/StepIndicator";
import "./page8.css";

import {
  selectPageData,
  selectCurrentStep,
  navigateNext,
} from "../../../../../../../../redux/reducers/navigationSlice";
import TOTFeedbackModal from "../../../components/TOTFeedbackModal";

import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";

const InternalStepIndicator = ({ totalSteps, currentStep }) => {
  return (
    <div
      className="d-flex justify-content-center mt-4 flex-wrap"
      style={{ gap: "10px" }}
    >
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`${
            index + 2 <= currentStep ? "bg-step-active" : "bg-step"
          }`}
          style={{
            // flexBasis: "35px",
            width: "35px",
            height: "17px",
            borderRadius: "8px",
            cursor: index <= currentStep ? "pointer" : "default",
          }}
        />
      ))}
    </div>
  );
};

function Page8() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData?.steps?.length || 0;
  const [dragDropImageLength, setDragDropImageLength] = useState(3);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [answers, setAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const step = pageData?.steps[currentStep - 1];
  const userAnswers = useSelector(userAnswer);
  const adminDatas = useSelector(adminData);

  const [showFeedback, setShowFeedback] = useState(false);
  const handleCloseFeedback = () => {
    setShowFeedback(false);
    dispatch(navigateNext()); // Navigate after closing the modal
  };

  useEffect(() => {
    if (!userAnswers) return;

    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id,
    );

    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    setAnswers(
      Array.isArray(response?.answer)
        ? response.answer
        : Array.isArray(draftAnswer)
          ? draftAnswer
          : [],
    );
  }, [userAnswers, pageData.id]);

  useEffect(() => {
    if (!userAnswers || !pageData?.id) return;
    saveActivityDraft(userAnswers, pageData.id, answers);
  }, [answers, pageData?.id, userAnswers]);

  const saveUserInput = () => {
    if (adminDatas.isAdmin) return true;
    if (currentStep === 1) return true;

    const stepData = answers.find((item) => item.stepId === currentStep);

    if (!stepData) {
      setErrorMessage("Oops! This step is required.");
      return false;
    }

    // Validation per step type
    if (step.type === "imageDragAndDrop") {
      const totalDropped =
        (stepData.value.green?.length || 0) +
        (stepData.value.red?.length || 0) +
        (stepData.value.orange?.length || 0);

      if (totalDropped !== step.images.length) {
        setErrorMessage("Please place all images in the buckets.");
        return false;
      }
    }

    if (step.type === "dropdownScenario") {
      if (!stepData.value) {
        setErrorMessage("Please select an option.");
        return false;
      }
    }

    setErrorMessage("");

    dispatch(
      saveActivity({
        page: pageData.id,
        answer: answers,
      }),
    );

    // Show feedback modal instead of navigating immediately
    if (step.type === "dropdownScenario") {
      setShowFeedback(true);
    } else {
      dispatch(navigateNext());
    }
    // return true;
  };

  const renderStep = () => {
    if (!step) return null;

    switch (step.type) {
      case "instruction":
        return (
          <QuestionBox extraStyle="bg-blue">
            <div className="text-center mb-5 mt-5 mt-md-4">
              <h1 className="text-mute bg-white py-2 px-5 rounded d-inline week-2-question-text tot-text-instruction">
                Instruction
              </h1>
            </div>
            <div className="text-center mb-5 mt-3 mt-md-0">
              <h2 className="text-white py-2 px-5 rounded d-inline-block text-start tot-week-2-question-text">
                {step.text}
              </h2>
            </div>
          </QuestionBox>
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
            setAnswers={setAnswers}
            setCurrentImageIndex1={setCurrentImageIndex}
            setDragDropImageLength={setDragDropImageLength}
          />
        );

      case "dropdownScenario":
        return (
          <DropdownFrame
            step={step}
            answers={answers}
            setAnswers={setAnswers}
            setErrorMessage={setErrorMessage}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderStep()}

      {errorMessage && (
        <div className="text-danger text-center mt-3">{errorMessage}</div>
      )}

      <div className="d-flex justify-content-center align-items-cente gap-2 ">
        <StepIndicator totalSteps={totalSteps} />
        <InternalStepIndicator
          totalSteps={dragDropImageLength}
          currentStep={currentImageIndex + 1}
        />
      </div>

      <div className="d-flex justify-content-center gap-4 mt-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>

      <TOTFeedbackModal show={showFeedback} onHide={handleCloseFeedback}>
        <p className="text-blue mb-3">
          Many classrooms operate somewhere between integration and inclusion
        </p>
        <p className="text-blue">
          Over the next few weeks, you will learn strategies to help move your
          classroom closer to true inclusive practice.
        </p>
      </TOTFeedbackModal>
    </>
  );
}

export default Page8;
