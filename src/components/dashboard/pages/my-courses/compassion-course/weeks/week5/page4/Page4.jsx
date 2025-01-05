import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import AssessmentQuestion from "../../../components/AssessmentQuestion";
import Button from "../../../components/Button";
import {
  selectCurrentStep,
  selectCurrentWeek,
  showReviewPopup,
} from "../../../../../../../../redux/reducers/navigationSlice";
import { getWeekAssessment } from "../../data";
import StepIndicator from "../../../components/StepIndicator";
import { userAnswer, saveActivity, saveAssessment } from "../../../../../../../../redux/reducers/userAnswersReducer";


function WeekFivePage4() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const currentWeek = useSelector(selectCurrentWeek);
  const assessmentData = getWeekAssessment(currentWeek);
  const totalSteps = assessmentData?.questions?.length || 0;
  const [answers, setAnswers] = useState([]); // State to hold answers
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const userAnswers = useSelector(userAnswer);
  const isLastQuestion = currentStep === assessmentData.totalQuestions;

  // console.log(userAnswers,"userAn")

  // console.log(assessmentData,"Assessment data")

  // useEffect(() => {

  //   if (!userAnswers) return
  //   const response = userAnswers.assessments?.find(item => (item.page === pageData.id))
  //   setAnswers(response?.answer ? response.answer : [])
  //   return () => { }

  // }, [userAnswers])

  const handleOptionSelect = (optionKey) => {
    setErrorMessage("")
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const stepIndex = updatedAnswers.findIndex((answer) => answer.id === currentStep);

      if (stepIndex !== -1) {
        updatedAnswers[stepIndex] = {
          ...updatedAnswers[stepIndex],
          value: optionKey
        };
      } else {
        updatedAnswers.push({
          id: currentStep,
          value: optionKey
        });
      }

      return updatedAnswers;
    });
  };

  console.log(answers,"Answers here")

  const saveUserData = () => {
    const stepData = answers.find(item => item.id === currentStep);
    if (!stepData) {
      setErrorMessage("Oops! Please choose an option to proceed.");
      return false;
    }

    setErrorMessage(""); // Clear error if input is valid

    // If its the last question submit else update answer
    dispatch(saveAssessment(answers)); 

    if(isLastQuestion){
      // Check if all answers were provided bothe for assessment and activity
      if(answers.length !== totalSteps || userAnswers.activities.length < 3) {
        setErrorMessage("Oops! Something went wrong.");
        return false
      } 

      // Submit Data
      console.log(answers)

    }
     // Dispatch the saveActivity action
      return true;
    
  };


  const renderStep = () => {
    if (!assessmentData) return <div>Loading assessment...</div>;

    const currentQuestion = assessmentData.questions[currentStep - 1];
    if (!currentQuestion) return <div>Invalid Step</div>;

    const formattedOptions = currentQuestion.options.map((option) => ({
      [option.id]: option.text,
    }));

    return (
      <AssessmentQuestion
        data={{
          question: currentQuestion.question,
          options: formattedOptions,
        }}
        currentStep={currentStep}
        selectedOption={answers[currentStep-1]?.value || ""}
        onOptionSelect={handleOptionSelect}
      />
    );
  };

  if (!assessmentData) return null;

  // If we're on the last question and user has made a selection,
  // show the review popup instead of the next button

  const hasCurrentSelection = !!answers[currentStep];
  const shouldShowReviewButton = isLastQuestion && hasCurrentSelection;

  return (
    <>
      <QuestionBox>
        <div className="bg-blue text-white p-3 mb-3">
          <h2 className="fs-1 text-white text-center">
            {assessmentData.title}
          </h2>
          <p className="text-center">{assessmentData.subtitle}</p>
        </div>

        {renderStep()}
      </QuestionBox>
      {errorMessage && <div className="text-danger">{errorMessage}</div>} {/* Display error message */}
      <StepIndicator totalSteps={totalSteps} />

      <div className="d-flex justify-content-center gap-96px mt-4 ">
        <Button text="Prev" />
        {shouldShowReviewButton ? (
          <Button
            text="Review"
            customOnClick={() => dispatch(showReviewPopup())}
          />
        ) : (
          <Button text="Next" customOnClick={saveUserData} />
        )}
      </div>
    </>
  );
}

export default WeekFivePage4;
