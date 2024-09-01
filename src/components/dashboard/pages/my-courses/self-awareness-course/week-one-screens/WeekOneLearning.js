import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import VideoComponent from './VideoComponent'
import QuestionComponent from './QuestionComponent'
import DragDropComponent from './DragAndDrop'
import EndOfCourseComponent from './EndOfCourseComponent'
import ModalComponent from './ModalComponent'
import celebrate from '../../../../../../assets/celebrate.png'
import selfAwareness from '../../../../../../assets/selfawareness-images/self-awareness.png'
import personality from '../../../../../../assets/selfawareness-images/personality.png'
import emotionalHand from '../../../../../../assets/selfawareness-images/emotional.png'
import analyticHand from '../../../../../../assets/selfawareness-images/analytic.png'
import friendshipHand from '../../../../../../assets/selfawareness-images/friendship.png'
import actionHand from '../../../../../../assets/selfawareness-images/action.png'
import PersonalityDescriptionComponent from './PersonalityDescriptionComponent'
import PersonalityQuestionComponent from './PersonalityQuestionComponent'
import PersonalityTest from './PersonalityTest'
import 'react-toastify/dist/ReactToastify.css'

export default function WeekOneLearning({
  course,
  onClose,
  currentWeekIndex,
  courseId,
}) {
  const [currentActivity, setCurrentActivity] = useState(() => {
    const savedState = localStorage.getItem(
      `week-${currentWeekIndex}-currentActivity`
    )
    return savedState ? JSON.parse(savedState) : 1
  })

  const [formData, setFormData] = useState(() => {
    const savedState = localStorage.getItem(
      `week-${currentWeekIndex}-activityData`
    )
    return savedState
      ? JSON.parse(savedState)
      : { week: currentWeekIndex, activities: [] }
  })

  const [videoPlaying, setVideoPlaying] = useState(false)
  const [reviewPopUp, setReviewPopUp] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem(
      `week-${currentWeekIndex}-currentActivity`,
      JSON.stringify(currentActivity)
    )
  }, [currentActivity, currentWeekIndex])

  useEffect(() => {
    localStorage.setItem(
      `week-${currentWeekIndex}-activityData`,
      JSON.stringify(formData)
    )
  }, [formData, currentWeekIndex])

  const handleSubmit = async () => {
    try {
      // Your submit logic here
    } catch (error) {
      console.error('Submission failed:', error)
      toast.error('Submission failed. Please try again later.')
    }
  }

  const handleNext = async (data = {}) => {
    setFormData((prevData) => {
      const updatedActivities = prevData.activities.map((item) =>
        item.activity === currentActivity ? { ...item, ...data } : item
      )
      if (
        !updatedActivities.find((item) => item.activity === currentActivity)
      ) {
        updatedActivities.push({ activity: currentActivity, ...data })
      }
      return { ...prevData, activities: updatedActivities }
    })

    const isLastActivity = currentActivity >= 13

    if (isLastActivity) {
      handleSubmit()
    } else {
      const nextActivity = currentActivity + 1
      setCurrentActivity(nextActivity)
    }
  }

  const handlePrevious = () => {
    const prevActivity = currentActivity - 1
    setCurrentActivity(prevActivity)
  }

  const closeReviewPopUp = () => setReviewPopUp(false)

  const handleNextWeekCourse = () => {
    const nextWeekIndex = currentWeekIndex + 1
    navigate('/dashboard/self-awareness-course/1', {
      state: { course, weekIndex: nextWeekIndex },
    })
  }

  console.log(formData)

  const renderActivityContent = () => {
    if (!formData.activities.length) {
      return (
        <div>
          <p>
            No activities found. Please start the course to begin your journey.
          </p>
          <VideoComponent
            videoPlaying={videoPlaying}
            setVideoPlaying={setVideoPlaying}
          />
          <div className='progression-buttons mt-3'>
            <button
              className='btn progress-btn btn-dark'
              onClick={() => handleNext()}
            >
              Next {'>>>'}
            </button>
          </div>
        </div>
      )
    }

    switch (currentActivity) {
      case 1:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
            />
            <div className='progression-buttons mt-3'>
              <button
                className='btn progress-btn btn-dark'
                onClick={() => handleNext()}
              >
                Next {'>>>'}
              </button>
            </div>
          </>
        )
      case 3:
      case 5:
      case 7:
      case 9:
      case 11:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
            />
            <div className='progression-buttons mt-3'>
              <button
                className='btn progress-btn btn-light'
                onClick={() => handlePrevious()}
              >
                {'<<<'} Back
              </button>
              <button
                className='btn progress-btn btn-dark'
                onClick={() => handleNext()}
              >
                Next {'>>>'}
              </button>
            </div>
          </>
        )
      case 2:
        return (
          <QuestionComponent
            questionText={'What do you think'}
            activityIndex={currentActivity}
            imageSrc={selfAwareness}
            formData={formData}
            altText='is?'
            onBack={handlePrevious}
            onNext={(answers) =>
              handleNext({
                answers,
              })
            }
          />
        )
      case 4:
        return (
          <QuestionComponent
            questionText={'What do you think'}
            activityIndex={currentActivity}
            imageSrc={personality}
            formData={formData}
            altText='is?'
            onBack={handlePrevious}
            onNext={(answer) =>
              handleNext({
                answers: [answer],
              })
            }
          />
        )
      case 6:
        return (
          <div className='drag-drop-section'>
            <DragDropComponent
              activityIndex={currentActivity}
              formData={formData}
              onBack={handlePrevious}
              onNext={handleNext}
            />
          </div>
        )
      case 8:
        return (
          <PersonalityDescriptionComponent
            questionText='What do you understand by the word,'
            imageSrc={personality}
            emotionalHand={emotionalHand}
            activityIndex={currentActivity}
            analyticHand={analyticHand}
            friendshipHand={friendshipHand}
            actionHand={actionHand}
            altText='?'
            formData={formData}
            onBack={handlePrevious}
            onNext={(answer) =>
              handleNext({
                answer,
              })
            }
          />
        )
      case 10:
        return (
          <PersonalityTest
            activityIndex={currentActivity}
            formData={formData}
            onBack={handlePrevious}
            onNext={handleNext}
          />
        )
     
      case 12:
        return (
          <PersonalityQuestionComponent
            formData={formData}
            activityIndex={currentActivity}
            onBack={handlePrevious}
            onNext={(answers) => handleNext({ answers })}
          />
        )
      default:
        return (
          <EndOfCourseComponent
            onNextWeekCourse={handleNextWeekCourse}
            onClose={onClose}
            openReviewPopUp={() => setReviewPopUp(true)}
          />
        )
    }
  }

  return (
    <div className='week-one-learning'>
      <ToastContainer />
      <div className='content-container'>
        {renderActivityContent()}
        <ModalComponent
          show={reviewPopUp}
          handleClose={closeReviewPopUp}
          // Additional props for ModalComponent if needed
        />
      </div>
    </div>
  )
}
