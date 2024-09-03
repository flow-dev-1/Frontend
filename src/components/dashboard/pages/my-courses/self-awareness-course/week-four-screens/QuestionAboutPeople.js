import React, { useState, useEffect } from 'react'
import '../newcourse.css'
import { toast } from 'react-toastify'

export default function QuestionAboutPeople({
  onBack,
  onNext,
  formData,
  activityIndex,
}) {
  // Extract answers for the current activity from formData if they exist
  const initialAnswers = formData?.activities?.find(
    (activity) => activity.activity === activityIndex
  )?.answers || [
    { q1: '', q2: '', q3: '' }, // Default answers for question 1
    { q1: '', q2: '', q3: '' }, // Default answers for question 2
    { q1: '', q2: '', q3: '' }, // Default answers for question 3
  ]

  const [currentIndex, setCurrentIndex] = useState(1)
  const [answers, setAnswers] = useState(initialAnswers)

  // Handle input change for the text areas
  const handleInputChange = (e, questionIndex) => {
    const { name, value } = e.target
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers]
      updatedAnswers[questionIndex][name] = value
      return updatedAnswers
    })
  }

  // Check if all answers for the current question are filled
  const isCurrentQuestionAnswered = () => {
    const currentAnswers = answers[currentIndex - 1]
    return currentAnswers.q1 && currentAnswers.q2 && currentAnswers.q3
  }

  // Handle "Next" button click
  const handleNextStepClick = () => {
    if (!isCurrentQuestionAnswered()) {
      toast.error('Please answer all questions before proceeding.')
      return
    }
    if (currentIndex < 3) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onNext(answers)
    }
  }

  // Handle "Back" button click
  const handlePreviousStepClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
    } else {
      onBack()
    }
  }

  // Render the current question based on the current index
  const renderQuestion = () => {
    switch (currentIndex) {
      case 1:
        return (
          <div className='mindset question-box'>
            <div className='mt-2'>
              <div className='question-box-header align-items-start'>
                <h1 className='mb-0 '>Question: </h1>
                <h2 className='mb-0 d-flex ms-3 text-left'>
                  Identify three (3) important people in your life and list
                  their names below.
                </h2>
              </div>
              <div className='text-area-box px-4 mt-1'>
                <textarea
                  name='q1'
                  rows='3'
                  placeholder='1. Type your answer here...'
                  value={answers[0].q1}
                  onChange={(e) => handleInputChange(e, 0)}
                ></textarea>
              </div>
              <div className='text-area-box px-4 mt-1'>
                <textarea
                  name='q2'
                  rows='3'
                  placeholder='2. Type your answer here...'
                  value={answers[0].q2}
                  onChange={(e) => handleInputChange(e, 0)}
                ></textarea>
              </div>
              <div className='text-area-box px-4 mt-1'>
                <textarea
                  name='q3'
                  rows='3'
                  placeholder='3. Type your answer here...'
                  value={answers[0].q3}
                  onChange={(e) => handleInputChange(e, 0)}
                ></textarea>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className='mindset question-box'>
            <div className='mt-2'>
              <div className='question-box-header align-items-start'>
                <h1 className='mb-0 '>Question: </h1>
                <h2 className='mb-0 d-flex ms-3 text-left'>
                  Write out what these people think about you.
                </h2>
              </div>
              <div className='text-area-box px-4 mt-1'>
                <textarea
                  name='q1'
                  rows='3'
                  placeholder='1. Type your answer here...'
                  value={answers[1].q1}
                  onChange={(e) => handleInputChange(e, 1)}
                ></textarea>
              </div>
              <div className='text-area-box px-4 mt-1'>
                <textarea
                  name='q2'
                  rows='3'
                  placeholder='2. Type your answer here...'
                  value={answers[1].q2}
                  onChange={(e) => handleInputChange(e, 1)}
                ></textarea>
              </div>
              <div className='text-area-box px-4 mt-1'>
                <textarea
                  name='q3'
                  rows='3'
                  placeholder='3. Type your answer here...'
                  value={answers[1].q3}
                  onChange={(e) => handleInputChange(e, 1)}
                ></textarea>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className='mindset question-box'>
            <div className='mt-2'>
              <div className='question-box-header align-items-start'>
                <h1 className='mb-0 '>Question: </h1>
                <h2 className='mb-0 d-flex ms-3 text-left'>
                  Are you happy with what these people think about you? If no,
                  what would you like to change? If yes, type “YES” in the box.
                </h2>
              </div>
              <div className='text-area-box px-4 mt-1'>
                <textarea
                  name='q1'
                  rows='3'
                  placeholder='1. Type your answer here...'
                  value={answers[2].q1}
                  onChange={(e) => handleInputChange(e, 2)}
                ></textarea>
              </div>
              <div className='text-area-box px-4 mt-1'>
                <textarea
                  name='q2'
                  rows='3'
                  placeholder='2. Type your answer here...'
                  value={answers[2].q2}
                  onChange={(e) => handleInputChange(e, 2)}
                ></textarea>
              </div>
              <div className='text-area-box px-4 mt-1'>
                <textarea
                  name='q3'
                  rows='3'
                  placeholder='3. Type your answer here...'
                  value={answers[2].q3}
                  onChange={(e) => handleInputChange(e, 2)}
                ></textarea>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div>
      {renderQuestion()}

      <div className='slider-indicator'>
        <ul className='p-0 mt-3'>
          {Array.from({ length: 3 }, (_, index) => (
            <li
              key={index + 1}
              className={currentIndex >= index + 1 ? 'answered' : ''}
            ></li>
          ))}
        </ul>
      </div>
      <div className='d-flex align-items-center justify-content-around mx-auto mt-4'>
        <button
          className='btn progress-btn btn-light'
          onClick={handlePreviousStepClick}
        >
          {'<<<'} Back
        </button>
        <button
          className='btn progress-btn btn-dark'
          onClick={handleNextStepClick}
        >
          Next {'>>>'}
        </button>
      </div>
    </div>
  )
}
