import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import AssessmentQuestion from "../../../components/AssessmentQuestion";
import Button from "../../../components/Button";
import {
  navigateNext,
  selectCurrentStep,
  selectCurrentWeek,
} from "../../../../../../../../redux/reducers/navigationSlice";
import { getWeekAssessment } from "../../../data";
import StepIndicator from "../../../components/StepIndicator";
import {
  userAnswer,
  saveAssessment,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import userService from "../../../../../../../../services/api/user";
import { calculateResult } from "../../../utility";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  clearAssessmentDraft,
  getAssessmentDraft,
  saveAssessmentDraft,
} from "../../../utils/assessmentDrafts";
import { syncTransition2AssessmentSubmission } from "../../../utils/assessmentSubmission";

function WeekOneAssessment() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const currentWeek = useSelector(selectCurrentWeek);
  const assessmentData = getWeekAssessment(currentWeek);
  const totalSteps = assessmentData?.questions?.length || 0;
  const [answers, setAnswers] = useState([]); // State to hold answers
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const userAnswers = useSelector(userAnswer);
  const isLastQuestion = currentStep === assessmentData.totalQuestions;
  const adminDatas = useSelector(adminData);

  useEffect(() => {
    if (!userAnswers) return;
    const draftAnswers = getAssessmentDraft(userAnswers, currentWeek);
    setAnswers(
      Array.isArray(draftAnswers)
        ? draftAnswers
        : userAnswers?.assessments || []
    );
  }, [currentWeek, userAnswers]);

  // Mutation for saving user data
  const mutation = useMutation({
    mutationFn: (data) => userService.submitCourseData(data), // Dispatch saveAssessment action
    onSuccess: async (data) => {
      await syncTransition2AssessmentSubmission({
        enrollmentId: userAnswers.courseEnrollmentId,
        week: currentWeek,
        assessment: data?.newAssessment,
      });

      toast.dismiss();
      toast.success(
        `You scored ${calculateResult(
          assessmentData.questions,
          answers,
          totalSteps
        )}% in the quiz`
      );
      toast.success(data.message || "Answers saved successfully!"); // Show success toast
      clearAssessmentDraft(userAnswers, currentWeek);
      dispatch(navigateNext());
    },
    onError: (error) => {
      console.log(error, "errorrrr");
      toast.dismiss();
      toast.error(error?.message || error?.error || "Error saving answers"); // Show error toast
    },
  });

  const handleOptionSelect = (optionKey) => {
    setErrorMessage("");
    const updatedAnswers = answers.filter(
      (answer) => answer.id !== currentStep
    );
    updatedAnswers.push({ id: currentStep, value: optionKey });

    setAnswers(updatedAnswers);
    saveAssessmentDraft(userAnswers, currentWeek, updatedAnswers);
    dispatch(saveAssessment(updatedAnswers));
  };

  const saveUserData = () => {
    if (adminDatas.isAdmin) {
      if (isLastQuestion) {
        dispatch(navigateNext());
        return false;
      }
      return true;
    }
    const stepData = answers.find((item) => item.id === currentStep);
    if (!stepData) {
      setErrorMessage("Oops! Please choose an option to proceed.");
      return false;
    }

    setErrorMessage(""); // Clear error if input is valid

    // If its the last question submit else update answer
    dispatch(saveAssessment(answers));

    if (isLastQuestion) {

      const hasUnansweredQuestions =
        answers.length !== totalSteps || userAnswers.activities.length !== 6;

      if (hasUnansweredQuestions) {
        setErrorMessage(
          "Oops! Some unanswered questions have been detected. Kindly go back and review!"
        );
        return false;
      }

      const userScore = calculateResult(
        assessmentData.questions,
        answers,
        totalSteps
      );

      mutation.mutate({
        ...userAnswers,
        assessments: answers,
        rating: userScore.toString(),
      });
      return true;

      // For nested questions check that all answeres were provided. when page is refreshed data may be lost

      // if (selectedActivityIsValid && selectedActivity1IsValid && selectedActivity2isValid) {

      // } else {
      //   setErrorMessage(
      //     "Oops! Some unanswered questions have been detected. Kindly go back and review!"
      //   );
      //   return false;
      // }
    } else {
      return true;
    }
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
        selectedOption={
          answers.find((answer) => answer.id === currentStep)?.value || ""
        }
        onOptionSelect={handleOptionSelect}
      />
    );
  };

  if (!assessmentData) return null;

  // If we're on the last question and user has made a selection,
  // show the review popup instead of the next button

  const hasCurrentSelection = answers.some(
    (answer) => answer.id === currentStep && answer.value
  );
  const shouldShowSubmitButton = isLastQuestion && hasCurrentSelection;

  return (
    <>
      <QuestionBox extraMobileStyle={"mobile-group-2"}>
        <div className="bg-blue text-white px-3 py-1 mb-2 assessment-header">
          <h2 className="fs-1 text-white text-center">
            {assessmentData.title}
          </h2>
          <p className="text-center">{assessmentData.subtitle}</p>
        </div>

        {renderStep()}
      </QuestionBox>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}{" "}
      {/* Display error message */}
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" loading={mutation.isPending} />
        {shouldShowSubmitButton ? (
          <Button
            text="Submit"
            customOnClick={saveUserData}
            loading={mutation.isPending}
          />
        ) : (
          <Button
            text="Next"
            customOnClick={saveUserData}
            loading={mutation.isPending}
          />
        )}
      </div>
    </>
  );
}

export default WeekOneAssessment;
