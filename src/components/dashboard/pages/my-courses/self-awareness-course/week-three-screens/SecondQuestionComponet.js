import { useState } from 'react'
import NavigationButtons from './NavigationsButtons'
import { toast } from 'react-toastify'

const SecondQuestionComponent = ({ question, onBack, onNext, onSubmit }) => {
      const [answer, setAnswer] = useState(() => {
        const savedData = localStorage.getItem("weekThreeFormData");

        if (savedData) {
          // Parse the JSON string
          const parsedData = JSON.parse(savedData);

          // Find data for activity: 2
          const activityTwoData = parsedData.find(
            (item) => item.activity === 4
          );

          console.log("Data for activity: 4:", activityTwoData);

          return activityTwoData ? activityTwoData.answer || "" : "";
        }

        return "";
      });
  const [error, setError] = useState('') // State to handle error messages

  const handleSubmit = () => {
    if (answer.trim() === '') {
      // Check if the answer is empty
      toast.error('Please provide an answer before proceeding.')
      return // Exit function if the answer is empty
    }

    setError('') // Clear any previous error message
    onSubmit({ answer }) // Submit the answer
    onNext() // Go to the next step
  }

  return (
    <div className=''>
      <div className='question-box py-4'>
        <div className='question-box-header'>
          <div>
            <h1 className='mb-0'>Question: </h1>
            <h2 className='mb-0 ms-3 '>
              {question.text}
              {question.suffix}
            </h2>
          </div>

          {question.image && (
            <img src={question.image} alt={question.alt} className='mx-2' />
          )}
        </div>
        <div className='text-area-box px-4 mt-4'>
          <textarea
            rows='6'
            placeholder='Type your answer here...'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        {/* Display error message if any */}
      </div>
      <NavigationButtons onBack={onBack} onNext={handleSubmit} />
    </div>
  )
}

export default SecondQuestionComponent
