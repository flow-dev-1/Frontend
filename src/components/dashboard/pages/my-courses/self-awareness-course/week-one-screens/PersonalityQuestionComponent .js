import React, { useState } from 'react'

const PersonalityQuestionComponent = ({ onBack, onNext, questions }) => {
  const [answers, setAnswers] = useState(
    questions.map((question) => ({ ...question, answer: '' }))
  )

  const handleInputChange = (event, index) => {
    const newAnswers = [...answers]
    newAnswers[index].answer = event.target.value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (answers.every((item) => item.answer.trim() !== '')) {
      onNext(answers)
    } else {
      alert('Please answer all the questions before proceeding.')
    }
  }

  return (
    <div className=''>
      <div className='personality-question question-box'>
        {answers.map((item, index) => (
          <div key={index} className='mt-4'>
            <div className='question-box-header'>
              <h1 className='mb-0 '>Question {index + 1}: </h1>
              <h2 className='mb-0 d-flex ms-3 text-left'>
                {item.questionText}
              </h2>
            </div>
            <div className='text-area-box px-4'>
              <textarea
                rows='3'
                placeholder='Type your answer here...'
                value={item.answer}
                onChange={(e) => handleInputChange(e, index)}
              ></textarea>
            </div>
          </div>
        ))}
      </div>

      <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
        <button className='btn progress-btn btn-light' onClick={onBack}>
          {'<<<'} Back
        </button>
        <button className='btn progress-btn btn-dark' onClick={handleNext}>
          Next {'>>>'}
        </button>
      </div>
    </div>
  )
}

export default PersonalityQuestionComponent
