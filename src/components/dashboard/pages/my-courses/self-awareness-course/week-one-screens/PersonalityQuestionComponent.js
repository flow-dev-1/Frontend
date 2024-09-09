import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const PersonalityQuestionComponent = ({
  onBack,
  onNext,
  questions,
  formData,
  activityIndex, // Pass this as a prop to identify the activity
}) => {
  // Initialize state with answers from formData or an empty array
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    // Find the data for the current activity
    const currentActivityData = formData?.activities?.find(
      (item) => item.activity === activityIndex
    )

    if (currentActivityData && Array.isArray(currentActivityData.answers)) {
      // Set the answers from formData if they exist
      setAnswers(
        questions.map((question) => ({
          questionText: question.questionText,
          answer:
            currentActivityData.answers.find(
              (ans) => ans.questionText === question.questionText
            )?.answer || '',
        }))
      )
    } else {
      // Initialize to empty answers if no data is found
      setAnswers(
        questions.map((question) => ({
          questionText: question.questionText,
          answer: '',
        }))
      )
    }
  }, [formData, activityIndex, questions])

  // Handle input change for each question
  const handleInputChange = (event, index) => {
    const newAnswers = [...answers]
    newAnswers[index].answer = event.target.value
    setAnswers(newAnswers)
  }

  // Handle Next button click
  const handleNext = () => {
    if (answers.some((item) => !item.answer.trim())) {
      // Show a toast message if any answer is empty
      toast.error('Please answer all the questions before continuing.')
      return
    }

    // Prepare the data to send to the parent component
    const updatedData = answers.map((item) => ({
      questionText: item.questionText,
      answer: item.answer,
    }))

    // Call the onNext callback with the updated data
    onNext(updatedData)
  }

  return (
    <div>
      <div className='personality-question question-box'>
        {answers.map((item, index) => (
          <div key={index} className='mt-4'>
            <div className='question-box-header'>
              <h1 style={{ fontSize: '32px' }} className='mb-0'>
                Question {index + 1}:{' '}
              </h1>
              <h2
                style={{ fontSize: '32px' }}
                className='mb-0 d-flex  text-left'
              >
                {item.questionText}
              </h2>
            </div>
            <div className='text-area-box px-4'>
              <textarea
                rows='3'
                placeholder={`Type your answer ${index + 1} here...`}
                value={item.answer}
                onChange={(e) => handleInputChange(e, index)}
              ></textarea>
            </div>
          </div>
        ))}
      </div>

      <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
        {onBack && (
          <button className='btn progress-btn btn-light' onClick={onBack}>
            {'<<<'} Back
          </button>
        )}
        <button className='btn progress-btn btn-dark' onClick={handleNext}>
          Next {'>>>'}
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default PersonalityQuestionComponent
