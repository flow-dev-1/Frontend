import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import EmotionTable from "./components/EmotionTable";
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

function WeekFourPage4() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData?.steps?.length || 0;
  const [answers, setAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const step = pageData?.steps[currentStep - 1];
  const userAnswers = useSelector(userAnswer);
  const adminDatas = useSelector(adminData);

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );
    setAnswers(Array.isArray(response?.answer) ? response.answer : []);
  }, [userAnswers]);

  const saveUserInput = () => {
    if (currentStep === 1) return true;
    if (adminDatas.isAdmin) return true;

    const stepData = answers.find((item) => item.stepId === currentStep);
    if (!stepData) {
      setErrorMessage("Oops! All inputs must be filled out.");
      return false;
    }

    const emotions = step.emotions || [];
    const values = stepData.value || {};

    // Check if all emotions have both fields filled
    for (let emotion of emotions) {
      const whatYouDid = values[`${emotion}_whatYouDid`];
      const healthStatus = values[`${emotion}_healthStatus`];

      if (!whatYouDid || whatYouDid.trim() === "") {
        setErrorMessage(`Please fill out what you did for "${emotion}".`);
        return false;
      }

      if (!healthStatus || healthStatus.trim() === "") {
        setErrorMessage(`Please select Healthy or Unhealthy for "${emotion}".`);
        return false;
      }
    }

    setErrorMessage("");

    const activityData = {
      page: pageData.id,
      answer: answers,
    };
    dispatch(saveActivity(activityData));

    return true;
  };

  const renderStep = () => {
    if (!step) return <div>Invalid Step</div>;

    switch (step.type) {
      case "instruction":
        return (
          <QuestionBox>
            <div className="text-center mb-5 mt-5 mt-md-4">
              <h1 className="text-white bg-blue py-2 px-5 rounded d-inline">
                Instruction
              </h1>
            </div>

            <div className="text-center mb-5 mt-3 mt-md-0">
              <h2 className="text-gray py-2 px-5 rounded d-inline-block text-start">
                {step.instructionText}
              </h2>
            </div>
          </QuestionBox>
        );

      case "emotionTable":
        return (
          <EmotionTable
            data={{
              step: step.stepId,
              emotions: step.emotions,
            }}
            setErrorMessage={setErrorMessage}
            answers={answers}
            setAnswers={setAnswers}
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
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekFourPage4;
