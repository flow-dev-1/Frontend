import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const QuestionComponent = ({
  questionText,
  imageSrc,
  altText,
  onBack,
  onNext,
  activityIndex, // Pass this as a prop to identify the activity
}) => {
  // State to manage the user's answer
  const [answer, setAnswer] = useState('')

  // Retrieve the saved answers array from localStorage when the component mounts
  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('answers')) || []
    if (savedAnswers[activityIndex]) {
      setAnswer(savedAnswers[activityIndex])
    }
  }, [activityIndex])

  // Save the answer to localStorage whenever it changes
  useEffect(() => {
    if (answer) {
      const savedAnswers = JSON.parse(localStorage.getItem('answers')) || []
      savedAnswers[activityIndex] = answer
      localStorage.setItem('answers', JSON.stringify(savedAnswers))
    }
  }, [answer, activityIndex])

  // Function to handle input change
  const handleInputChange = (event) => {
    setAnswer(event.target.value)
  }

  // Function to handle Next button click
  const handleNextClick = () => {
    if (!answer.trim()) {
      // Show a toast message if the answer is empty
      toast.error('Please provide an answer before continuing.')
      return
    }
    // Pass the answer data back to the parent component
    onNext({ answer })
  }

  return (
    <div className='question-box py-5'>
      <div className='question-box-header'>
        <h1 className='mb-0'>Question:</h1>
        <h2 className='mb-0 d-flex ms-3'>{questionText}</h2>
        {imageSrc && <img src={imageSrc} alt={altText} className='mx-2' />}
        <h2 className=''>{altText}</h2>
      </div>
      <div className='text-area-box px-4 mt-4'>
        <textarea
          rows='6'
          placeholder='Type your answer here...'
          value={answer} // Bind the textarea value to state
          onChange={handleInputChange} // Update state on input change
        />
      </div>
      <div className='d-flex align-items-center justify-content-around mt-5'>
        {onBack && (
          <button className='btn progress-btn btn-light' onClick={onBack}>
            {'<<<'} Back
          </button>
        )}
        <button className='btn progress-btn btn-dark' onClick={handleNextClick}>
          Next {'>>>'}
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default QuestionComponent
