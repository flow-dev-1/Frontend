import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import StepIndicator from "../../../components/StepIndicator";
import Button from "../../../components/Button";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";

import FrameTextBox from "./components/FrameTextBox";
import FrameAnswerPreview from "./components/FrameAnswerPreview";

function Page4() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const userAnswers = useSelector(userAnswer);
  const adminDatas = useSelector(adminData);

  const totalSteps = pageData?.steps?.length || 0;
  const step = pageData?.steps[currentStep - 1];

  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );
    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    setAnswer(response?.answer ?? draftAnswer ?? "");
  }, [pageData.id, userAnswers]);

  const updateAnswer = (value) => {
    setAnswer(value);
    saveActivityDraft(userAnswers, pageData.id, value);
  };

  const saveUserInput = () => {
    if (adminDatas.isAdmin) return true;

    if (currentStep === 1 && !answer.trim()) {
      setErrorMessage("Oops! Please enter a valid input!");
      return false;
    }

    setErrorMessage("");

    dispatch(
      saveActivity({
        page: pageData.id,
        answer,
      })
    );
    clearActivityDraft(userAnswers, pageData.id);

    return true;
  };

  const renderStep = () => {
    if (!step) return <div>Invalid Step</div>;

    switch (step.type) {
      case "textInput":
        return (
          <FrameTextBox
            step={step}
            answer={answer}
            setAnswer={updateAnswer}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        );

      case "answerPreview":
        return <FrameAnswerPreview answer={step.value} />;

      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <>
      {renderStep()}
      {errorMessage && <div className="text-danger">{errorMessage}</div>}

      <StepIndicator totalSteps={totalSteps} />

      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default Page4;
