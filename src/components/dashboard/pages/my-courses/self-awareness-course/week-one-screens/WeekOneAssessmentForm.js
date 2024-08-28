import React, { useState } from 'react'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import '../newcourse.css'
import Modal from 'react-modal'
import ReviewPopUp from '../../../../../modals-pages/dashboard-modals/ReviewModal'

export default function WeekOneAssessmentForm({ onSubmit, previous }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reviewPopUp, setReviewPopUp] = useState(false)

  const questionsArray = [
    {
      questionText:
        "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
      questionList: [
        'A. You immediately take charge, assigning tasks to ensure everything is done efficiently.',
        'B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.',
        "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.",
        'D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere.',
      ],
    },
    // Additional questions here...
  ]

  const [answers, setAnswers] = useState(
    questionsArray.map((question) => ({
      questionText: question.questionText,
      answers: [],
    }))
  )

  const handleOptionToggle = (questionIndex, optionIndex) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers]
      const selectedOptions = updatedAnswers[questionIndex].answers

      const optionText = questionsArray[questionIndex].questionList[optionIndex]

      if (selectedOptions.includes(optionText)) {
        updatedAnswers[questionIndex].answers = selectedOptions.filter(
          (answer) => answer !== optionText
        )
      } else {
        updatedAnswers[questionIndex].answers = [...selectedOptions, optionText]
      }

      return updatedAnswers
    })
  }

  const handleNextStepClick = () => {
    if (currentIndex < questionsArray.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      console.log({ step: currentIndex + 1, questions: answers })
      //   onSubmit({ step: currentIndex + 1, questions: answers })
    }

    if (currentIndex === questionsArray.length - 1) {
      setTimeout(() => {
        setReviewPopUp(true)
        setTimeout(() => {
          setReviewPopUp(false)
        }, 10000)
      }, 6000)
    }
  }

  const handlePreviousStepClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      previous()
    }
  }

  const renderQuestion = () => {
    const question = questionsArray[currentIndex]
    if (!question) return null

    return (
      <div className=''>
        <div className='assessment question-box py-4'>
          <div className='d-flex align-items-start'>
            <h1>{currentIndex + 1}.</h1>
            <h2 className='text-center mb-0 fs-1 ms-3'>
              {question.questionText}
            </h2>
          </div>
          <div className='checkbox-questions'>
            <ul className='p-0'>
              {question.questionList.map((item, index) => (
                <li key={index} className='d-flex my-3'>
                  <img
                    onClick={() => handleOptionToggle(currentIndex, index)}
                    className='cursor-pointer'
                    src={
                      answers[currentIndex].answers.includes(item)
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
      </div>
    )
  }

  return (
    <div>
      {renderQuestion()}

      <div className='slider-indicator'>
        <ul className='p-0 mt-5'>
          {questionsArray.map((_, index) => (
            <li
              key={index}
              className={currentIndex >= index ? 'answered' : ''}
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

      {reviewPopUp && (
        <Modal
          isOpen={reviewPopUp}
          onRequestClose={() => setReviewPopUp(false)}
          contentLabel='Review Modal'
          className='custom-modal'
          overlayClassName='custom-overlay'
          shouldCloseOnOverlayClick={true}
        >
          <ReviewPopUp />
        </Modal>
      )}
    </div>
  )
}
