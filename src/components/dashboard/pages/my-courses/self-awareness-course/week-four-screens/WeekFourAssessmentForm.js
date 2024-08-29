import React, { useEffect, useState } from 'react'
import '../newcourse.css'
import Modal from 'react-modal'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import ReviewPopUp from '../../../../../modals-pages/dashboard-modals/ReviewModal'

export default function WeekFourAssessmentForm({ onSubmit, onBack }) {
  const questionsArray = [
    {
      title: 'What are values?',
      questionList: [
        'A. Beliefs and principles that guide our actions and decisions',
        'B. Emotions and feelings we experience daily',
        'C. Skills and talents we possess',
        'D. Goals and dreams we want to achieve',
      ],
    },
    {
      title: 'Why are values important? (Select all that apply)',
      questionList: [
        'A. They help us make decisions',
        'B. They guide our behavior',
        'C. They define our talents',
        'D. They help us understand what is most important to us',
      ],
    },
  ]

  // Initialize state with data from local storage or default value
  const [currentIndex, setCurrentIndex] = useState(1)
  const [reviewPopUp, setReviewPopUp] = React.useState(false)
  const [answers, setAnswers] = useState(() => {
    const storedData = localStorage.getItem('weekFourAssessment')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        console.log('Parsed Answers:', parsedData.assessment?.answers) // Log the parsed answers
        return parsedData.assessment?.answers || []
      } catch (e) {
        console.error('Error parsing local storage data', e)
        return []
      }
    }
    return []
  })
  const [assessmentDataPost, setAssessmentDataPost] = useState(null)
  useEffect(() => {
    const assessmentData = {
      week: 4,
      assessment: [answers],
    }
    console.log('Saving Assessment to Local Storage:', assessmentData)
    setAssessmentDataPost(assessmentData) // Log the data being saved
    localStorage.setItem('weekFourAssessment', JSON.stringify(assessmentData))
  }, [answers])

  //TODO: Post Data
  console.log('Assement data', assessmentDataPost)

  const handleQuestionCheck = (questionIndex, optionText) => {
    setAnswers((prevState) => {
      const newAnswers = [...prevState]
      newAnswers[questionIndex] = optionText
      return newAnswers
    })
  }

  const handleNextStepClick = () => {
    if (answers[currentIndex - 1] === undefined) {
      alert('Please select an answer before proceeding.')
      return
    }

    if (currentIndex < questionsArray.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      //   onSubmit()
    }
  }

  const handlePreviousStepClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
    } else {
      onBack()
    }
  }

  const closeReviewPopUp = () => {
    setReviewPopUp(false)
  }

  const renderQuestion = () => {
    const question = questionsArray[currentIndex - 1]
    return (
      <div className='week-two'>
        <div className='assessment question-box'>
          <div className='assessment-box'>
            <h2>Assessment</h2>
            <p>Scenario around your values.</p>
          </div>
          <div className='d-flex align-items-start mt-3'>
            <h1>{currentIndex}.</h1>
            <h2 className='text-center mb-0 fs-1 ms-3'>{question.title}</h2>
          </div>
          <div className='text-center checkbox-questions'>
            <ul className='p-0 mt-4 d-flex flex-column'>
              {question.questionList.map((item, index) => (
                <li key={index} className='d-flex align-items-center'>
                  <img
                    onClick={() => handleQuestionCheck(currentIndex - 1, item)}
                    className='cursor-pointer'
                    src={
                      answers[currentIndex - 1] === item
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
          {Array.from({ length: questionsArray.length }, (_, index) => (
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

      {/* {reviewPopUp && (
        <Modal
          isOpen={reviewPopUp}
          onRequestClose={closeReviewPopUp}
          contentLabel='Review Modal'
          className='custom-modal'
          overlayClassName='custom-overlay'
          shouldCloseOnOverlayClick={true}
        >
          <ReviewPopUp />
        </Modal>
      )} */}
    </div>
  )
}
