import React, { useState, useEffect } from "react";
import checkedImage from "../../../../../../assets/selfawareness-images/checked.png";
import unCheckedImage from "../../../../../../assets/selfawareness-images/not-checked.png";
import "../newcourse.css";
import personalityTest from "../../../../../../assets/selfawareness-images/colorTest.png";

export default function PersonalityTest({ onNext, onBack }) {
  const answers = [
    {
      title:
        "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
      questionList: [
        "A. You immediately take charge, assigning tasks to ensure everything is done efficiently.",
        "B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.",
        "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.",
        "D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere."
      ]
    },
    {
      title:
        "You find yourself in a leadership position during a team meeting. What is your main focus?",
      questionList: [
        "A. Ensuring that tasks are delegated effectively and deadlines are met.",
        "B. Making sure everyone feels included and their opinions are considered.",
        "C. Analyzing the team’s skills and assigning tasks accordingly to maximize productivity.",
        "D. Encouraging a creative approach and fostering a positive team environment."
      ]
    },
    {
      title:
        "When faced with a new and challenging problem, what is your approach?",
      questionList: [
        "A. You jump straight in and start tackling the problem with a clear plan.",
        "B. You gather information and consult with others before taking action.",
        "C. You take time to understand the problem thoroughly and consider different solutions.",
        "D. You brainstorm with others to come up with innovative and unconventional solutions."
      ]
    }
    // Add more questions here
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [personalityColor, setPersonalityColor] = useState("");
  const [questionChecked, setQuestionChecked] = useState(
    answers.reduce((acc, _, index) => ({ ...acc, [index]: null }), {})
  );

  useEffect(() => {
    // Load persisted state from localStorage
    const savedCurrentIndex = JSON.parse(localStorage.getItem("currentIndex"));
    const savedPersonalityColor = localStorage.getItem("personalityColor");
    const savedQuestionChecked = JSON.parse(
      localStorage.getItem("questionChecked")
    );

    if (savedCurrentIndex !== null) setCurrentIndex(savedCurrentIndex);
    if (savedPersonalityColor) setPersonalityColor(savedPersonalityColor);

    if (savedQuestionChecked && typeof savedQuestionChecked === "object") {
      const processedSavedQuestionChecked = Object.fromEntries(
        Object.entries(savedQuestionChecked).map(([key, value]) => {
          // Convert key to a number
          const numericKey = Number(key);
          // Convert value to a number if possible, else keep it as is
          const numericValue = isNaN(value) ? value : Number(value);
          return [numericKey, numericValue];
        })
      );
      setQuestionChecked(processedSavedQuestionChecked);
    }
  }, []);

  useEffect(() => {
    // Save state to localStorage
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
    localStorage.setItem("personalityColor", personalityColor);
    localStorage.setItem(
      "questionChecked",
      JSON.stringify(
        Object.fromEntries(
          Object.entries(questionChecked).map(([key, value]) => [
            Number(key), // Ensure key is a number
            isNaN(value) ? value : Number(value) // Ensure value is a number if possible
          ])
        )
      )
    );
  }, [currentIndex, personalityColor, questionChecked]);

  const handleNextStepClick = () => {
    if (currentIndex < answers.length + 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const finalData = answers.map((_, index) => ({
        answer: questionChecked[index] // Only the selected answer index for each question
      }));
      onNext(finalData); // Send only the answers array
    }
  };

  const handleQuestionCheck = (questionIndex, optionIndex) => {
    setQuestionChecked((prevState) => ({
      ...prevState,
      [questionIndex]: optionIndex // Only one option can be selected
    }));
  };

  const handleBackClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onBack(); // Go back to the previous screen if at the start
    }
  };

  const renderQuestion = () => {
    if (currentIndex === 1) {
      // Display the image screen
      return (
        <div className="assessment question-box">
          <img src={personalityTest} alt="Personality Test" />
        </div>
      );
    } else {
      const questionIndex = currentIndex - 2;
      if (questionIndex >= 0 && questionIndex < answers.length) {
        return (
          <div className="assessment question-box py-4">
            <div className="d-flex align-items-start">
              <h1>{currentIndex - 1}.</h1>
              <h2 className="text-center mb-0 fs-1 ms-3">
                {answers[questionIndex].title}
              </h2>
            </div>
            <div className="checkbox-questions">
              <ul className="p-0">
                {answers[questionIndex].questionList.map((item, index) => (
                  <li key={index} className="d-flex my-3">
                    <img
                      onClick={() => handleQuestionCheck(questionIndex, index)}
                      className="cursor-pointer"
                      src={
                        questionChecked[questionIndex] === index
                          ? checkedImage
                          : unCheckedImage
                      }
                      alt=""
                    />
                    <p className="question-p ms-3">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      } else {
        return <div>Error: Question not found.</div>;
      }
    }
  };

  return (
    <div>
      {renderQuestion()}

      <div className="slider-indicator">
        <ul className="p-0 mt-5">
          {Array.from({ length: answers.length + 1 }, (_, index) => (
            <li
              key={index}
              className={currentIndex >= index + 1 ? "answered" : ""}
            ></li>
          ))}
        </ul>
      </div>

      <div className="d-flex align-items-center justify-content-around mx-auto mt-5">
        <button
          className="btn progress-btn btn-light"
          onClick={handleBackClick}
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
