import React, { useState } from "react";
import QuestionBox from "../../../components/QuestionBox";
import AssessmentQuestion from "../../../components/AssessmentQuestion";
import Button from "../../../components/Button";

function WeekTwoPage8() {
  const [currentStep, setCurrentStep] = useState(4);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AssessmentQuestion
            data={{
              question: `What does self-compassion mean?`,
              options: [
                { A: `Do nothing.` },
                {
                  B: `Being kind and understanding towards yourself when things go wrong.`,
                },
                { C: `Comparing yourself to others` },
                { D: `Being perfect in everything you do.` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <AssessmentQuestion
            data={{
              question: `Which of the following is an example of self-compassion?`,
              options: [
                { A: `Criticizing yourself for every mistake.` },
                { B: `Pretending that your feelings does'nt exist.` },
                { C: `Speaking to yourself kindly when you fail.` },
                { D: `Blaming others for your problems.` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <AssessmentQuestion
            data={{
              question: `Which of these is NOT a way to practice self-compassion?`,
              options: [
                { A: `Setting boundaries and saying no when needed.` },
                {
                  B: `Engaging in positive self-talk when you make mistakes.`,
                },
                {
                  C: `Ignoring your feelings and pretending everything is okay.`,
                },
                {
                  D: `Practicing mindfulness by paying attention to your emotions. `,
                },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 4:
        return (
          <AssessmentQuestion
            data={{
              question: `What should you do when you find yourself being overly critical after making a mistake?`,
              options: [
                { A: `Keep criticizing yourself to improve.` },
                { B: `Continue thinking about the mistake.` },
                {
                  C: `Treat yourself kindly, as you would treat a friend in the same situation.`,
                },
                { D: `sk others to tell you what you did wrong.` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 5:
        return (
          <AssessmentQuestion
            data={{
              question: `Why is self-compassion important?`,
              options: [
                { A: `It helps us avoid all mistakes.` },
                {
                  B: `It makes us feel better and helps us bounce back from challenges.`,
                },
                { C: `It allows us to be kind to others.` },
                {
                  D: `It allows us to criticize ourselves in order to avoid further mistakes. `,
                },
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

export default WeekTwoPage8;
