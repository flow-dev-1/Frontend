import React from "react";
import { useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import Frame from "./components/Frame";
import Button from "../../../components/Button";
import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import StepIndicator from "../../../components/StepIndicator";

function Page6() {
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData?.steps?.length || 0;

  const renderStep = () => {
    const step = pageData?.steps[currentStep - 1];

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
              questions: step.questions.map((q) => ({
                [q.type]: q.question,
              })),
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
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px mt-4 ">
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </>
  );
}

export default Page6;
