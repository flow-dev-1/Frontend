import { useState, useEffect } from 'react'
import NavigationButtons from './NavigationButtons'
import { toast } from 'react-toastify'

const QuestionComponent = ({ question, onBack, onNext, onSubmit }) => {
  // Initialize state with saved answer from localStorage if available
  const [answer, setAnswer] = useState(() => {
    const savedAnswer = localStorage.getItem(`answer_${question.text}`)
    return savedAnswer || ''
  })

  const [error, setError] = useState('') // State to handle error messages

  useEffect(() => {
    // Save the answer to localStorage whenever it changes
    localStorage.setItem(`answer_${question.text}`, answer)
  }, [answer, question.text])

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

    const handleInputChange = (event) => {
      setAnswer(event.target.value);
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
