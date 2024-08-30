import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const PersonalityQuestionComponent = ({
  onBack,
  onNext,
  answers = [],
  formData
}) => {
  // Initialize local state with answers containing only the answer fields
  const [localAnswers, setLocalAnswers] = useState(
    answers.map(({ questionText, answer }) => ({
      questionText,
      answer: answer || ""
    }))
  );

  useEffect(() => {
    // Load the saved state from localStorage when the component mounts
    const savedState = localStorage.getItem("personalityQuestionState");
    if (savedState) {
      const savedAnswers = JSON.parse(savedState);
      setLocalAnswers(savedAnswers);
    }
  }, []);

  useEffect(() => {
    // Save the state to localStorage whenever answers change
    localStorage.setItem(
      "personalityQuestionState",
      JSON.stringify(localAnswers)
    );
  }, [localAnswers]);

  const handleInputChange = (event, index) => {
    const newAnswers = [...localAnswers];
    newAnswers[index].answer = event.target.value;
    setLocalAnswers(newAnswers);
  };

  const handleNext = () => {
    if (localAnswers.every((item) => item.answer.trim() !== "")) {
      onNext(localAnswers); // Send the entire array of objects
    } else {
      toast.error("Please answer all the questions before proceeding.");
    }
  };

  return (
    <div className="">
      <div className="personality-question question-box">
        {localAnswers.map((item, index) => (
          <div key={index} className="mt-4">
            <div className="question-box-header">
              <h1 className="mb-0">Question {index + 1}:</h1>
              <h2 className="mb-0 d-flex ms-3 text-left">
                {item.questionText} {/* Display question text */}
              </h2>
            </div>
            <div className="text-area-box px-4">
              <textarea
                rows="3"
                placeholder="Type your answer here..."
                value={item.answer || ""}
                onChange={(e) => handleInputChange(e, index)}
              ></textarea>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex align-items-center justify-content-around mx-auto mt-5">
        <button className="btn progress-btn btn-light" onClick={onBack}>
          {"<<<"} Back
        </button>
        <button className="btn progress-btn btn-dark" onClick={handleNext}>
          Next {">>>"}
        </button>
      </div>
    </div>
  );
};

export default PersonalityQuestionComponent;
