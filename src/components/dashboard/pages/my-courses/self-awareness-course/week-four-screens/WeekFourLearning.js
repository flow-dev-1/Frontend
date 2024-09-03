import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyFireWorks from '../Fireworks'
import celebrate from '../../../../../../assets/celebrate.png'
import values from '../../../../../../assets/selfawareness-images/values.png'
import MindSetFlipQuestion from './MindSetFlipQuestion'
import WeekFourAssessmentForm from './WeekFourAssessmentForm'
import QuestionAboutPeople from './QuestionAboutPeople'
import CoreValuesQuestion from './CoreValuesQuestion'
import VideoComponent from './VideoComponent'
import QuestionComponent from './QuestionComponent'
import NavigationButtons from './NavigationButtons'
import userService from '../../../../../../services/api/user.js'
import { toast, ToastContainer } from 'react-toastify'
import EndOfCourseComponent from '../week-three-screens/EndOfCourseComponent.js'
export default function WeekFourLearning({
  course,
  courseId,
  onClose,
  currentWeekIndex,
}) {
  const [showPopup, setShowPopup] = useState(false)
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

    const isLastActivity = currentActivity >= 9
    if (isLastActivity) {
      setCurrentActivity(10)
    } else {
      setCurrentActivity((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentActivity((prev) => prev - 1)
  }

  const closeReviewPopUp = () => setReviewPopUp(false)

  const handleNextWeekCourse = () => {
    const nextWeekIndex = currentWeekIndex + 1
    navigate(`/dashboard/self-awareness-course/${course._id}`, {
      state: { course, weekIndex: nextWeekIndex },
    })
  }

  console.log(formData)
  const renderActivityContent = () => {
    switch (currentActivity) {
      case 1:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://www.youtube.com/embed/CW-f1RVjCws'
            />
            <NavigationButtons onNext={() => handleNext()} isBackDisabled />
          </>
        )
      case 2:
        return (
          <QuestionComponent
            activityIndex={currentActivity}
            questionText='What exactly are'
            suffix='?'
            imageSrc={values}
            formData={formData}
            altText='values image'
            onBack={handlePrevious}
            onNext={(answers) =>
              handleNext({
                answers,
              })
            }
          />
        )
      case 3:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://www.youtube.com/embed/CW-f1RVjCws'
            />
            <NavigationButtons
              onBack={handlePrevious}
              onNext={() => handleNext()}
            />
          </>
        )
      case 4:
        return (
          <MindSetFlipQuestion
            activityIndex={currentActivity}
            questionText={
              'Do you feel like you have a growth mindset, or do you sometimes find yourself with a fixed mindset? Share your thoughts. It’s okay to be honest, this is all about learning and growing together!'
            }
            altText={'?'}
            formData={formData}
            onBack={handlePrevious}
            onNext={(answers) =>
              handleNext({
                answers,
              })
            }
          />
        )
      case 5:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://www.youtube.com/embed/CW-f1RVjCws'
            />
            <NavigationButtons
              onBack={handlePrevious}
              onNext={() => handleNext()}
            />
          </>
        )
      case 6:
        return (
          <>
            <QuestionAboutPeople
              activityIndex={currentActivity}
              formData={formData}
              onBack={handlePrevious}
              onNext={(answers) =>
                handleNext({
                  answers,
                })
              }
            />
          </>
        )
      case 7:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://www.youtube.com/embed/CW-f1RVjCws'
            />
            <NavigationButtons
              onBack={handlePrevious}
              onNext={() => handleNext()}
            />
          </>
        )

      case 8:
        return (
          <>
            <CoreValuesQuestion
              activityIndex={currentActivity}
              formData={formData}
              onBack={handlePrevious}
              onNext={(answers) =>
                handleNext({
                  answers,
                })
              }
            />
          </>
        )

      case 9:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://www.youtube.com/embed/CW-f1RVjCws'
            />
            <NavigationButtons
              onBack={handlePrevious}
              onNext={() => handleNext()}
            />
          </>
        )
      case 10:
        return (
          <WeekFourAssessmentForm
            onBack={handlePrevious}
            handleNextWeekCourse={handleNextWeekCourse}
            onNext={handleNext}
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
    <div>
      <ToastContainer />
      <div className='content-container'>{renderActivityContent()}</div>
    </div>
  )
}
