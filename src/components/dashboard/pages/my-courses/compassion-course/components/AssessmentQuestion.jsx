import React, { useState } from "react";

import checkedImage from "../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../assets/uncheckedBox.png";

function AssessmentQuestion({ data, currentStep }) {
  const { question, options } = data;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="ms-5">
      <form>
        <h3 className="fs-1">
          {currentStep}. {question}
        </h3>
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
              <label htmlFor={optionKey}>{`${optionKey}. ${optionText}`}</label>
            </div>
          );
        })}
      </form>

      <p>
        Selected Option for testing purpose:{" "}
        {selectedOption ? selectedOption : "None"}
      </p>
    </div>
  );
}

export default AssessmentQuestion;
