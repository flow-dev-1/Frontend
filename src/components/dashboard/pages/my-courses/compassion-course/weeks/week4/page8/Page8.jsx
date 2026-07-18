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
import { getWeekAssessment } from "../../data";
import StepIndicator from "../../../components/StepIndicator";
import {
  userAnswer,
  saveAssessment,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import userService from "../../../../../../../../services/api/user";
import { queryClient } from "../../../../../../../../queryClient";
import { calculateResult } from "../../../utility";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";

function WeekFourPage8() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const currentWeek = useSelector(selectCurrentWeek);
  const assessmentData = getWeekAssessment(currentWeek);
  const totalSteps = assessmentData?.questions?.length || 0;
  const [answers, setAnswers] = useState([]); // State to hold answers
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const userAnswers = useSelector(userAnswer);
  const savedAssessments = userAnswers?.assessments;
  const isLastQuestion = currentStep === assessmentData.totalQuestions;
  const adminDatas = useSelector(adminData);
  // console.log(userAnswers,"userAn")

  // console.log(assessmentData,"Assessment data")

  useEffect(() => {
    setAnswers(savedAssessments || []);
    return () => {};
  }, [savedAssessments]);

  // Mutation for saving user data
  const mutation = useMutation({
    mutationFn: (data) => userService.submitCourseData(data), // Dispatch saveAssessment action
    onSuccess: async (data, submittedData) => {
      toast.dismiss();
      const queryKey = [
        "dashboard-compassion-course",
        submittedData.courseEnrollmentId,
        submittedData.week,
      ];
      queryClient.setQueryData(queryKey, (previousData) => ({
        ...(previousData || {}),
        assessment: {
          ...(previousData?.assessment || {}),
          course: submittedData.course,
          courseEnrollmentId: submittedData.courseEnrollmentId,
          week: submittedData.week,
          assessments: submittedData.assessments,
          rating: submittedData.rating,
        },
      }));
      await queryClient.invalidateQueries({ queryKey, exact: true });
      toast.success(
        `You scored ${calculateResult(
          assessmentData.questions,
          answers,
          totalSteps
        )}% in the quiz`
      );
      toast.success(data.message || "Answers saved successfully!"); // Show success toast
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
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const stepIndex = updatedAnswers.findIndex(
        (answer) => answer.id === currentStep
      );

      if (stepIndex !== -1) {
        updatedAnswers[stepIndex] = {
          ...updatedAnswers[stepIndex],
          value: optionKey,
        };
      } else {
        updatedAnswers.push({
          id: currentStep,
          value: optionKey,
        });
      }

      return updatedAnswers;
    });
  };

  const saveUserData = () => {
    if (adminDatas.isAdmin) return true;
    const stepData = answers.find((item) => item.id === currentStep);
    if (!stepData) {
      setErrorMessage("Oops! Please choose an option to proceed.");
      return false;
    }

    setErrorMessage(""); // Clear error if input is valid
    // If its the last question submit else update answer
    dispatch(saveAssessment(answers));

    if (isLastQuestion) {
      const answeredQuestionIds = new Set(
        answers
          .filter((answer) => answer?.value !== undefined && answer?.value !== "")
          .map((answer) => Number(answer.id))
      );
      const savedActivityPages = new Set(
        (userAnswers.activities || []).map((activity) => Number(activity.page))
      );
      const hasMissingAnswer =
        assessmentData.questions.some(
          (question) => !answeredQuestionIds.has(Number(question.id))
        ) || [2, 4, 6].some((page) => !savedActivityPages.has(page));
      if (hasMissingAnswer) {
        setErrorMessage(
          "Oops! Some unanswered questions have been detected. Kindly go back and review!"
        );
        return false;
      }
      const selectedActivity = userAnswers.activities.find(
        (activity) => activity.page === 6
      );
      const answer = selectedActivity?.answer;
      const totalLength =
        (answer?.green?.length || 0) +
        (answer?.orange?.length || 0) +
        (answer?.red?.length || 0);
      if (totalLength !== 10) {
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
        selectedOption={answers.find((answer) => answer.id === currentStep)?.value || ""}
        onOptionSelect={handleOptionSelect}
      />
    );
  };

  if (!assessmentData) return null;

  // If we're on the last question and user has made a selection,
  // show the review popup instead of the next button
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
      {errorMessage && <div className="text-danger">{errorMessage}</div>}{" "}
      {/* Display error message */}
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" loading={mutation.isPending} />
        <Button text="Next" customOnClick={saveUserData} loading={mutation.isPending} />
      </div>
    </>
  );
}

export default WeekFourPage8;
