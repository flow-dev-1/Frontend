import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'

import '../newcourse.css'
import Modal from 'react-modal'
import ReviewPopUp from '../../../../../modals-pages/dashboard-modals/ReviewModal'

export default function WeekOneAssessmentForm({ onSubmit, previous, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [reviewPopUp, setReviewPopUp] = useState(false)
  const [personalityColor, setPersonalityColor] = useState('')
  const [assessmentData, setAssessmentData] = useState([])

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
    {
      title:
        'A disagreement arises between two of your friends. How do you handle the situation?',
      questionList: [
        'A. You step in quickly, mediating the situation and making sure a decision is reached promptly.',
        'B. You listen carefully to both sides, offering thoughtful advice and ensuring everyone feels heard.',
        'C. You stay calm and analyze the situation, considering all factors before suggesting a fair solution.',
        'D. You try to lighten the mood with humor, helping everyone to see the brighter side of things.',
      ],
    },
    {
      title: 'You have an important test coming up. How do you prepare?',
      questionList: [
        'A. You create a strict study schedule and stick to it, making sure you cover all the material thoroughly.',
        'B. You focus on the key concepts and practice what you find challenging, working efficiently.',
        'C. You organize a study group, where you can discuss and review the material with friends.',
        'D. You take a systematic approach, reviewing your notes and making sure you understand everything in detail.',
      ],
    },
    {
      title:
        'Your friends ask you to plan a fun weekend activity. What do you decide to do?',
      questionList: [
        'A. You organize a well-structured day, with planned activities that everyone will enjoy.',
        'B. You suggest a spontaneous adventure, keeping the plans flexible and open to change.',
        'C. You propose a competitive game or sport, something that challenges everyone and brings out their best.',
        'D. You choose a relaxing activity, like a nature walk or a visit to a quiet spot where everyone can unwind.',
      ],
    },
    {
      title:
        'You’re given a challenging task with a tight deadline. How do you handle the pressure?',
      questionList: [
        'A. You take control and work swiftly, focusing on getting the task done efficiently.',
        'B. You stay organized and methodical, breaking down the task into manageable steps.',
        'C. You seek help or advice from others to ensure the task is completed to a high standard.',
        'D. You try to keep the situation light, using humor to stay relaxed and motivated.',
      ],
    },
  ]

  const handleNextStepClick = () => {
    // Map through the questions and generate the assessment data
    const currentData = questionsArray.map((question, questionIndex) => ({
      questionText: question.title,
      answer: questionChecked[questionIndex].map((optionIndex) => ({
        index: optionIndex,
        text: question.questionList[optionIndex],
      })),
      options: question.questionList, // Include the options for reference
    }))

    const finalData = [
      {
        questionText: 'What is your personality color?',
        answer: personalityColor,
      },
      ...currentData,
    ]

    // Log the data structure in the console
    console.log('Current Assessment Data:', finalData)

    if (currentIndex <= questionsArray.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onSubmit()
      saveAssessmentData()
    }

    if (currentIndex === 5) {
      setTimeout(() => {
        setReviewPopUp(true)

        setTimeout(() => {
          setReviewPopUp(false)
        }, 10000)
      }, 6000)
    }
  }

  const handlePreviousStepClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
    } else {
      previous()
    }
  }

  const closeReviewPopUp = () => {
    setReviewPopUp(false)
  }

  const [questionChecked, setQuestionChecked] = useState(
    questionsArray.reduce((acc, _, index) => ({ ...acc, [index]: [] }), {})
  )

  const handleQuestionCheck = (questionIndex, optionIndex) => {
    setQuestionChecked((prevState) => {
      const updated = { ...prevState }
      // Toggle the checked state for the specific question and option
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

  const saveAssessmentData = () => {
    const dataToSave = questionsArray.map((question, index) => ({
      questionText: question.title,
      answer: questionChecked[index], // Save the selected answers as an array
      options: question.questionList, // Include the options for reference
    }))

    const finalData = [
      {
        questionText: 'What is your personality color?',
        answer: personalityColor,
      },
      ...dataToSave,
    ]

    console.log(finalData)

    localStorage.setItem('assessmentData', JSON.stringify(finalData))
  }

  // Render the appropriate question based on the current index
  const renderQuestion = () => {
    switch (currentIndex) {
      case 1:
        return (
          <div className=''>
            <div className='assessment question-box py-5'>
              <div className='mt-2'>
                <div className='assessment-box'>
                  <h2>Assessment</h2>
                  Scenario around your personality colors.
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
          </div>
        )

      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        // Render each question
        const questionIndex = currentIndex - 2
        return (
          <div className=''>
            <div className='assessment question-box py-4'>
              <div className='d-flex  align-items-start'>
                <h1>{currentIndex - 1}.</h1>
                <h2 className='text-center mb-0 fs-1 ms-3'>
                  {questionsArray[questionIndex].title}
                </h2>
              </div>
              <div className='checkbox-questions'>
                <ul className='p-0'>
                  {questionsArray[questionIndex].questionList.map(
                    (item, index) => (
                      <li key={index} className='d-flex my-3'>
                        <img
                          onClick={() =>
                            handleQuestionCheck(questionIndex, index)
                          }
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
                    )
                  )}
                </ul>
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
          {Array.from({ length: 6 }, (_, index) => (
            <li
              key={index + 1}
              className={currentIndex >= index + 1 ? 'answered' : ''}
            ></li>
          ))}
        </ul>
      </div>

      <div className='d-flex align-items-center justify-content-around mx-auto mt-5 '>
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

      {reviewPopUp && (
        <Modal
          isOpen={reviewPopUp}
          onRequestClose={closeReviewPopUp}
          contentLabel='Example Modal'
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
