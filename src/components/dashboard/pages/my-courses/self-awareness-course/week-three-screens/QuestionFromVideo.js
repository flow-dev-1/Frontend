import React, { useState } from 'react'
import '../newcourse.css'

export default function QuestionFromVideo({ formData, onBack, onNext }) {
  const [currentIndex, setCurrentIndex] = useState(1)
    const initialAnswers = formData?.activities?.find(
      (activity) => activity.activity === 6
    )?.answers || [
      "",
      "",
      "",
      "",
      "", 
      "" 
    ];

  const [answers, setAnswers] = useState(initialAnswers);
console.log(formData)

  const handleInputChange = (event, index) => {
    const { value } = event.target
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers]
      newAnswers[index] = value
      return newAnswers
    })
  }

  const handleNextStepClick = () => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Log the answers array to the console
      console.log('Answers Array:', answers)
      // Pass the answers array back to the parent component
      onNext(answers)
    }
  }

  const handlePreviousStepClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
    } else {
      onBack()
    }
  }

  const renderQuestion = () => {
    switch (currentIndex) {
      case 1:
        return (
          <div className='mindset question-box' style={{ overflowY: 'scroll' }}>
            <div className='mt-2'>
              <div className='question-box-header'>
                <h1 className='mb-0'>Question:</h1>
                <h2 className='mb-0 d-flex ms-3 text-left'>
                  List five (5) lessons you got from the videos you watched
                </h2>
              </div>
              <div className='scrollable'>
                {[...Array(5)].map((_, index) => (
                  <div className='text-area-box px-4 my-4' key={index}>
                    <textarea
                      rows='3'
                      placeholder={`${index + 1}. Type your answer here...`}
                      value={answers[index]}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className='mindset question-box'>
            <div className='mt-2'>
              <div className='question-box-header'>
                <h1 className='mb-0'>Question:</h1>
                <h2 className='mb-0 d-flex ms-3 text-left'>
                  List one (1) thing you will start working on, even on your
                  growth journey.
                </h2>
              </div>
              <div className='text-area-box px-4 mt-4'>
                <textarea
                  rows='6'
                  placeholder='Type your answer here...'
                  value={answers[5]}
                  onChange={(e) => handleInputChange(e, 5)}
                />
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
        <ul className='p-0 mt-5'>
          {Array.from({ length: 2 }, (_, index) => (
            <li
              key={index + 1}
              className={currentIndex >= index + 1 ? 'answered' : ''}
            ></li>
          ))}
        </ul>
      </div>
      <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
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
