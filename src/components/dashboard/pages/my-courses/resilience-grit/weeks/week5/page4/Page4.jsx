import SmartTextBox from "../../../components/SmartTextBox";
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
import MultiInput from "./components/MultiInputs";

function WeekFivePage4({ data, answers, setAnswers }) {
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
    setMyAnswer(response?.answer ? response.answer : "");
    return () => { };
  }, [userAnswers]);

  const saveUserInput = () => {
    return true
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


  const handleInputChange = (textBoxIndex, value) => {
    // setErrorMessage("");
    // setAnswers((prevAnswers) => {
    //   const updatedAnswers = [...prevAnswers];
    //   const stepIndex = updatedAnswers.findIndex(
    //     (answer) => answer.stepId === step
    //   );

    //   if (stepIndex !== -1) {
    //     updatedAnswers[stepIndex] = {
    //       ...updatedAnswers[stepIndex],
    //       value: {
    //         ...updatedAnswers[stepIndex].value,
    //         [textBoxIndex]: value, // Update specific index
    //       },
    //     };
    //   } else {
    //     updatedAnswers.push({
    //       stepId: step,
    //       value: {
    //         [textBoxIndex]: value,
    //       },
    //     });
    //   }

    //   return updatedAnswers;
    // });
  };

  return (
    <>
      <QuestionBox>
        <MultiInput
          pageData={pageData}
          // label={item.title} // ✅ Fix: Use `item.title`
          // value={
          //   answers.find((answer) => answer.stepId === step)?.value?.[
          //   textBoxIndex
          //   ] || ""
          // }
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </QuestionBox>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>

  );
}

export default WeekFivePage4;
