import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const SecondQuestionComponent = ({
  questionText,
  imageSrc,
  altText,
  formData,
  onBack,
  onNext,
  activityIndex, // Pass this as a prop to identify the activity
}) => {
  // State to manage the user's answer
  const [answers, setAnswers] = useState('')

  useEffect(() => {
    // Find the data for the current activity
    const currentActivityData = formData?.activities?.find(
      (item) => item?.activity === activityIndex
    )
    console.log(formData)

    if (currentActivityData && currentActivityData?.answers) {
      // Set the answer from formData if it exists
      setAnswers(currentActivityData.answers[0] || '')
    } else {
      // Set to empty if no answer is found
      setAnswers('')
    }
  }, [activityIndex, formData])

  // Function to handle input change
  const handleInputChange = (event) => {
    setAnswers(event.target.value)
  }

  // Function to handle Next button click
  const handleNextClick = () => {
    if (!answers) {
      // Show a toast message if the answer is empty
      toast.error('Please provide an answer before continuing.')
      return
    }
    // Pass the answer data back to the parent component
    onNext([answers])
  }

  return (
    <div className=''>
      <div className='question-box py-4'>
        <div className='question-box-header'>
          <div>
            <h1 className='mb-0'>Question: </h1>
            <h2 className='mb-0 ms-3 '>{questionText}</h2>
          </div>
        </div>
        <div className='text-area-box px-4 mt-4'>
          <textarea
            rows='6'
            placeholder='Type your answer here...'
            value={answers}
            onChange={handleInputChange}
          />
        </div>

        {/* Display error message if any */}
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

export default SecondQuestionComponent
