import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VideoComponent from './VideoComponent'
import QuestionComponent from './QuestionComponent'
import DragDropComponent from './DragAndDrop'
import EndOfCourseComponent from './EndOfCourseComponent'
import AssessmentForm from './AssessmentForm'
import ModalComponent from './ModalComponent'
import celebrate from '../../../../../../assets/celebrate.png'
import selfAwareness from '../../../../../../assets/selfawareness-images/self-awareness.png'
import personality from '../../../../../../assets/selfawareness-images/personality.png'
import emotionalHand from '../../../../../../assets/selfawareness-images/emotional.png'
import analyticHand from '../../../../../../assets/selfawareness-images/analytic.png'
import friendshipHand from '../../../../../../assets/selfawareness-images/friendship.png'
import actionHand from '../../../../../../assets/selfawareness-images/action.png'
import PersonalityDescriptionComponent from './PersonalityDescriptionComponent'
import PersonalityQuestionComponent from './PersonalityQuestionComponent '
import PersonalityTest from './PersonalityTest'

export default function WeekOneLearning({
  course,
  onClose,
  currentWeekIndex,
  courseId,
}) {
  const [currentActivity, setCurrentActivity] = useState(1)
  const [formData, setFormData] = useState([])
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [reviewPopUp, setReviewPopUp] = useState(false)
  const navigate = useNavigate()

  // Load the last activity from localStorage when the component mounts
  useEffect(() => {
    const savedActivity = localStorage.getItem('currentActivity')
    if (savedActivity) {
      setCurrentActivity(JSON.parse(savedActivity))
    }

    const savedFormData = localStorage.getItem('activityData')
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData))
    }
  }, [])

  const handleNext = (data = {}) => {
    if (![1, 3, 5, 7, 9, 11].includes(currentActivity)) {
      setFormData((prevData) => {
        const existingData = prevData.find(
          (item) => item.activity === currentActivity
        )
        if (existingData) {
          const updatedData = prevData.map((item) =>
            item.activity === currentActivity ? { ...item, ...data } : item
          )
          saveDataToLocalStorage(updatedData)
          return updatedData
        } else {
          const updatedData = [
            ...prevData,
            { activity: currentActivity, ...data },
          ]
          saveDataToLocalStorage(updatedData)
          return updatedData
        }
      })
    }

    // Move to the next activity
    const nextActivity = currentActivity + 1
    setCurrentActivity(nextActivity)
    localStorage.setItem('currentActivity', JSON.stringify(nextActivity))
  }

  const handleDragDropData = (newBuckets) => {
    setFormData((prevFormData) => {
      const existingData = prevFormData.find((item) => item.activity === 6)
      if (existingData) {
        const updatedData = prevFormData.map((item) =>
          item.activity === 6 ? { ...item, dragDropData: newBuckets } : item
        )
        saveDataToLocalStorage(updatedData)
        return updatedData
      } else {
        const updatedData = [
          ...prevFormData,
          { activity: 6, dragDropData: newBuckets },
        ]
        saveDataToLocalStorage(updatedData)
        return updatedData
      }
    })
  }

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem('activityData', JSON.stringify(data))
  }

  const handlePrevious = () => {
    const prevActivity = currentActivity - 1
    setCurrentActivity(prevActivity)
    localStorage.setItem('currentActivity', JSON.stringify(prevActivity))
  }

  const closeReviewPopUp = () => setReviewPopUp(false)

  useEffect(() => {
    console.log('Form Data submitted:', formData)
  }, [formData])

  const handleNextWeekCourse = () => {
    const nextWeekIndex = currentWeekIndex + 1
    navigate('/dashboard/self-awareness-course/1', {
      state: { course, weekIndex: nextWeekIndex },
    })
  }

  const renderActivityContent = () => {
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
            activityIndex={2}
            imageSrc={selfAwareness}
            altText='is?'
            onBack={handlePrevious}
            onNext={(answer) =>
              handleNext({
                answers: [answer],
              })
            }
          />
        )

      case 4:
        return (
          <QuestionComponent
            questionText={'What do you think'}
            activityIndex={4}
            imageSrc={selfAwareness}
            altText='?'
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
              onBack={handlePrevious}
              onNext={handleNext}
              handleDragDropData={handleDragDropData}
            />
          </div>
        )

      case 8:
        return (
          <PersonalityDescriptionComponent
            questionText='What do you understand by the word,'
            imageSrc={personality}
            emotionalHand={emotionalHand}
            analyticHand={analyticHand}
            friendshipHand={friendshipHand}
            actionHand={actionHand}
            altText='?'
            onBack={handlePrevious}
            onNext={(selectedPersonality) =>
              handleNext({
                selectedPersonality,
              })
            }
          />
        )

      case 10:
        return <PersonalityTest onBack={handlePrevious} onNext={handleNext} />

      case 12:
        return (
          <QuestionComponent
            activityIndex={12}
            questionText='Did you discover something new about yourself through this assessment? What did you learn?'
            imageSrc=''
            altText=''
            onBack={handlePrevious}
            onNext={(answer) =>
              handleNext({
                answers: [answer],
              })
            }
          />
        )

      case 13:
        return (
          <PersonalityQuestionComponent
            formData={formData}
            onBack={handlePrevious}
            onNext={(answers) => handleNext({ answers })}
            answers={[
              {
                questionText:
                  'Did you get the same color as the color you identified for yourself earlier?',
              },
              {
                questionText:
                  'What was different? Why do you think this was different?',
              },
              {
                questionText: 'Do you agree with this new result?',
              },
            ]}
          />
        )

      case 14:
        return (
          <AssessmentForm
            courseId={courseId}
            onBack={handlePrevious}
            setCurrentActivity={setCurrentActivity}
          />
        )

      case 15:
        return (
          <EndOfCourseComponent
            currentWeekIndex={currentWeekIndex}
            handleNextWeekCourse={handleNextWeekCourse}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className='week-one-learning'>
      {renderActivityContent()}
      <ModalComponent
        reviewPopUp={reviewPopUp}
        closeReviewPopUp={closeReviewPopUp}
      />
    </div>
  )
}
