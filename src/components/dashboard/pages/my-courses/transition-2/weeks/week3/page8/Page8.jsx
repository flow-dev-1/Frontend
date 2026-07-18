import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import DragAndDropFrame from "./components/DragDropFrame";
import Button from "../../../components/Button";

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
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";
import "./page8.css";

const InternalStepIndicator = ({ totalSteps, currentStep }) => {
  return (
    <div
      className="d-flex justify-content-cente mt-4 flex-wrap"
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

function WeekTwoPage8() {
  const dispatch = useDispatch(); // Initialize dispatch
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData?.steps?.length || 0;
  const [answers, setAnswers] = useState([]); // State to hold answers
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const step = pageData?.steps[currentStep - 1];
  const userAnswers = useSelector(userAnswer);
  const adminDatas = useSelector(adminData);
  const [dragDropImageLength, setDragDropImageLength] = useState(4);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!userAnswers) return;

    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );
    const draftAnswer = getActivityDraft(userAnswers, pageData.id);

    setAnswers(
      Array.isArray(draftAnswer)
        ? draftAnswer
        : Array.isArray(response?.answer)
        ? response.answer
        : []
    );
  }, [userAnswers, pageData.id]);

  const setDraftedAnswers = (nextAnswersOrUpdater) => {
    setAnswers((prevAnswers) => {
      const nextAnswers =
        typeof nextAnswersOrUpdater === "function"
          ? nextAnswersOrUpdater(prevAnswers)
          : nextAnswersOrUpdater;
      saveActivityDraft(userAnswers, pageData.id, nextAnswers);
      return nextAnswers;
    });
  };

  const saveUserInput = () => {
    if (adminDatas.isAdmin) return true;
    if (currentStep === 1) return true;

    const stepData = answers.find((item) => item.stepId === currentStep);

    if (!stepData) {
      setErrorMessage("Oops! All Images must be placed in the buckects.");
      return false;
    }

    console.log(stepData.value, "Step data value");

    // Check total images dropped
    const totalDropped =
      (stepData.value.pink?.length || 0) +
      (stepData.value.red?.length || 0) +
      (stepData.value.orange?.length || 0);

    if (totalDropped !== dragDropImageLength) {
      setErrorMessage(
        `Please place all ${dragDropImageLength} images in the buckets.`
      );
      return false;
    }

    setErrorMessage(""); // Clear error if input is valid

    const activityData = {
      page: pageData.id,
      answer: answers,
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
          <QuestionBox extraStyle="bg-blue">
            <div className="text-center mb-3 mt-5 mt-md-4">
              <h1 className="text-white fs-1 py-2 px-4 fs-2 font-bold rounded-3 d-inline display-4 text-center blue-fancy-rectangle">
                Step 1
              </h1>
            </div>

            <div className="text-center mb-5 mt-3 mt-md-0">
              <h2 className="text-gray fs-1 py-2 px-5 rounded d-inline-block text-start">
                {step.challenge}
              </h2>
              <br />
              <p className="text-white d-inline-block text-start fs-1 green-star-background p-2 px-4">
                {step.amount}
              </p>
            </div>

            <div
              className="d-flex justify-content-around justify-content-md-around align-items-center flex-wrap mx-auto"
              style={{ maxWidth: "500px" }}
            >
              {step.buckets &&
                step.buckets.map((bucket) => (
                  <div
                    key={bucket.id}
                    className="pt-1 flex-fill draggable-bucket text-center"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      // : "transparent",
                    }}
                  >
                    <h2
                      className={`text-nowrap text-gray transition2-week3-budget-count ${
                        bucket.id === "pink"
                          ? "pink-count"
                          : bucket.id === "orange"
                          ? "orange-count"
                          : "red-count"
                      } transition2-week3-percent-indicator`}
                      style={{
                        "--bucket-percent": `${bucket.percent}%`,
                      }}
                    >
                      <span>{bucket.percent} %</span>
                    </h2>
                    <div
                      className={
                        bucket.id === "pink"
                          ? "pink-dark-bucket bucket-text"
                          : bucket.id === "orange"
                          ? "yellow-dark-bucket bucket-text"
                          : "red-dark-bucket bucket-text"
                      }
                    >
                      <div>
                        <p className="text-center  bg-gray-rectangle">
                          {bucket.title}
                        </p>
                        <p className="text-center">{bucket.amount}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
            setAnswers={setDraftedAnswers}
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
        <div className="text-danger">{errorMessage}</div>
      )}{" "}
      {/* Display error message */}
      <div className="d-flex justify-content-center align-items-cente gap-2">
        <StepIndicator totalSteps={totalSteps} />
        <InternalStepIndicator
          totalSteps={dragDropImageLength}
          currentStep={currentImageIndex + 1}
        />
      </div>
      <div className="d-flex justify-content-center gap-96px mt-3 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekTwoPage8;
