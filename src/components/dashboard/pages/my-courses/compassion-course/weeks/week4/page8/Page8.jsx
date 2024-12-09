import React, { useState } from "react";
import QuestionBox from "../../../components/QuestionBox";
import AssessmentQuestion from "../../../components/AssessmentQuestion";
import Button from "../../../components/Button";

function WeekFourPage8() {
  const [currentStep, setCurrentStep] = useState(5);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AssessmentQuestion
            data={{
              question: `What is the Circle of Concern?`,
              options: [
                { A: `A way to decide which people to ignore.` },
                {
                  B: `A concept that helps identify who is in your inner and outer circles.`,
                },
                { C: `A rule about how to be strict with strangers.` },
                { D: `A list of tasks to do for your friends and family.` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <AssessmentQuestion
            data={{
              question: `Who would be considered part of your inner circle?`,
              options: [
                { A: `A stranger you see every day on your way to school.` },
                { B: `Your best friend.` },
                {
                  C: `Your classmate whom you rarely talk to.`,
                },
                { D: `A neighbor.` },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <AssessmentQuestion
            data={{
              question: `Which of the following actions would be more appropriate for your inner circle rather than your outer circle?`,
              options: [
                { A: `Smiling at someone you pass on the street.` },
                {
                  B: `Listening to your someone’s personal problems.`,
                },
                {
                  C: `Greeting a classmate in the hallway.`,
                },
                {
                  D: `Offering to help a stranger carry groceries.`,
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
              question: `What should you consider when showing compassion to people in your outer circle?`,
              options: [
                { A: `Ignoring their needs.` },
                { B: `Being kind but keeping safe boundaries.` },
                {
                  C: `Treating them the same as your family.`,
                },
                {
                  D: `Offering them everything you have.`,
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
              question: `Which of the following is an action that can be appropriate for both inner and outer circles?`,
              options: [
                { A: `Sharing your personal secrets.` },
                {
                  B: `Offering a smile or a compliment.`,
                },
                { C: `Loaning money to a stranger.` },
                {
                  D: `Inviting them into your home.`,
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

export default WeekFourPage8;
