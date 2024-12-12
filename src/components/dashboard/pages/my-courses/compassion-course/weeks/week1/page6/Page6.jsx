import React, { useState } from "react";
import QuestionBox from "../../../components/QuestionBox";
import Frame from "./components/Frame";
import Button from "../../../components/Button";
import getPageContent from "../../data";

function Page6() {
  const currentWeek = 1;
  const currentPage = 6;
  const pageData = getPageContent(currentWeek, currentPage);
  const [currentStep, setCurrentStep] = useState(5);
  const totalSteps = pageData.steps.length;

  const renderStep = () => {
    const step = pageData.steps[currentStep - 1];

    if (!step) return <div>Invalid Step</div>;

    switch (step.type) {
      case "instruction":
        return (
          <QuestionBox>
            <div className="text-center mb-5">
              <h2 className="text-white bg-primary p-4 fs-1 rounded d-inline">
                {step.title}
              </h2>
            </div>
            <div className="d-flex gap-2">
              <h2 className="text-blue fs-1">Instructions: </h2>
              <h2 className="text-gray fs-1">{step.instructions}</h2>
            </div>
          </QuestionBox>
        );
      case "scenario":
        return (
          <Frame
            data={{
              title: step.title,
              questions: step.questions.map(q => ({
                [q.type]: q.question
              }))
            }}
          />
        );
      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <>
      {renderStep()}
      <h2 className="text-center">step indicator</h2>
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        {currentStep > 1 && (
          <Button 
            text={"Prev"} 
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          />
        )}
        {currentStep < totalSteps && (
          <Button 
            text={"Next"} 
            onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
          />
        )}
      </div>
    </>
  );
}

export default Page6;
