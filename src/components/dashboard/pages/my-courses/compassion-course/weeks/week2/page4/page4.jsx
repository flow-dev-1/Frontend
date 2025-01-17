import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./page4.css";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";

function WeekTwoPage4() {
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
    const answerCopy = response?.answer ? response.answer : "";
    setMyAnswer(answerCopy);
    return () => {};
  }, [userAnswers]);
  console.log("my answer", userAnswers);

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
    return true;
  };

  const handleInputChange = (e) => {
    setErrorMessage("");
    setMyAnswer(e.target.value);
  };

  return (
    <>
      <QuestionBox>
        <h2 className="text-center text-blue fs-1 letter">{pageData.title}</h2>
        <div className="letter-container">
          <div className="letter-info">
            {pageData.instructions.map((instruction, index) => (
              <h3 key={index} className="fs-2 mb-2">
                {instruction}
              </h3>
            ))}
          </div>
          <div className="letter-content">
            <label className="w-100 p-5 border-0" style={{ height: "100%" }}>
              <textarea
                className="border-0 w-100 bg-transparent border-outline-0 no-scrollbar resize-none"
                cols={pageData.textareaConfig.cols}
                rows={pageData.textareaConfig.rows}
                placeholder={pageData.textareaConfig.placeholder}
                onChange={handleInputChange}
                value={myAnswer}
              ></textarea>
            </label>
          </div>
        </div>
      </QuestionBox>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <div className="d-flex justify-content-center gap-96px mt-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekTwoPage4;
