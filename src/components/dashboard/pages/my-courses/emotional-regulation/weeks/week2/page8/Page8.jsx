import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import Frame from "./components/Frame";
import Button from "../../../components/Button";
import StepIndicator from "../../../components/StepIndicator";
import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";

function WeekTwoPage8() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);

  const pageData = useSelector(selectPageData);
  const totalSteps = pageData?.steps?.length || 0;
  const step = pageData?.steps[currentStep - 1];

  const [answers, setAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );
    setAnswers(Array.isArray(response?.answer) ? response.answer : []);
  }, [userAnswers]);

  const saveUserInput = () => {
    if (adminDatas.isAdmin) return true;

    const stepData = answers.find((item) => item.stepId === currentStep);
    if (!stepData) {
      setErrorMessage(
        "Please select both Energy Level and Zone of Regulation."
      );
      return false;
    }

    const { energyLevel, zone } = stepData.value;
    if (!energyLevel || !zone) {
      setErrorMessage("Please complete both dropdowns before proceeding.");
      return false;
    }

    setErrorMessage("");
    const activityData = { page: pageData.id, answer: answers };
    dispatch(saveActivity(activityData));

    return true;
  };

  const renderStep = () => {
    if (!step) return <div>Invalid Step</div>;
    switch (step.type) {
      case "dualDropdownScenario":
        return (
          <Frame
            data={{
              step: step.stepId,
              question: step.question,
              dropdownOptions: pageData.dropdownOptions,
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

      {errorMessage && (
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

export default WeekTwoPage8;
