import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
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
import ScenarioFrame from "./components/ScenarioFrame";
import LadderFrame from "./components/LadderFrame";
import QuestionFrame from "./components/QuestionFrame";

function Page10() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const [answers, setAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const userAnswers = useSelector(userAnswer);
  const adminDatas = useSelector(adminData);

  // Calculate total steps dynamically
  // 1 instruction + (number of scenarios × 7 steps per scenario)
  const totalSteps = pageData?.steps
    ? 1 + pageData.steps.filter((s) => s.type === "scenario").length * 7
    : 0;

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );

    setAnswers(Array.isArray(response?.answer) ? response.answer : []);
  }, [userAnswers, pageData?.id]);

  // Helper function to get current scenario and sub-step info
  const getCurrentStepInfo = () => {
    if (currentStep === 1) {
      return { type: "instruction", stepId: 1 };
    }

    const scenarioSteps =
      pageData?.steps.filter((s) => s.type === "scenario") || [];
    const stepIndex = currentStep - 2; // Subtract 1 for instruction step, then 0-index
    const scenarioIndex = Math.floor(stepIndex / 7);
    const subStepIndex = stepIndex % 7;

    if (scenarioIndex >= scenarioSteps.length) {
      return { type: "invalid" };
    }

    const scenario = scenarioSteps[scenarioIndex];
    const subStepTypes = [
      "scenario", 
      "ladder", 
      "question", 
      "question", 
      "question", 
      "question", 
      "question", 
    ];

    return {
      type: subStepTypes[subStepIndex],
      scenario,
      subStepIndex,
      questionNumber: subStepIndex >= 2 ? subStepIndex - 1 : null,
      stepId: currentStep,
    };
  };

  const saveUserInput = () => {
    const stepInfo = getCurrentStepInfo();

    // Skip validation for instruction and ladder steps
    if (stepInfo.type === "instruction" || stepInfo.type === "ladder") {
      return true;
    }

    // Skip validation for admins
    if (adminDatas.isAdmin) return true;

    // For scenario steps
    if (stepInfo.type === "scenario") {
      // Only validate if it's a "withInput" scenario
      if (stepInfo.scenario?.scenarioType === "withInput") {
        const stepData = answers.find((item) => item.stepId === currentStep);

        if (!stepData || !stepData.value || stepData.value.trim() === "") {
          setErrorMessage("Please provide your response before proceeding.");
          return false;
        }
      }
      return true;
    }

    // For question steps - always require input
    if (stepInfo.type === "question") {
      const stepData = answers.find((item) => item.stepId === currentStep);

      if (!stepData || !stepData.value || stepData.value.trim() === "") {
        setErrorMessage("Please answer this question before proceeding.");
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
    const stepInfo = getCurrentStepInfo();

    if (stepInfo.type === "invalid") {
      return <div>Invalid Step</div>;
    }

    switch (stepInfo.type) {
      case "instruction":
        // const instructionStep = pageData?.steps[0];
        return (
          <QuestionBox extraStyle="bg-blue">
            <div className="text-center mb-5 mt-5 mt-md-4">
              <h1 className="text-mute bg-white py-2 px-5 rounded d-inline week-2-question-text tot-text-instruction mt-5">
                Instruction
              </h1>
            </div>

            <div className="mb-5 mt-3 mt-md-0">
              <h2 className="text-white py-2 px-5 rounded text-start tot-week-2-question-text">
                Welcome to the <span className="fw-bold">SONAR</span> staircase.
              </h2>
              <h2 className="text-white py-2 px-5 rounded text-start tot-week-2-question-text">
                You will be presented with a 5 step staircase labeled with{" "}
                <br />
                the words{" "}
                <span className="fw-bold">STOP, OBSERVE, NAME, ASK </span> and
                <span className="fw-bold"> REGULATE.</span>
              </h2>
              <h2 className="text-white py-2 px-5 rounded text-start tot-week-2-question-text">
                You will also be shown 3 scenarios. For each stressful <br />
                classroom scenario, use the{" "}
                <span className="fw-bold">SONAR</span> pathway to walk <br />
                through your response. Reflect on each step by answering <br />
                the prompts below.
              </h2>
            </div>
          </QuestionBox>
        );

      case "scenario":
        return (
          <ScenarioFrame
            data={{
              stepId: stepInfo.stepId,
              scenarioNumber: stepInfo.scenario.scenarioNumber,
              scenarioTitle: stepInfo.scenario.scenarioTitle,
              scenarioType: stepInfo.scenario.scenarioType,
              mainInputQuestion: stepInfo.scenario.mainInputQuestion,
            }}
            setErrorMessage={setErrorMessage}
            answers={answers}
            setAnswers={setAnswers}
          />
        );

      case "ladder":
        return (
          <LadderFrame
            data={{
              stepId: stepInfo.stepId,
              scenarioNumber: stepInfo.scenario.scenarioNumber,
              imagePath: stepInfo.scenario.ladderImage,
            }}
          />
        );

      case "question":
        const questionData =
          stepInfo.scenario.subQuestions[stepInfo.questionNumber - 1];
        return (
          <QuestionFrame
            data={{
              stepId: stepInfo.stepId,
              scenarioNumber: stepInfo.scenario.scenarioNumber,
              questionNumber: stepInfo.questionNumber,
              question: questionData.question,
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
        <div className="text-danger text-center mt-3 fw-bold fs-5">
          {errorMessage}
        </div>
      )}
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default Page10;
