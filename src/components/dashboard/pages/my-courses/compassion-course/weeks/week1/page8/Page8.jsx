import React, { useState } from "react";
import QuestionBox from "../../../components/QuestionBox";
import AssessmentQuestion from "../../../components/AssessmentQuestion";
import Button from "../../../components/Button";

function Page8() {
  const [currentStep, setCurrentStep] = useState(4);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AssessmentQuestion
            data={{
              question: `What is the main idea behind compassion?`,
              options: [
                { A: `Observing without acting.` },
                { B: `Understanding feelings and providing help.` },
                { C: `Judging others based on their actions` },
                { D: `Ignoring others' needs.` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <AssessmentQuestion
            data={{
              question: `Whem working on a group project, how do you typically contribute?`,
              options: [
                { A: `Observing without acting.` },
                { B: `Understanding feelings and providing help` },
                { C: `Judging others based on their actions` },
                { D: `Ignoring others' needs` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <AssessmentQuestion
            data={{
              question: `Which of the following best describes Compassionate Communication (NVC)?`,
              options: [
                { A: `A way to win arguments` },
                { B: `A theory that explains evolution` },
                {
                  C: `A method to connect with others through compassionate expression`,
                },
                { D: `A strategy t oavoid communication` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 4:
        return (
          <AssessmentQuestion
            data={{
              question: `Which component of NVC involves expressing how you feel?`,
              options: [
                { A: `Observations.` },
                { B: `Feelings.` },
                { C: `Needs.` },
                { D: `Request.` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 5:
        return (
          <AssessmentQuestion
            data={{
              question: `Why is it important to practice compassion?`,
              options: [
                { A: `It helps us with friends.` },
                {
                  B: `It creates stronger relationship and makes us feel valued`,
                },
                { C: `It helps us avoid conflicts` },
                { D: `It makes us appear more popular` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 6:
        return (
          <AssessmentQuestion
            data={{
              question: `In the school scenario explained in the video, which step of NVC did the student use when they said, "I need some quiet time to complete my arguments?`,
              options: [
                { A: `Observation.` },
                { B: `Feeling.` },
                { C: `Need.` },
                { D: `Request.` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      default:
        return <div>Invalid Step</div>;
    }
  };
  return (
    <>
      <QuestionBox>
        <div className="bg-blue text-white p-3 mb-3">
          <h2 className="fs-1 text-white text-center">Assessment</h2>
          <p className="text-center">Let's test your knowlege</p>
        </div>

        {renderStep()}
      </QuestionBox>
      //todo indicator
      <h2 className="text-center">step indicator</h2>
      <div className="d-flex justify-content-center gap-4 mt-4">
        {currentStep > 1 && <Button text={"Prev"} />}
        <Button text={"Next"} />
      </div>
    </>
  );
}

export default Page8;
