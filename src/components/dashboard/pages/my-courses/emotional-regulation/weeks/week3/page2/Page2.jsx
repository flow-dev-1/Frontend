import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import StepIndicator from "../../../components/StepIndicator";
import BigTextBox from "../../../components/BigTextBox";
import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import SONARFrame from "./components/SONARFrame";

function WeekThreePage2() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData); 
  // const pageData = {
  //   id: 4,
  //   type: "multiStep",
  //   steps: [
  //     {
  //       stepId: 1,
  //       type: "instruction",
  //       title: "Instruction",
  //       instructions: [
  //         "Read the scenarios provided and write down what you would do for each step of SONAR (Stop, Observe, Name, Accept, Regulate).",
  //         "Click each letter starting from S to answer the guiding question. Complete S before proceeding to O, and so on.",
  //       ],
  //     },
  //     {
  //       stepId: 2,
  //       type: "sonar",
  //       title: "SONAR Scenario",
  //       // letters are ordered; key is single-letter identifier used in state
  //       letters: [
  //         {
  //           key: "S",
  //           label: "S",
  //           labelFull: "STOP",
  //           question: "What would you do first to stop the immediate reaction?",
  //         },
  //         {
  //           key: "O",
  //           label: "O",
  //           labelFull: "OBSERVE",
  //           question:
  //             "What are you noticing in your body, thoughts, and surroundings?",
  //         },
  //         {
  //           key: "N",
  //           label: "N",
  //           labelFull: "NAME",
  //           question: "How would you name the emotion(s) you are feeling?",
  //         },
  //         {
  //           key: "A",
  //           label: "A",
  //           labelFull: "ACCEPT",
  //           question: "What would acceptance look like in this moment?",
  //         },
  //         {
  //           key: "R",
  //           label: "R",
  //           labelFull: "REGULATE",
  //           question: "What strategy will you use to regulate your response?",
  //         },
  //       ],
  //       // scenario text(s) - consumed by SONARFrame if you want to render dynamic text
  //       scenario: {
  //         heading: "Scenario 1",
  //         text: "you feel really mad because someone cut in line at lunch",
  //       },
  //     },
  //   ],
  //   navigation: { prev: true, next: true },
  // };

  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData?.steps?.length || 0;
  const [answers, setAnswers] = useState({}); 
  const [errorMessage, setErrorMessage] = useState("");
  const step = pageData?.steps[currentStep - 1];
  const userAnswers = useSelector(userAnswer);
  const adminDatas = useSelector(adminData);

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );
    if (response?.answer) {
      setAnswers(response.answer);
    }
  }, [userAnswers, pageData?.id]);

  const saveUserInput = () => {
    // skip validation for instruction step
    if (currentStep === 1) return true;
    if (adminDatas.isAdmin) return true;

    if (step?.type === "sonar") {
      const letters = step.letters || [];
      // ensure each letter completed sequentially and non-empty
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i].key;
        // require previous letters filled (sequential)
        if (i > 0) {
          const prevKey = letters[i - 1].key;
          if (!answers[prevKey] || !answers[prevKey].trim()) {
            setErrorMessage(
              `Please complete "${letters[i - 1].label}" before proceeding.`
            );
            return false;
          }
        }
        // ensure current letter not empty
        if (!answers[letter] || !answers[letter].trim()) {
          setErrorMessage(
            `Please complete "${letters[i].label}" before proceeding.`
          );
          return false;
        }
      }

      setErrorMessage("");
      const activityData = {
        page: pageData.id,
        answer: answers,
      };
      dispatch(saveActivity(activityData));
      return true;
    }

    return true;
  };

  const renderStep = () => {
    if (!step) return <div>Invalid Step</div>;
    switch (step.type) {
      case "instruction":
        return (
          <QuestionBox >
            <div className="text-center mb-5 mt-5 mt-md-4">
              <h1 className="text-white bg-blue py-2 px-5 rounded d-inline  ">
                Instruction
              </h1>
            </div>

            <div className="text-center mb-5 mt-3 mt-md-0">
              {step.instructions.map((instruction, index) => (
                <React.Fragment key={index}>
                  <h2 className="text-gray py-2 px-5 rounded d-inline-block text-start ">
                    {instruction}
                  </h2>
                  {index < step.instructions.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </QuestionBox>
        );

      case "sonar":
        return (
          <SONARFrame
            letters={step.letters}
            answers={answers}
            setAnswers={setAnswers}
            setErrorMessage={setErrorMessage}
          />
        );

      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <>
      {renderStep()}
      {currentStep !== 1 && errorMessage && (
        <div className="text-danger text-center mt-3 fw-bold fs-5">
          {errorMessage}
        </div>
      )}
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekThreePage2;
