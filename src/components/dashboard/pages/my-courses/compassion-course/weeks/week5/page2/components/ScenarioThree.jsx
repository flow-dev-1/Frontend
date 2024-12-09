import QuestionBox from "../../../../components/QuestionBox";
import Button from "../../../../components/Button";
import checkedImage from "../../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../../assets/uncheckedBox.png";
import { useState } from "react";

function ScenariosThree() {
  const [selectedOption, setSelectedOption] = useState(null);

  const [currentStep, setCurrentStep] = useState(4);

  const { question, options } = {
    question: `A New Boy Comes to Class and is Nervous About Joining Others to Play.`,
    options: [
      {
        A: `Invite him to join your group and introduce him to other classmates.`,
      },
      {
        B: `Casually remind yourself it's not your responsibility to make new students feel welcome.`,
      },
      {
        C: `Pull him into the game without his permission.`,
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
              <h2 className="text-blue fs-1">Scenario 3: </h2>
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
              Did you choose Option A? Great job! Inviting him and giving him
              the option to choose to participate or not is a very compassionate
              act. However, pulling him into the game without his permission and
              ignoring him are not acts of compassion. 
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
              "If you choose Option B, Understand that, while it might feel like
              it’s not your job to welcome others, we all play a part in making
              people feel included. Imagine if you were new and nervous—having
              someone reach out can make a big difference. Showing kindness and
              helping others feel comfortable is always a great thing to do."
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
              "Option C might seem like you're helping by pulling him into the
              game, but forcing someone to do something can make them feel even
              more nervous. It’s important to ask and give them the choice. When
              someone is new, they might need time to get comfortable, and being
              kind and patient can help them feel safe and ready to join when
              they’re ready."
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

export default ScenariosThree;
