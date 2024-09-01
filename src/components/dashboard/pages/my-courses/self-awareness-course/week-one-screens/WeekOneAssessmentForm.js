import React, { useState } from "react";
import checkedImage from "../../../../../../assets/selfawareness-images/checked.png";
import unCheckedImage from "../../../../../../assets/selfawareness-images/not-checked.png";
import userService from "../../../../../../services/api/user.js";
import "../newcourse.css";
import Modal from "react-modal";
import ReviewPopUp from "../../../../../modals-pages/dashboard-modals/ReviewModal";
import { toast } from "react-toastify";

export default function WeekOneAssessmentForm({
  onSubmit,
  onNext,
  onBack,
  courseId
}) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [reviewPopUp, setReviewPopUp] = useState(false);
  const [personalityColor, setPersonalityColor] = useState("");
  const [questionChecked, setQuestionChecked] = useState([]);

  const questionsArrayRed = [
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
        "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
      questionList: [
        "A. You immediately take charge, assigning tasks to ensure everything is done efficiently.",
        "B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.",
        "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.",
        "D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere."
      ]
    }
    // Add more questions for Red
  ];

  const questionsArrayBlue = [
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
        "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
      questionList: [
        "A. You immediately take charge, assigning tasks to ensure everything is done efficiently.",
        "B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.",
        "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.",
        "D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere."
      ]
    }
    // Add more questions for Blue
  ];

  const questionsArrayYellow = [
    {
      title:
        "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
      questionList: [
        "A. You immediately take charge, assigning tasks to ensure everything is done efficiently.",
        "B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.",
        "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.",
        "D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere."
      ]
    }
    // Add more questions for Yellow
  ];

  const questionsArrayGreen = [
    {
      title:
        "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
      questionList: [
        "A. You immediately take charge, assigning tasks to ensure everything is done efficiently.",
        "B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.",
        "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.",
        "D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere."
      ]
    }
    // Add more questions for Green
  ];

  const getQuestionsArray = () => {
    switch (personalityColor) {
      case "Red":
        return questionsArrayRed;
      case "Blue":
        return questionsArrayBlue;
      case "Yellow":
        return questionsArrayYellow;
      case "Green":
        return questionsArrayGreen;
      default:
        return [];
    }
  };

  const handleNextStepClick = () => {
    const questionsArray = getQuestionsArray();
    const questionIndex = currentIndex - 2;

    // Check if the user has selected an answer for the current question
    if (
      questionIndex >= 0 &&
      questionIndex < questionsArray.length &&
      questionChecked[questionIndex] === undefined
    ) {
      toast.error("Please select an answer before proceeding.");
      return;
    }

    // Proceed to the next step if valid
    if (currentIndex < questionsArray.length + 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      saveAssessmentData();
      onNext();
      setReviewPopUp(true); // Show review popup immediately
    }
  };

  const handlePreviousStepClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onBack();
    }
  };

  const handleQuestionCheck = (questionIndex, optionIndex) => {
    setQuestionChecked((prevState) => {
      const newState = [...prevState];
      newState[questionIndex] = optionIndex;
      return newState;
    });
  };
  const saveAssessmentData = () => {
    const questionsArray = getQuestionsArray();

    // Format data to match the required structure
    const formattedData = {
      week: 1,
      assessments: questionsArray.map((_, index) => ({
        answer:
          questionChecked[index] !== undefined ? questionChecked[index] : null // Save the selected answer as an index or null if not selected
      }))
    };

    console.log("Formatted Data", formattedData);

    // Basic marking (for demonstration purposes)
    const correctAnswers = questionsArray.map(() => 0); // Assuming correct answers are at index 0
    const totalQuestions = correctAnswers.length;
    const correctCount = formattedData.assessments.reduce(
      (count, current, index) => {
        return current.answer === correctAnswers[index] ? count + 1 : count;
      },
      0
    );

    const percentage = (correctCount / totalQuestions) * 100;
    console.log(`Correct Answers: ${correctCount} / ${totalQuestions}`);
    console.log(`Percentage: ${percentage}%`);
    toast.success(`You scored ${percentage}% in the quiz`);
    // Save data to local storage
    localStorage.setItem(
      "weekOneAssessmentData",
      JSON.stringify({ week: 1, assessment: formattedData, percentage })
    );
    const data = { week: 1, rating: percentage };
    const stringifiedFormData = JSON.stringify(data);
    // Post data to the API (if needed)
    const courseId = "66853bf50118e2e0a02b6a5a";
    userService
      .postMyAssessment(courseId, stringifiedFormData)
      .then((response) => {
        if (response.data.message === "You have already taken the assessment") {
          toast.error(response.data.message); // Show error toast with the message
        } else {
          console.log("Submission successful:", response);
          toast.success("Submission successful!"); // Optional: Show success message
        }
      })
      .catch((error) => {
        console.error("Submission failed:", error);
        toast.error("Submission failed. Please try again later."); // General error message
      });
  };

  const renderQuestion = () => {
    const questionsArray = getQuestionsArray();

    if (currentIndex === 1) {
      return (
        <div className="assessment question-box py-5">
          <div className="mt-2">
            <div className="assessment-box">
              <h2>Assessment</h2>
              Scenario around your personality colors.
            </div>
            <h2 className="my-5 text-justify mx-auto w-75">
              Before we proceed, please select your personality color.
            </h2>
            <div className="dropdown-box px-4">
              <select
                className="form-select"
                value={personalityColor}
                onChange={(e) => setPersonalityColor(e.target.value)}
              >
                <option value="">Select your color</option>
                <option value="Green">Green</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Yellow">Yellow</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    const questionIndex = currentIndex - 2;
    if (questionIndex >= 0 && questionIndex < questionsArray.length) {
      return (
        <div className="assessment question-box py-4">
          <div className="d-flex align-items-start">
            <h1>{currentIndex - 1}.</h1>
            <h2 className="text-center mb-0 fs-1 ms-3">
              {questionsArray[questionIndex].title}
            </h2>
          </div>
          <div className="checkbox-questions">
            <ul className="p-0">
              {questionsArray[questionIndex].questionList.map((item, index) => (
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
    }

    return null;
  };

  return (
    <div>
      {renderQuestion()}

      <div className="slider-indicator">
        <ul className="p-0 mt-5">
          {Array.from(
            { length: getQuestionsArray().length + 1 },
            (_, index) => (
              <li
                key={index}
                className={currentIndex >= index + 1 ? "answered" : ""}
              ></li>
            )
          )}
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
