import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import MultiInput from "./components/MultiInputs";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";

function WeekFivePage4() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const [answers, setAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );
    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    setAnswers(
      Array.isArray(response?.answer)
        ? response.answer
        : Array.isArray(draftAnswer)
          ? draftAnswer
          : []
    );
    return () => { };
  }, [pageData.id, userAnswers]);

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
    if (answers.length < 5) {
      setErrorMessage("At least 5 values are required!");
      return false;
    }

    const emptyInputs = answers.filter((item) => item?.value?.trim() === "");
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



  return (
    <>
      <QuestionBox>
        <MultiInput
          pageData={pageData}
          answers = {answers}
          setAnswers={setDraftedAnswers}
          setErrorMessage={setErrorMessage}
        />
      </QuestionBox>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>

  );
}

export default WeekFivePage4;
