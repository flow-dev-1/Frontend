import React, { useState } from "react";
import QuestionBox from "../../../../components/QuestionBox";
import LetterModal from "./LetterModal";
import "../page2.css";

function SONARFrame({ letters, answers, setAnswers, setErrorMessage }) {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const isLetterCompleted = (key) => {
    const val = answers[key];
    return val && val.trim() !== "";
  };

  const handleLetterClick = (letter, index) => {
    // Enforce sequential completion
    if (index > 0) {
      const prev = letters[index - 1];
      if (!isLetterCompleted(prev.key)) {
        setErrorMessage(`Please complete "${prev.label}" first.`);
        return;
      }
    }
    setErrorMessage("");
    setSelectedLetter(letter);
  };

  const handleClose = () => setSelectedLetter(null);

  const handleSave = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSelectedLetter(null);
    setErrorMessage("");
  };

  return (
    <>
      <QuestionBox extraStyle="bg-custom-blue">
        <div className="text-center mb-5 mt-5 mt-md-4">
          <h1 className="text-white bg-blue py-2 px-5 rounded d-inline  ">
            Scenario 1
          </h1>
        </div>

        <div className="text-center mt-3">
          <h2 className="text-center text-gray">
            you feel really mad because
            <br />
            someone cut in line at lunch
          </h2>
        </div>
        <div className="text-center mb-5 mt-5 mt-md-4">
          <h2 className="hint-box text-center mt-3 px-5">
            click on the letters below to input your answers
          </h2>
        </div>

        <div className="letters-row mt-4">
          {letters?.map((letter, idx) => (
            <h2
              key={letter.key}
              className={`letter-pill ${
                isLetterCompleted(letter.key)
                  ? "completed text-white"
                  : "text-gray"
              }`}
              onClick={() => handleLetterClick(letter, idx)}
            >
              {letter.key}
            </h2>
          ))}
        </div>
      </QuestionBox>

      {selectedLetter && (
        <LetterModal
          letter={selectedLetter}
          pageQuestion={selectedLetter.question}
          existingAnswer={answers[selectedLetter.key] || ""}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default SONARFrame;
