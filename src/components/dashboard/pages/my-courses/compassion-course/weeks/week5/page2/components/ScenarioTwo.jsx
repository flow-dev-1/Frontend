import QuestionBox from "../../../../components/QuestionBox";
import Button from "../../../../components/Button";
import checkedImage from "../../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../../assets/uncheckedBox.png";
import { useState } from "react";

function ScenariosTwo() {
  const [selectedOption, setSelectedOption] = useState(null);

  const [currentStep, setCurrentStep] = useState(4);

  const { question, options } = {
    question: `You Go Out with Your Family to Dinner and Your Sibling is Rude to the Waiter.`,
    options: [
      {
        A: `Politely apologize to the waiter for your sibling’s behavior and thank them for their service.`,
      },
      { B: `Ignore the situation and eat your food quietly.` },
      {
        C: `Suggest to your family that you all leave a generous tip to make up for the rudeness.`,
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
              <h2 className="text-blue fs-1">Scenario 2: </h2>
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
              Great job! Apologizing to the waiter and being extra polite shows
              compassion and respect, making the waiter feel valued despite the
              rudeness. Also note that option C is not an act of compassion as
              giving the waiter money in that instant will be more of an insult
              than a compassionate act. Apologizing is the best way to show
              compassion to the waiter; this will also communicate to your
              sibling that they were wrong and probably make them feel sorry
              too.
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
              "Oh, did you choose Option B? Ignoring the situation might seem
              like the easiest choice, but it doesn't help anyone. The waiter
              might still feel hurt, and your sibling won’t learn how to treat
              others kindly. When we notice someone is being treated unfairly,
              it's important to speak up politely or show kindness in some way."
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
              "If you choose Option C Understand that leaving a tip is a nice
              gesture, but in this case, it's not enough to fix the problem.
              Giving the waiter money won’t make them feel respected. What they
              really need is for someone to say sorry and acknowledge their
              feelings. Showing kindness through words is more powerful than
              giving money in this situation."
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

export default ScenariosTwo;
