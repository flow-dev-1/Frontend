import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import BigTextBox from "../../../components/BigTextBox";
import Button from "../../../components/Button";
import {
  selectCurrentStep,
  selectPageData,
} from "../../../../../../../../redux/reducers/navigationSlice";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import StepIndicator from "../../../components/StepIndicator";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";

function WeekFourPage2() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const step = pageData?.steps?.[currentStep - 1];
  const totalSteps = pageData?.steps?.length || 1;
  const [answers, setAnswers] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const currentAnswer = answers[currentStep] || "";

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );
    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    if (response?.answer && typeof response.answer === "object") {
      setAnswers(response.answer);
    } else if (response?.answer) {
      setAnswers({ 2: response.answer });
    } else if (draftAnswer && typeof draftAnswer === "object") {
      setAnswers(draftAnswer);
    } else {
      setAnswers({});
    }
    return () => {};
  }, [userAnswers, pageData.id]);

  const saveUserInput = () => {
    if (!adminDatas.isAdmin && !currentAnswer.trim()) {
      setErrorMessage("Oops! Please enter your answer before moving on.");
      return false;
    }

    setErrorMessage("");
    if (currentStep !== totalSteps) return true;

    if (adminDatas.isAdmin) return true;
    dispatch(
      saveActivity({
        page: pageData.id,
        answer: answers,
      })
    );
    clearActivityDraft(userAnswers, pageData.id);
    return true;
  };

  const handleInputChange = (e) => {
    setErrorMessage("");
    setAnswers((prevAnswers) => {
      const nextAnswers = {
        ...prevAnswers,
        [currentStep]: e.target.value,
      };
      saveActivityDraft(userAnswers, pageData.id, nextAnswers);
      return nextAnswers;
    });
  };

  return (
    <>
      <QuestionBox extraStyle="bg-custom-blue">
        <div className="d-flex gap-3 flex-column flex-md-row flex-md-nowrap align-items-start mt-5 text-center">
          <h2 className="text-blue fs-1 mb-0 flex-shrink-0">Question:</h2>

          <div className="d-flex flex-column flex-grow-1 min-w-0 mb-5">
            <h2 className="text-gray fs-1 mb-2 ">{step?.question}</h2>
          </div>
        </div>
        <BigTextBox handleChange={handleInputChange} value={currentAnswer} />
      </QuestionBox>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekFourPage2;
