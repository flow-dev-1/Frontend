import QuestionBox from "../../../../components/QuestionBox";
import Button from "../../../../components/Button";
import checkedImage from "../../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../../assets/uncheckedBox.png";
import { useState } from "react";

function ScenariosOne() {
  const [selectedOption, setSelectedOption] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);

  const { question, options } = {
    question: `Your Friend Forgot Their Homework at Home.`,
    options: [
      {
        A: `You notice your friend is upset and say, "I'm sorry you forgot your homework," but don’t offer further help.`,
      },
      {
        B: `You notice your friend is upset, express concern by saying, "I can see you’re feeling worried about forgetting your homework." You then offer to share your notes and help them prepare for the class discussion.`,
      },
      {
        C: `You tell your friend, "I'll help by talking to the teacher with you," and offer to go with them to explain the situation to the teacher.`,
      },
    ],
  };
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <form className="d-flex gap-3">
              <h2 className="text-blue fs-1 ">Scenario 1: </h2>
              <div className="">
                <h3 className="fs-1"> {question}</h3>
                {options.map((option, index) => {
                  const optionKey = Object.keys(option)[0]; // Get key (A, B, C, D)
                  const optionText = option[optionKey]; // Get value (the text of the option)
                  const isChecked = selectedOption === optionKey;

                  return (
                    <div
                      key={index}
                      className="ms-5 d-flex gap-2 mb-3 align-items-center"
                    >
                      <input
                        type="radio"
                        id={optionKey}
                        name="options"
                        value={optionKey}
                        checked={isChecked}
                        onChange={handleOptionChange}
                        style={{ display: "none" }}
                      />
                      <img
                        src={isChecked ? checkedImage : uncheckedImage}
                        alt={optionKey}
                        style={{ width: 20, height: 20, cursor: "pointer" }}
                        onClick={() => setSelectedOption(optionKey)}
                      />
                      <label
                        htmlFor={optionKey}
                      >{`${optionKey}. ${optionText}`}</label>
                    </div>
                  );
                })}
              </div>
            </form>

            <p>
              Selected Option for testing purpose:{" "}
              {selectedOption ? selectedOption : "None"}
            </p>
          </div>
        );
      case 2:
        return (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <h3 className="fs-1 text-center">
              "It's good that you expressed concern by acknowledging their
              situation, but compassion involves more than just words. You
              noticed your friend’s worry (Observation), but you didn’t take any
              steps to actively help (Request). True compassion means going
              beyond just recognizing a problem and offering support when
              possible."
            </h3>
          </div>
        );
      case 3:
        return (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <h3 className="fs-1 text-center">
              "Great job! By choosing Option B, you’ve shown true compassion.
              You observed your friend’s situation and acknowledged their
              feelings by saying they are worried (Observation & Feeling). You
              understood their need for help (Need) and offered assistance by
              sharing your notes and helping them prepare. Offering practical
              support for the class discussion directly addresses their
              emotional and academic needs, showing real compassion."
            </h3>
          </div>
        );
      case 4:
        return (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <h3 className="fs-1 text-center">
              "It’s great that you’re taking initiative to help your friend by
              offering to speak to the teacher. This is a thoughtful way to
              address their need (Need). However, it’s important to confirm with
              your friend first that they are comfortable with you involving the
              teacher. Compassion also means respecting their feelings and
              ensuring they’re okay with the approach you take”
            </h3>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <QuestionBox>{renderStep()}</QuestionBox>

      <h2 className="text-center"> TODO: step indicator</h2>
      <div className="d-flex justify-content-center gap-4 mt-4">
        <Button text={"Prev"} />
        <Button text={"Next"} />
      </div>
    </>
  );
}

export default ScenariosOne;
