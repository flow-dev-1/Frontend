import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Frame from "./components/Frame";
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

function WeekFourPage6() {
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
    if (adminDatas.isAdmin) return true;

    const latestAnswers = answersRef.current;
    const stepData = latestAnswers.find((item) => item.stepId === currentStep);
    if (!stepData) {
      setErrorMessage("Oops! All inputs must be filled out.");
      return false;
    }

    const values = Object.values(stepData.value);
    // if (values.length < 3) {
    //   setErrorMessage("At least 3 values are required!");
    //   return false;
    // }

    const emptyInputs = values.filter((value) => value.trim() === "");
    if (emptyInputs.length > 0) {
      setErrorMessage(
        `Please fill out all inputs. ${emptyInputs.length} input(s) are missing.`
      );
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
      case "threeFieldsAnswers":
        return (
          <Frame
            data={{
              step: step.stepId,
              question: step.question,
              expectedAnswers: step.answers,
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
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekFourPage6;
