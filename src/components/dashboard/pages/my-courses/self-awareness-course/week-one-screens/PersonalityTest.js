import React, { useState } from 'react'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import '../newcourse.css'

export default function PersonalityTest({ onNext, onBack }) {
  const questionsArray = [
    {
      title:
        "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
      questionList: [
        'A. You immediately take charge, assigning tasks to ensure everything is done efficiently.',
        'B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.',
        "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.",
        'D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere.',
      ],
    },
    // Add more questions here
  ]
  const [currentIndex, setCurrentIndex] = useState(1)
  const [personalityColor, setPersonalityColor] = useState('')
  const [questionChecked, setQuestionChecked] = useState(
    questionsArray.reduce((acc, _, index) => ({ ...acc, [index]: [] }), {})
  )

  const handleNextStepClick = () => {
    if (currentIndex < questionsArray.length + 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      const finalData = [
        {
          questionText: 'What is your personality color?',
          answer: personalityColor,
        },
        ...questionsArray.map((question, index) => ({
          questionText: question.title,
          answer: questionChecked[index], // Save the selected answers as an array
          options: question.questionList,
        })),
      ]
      onNext(finalData)
    }
  }

  const handleQuestionCheck = (questionIndex, optionIndex) => {
    setQuestionChecked((prevState) => {
      const updated = { ...prevState }
      if (updated[questionIndex].includes(optionIndex)) {
        updated[questionIndex] = updated[questionIndex].filter(
          (i) => i !== optionIndex
        )
      } else {
        updated[questionIndex] = [...updated[questionIndex], optionIndex]
      }
      return updated
    })
  }

  const renderQuestion = () => {
    if (currentIndex === 1) {
      return (
        <div className='assessment question-box py-5'>
          <div className='mt-2'>
            <div className='assessment-box'>
              <h2>Assessment</h2>
              Personality Test
            </div>
            <h2 className='my-5 text-justify mx-auto w-75'>
              Before we proceed, please select your personality color.
            </h2>
            <div className='dropdown-box px-4'>
              <select
                className='form-select'
                value={personalityColor}
                onChange={(e) => setPersonalityColor(e.target.value)}
              >
                <option value=''>Select your color</option>
                <option value='Green'>Green</option>
                <option value='Red'>Red</option>
                <option value='Blue'>Blue</option>
                <option value='Yellow'>Yellow</option>
              </select>
            </div>
          </div>
        </div>
      )
    } else {
      const questionIndex = currentIndex - 2
      return (
        <div className='assessment question-box py-4'>
          <div className='d-flex align-items-start'>
            <h1>{currentIndex - 1}.</h1>
            <h2 className='text-center mb-0 fs-1 ms-3'>
              {questionsArray[questionIndex].title}
            </h2>
          </div>
          <div className='checkbox-questions'>
            <ul className='p-0'>
              {questionsArray[questionIndex].questionList.map((item, index) => (
                <li key={index} className='d-flex my-3'>
                  <img
                    onClick={() => handleQuestionCheck(questionIndex, index)}
                    className='cursor-pointer'
                    src={
                      questionChecked[questionIndex].includes(index)
                        ? checkedImage
                        : unCheckedImage
                    }
                    alt=''
                  />
                  <p className='question-p ms-3'>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
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
        <button className='btn progress-btn btn-light' onClick={onBack}>
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
