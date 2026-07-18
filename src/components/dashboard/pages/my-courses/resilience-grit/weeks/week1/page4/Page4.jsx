import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./page4.css";
import Button from "../../../components/Button";
import QuestionBox from "../../../components/QuestionBox";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";

function Page4() {
  const pageData = useSelector(selectPageData);
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState([]); // State to hold answers
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const adminDatas = useSelector(adminData);

  const userAnswers = useSelector(userAnswer);

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
    return () => {};
  }, [pageData.id, userAnswers]);

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

  const handleInputChange = (index, value) => {
    setErrorMessage("");
    // Update answers state with the new value
    setAnswers((prevAnswers) => {
      // Check if the answer already exists
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.index === index
      );
      let nextAnswers;
      if (existingAnswerIndex > -1) {
        // Update existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          value,
        };
        nextAnswers = updatedAnswers;
      } else {
        // Add new answer
        nextAnswers = [...prevAnswers, { index, value }];
      }

      saveActivityDraft(userAnswers, pageData.id, nextAnswers);
      return nextAnswers;
    });
  };

  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-3 flex-column flex-md-row">
          <h2 className="text-blue week-2-question-text">Question:</h2>
          <h2 className="text-gray week-2-question-text">{pageData.question}</h2>
        </div>

        <div className="input-container">
          {[...Array(pageData.numberOfInputs || 5)].map((_, index) => (
            <div key={index}>
              <div className="d-flex gap-3 label-input-container">
                <p className="input-label">{index + 1}.</p>
                <input
                  type="text"
                  className="resilience-input"
                  placeholder={
                    pageData.inputPlaceholder || "Type your answer here"
                  }
                  value={
                    answers.find((answer) => answer.index === index)?.value ||
                    ""
                  }
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </QuestionBox>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}{" "}
      {/* Display error message */}
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default Page4;
