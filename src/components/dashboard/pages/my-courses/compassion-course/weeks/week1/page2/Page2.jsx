import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import compassion from "../../../../../../../../assets/compassion.png";
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

function Page2() {
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
    const savedAnswer = response?.answer || draftAnswer || "";
    setMyAnswer(savedAnswer);
    return () => {};
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
        <div className="d-flex gap-3 align-center-lg-custom flex-column flex-md-row">
          <h2 className="text-blue fs-1">Question: </h2>
          <h2 className="text-gray fs-1 compassion-definition-question">
            {pageData.question}{" "}
            {pageData.hasImage && (
              <img
                src={compassion}
                alt="compassion"
                className="question-image"
              />
            )}{" "}
            ?
          </h2>
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

export default Page2;
