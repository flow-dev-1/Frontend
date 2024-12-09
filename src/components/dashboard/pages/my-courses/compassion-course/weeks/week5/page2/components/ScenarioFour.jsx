import QuestionBox from "../../../../components/QuestionBox";
import Button from "../../../../components/Button";
import checkedImage from "../../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../../assets/uncheckedBox.png";
import { useState } from "react";

function ScenariosFour() {
  const [selectedOption, setSelectedOption] = useState(null);

  const [currentStep, setCurrentStep] = useState(4);

  const { question, options } = {
    question: `Your Friend Failed a Test While You Scored the Highest.`,
    options: [
      {
        A: `Brag about your high score and tell them they should have studied harder.`,
      },
      {
        B: `Ignore their feelings and continue to celebrate your own success.`,
      },
      {
        C: `Encourage them by reminding them that one test doesn’t define their abilities, and that you can help them study for the next one.`,
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
          <div className="">
            <form className="d-flex gap-3">
              <h2 className="text-blue fs-1">Scenario 4: </h2>
              <div className="">
                <h3 className="fs-1"> {question[currentStep]}</h3>
                {options[currentStep].map((option, index) => {
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
              "If you choose Option A, understand that bragging about your
              success might make your friend feel worse. It's important to
              celebrate your achievements, but not in a way that hurts others.
              Telling them they should have studied harder isn’t very kind.
              Sometimes, people need support and encouragement instead of
              criticism when they feel down."
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
              "Did you choose Option B? Not quite right, Ignoring your friend’s
              feelings might make them feel even more alone. When someone is
              upset, it's important to be aware of how they’re feeling and offer
              them comfort. You can still be proud of your success, but showing
              kindness and understanding to your friend can make them feel
              better and strengthen your friendship."
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
              Did you choose Option C? Great job! Encouraging your friend and
              reminding them that the test doesn’t define their abilities is
              very good, and is a compassionate act. Ignoring their feelings and
              bragging about your score is not compassionate and not kind in any
              way.
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

export default ScenariosFour;
