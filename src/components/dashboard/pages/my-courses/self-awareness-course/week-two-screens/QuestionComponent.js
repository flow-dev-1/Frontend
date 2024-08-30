import { useState, useEffect } from "react";
import NavigationButtons from "./NavigationButtons";
import { toast } from "react-toastify";

const QuestionComponent = ({
  question,
  onBack,
  onNext,
  onSubmit,
  activityIndex
}) => {
  // State to manage the user's answer
  const [answer, setAnswer] = useState("");

  // Retrieve the saved answer from localStorage when the component mounts
  useEffect(() => {
    try {
      const savedAnswers = JSON.parse(localStorage.getItem("answers2")) || [];
      if (Array.isArray(savedAnswers) && savedAnswers[activityIndex]) {
        setAnswer(savedAnswers[activityIndex]);
      }
    } catch (e) {
      console.error("Error loading answers from localStorage", e);
    }
  }, [activityIndex]);

  // Save the answer to localStorage whenever it changes
  useEffect(() => {
    try {
      const savedAnswers = JSON.parse(localStorage.getItem("answers2")) || [];
      savedAnswers[activityIndex] = answer;
      localStorage.setItem("answers2", JSON.stringify(savedAnswers));
    } catch (e) {
      console.error("Error saving answers to localStorage", e);
    }
  }, [answer, activityIndex]);

  // Function to handle input change
  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  // Handle the submission of the answer
  const handleSubmit = () => {
    if (answer.trim() === "") {
      toast.error("Please provide an answer before proceeding.");
      return;
    }

    const submissionData = { answers: [answer] }; // Ensure answers is an array
    console.log("Submitting answer:", submissionData); // Log the data

    onSubmit(submissionData); // Pass data to parent
    onNext(); // Proceed to the next step
  };

  return (
    <div className="">
      <div className="question-box py-4">
        <div className="question-box-header">
          <h1 className="mb-0">Question:</h1>
          <h2 className="mb-0 ms-3 text-nowrap">{question.text}</h2>
          {question.image && (
            <img src={question.image} alt={question.alt} className="mx-2" />
          )}
          <h2 className="">{question.suffix}</h2>
        </div>
        <div className="text-area-box px-4 mt-4">
          <textarea
            rows="6"
            placeholder="Type your answer here..."
            value={answer}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <NavigationButtons onBack={onBack} onNext={handleSubmit} />
    </div>
  );
};

export default QuestionComponent;
