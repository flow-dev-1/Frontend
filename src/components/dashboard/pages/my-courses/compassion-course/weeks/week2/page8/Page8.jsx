import React, { useState } from "react";
import QuestionBox from "../../../components/QuestionBox";
import AssessmentQuestion from "../../../components/AssessmentQuestion";
import Button from "../../../components/Button";
import { getWeekAssessment } from "../../data";

function WeekTwoPage8() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({});

  const weekNumber = 2;
  const assessmentData = getWeekAssessment(weekNumber);

  const handleNext = () => {
    if (currentStep < assessmentData.totalQuestions) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

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

      <div className="d-flex flex-column align-items-center gap-3">
        <h2 className="text-center">
          Question {currentStep} of {assessmentData.totalQuestions}
        </h2>
      </div>
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        {currentStep > 1 && <Button text={"Prev"} onClick={handlePrev} />}
        {currentStep < assessmentData.totalQuestions && (
          <Button text={"Next"} onClick={handleNext} />
        )}
      </div>
    </>
  );
}

export default WeekTwoPage8;
