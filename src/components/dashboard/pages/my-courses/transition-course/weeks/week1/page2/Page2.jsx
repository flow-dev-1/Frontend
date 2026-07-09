import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import Frame from "./components/Frame";
import StepIndicator from "../../../components/StepIndicator";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";

function Page2() {
  const dispatch = useDispatch(); // Initialize dispatch
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData?.steps?.length || 0;
  const [answers, setAnswers] = useState([]); // State to hold answers
  const answersRef = useRef(answers);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const step = pageData?.steps[currentStep - 1]; // Get the current step data
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
    if (adminDatas.isAdmin) return true;

    const latestAnswers = answersRef.current;
    const stepData = latestAnswers.find((item) => item.stepId === currentStep);

    if (!stepData || !stepData.value || stepData.value.trim() === "") {
      setErrorMessage("Oops! Please enter a valid input!");
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
      case "scenario":
        return (
          <Frame
            data={{
              step: step.stepId,
              question: step.question,
              questions: step.questions.map((q) => ({
                [q.type]: q.question,
              })),
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
      {errorMessage && <div className="text-danger">{errorMessage}</div>}{" "}
      {/* Display error message */}
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px gap-4 mt-4 ">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default Page2;
