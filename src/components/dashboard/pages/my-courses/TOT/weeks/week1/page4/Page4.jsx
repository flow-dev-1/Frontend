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
import VideoComponent from "../../../components/Video";
import Feeling from "./components/feeling";


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
    setAnswers(Array.isArray(response?.answer) ? response.answer : []);
    return () => {};
  }, [userAnswers]);

  const saveUserInput = () => {
    if (adminDatas.isAdmin) return true;
    return true
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
      <VideoComponent videoSrc={pageData.videoSrc} />
      <Feeling />
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
