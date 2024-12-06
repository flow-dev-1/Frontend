import React, { useState } from "react";
import QuestionBox from "../../../components/QuestionBox";
import AssessmentQuestion from "../../../components/AssessmentQuestion";
import Button from "../../../components/Button";

function WeekThreePage12() {
  const [currentStep, setCurrentStep] = useState(5);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AssessmentQuestion
            data={{
              question: `Can you identify the 3 key steps we learned about showing compassion for others as discussed in the lesson ‘‘ This will help you apply them in your daily life’’?`,
              options: [
                { A: `Seeing, Ignoring, and Criticizing` },
                {
                  B: `Seeing, Caring, and Doing`,
                },
                { C: `Helping, Judging, and Complaining` },
                { D: `Listening, Arguing, and Avoiding` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <AssessmentQuestion
            data={{
              question: `Which of the following is NOT a way of showing compassion to others?`,
              options: [
                { A: `Listening to a friend who is upset.` },
                { B: `Laughing at someone who made a mistake.` },
                {
                  C: `Offering help to a classmate struggling with a project.`,
                },
                { D: `Giving a compliment to cheer someone up.` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <AssessmentQuestion
            data={{
              question: `When practicing compassion for others, what is the first thing you should do?`,
              options: [
                { A: `Tell them what they did wrong.` },
                {
                  B: `Tell them what they did wrong.`,
                },
                {
                  C: `Ignore the situation and hope it improves.`,
                },
                {
                  D: `Immediately fix their problem.`,
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
              question: `Why is listening considered an act of compassion?`,
              options: [
                { A: `It makes you look good in front of others.` },
                { B: `It allows the person to feel heard and supported.` },
                {
                  C: `It distracts you from your own problems.`,
                },
                {
                  D: `It helps you get more information about someone’s issues.`,
                },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 5:
        return (
          <AssessmentQuestion
            data={{
              question: `Which of the following is a compassionate response when a friend fails a test?`,
              options: [
                { A: `"It’s your fault for not studying enough".` },
                {
                  B: `"Everyone fails sometimes; it’s okay. You’ll do better next time."`,
                },
                { C: `"This test wasn’t even hard; how could you fail?"` },
                {
                  D: `"Let’s just forget about it; it doesn’t matter."`,
                },
              ],
            }}
            currentStep={currentStep}
          />
        );
      default:
        return null;
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

export default WeekThreePage12;
