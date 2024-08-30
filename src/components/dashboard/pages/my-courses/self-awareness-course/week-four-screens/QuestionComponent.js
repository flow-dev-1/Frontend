import { useState } from 'react'
import NavigationButtons from './NavigationButtons'
import { toast } from 'react-toastify'

const QuestionComponent = ({ question, onBack, onNext, onSubmit }) => {
   const [answer, setAnswer] = useState(() => {
     const savedData = localStorage.getItem("weekFourFormData");

     if (savedData) {
       // Parse the JSON string
       const parsedData = JSON.parse(savedData);

       // Log the entire parsedData to understand its structure
       console.log("Parsed Data:", parsedData);

       // Access the 'answers' property and find the required data
       if (parsedData.answers && Array.isArray(parsedData.answers)) {
         // Find data for activity: 2
         const activityTwoData = parsedData.answers.find(
           (item) => item.activity === 2
         );

         console.log("Data for activity: 2:", activityTwoData);

         return activityTwoData ? activityTwoData.answer || "" : "";
       } else {
         console.error(
           "Parsed data.answers is not an array or does not exist:",
           parsedData
         );
       }
     }

     return "";
   });
  const [error, setError] = useState('') // State to handle error messages
// weekFourFormData;
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
          <h1 className='mb-0'>Question: </h1>
          <h2 className='mb-0 ms-3 text-nowrap'>{question.text}</h2>
          {question.image && (
            <img src={question.image} alt={question.alt} className='mx-2' />
          )}
          <h2 className=''>{question.suffix}</h2>
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

export default QuestionComponent
