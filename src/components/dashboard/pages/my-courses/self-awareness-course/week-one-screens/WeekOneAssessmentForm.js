import React, { useEffect, useState } from 'react'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import userService from '../../../../../../services/api/user.js'
import '../newcourse.css'
import Modal from 'react-modal'
import ReviewPopUp from '../../../../../modals-pages/dashboard-modals/ReviewModal'
import { toast, ToastContainer } from "react-toastify";

export default function WeekOneAssessmentForm({
  onSubmit,
  previous,
  onBack,
  courseId,
}) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [reviewPopUp, setReviewPopUp] = useState(false)
  const [personalityColor, setPersonalityColor] = useState('')

  // Initialize questionChecked with an array of null values to allow only one selection per question
  const [questionChecked, setQuestionChecked] = useState(
    Array.from({ length: 4 }, () => null) // Adjust the length according to the maximum number of questions in any color array
  )

  const questionsArrayRed = [
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
        "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
      questionList: [
        'A. You immediately take charge, assigning tasks to ensure everything is done efficiently.',
        'B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.',
        "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.",
        'D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere.',
      ],
    },
    // Add more questions for Red
  ]

  const questionsArrayBlue = [
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
    // Add more questions for Blue
  ]

  const questionsArrayYellow = [
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
    // Add more questions for Yellow
  ]

  const questionsArrayGreen = [
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
    // Add more questions for Green
  ]

  const handleSubmit = async () => {
    try {
      const assessmentData = localStorage.getItem('activityData')
      if (assessmentData) {
        const parsedData = JSON.parse(assessmentData)
        const cleanedData = {
          week: 1,
          activities: parsedData,
        }
        console.log(cleanedData)
        // Submit the cleaned data to the backend
        const response = await userService.postMyActivity(courseId, cleanedData)
        // If the submission is successful
        if ((response.message = "You have already taken the assessment")) {
          toast.done("You have already taken the test")
        }
        console.log('Submission successful:', response)
      }
    } catch (error) {
      console.error('Submission failed:', error)
      // Handle the error if needed
    }
  }

  console.log(courseId)

  // Function to get the appropriate questions array based on the selected personality color
  const getQuestionsArray = () => {
    switch (personalityColor) {
      case 'Red':
        return questionsArrayRed
      case 'Blue':
        return questionsArrayBlue
      case 'Yellow':
        return questionsArrayYellow
      case 'Green':
        return questionsArrayGreen
      default:
        return []
    }
  }

  const handleNextStepClick = () => {
    const questionsArray = getQuestionsArray()
    if (currentIndex < questionsArray.length + 1) {
      setCurrentIndex(currentIndex + 1)
      handleSubmit()
    } else {
      saveAssessmentData()
      setReviewPopUp(true) // Show review popup immediately
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

  const handleQuestionCheck = (questionIndex, optionIndex) => {
    setQuestionChecked((prevState) => ({
      ...prevState,
      [questionIndex]: optionIndex, // Allow only one option to be selected
    }))
  }

  const saveAssessmentData = () => {
    const questionsArray = getQuestionsArray()

    const dataToSave = questionsArray.map((question, index) => ({
      answer: questionChecked[index], // Save the selected answer as an index
      // Include the options for reference if needed
    }))

    const answers = [
      {
        answer: personalityColor,
      },
      ...dataToSave,
    ]

    console.log('Answers', answers)

    // Basic marking
    const correctAnswers = dataToSave.map(() => 0) // Assuming correct answers are at index 0
    const totalQuestions = correctAnswers.length
    const correctCount = dataToSave.reduce((count, current, index) => {
      return current.answer === correctAnswers[index] ? count + 1 : count
    }, 0)

    const percentage = (correctCount / totalQuestions) * 100
    console.log(`Correct Answers: ${correctCount} / ${totalQuestions}`)
    console.log(`Percentage: ${percentage}%`)

    // Save data to local storage
    localStorage.setItem(
      'assessmentData',
      JSON.stringify({ week: 1, assessment: answers, percentage })
    )
    const formData = {
      week: 1,
      rating: percentage.toString(),
    }
    // Post data to the API (if needed)
    userService.postMyAssessment(courseId, formData)
  }

  const renderQuestion = () => {
    const questionsArray = getQuestionsArray()

    if (currentIndex === 1) {
      return (
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
      )
    }

    const questionIndex = currentIndex - 2
    if (questionIndex >= 0 && questionIndex < questionsArray.length) {
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
                      questionChecked[questionIndex] === index
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

    return null
  }

  return (
    <div>
      {renderQuestion()}

      <div className='slider-indicator'>
        <ul className='p-0 mt-5'>
          {Array.from(
            { length: getQuestionsArray().length + 1 },
            (_, index) => (
              <li
                key={index}
                className={currentIndex >= index + 1 ? 'answered' : ''}
              ></li>
            )
          )}
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
