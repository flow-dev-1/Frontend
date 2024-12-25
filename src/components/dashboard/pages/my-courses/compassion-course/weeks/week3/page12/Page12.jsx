import React, { useState } from "react";
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

function WeekThreePage12() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const currentWeek = useSelector(selectCurrentWeek);
  const [selections, setSelections] = useState({});

  const assessmentData = getWeekAssessment(currentWeek);
  const totalSteps = assessmentData?.questions?.length || 0;

  const handleOptionSelect = (optionKey) => {
    setSelections((prev) => ({
      ...prev,
      [currentStep]: optionKey,
    }));
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
        selectedOption={selections[currentStep]}
        onOptionSelect={handleOptionSelect}
      />
    );
  };

  if (!assessmentData) return null;

  // If we're on the last question and user has made a selection,
  // show the review popup instead of the next button
  const isLastQuestion = currentStep === assessmentData.totalQuestions;
  const hasCurrentSelection = !!selections[currentStep];
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

      <StepIndicator totalSteps={totalSteps} />

      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        <Button text="Prev" />
        {shouldShowReviewButton ? (
          <Button
            text="Review"
            customOnClick={() => dispatch(showReviewPopup())}
          />
        ) : (
          <Button text="Next" />
        )}
      </div>
    </>
  );
}

export default WeekThreePage12;
