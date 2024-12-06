import React, { useState } from "react";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../assets/uncheckedBox.png";

function WeekThreePage4() {
  const [selectedOption, setSelectedOption] = useState(null);

  const [currentStep, setCurrentStep] = useState(4);

  const { question, options } = {
    question: `Imagine you're at break-period, and you see a classmate sitting alone, looking upset. What would you do in this situation?`,
    options: [
      { A: `Go over and ask if they are okay.` },
      { B: `Ignore it; they probably want to be left alone.` },
      {
        C: `B. Ignore it; they probably want to be left alone.`,
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
              <h2 className="text-blue fs-1">Question: </h2>
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
              Great! Let’s talk about why reaching out, even in a small way, can
              be a powerful act of compassion.
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
              This can be handled better,  try again to see what can be done
              differently.
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
              If you immediately tell a teacher or an adult, ensure to follow up
              with the situation and encourage the person. However what we need
              you for this time is different.
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

export default WeekThreePage4;
