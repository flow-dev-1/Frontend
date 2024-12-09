import React, { useState } from "react";
import QuestionBox from "../../../components/QuestionBox";
import AssessmentQuestion from "../../../components/AssessmentQuestion";
import Button from "../../../components/Button";

function WeekFivePage4() {
  const [currentStep, setCurrentStep] = useState(2);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AssessmentQuestion
            data={{
              question: `From what you have learnt so far in the course, what do you understand by the term, ‘Self-Awareness? Please select from the following options.`,
              options: [
                {
                  A: `Self-awareness is knowing only your strengths and trying to hide your weaknesses from others`,
                },
                {
                  B: `Self-awareness means understanding your own thoughts, feelings, strengths, and weaknesses, and knowing how they affect your actions and relationships.`,
                },
                {
                  C: `Self-awareness is about comparing yourself to others to see how you measure up in life.`,
                },
                {
                  D: `Self-awareness means focusing on your goals without considering how you feel or what you've experienced in the past.`,
                },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <AssessmentQuestion
            data={{
              question: `To the best of your understanding, which of the following best describes the terms, ‘Strengths’ and ‘Weaknesses’?`,
              options: [
                {
                  A: `Strengths are the things you’re naturally good at and enjoy doing, while weaknesses are the things you dislike and should avoid altogether..`,
                },
                {
                  B: `Strengths are skills or qualities that help you succeed and make you feel confident, while weaknesses are areas where you might struggle or need improvement. Understanding both helps you grow.`,
                },
                {
                  C: `Strengths are the tasks you find easy to do, and weaknesses are the things you fail at, which means you should focus only on your strengths.`,
                },
                {
                  D: `Strengths are the things your parents say you can do, and weaknesses are things your parents say you cannot do.`,
                },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <AssessmentQuestion
            data={{
              question: `Why is it important to identify your personal values?`,
              options: [
                { A: `So you can have the same values as everyone else.` },
                {
                  B: `So you can prioritize what truly matters to you in life and make decisions that align with your beliefs.`,
                },
                {
                  C: `So you can easily change your values to fit different situations.`,
                },
                {
                  D: `So you can compare your values to those of others.`,
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
              question: `What is a growth mindset?`,
              options: [
                {
                  A: `Believing that your abilities and intelligence are fixed and cannot be changed.`,
                },
                {
                  B: `Believing that you can develop your abilities and intelligence through hard work, learning, and perseverance.`,
                },
                {
                  C: `C. Believing that you should avoid challenges to prevent failure.`,
                },
                {
                  D: `Believing that success comes from natural talent alone.`,
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
              question: `After failing a test, how would someone with a growth mindset respond?`,
              options: [
                {
                  A: `They would give up because they believe they aren’t smart enough.`,
                },
                {
                  B: `They would reflect on what they can learn from the experience and try harder next time.`,
                },
                { C: `They would blame others for their failure.` },
                {
                  D: `They would ignore the failure and move on without trying to improve.`,
                },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 6:
        return (
          <AssessmentQuestion
            data={{
              question: `What is Emotional Intelligence?`,
              options: [
                {
                  A: `The ability to understand and manage your own emotions.`,
                },
                {
                  B: `The ability to influence the emotions of others.`,
                },
                { C: `The ability to be self reliant.` },
                {
                  D: `Knowing how to read people's minds.`,
                },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 7:
        return (
          <AssessmentQuestion
            data={{
              question: `Why is it important to be emotionally intelligent?`,
              options: [
                { A: `To communicate better with others.` },
                {
                  B: `To understand why you feel the way you do.`,
                },
                { C: `To be able to react impulsively in situations.` },
                {
                  D: `To help you fight better.`,
                },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 8:
        return (
          <AssessmentQuestion
            data={{
              question: `In a conflict, how can emotional intelligence help you?`,
              options: [
                { A: `By helping you avoid the conflict entirely.` },
                {
                  B: `By helping you understand your emotions and respond calmly and effectively.`,
                },
                {
                  C: `By allowing you to dominate the conversation without considering others’ feelings.`,
                },
                {
                  D: `By suppressing your emotions until the conflict is over.`,
                },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 9:
        return (
          <AssessmentQuestion
            data={{
              question: `Your friends want candies, but you only want some cake because you think it is healthier. How will you communicate this to your friends?`,
              options: [
                { A: `By expressing your emotions clearly.` },
                {
                  B: `By aggressively telling your friends what is right.`,
                },
                {
                  C: `C. By understanding your friends emotions and responding appropriately.`,
                },
                {
                  D: `By ignoring your friends feelings.`,
                },
              ],
            }}
            currentStep={currentStep}
          />
        );
      case 10:
        return (
          <AssessmentQuestion
            data={{
              question: `You’re facing a difficult task that feels overwhelming. Which approach best reflects a growth mindset?`,
              options: [
                { A: `Avoiding the task because you’re afraid of failing.` },
                {
                  B: `Breaking the task into smaller, manageable steps and seeking help if needed.`,
                },
                {
                  C: `Complaining about how hard the task is without trying to solve it.`,
                },
                {
                  D: `Giving up because you think it’s too difficult for you to handle.`,
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

export default WeekFivePage4;
