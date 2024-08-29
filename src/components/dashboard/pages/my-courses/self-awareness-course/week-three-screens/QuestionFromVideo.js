import React, { useState } from "react";
import "../newcourse.css";

export default function QuestionFromVideo({ onSubmit, previous }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [answers, setAnswers] = useState({
    answer1: "",
    answer2: ""
  });

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [field]: value
    }));
  };

  const handleNextStepClick = () => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Pass the answers back to the parent component
      onSubmit({ answers });
    }
  };

  const handlePreviousStepClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    } else {
      previous();
    }
  };

  const renderQuestion = () => {
    switch (currentIndex) {
      case 1:
        return (
          <div className="mindset question-box">
            <div className="mt-2">
              <div className="question-box-header">
                <h1 className="mb-0">Question:</h1>
                <h2 className="mb-0 d-flex ms-3 text-left">
                  List five (5) lessons you got from the videos you watched
                </h2>
              </div>
              <div className="scrollable">
                {[...Array(5)].map((_, index) => (
                  <div className="text-area-box px-4 my-4" key={index}>
                    <textarea
                      rows="3"
                      placeholder={`${index + 1}. Type your answer here...`}
                      value={answers[`answer1_${index + 1}`]}
                      onChange={(e) =>
                        handleInputChange(e, `answer1_${index + 1}`)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="mindset question-box">
            <div className="mt-2">
              <div className="question-box-header">
                <h1 className="mb-0">Question:</h1>
                <h2 className="mb-0 d-flex ms-3 text-left">
                  List one (1) thing you will start working on, even on your
                  growth journey.
                </h2>
              </div>
              <div className="text-area-box px-4 mt-4">
                <textarea
                  rows="6"
                  placeholder="Type your answer here..."
                  value={answers.answer2}
                  onChange={(e) => handleInputChange(e, "answer2")}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {renderQuestion()}
      <div className="slider-indicator">
        <ul className="p-0 mt-5">
          {Array.from({ length: 2 }, (_, index) => (
            <li
              key={index + 1}
              className={currentIndex >= index + 1 ? "answered" : ""}
            ></li>
          ))}
        </ul>
      </div>
      <div className="d-flex align-items-center justify-content-around mx-auto mt-5">
        <button
          className="btn progress-btn btn-light"
          onClick={handlePreviousStepClick}
        >
          {"<<<"} Back
        </button>
        <button
          className="btn progress-btn btn-dark"
          onClick={handleNextStepClick}
        >
          Next {">>>"}
        </button>
      </div>
    </div>
  );
}
