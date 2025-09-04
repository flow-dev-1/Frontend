import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./page4.css";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import QuestionBox from "../../../components/QuestionBox";
import ColoredTextField from "../../../components/ColoredTextField";
import "./page4.css"

function WeekFourPage4() {
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
    const answerCopy = response?.answer ? [...response.answer] : [];
    setAnswers(answerCopy);
    return () => { };
  }, [userAnswers]);

  const saveUserInput = () => {
    if (adminDatas.isAdmin) return true;
    if (answers.length < 3) {
      setErrorMessage("At least 3 values are required!");
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
      if (existingAnswerIndex > -1) {
        // Update existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          value,
        };
        return updatedAnswers;
      } else {
        // Add new answer
        return [...prevAnswers, { index, value }];
      }
    });
  };


  return (
    <>
      <QuestionBox
      extraMobileStyle={"mobile-group-2"}
      >
        <div className="container">
          <div className="row justify-content-between align-items-start g-4">
            {/* Question heading */}
            <div className="d-flex gap-3 flex-column flex-md-row align-items-start mb-4">
              <h2 className="text-blue week-2-question-text week-4-question-text-mobile">Question: </h2>
              <h2 className="text-gray week-2-question-text week-4-question-text">{pageData.question}</h2>
            </div>

            {/* Fields stack on mobile, row on desktop */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start w-100 gap-3">
              {pageData.fields.map((field, index) => (
                <div
                  key={index}
                  className="d-flex flex-column align-items-center flex-fill px-3"
                  style={{ minWidth: { md: "150px" } }}
                >
                  {/* Label */}
                  <h2
                    className="d-flex justify-content-center align-items-center p-3 px-5 week-4-label"
                    style={{
                      backgroundColor: field.colorCode
                    }}
                  >
                    {field.number}
                  </h2>

                  {/* Expanding Textarea */}
                  <div className="w-100">
                    <ColoredTextField
                      index={index}
                      color={field.textFieldColor}
                      value={answers.find((answer) => answer.index === index)?.value || ""}
                      handleChange={(e) => handleInputChange(index, e.target.value)}
                      extraMobileStyles={"week-4-textarea"}
                    />
                  </div>
                </div>
              ))}
            </div>
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

export default WeekFourPage4;
