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
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";
import "./page14.css";

function Page14ExamChoice() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );
    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    setSelectedOption(
      response?.answer?.selectedOption ?? draftAnswer?.selectedOption ?? null
    );
  }, [userAnswers, pageData.id]);

  const handleSelect = (index) => {
    setErrorMessage("");
    setSelectedOption(index);
    saveActivityDraft(userAnswers, pageData.id, {
      selectedOption: index,
      value: pageData.options?.[index] || "",
    });
  };

  const saveUserInput = () => {
    if (!adminDatas.isAdmin && selectedOption === null) {
      setErrorMessage("Oops! Please choose an option to proceed.");
      return false;
    }

    setErrorMessage("");
    if (adminDatas.isAdmin) return true;

    dispatch(
      saveActivity({
        page: pageData.id,
        answer: {
          selectedOption,
          value: pageData.options?.[selectedOption] || "",
        },
      })
    );
    clearActivityDraft(userAnswers, pageData.id);
    return true;
  };

  return (
    <>
      <QuestionBox extraStyle="bg-custom-blue">
        <div className="transition2-week4-page14-choice-content">
          <div className="d-flex gap-3 flex-column flex-md-row flex-md-nowrap align-items-start text-center">
            <h2 className="text-blue fs-1 mb-0 flex-shrink-0">Question:</h2>
            <div className="d-flex flex-column flex-grow-1 min-w-0">
              <h2 className="text-gray fs-1 mb-2">{pageData.question}</h2>
            </div>
          </div>

          <div className="transition2-week4-page14-choice-options">
            {pageData.options?.map((option, index) => (
              <button
                key={`${option}-${index}`}
                type="button"
                className="transition2-week4-page14-choice-option"
                onClick={() => handleSelect(index)}
              >
                <img
                  src={
                    selectedOption === index ? checkedImage : uncheckedImage
                  }
                  alt=""
                  className="transition2-week4-page14-choice-checkbox"
                />
                <span>
                  {pageData.optionLabels?.[index] ||
                    String.fromCharCode(65 + index)}
                  . {option}
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

export default Page14ExamChoice;
