import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import coping from "../../../../../../../../assets/resilience-grit-images/coping.png";
import BigTextBox from "../../../components/BigTextBox";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";

function WeekFivePage2() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const [myAnswer, setMyAnswer] = useState(userAnswers);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );
    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    setMyAnswer(response?.answer ?? draftAnswer ?? "");
    return () => { };
  }, [pageData.id, userAnswers]);

  const saveUserInput = () => {
    if (!adminDatas.isAdmin && !myAnswer) {
      setErrorMessage("Oops! Please enter a valid input!");
      return false;
    }

    setErrorMessage(""); // Clear error if input is valid
    // Allow flow admin to proceed without input but do not dispatch answer
    if (adminDatas.isAdmin) return true;
    dispatch(
      saveActivity({
        page: pageData.id,
        answer: myAnswer,
      })
    );
    clearActivityDraft(userAnswers, pageData.id);
    return true;
  };

  const handleInputChange = (e) => {
    setErrorMessage("");
    const nextAnswer = e.target.value;
    setMyAnswer(nextAnswer);
    saveActivityDraft(userAnswers, pageData.id, nextAnswer);
  };

  return (
    <>
      <QuestionBox>

      <div className="d-flex gap-3 flex-column flex-md-row flex-md-nowrap align-items-center">
          <h2 className="text-blue fs-1 mb-0 flex-shrink-0 question-text">Question:</h2>

          <div className="d-flex align-items-center flex-grow-1 min-w-0">
            <h2 className="text-gray fs-1 mb-0 flex-grow-1 md:text-truncate">
              {pageData.question}
              {pageData.hasImage && (
                <>
                  {/* Show inline on md and up */}
                  <img
                    src={coping}
                    alt="self-compassion"
                    className="ms-2 d-none d-md-inline-block question-image resilience-question-image img-fluid"
                  />

                  {/* Show inline (not block) on mobile with ? following immediately */}
                  <span className="d-inline-block d-md-none">
                    <img
                      src={coping}
                      alt="self-compassion"
                      className="ms-2 mt-2 align-middle question-image resilience-question-image img-fluid"
                    />
                    <span className="ms-1">?</span>
                  </span>
                </>
              )}
              {/* Keep the ? for non-mobile when no image is present */}
              {!pageData.hasImage && <span className="ms-1">?</span>}
            </h2>
          </div>
        </div>
        <BigTextBox handleChange={handleInputChange} value={myAnswer} />
      </QuestionBox>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekFivePage2;
