import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./page6.css";
import wishImage from "../../../../../../../../assets/wish-image.png";
import hugImage from "../../../../../../../../assets/hug-image.png";
import heartImage from "../../../../../../../../assets/heart-image.png";
import hugImage2 from "../../../../../../../../assets/hug-image-2.png";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import { selectPageData, selectCurrentStep } from "../../../../../../../../redux/reducers/navigationSlice";
import { userAnswer, saveActivity } from "../../../../../../../../redux/reducers/userAnswersReducer";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";

function WeekTwoPage6() {
  const dispatch = useDispatch()
  const pageData = useSelector(selectPageData);
  const [answers, setAnswers] = useState([]); // State to hold answers
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);

  useEffect(() => {

    if (!userAnswers) return
    const response = userAnswers.activities?.find(item => (item.page === pageData.id))
    const answerCopy = response?.answer ? [...response.answer] : []
    setAnswers(answerCopy)
    return () => { }

  }, [userAnswers])

  const saveUserInput = () => {
    if (adminDatas.isAdmin) return true
    if (answers.length < 4) {
      setErrorMessage("At least 4 values are required!");
      return false;
    }

    const emptyInputs = answers.filter((item) => item?.value?.trim() === "");
    if (emptyInputs.length > 0) {
      setErrorMessage(`Please fill out all inputs. ${emptyInputs.length} input(s) are missing.`);
      return false;
    }

    setErrorMessage(""); // Clear error if input is valid

    const activityData = {
      page: pageData.id,
      answer: answers
    };
    dispatch(saveActivity(activityData)); // Dispatch the saveActivity action

    return true;
  };

  const handleInputChange = (id, value) => {
    setErrorMessage("");
    // Update answers state with the new value
    setAnswers((prevAnswers) => {
        // Check if the answer already exists
        const existingAnswerIndex = prevAnswers.findIndex(answer => answer.id === id);
        if (existingAnswerIndex > -1) {
            // Update existing answer
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[existingAnswerIndex] = { ...updatedAnswers[existingAnswerIndex], value }; // Create a new object
            return updatedAnswers;
        } else {
            // Add new answer
            return [...prevAnswers, { id, value }];
        }
    });
  };

  // Map image imports to their filenames
  const imageMap = {
    'heart-image.png': heartImage,
    'hug-image.png': hugImage,
    'hug-image-2.png': hugImage2,
    'wish-image.png': wishImage,
  };

  return (
    <>
      <QuestionBox>
        <div className="container">
          {pageData.prompts.map((item, index) => (
            <div key={index} className="container-item">
              <h3 className="fs-1">{item.title}...</h3>
              <img src={imageMap[item.imgSrc]} alt="images" />
              <input
                type={pageData.inputType}
                placeholder={pageData.inputPlaceholder}
                value={answers.find(answer => answer.id === item.id)?.value || ''} 
                onChange={(e)=>handleInputChange(item.id,e.target.value)}
              />
            </div>
          ))}
        </div>
      </QuestionBox>
      {errorMessage && <div className="text-danger">{errorMessage}</div>} {/* Display error message */}
      <div className="d-flex justify-content-center gap-96px mt-4 ">
        <Button text="Prev" />
        <Button text="Next"
          customOnClick={saveUserInput}
        />
      </div>
    </>
  );
}

export default WeekTwoPage6;
