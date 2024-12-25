import React, { useEffect, useState } from 'react'
import '../newcourse.css'
import Modal from 'react-modal'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import ReviewPopUp from '../../../../../modals-pages/dashboard-modals/ReviewModal'
import userService from '../../../../../../services/api/user.js'
import { toast } from 'react-toastify'
import { isDisabled } from '@testing-library/user-event/dist/utils/index.js'

export default function WeekTwoAssessmentForm({ onBack,
  onNext,
  course,
  handleActivitySubmit
}) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [reviewPopUp, setReviewPopUp] = React.useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [disableButton,setDisableButton] = useState(false)
  const [assessment, setAssessment] = useState(() => {
    // Initialize assessment from localStorage if it exists
    const storedAssessment = localStorage.getItem('week-two-assesment')
    return storedAssessment
      ? JSON.parse(storedAssessment)
      : { week: 2, assessment: { answers: [] } }
  })

  const questionsArray = [
    {
      title:
        'Which quality would help you best manage your chores and responsibilities at home well?',
      questionList: [
        'Empathy',
        'Good Listener',
        'Detail-oriented',
        'Responsible',
      ],
    },
    {
      title:
        'You’ve identified that your weakness is impatience and your classmate asked you to wait for him so you can get lunch together while he uses the toilet. What will you do as someone trying to improve on their weakness?',
      questionList: [
        'Do Nothing',
        'Wait for him to get lunch together.',
        'Wait for only 1 minute and leave if he doesn’t show up.',
        'Tell him you’re hungry and cannot wait.',
      ],
    },
    {
      title:
        'You’ve identified your strength is honesty and your class teacher is asking who was making noise. You know it is Adetola, your best friend that was making noise because he is your seatmate. What will you do next?',
      questionList: [
        'Choose not to say anything',
        'Tell the teacher that Adetola was making noise',
        'Tell Adetola to report himself or else you would.',
        'Ask to go to the toilet because you don’t want to talk about it',
      ],
    },
    {
      title:
        "You're trying to solve a difficult puzzle. Which quality would be most helpful in this situation?",
      questionList: ['patience', 'self-critical', 'optimistic', 'brave'],
    },
    {
      title:
        'You realized your best friend, John, has a weakness and you are interested in helping him work on this weakness. What would you do?',
      questionList: [
        'Ignore it to protect your friendship.',
        'Tell him about the strengths you have noticed he has and identify how to manage his weakness.',
        'Tell your other friends about this weakness.',
        'Tell him about your own weakness in hopes that it will get him to share as well.',
      ],
    },
    {
      title:
        'What activity do you enjoy the most, and why do you think you are good at it?',
    },
    {
      title:
        'When working in a group, what role do you naturally take on (e.g., leader, planner, helper)? Can you give an example?',
    },
    {
      title:
        'Is there a task or subject that you avoid because you find it difficult? Why do you think it’s challenging for you?',
    },
  ]

  const handleStepClick = () => {

    if (currentIndex < questionsArray.length) {
      if (assessment.assessment.answers[currentIndex - 1] !== undefined) {
        setCurrentIndex(currentIndex + 1)
      } else {
        toast.error('Please answer the question before proceeding.')
      }
    } else {
      // Optionally handle submission or final step
      // setDisableButton(false)
      // onNext()
    }

    if (currentIndex === 8) {
      saveWeekTwoAssessment()
     
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
    // Prevent editing if answers are already saved
    if (assessment.assessment.answers[questionIndex] !== undefined) {
      toast.info('You have already answered this question.')
      return
    }

    const updatedAnswers = [...assessment.assessment.answers]
    updatedAnswers[questionIndex] = optionIndex // Store index instead of text

    const updatedAssessment = {
      ...assessment,
      assessment: { ...assessment.assessment, answers: updatedAnswers },
    }

    setAssessment(updatedAssessment)
    localStorage.setItem(
      'week-two-assessment',
      JSON.stringify(updatedAssessment)
    )

  }
  const transformAssessmentData = () => {
    return assessment.assessment.answers.map((answerIndex) => answerIndex)
  }

  // Example usage:
  // After handling question check, you might want to calculate the score:
  const transformedData = transformAssessmentData()

  const saveWeekTwoAssessment = async () => {
    if(disableButton) return
    setDisableButton(true)
    try {
      const activityResponse = await handleActivitySubmit();
     
      if (!activityResponse.success) {
        setIsLoading(false)
        toast.error(activityResponse?.message)
        return
      }
      
      const transformedData = transformAssessmentData()
      const valuesToCheck = transformedData.slice(0, 5)
      const correctAnswers = [3, 1, 1, 0, 2]
      const totalQuestions = valuesToCheck.length
      const correctCount = valuesToCheck.reduce((count, current, index) => {
        return current === correctAnswers[index] ? count + 1 : count
      }, 0)

      const percentage = Math.round((correctCount / totalQuestions) * 100)
      toast.success(`You scored ${percentage}% in the quiz`)
      const dataToSend = {
        rating: percentage,
        assessments: assessment,
        week: 2,
      }

      const response = await userService.postMyAssessment(
        course.course?._id,
        course._id,
        dataToSend
      );

      if (response.status === "success") {
        toast.success(response.message);
        onNext()
        setReviewPopUp(true)
        setIsLoading(false)
        setTimeout(() => {
          setReviewPopUp(true)
          setTimeout(() => {
            setReviewPopUp(false)
          }, 10000)
        }, 1000)
        setDisableButton(false)
      } else if (response.status === "failed") {
        toast.success(response.message);
        onNext()
        setReviewPopUp(true)
        setIsLoading(false)
        setDisableButton(false)
      } else {
        setIsLoading(false)
        setDisableButton(false)
        toast.error('Something went wrong. Please contact flow admin for support!');
      }

    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast.error('Something went wrong. Please contact flow admin for support!');
    }

  }

  const renderQuestion = () => {
    const questionIndex = currentIndex - 1
    const questionData = questionsArray[questionIndex]

    if (questionData.questionList) {
      return (
        <div className='week-two'>
          <div style={{ height: '550px' }} className='assessment question-box'>
            {currentIndex <= 1 && (
              <div className='assessment-box'>
                <h2 style={{ color: '#FAFAFA' }}>Assessment</h2>
                <p style={{ color: '#FAFAFA' }} className='text-center'>
                  Scenario around your values.
                </p>
              </div>
            )}
            <div className='d-flex align-items-start mt-3'>
              <h1 style={{ color: '#5B616A' }}>{currentIndex}.</h1>
              <h2
                style={{ color: '#5B616A' }}
                className='text-start mb-0 fs-1 ms-3'
              >
                {questionData.title}
              </h2>
            </div>
            <div
              style={{ marginLeft: '3rem' }}
              className='text-center checkbox-questions'
            >
              <ul
                style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
                className='p-0 mt-4'
              >
                {questionData.questionList.map((item, index) => (
                  <li key={index} className='d-flex align-items-center my-2'>
                    <img
                      onClick={() => handleQuestionCheck(questionIndex, index)}
                      className={`cursor-pointer mt-2 ${assessment.assessment.answers[questionIndex] !==
                        undefined
                        ? 'disabled'
                        : ''
                        }`}
                      src={
                        assessment.assessment.answers[questionIndex] === index
                          ? checkedImage
                          : unCheckedImage
                      }
                      alt=''
                    />
                    <p className='question-p ms-3 align-items-center mt-2'>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='week-two'>
          <div className='assessment question-box py-4'>
            <div className='d-flex align-items-start mt-3'>
              <h1 style={{ color: '#5B616A' }}>{currentIndex}.</h1>
              <h2
                style={{ color: '#5B616A' }}
                className='text-center mb-0 fs-1 ms-3'
              >
                {questionData.title}
              </h2>
            </div>
            <div className='text-area-box px-5 mt-4'>
              <textarea
                className='px-3 pt-2'
                placeholder='Type your answer here...'
                rows='7'
                value={assessment.assessment.answers[questionIndex] || ''}
                onChange={(e) => {
                  const updatedAnswers = [...assessment.assessment.answers]
                  updatedAnswers[questionIndex] = e.target.value // Capture the full text input

                  const updatedAssessment = {
                    ...assessment,
                    assessment: {
                      ...assessment.assessment,
                      answers: updatedAnswers,
                    },
                  }

                  setAssessment(updatedAssessment)
                  localStorage.setItem(
                    'week-two-assessment',
                    JSON.stringify(updatedAssessment)
                  )
                }}
              />
            </div>
          </div>
        </div>
      )
    }
  }

  useEffect(() => {
    // Fetch the initial state or restore the assessment from localStorage
    const storedAssessment = localStorage.getItem('week-two-assessment')
    if (storedAssessment) {
      setAssessment(JSON.parse(storedAssessment))
    }
  }, [])
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
        <button className='btn progress-btn btn-dark' disabled={disableButton} onClick={handleStepClick}>
          Next {'>>>'}
        </button>
      </div>

      {/* {reviewPopUp && (
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
      )} */}
    </div>
  )
}
