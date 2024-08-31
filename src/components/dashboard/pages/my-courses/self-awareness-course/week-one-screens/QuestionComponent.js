import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const QuestionComponent = ({
  questionText,
  imageSrc,
  altText,
  onBack,
  onNext,
  activityIndex // Pass this as a prop to identify the activity
}) => {
  // State to manage the user's answer
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    try {
      // Retrieve and parse the answers from localStorage
      const savedAnswersString = localStorage.getItem("answersForOne");
      let savedAnswers = [];

      if (savedAnswersString) {
        if (savedAnswersString !== "undefined") {
          try {
            savedAnswers = JSON.parse(savedAnswersString);

            // Ensure savedAnswers is an array
            if (!Array.isArray(savedAnswers)) {
              console.warn(
                "Unexpected data format for answersForOne. Resetting to empty array."
              );
              savedAnswers = [];
            }
          } catch (parseError) {
            console.error(
              "Error parsing localStorage data for answersForOne:",
              parseError
            );
            savedAnswers = []; // Fallback to empty array if parsing fails
          }
        }
      }

      // Ensure that we are using the valid activityIndex and have an answer for it
      if (
        Array.isArray(savedAnswers) &&
        typeof activityIndex === "number" &&
        savedAnswers[activityIndex] !== undefined
      ) {
        setAnswer(savedAnswers[activityIndex]);
      }
    } catch (error) {
      console.error(
        "Unexpected error while retrieving data from localStorage:",
        error
      );
    }
  }, [activityIndex]);

  // Save the answer to localStorage whenever it changes
  useEffect(() => {
    if (answer) {
      try {
        // Retrieve existing answers or initialize an empty array if none exist
        const savedAnswersString = localStorage.getItem("answersForOne");
        let savedAnswers = [];
        if (savedAnswersString) {
          // Check if the savedAnswersString is not "undefined" before parsing
          if (savedAnswersString !== "undefined") {
            try {
              savedAnswers = JSON.parse(savedAnswersString);
            } catch (parseError) {
              console.error("Error parsing localStorage data:", parseError);
              // Optionally show a toast or handle parse error if needed
            }
          }
        }

        // Ensure savedAnswers is an array
        if (!Array.isArray(savedAnswers)) {
          savedAnswers = [];
        }

        // Update the specific answer for the current activity index
        savedAnswers[activityIndex] = answer;

        // Save the updated answers array back to localStorage
        localStorage.setItem("answersForOne", JSON.stringify(savedAnswers));
      } catch (error) {
        console.error("Error saving data to localStorage:", error);
        // Optionally show a toast or handle error if needed
      }
    }
  }, [answer, activityIndex]);

  // Function to handle input change
  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  // Function to handle Next button click
  const handleNextClick = () => {
    if (!answer.trim()) {
      // Show a toast message if the answer is empty
      toast.error("Please provide an answer before continuing.");
      return;
    }
    // Pass the answer data back to the parent component
    onNext({ answer });
  };

  return (
    <div className="question-box py-5">
      <div className="question-box-header">
        <h1 className="mb-0">Question:</h1>
        <h2 className="mb-0 d-flex ms-3">{questionText}</h2>
        {imageSrc && <img src={imageSrc} alt={altText} className="mx-2" />}
        <h2 className="">{altText}</h2>
      </div>
      <div className="text-area-box px-4 mt-4">
        <textarea
          rows="6"
          placeholder="Type your answer here..."
          value={answer} // Bind the textarea value to state
          onChange={handleInputChange} // Update state on input change
        />
      </div>
      <div className="d-flex align-items-center justify-content-around mt-5">
        {onBack && (
          <button className="btn progress-btn btn-light" onClick={onBack}>
            {"<<<"} Back
          </button>
        )}
        <button className="btn progress-btn btn-dark" onClick={handleNextClick}>
          Next {">>>"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuestionComponent;
