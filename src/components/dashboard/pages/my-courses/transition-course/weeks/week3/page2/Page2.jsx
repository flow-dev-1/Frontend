import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import ProgressBar from "../../../components/PogressBar";
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
  const [myAnswer, setMyAnswer] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userAnswers || !pageData?.id) return;
    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );
    const draftAnswer = getActivityDraft(userAnswers, pageData.id);

    setMyAnswer(response?.answer ?? draftAnswer ?? 0);
    return () => {};
  }, [pageData?.id, userAnswers]);

  const saveUserInput = () => {
    if (
      !adminDatas.isAdmin &&
      (!myAnswer || myAnswer === "0" || myAnswer === 0)
    ) {
      setErrorMessage("Oops! Please select a valid input!");
      return false;
    }

    setErrorMessage(""); // Clear error if input is valid
    // Allow flow admin to proceed without input but do not dispatch answer
    // if (adminDatas.isAdmin) return true
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
    const nextAnswer = e.target.value;
    setErrorMessage("");
    setMyAnswer(nextAnswer);
    saveActivityDraft(userAnswers, pageData.id, nextAnswer);
  };

  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-3 ms-5 align-center-lg-custom flex-column flex-md-row">
          <h2 className="text-blue fs-1">Question: </h2>
          <h2 className="text-gray fs-1">{pageData.question} </h2>
        </div>
        <ProgressBar handleChange={handleInputChange} value={myAnswer} />
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
