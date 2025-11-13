import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
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
import SONARFrame from "./components/SONARFrame";

function WeekThreePage2() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const pageData = useSelector(selectPageData);

  const totalSteps = pageData?.steps?.length || 0;
  const step = pageData?.steps[currentStep - 1];

  const [answers, setAnswers] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );
    if (response?.answer) {
      setAnswers(response.answer);
    }
  }, [userAnswers]);

  const saveUserInput = () => {
    if (currentStep === 1 || adminDatas.isAdmin) return true;

    if (step?.type === "sonar") {
      const letters = step.letters || [];
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i].key;
        if (i > 0) {
          const prevKey = letters[i - 1].key;
          if (!answers[prevKey] || !answers[prevKey].trim()) {
            setErrorMessage(
              `Please complete "${letters[i - 1].labelFull}" before proceeding.`
            );
            return false;
          }
        }
        if (!answers[letter] || !answers[letter].trim()) {
          setErrorMessage(
            `Please complete "${letters[i].labelFull}" before proceeding.`
          );
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
    }

    return true;
  };

  const renderStep = () => {
    if (!step) return <div>Invalid Step</div>;

    switch (step.type) {
      case "instruction":
        return (
          <QuestionBox>
            <div className="text-center mb-5 mt-5">
              <h1 className="text-white bg-blue py-2 px-5 rounded d-inline">
                Instruction
              </h1>
            </div>
            <div className="text-center mt-4">
              {step.instructions.map((instruction, i) => (
                <React.Fragment key={i}>
                  <h2 className="text-gray py-2 px-5 d-inline-block text-start">
                    {instruction}
                  </h2>
                  {i < step.instructions.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </QuestionBox>
        );

      case "sonar":
        return (
          <SONARFrame
            scenario={step.scenario}
            letters={step.letters}
            answers={answers}
            setAnswers={setAnswers}
            setErrorMessage={setErrorMessage}
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

      <div className="d-flex justify-content-center gap-4 mt-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekThreePage2;
