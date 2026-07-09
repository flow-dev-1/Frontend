import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
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
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const step = pageData?.steps[currentStep - 1];
  const userAnswers = useSelector(userAnswer);
  const adminDatas = useSelector(adminData);
  // console.log(userAnswers)

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );

    if (adminDatas.isAdmin) {
      setAnswers([]);
      return;
    };
    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    const answerCopy = Array.isArray(response?.answer)
      ? [...response.answer]
      : Array.isArray(draftAnswer)
        ? draftAnswer
        : [];
    setAnswers(answerCopy);
    return () => {};
  }, [adminDatas.isAdmin, pageData.id, userAnswers]);

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
    if(currentStep === 1) return true;

    if (answers.length < 5) {
      setErrorMessage("At least 5 values are required!");
      return false;
    }

    const emptyInputs = answers.filter((item) => item?.text?.trim() === "");
    if (emptyInputs.length > 0) {
      setErrorMessage(
        `Please fill out all inputs. ${emptyInputs.length} input(s) are missing.`
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
    // const step = pageData?.steps[currentStep - 1];
    // console.log(currentStep, step, "step")
    if (!step) return <div>Invalid Step</div>;

    switch (step.type) {
      case "instruction":
        return (
          <QuestionBox>
            <div className="p-5">
              <div className="text-center mb-5 mt-4 mt-md-0">
                <h2 className="text-white bg-blue px-3 py-2 fs-1 rounded d-inline display-4 text-center">
                  {step.type}
                </h2>
              </div>
              <h2 className="text-gray display-4 text-center">{step.title}</h2>
              <h2 className="text-gray display-4 text-center">{step.subTitle}</h2>
            </div>

          </QuestionBox>
        );
      case "fiveFieldsAnswers":
        return (
          <Frame
            data={{
              step: step.stepId,
              question: step.question,
              expectedAnswers: step.answers,
            }}
            setErrorMessage={setErrorMessage}
            answers={answers}
            setAnswers={setDraftedAnswers}
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
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4 z-300 position-relative">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekFourPage6;
