import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import "./page14.css";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";

function Page14() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const [myAnswer, setMyAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );
    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    setMyAnswer(response?.answer ?? draftAnswer ?? "");
  }, [userAnswers, pageData.id]);

  const handleSelect = (option) => {
    setErrorMessage("");
    setMyAnswer(option);
    saveActivityDraft(userAnswers, pageData.id, option);
  };

  const saveUserInput = () => {
    if (!adminDatas.isAdmin && !myAnswer) {
      setErrorMessage("Oops! Please select the answer that best reflects you.");
      return false;
    }

    setErrorMessage("");
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

  return (
    <>
      <QuestionBox extraStyle="bg-custom-blue">
        <div className="transition2-page14-content">
          <h2 className="transition2-page14-question">{pageData.question}</h2>
          <div className="transition2-page14-options">
            {pageData.options?.map((option, index) => (
              <button
                key={option}
                type="button"
                className="transition2-page14-option"
                onClick={() => handleSelect(option)}
              >
                <img
                  src={myAnswer === option ? checkedImage : uncheckedImage}
                  alt=""
                  className="transition2-page14-checkbox"
                />
                <span>
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </button>
            ))}
          </div>
        </div>
      </QuestionBox>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default Page14;
