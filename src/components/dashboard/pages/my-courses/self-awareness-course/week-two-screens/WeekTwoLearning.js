import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyFireWorks from '../Fireworks'
import celebrate from '../../../../../../assets/celebrate.png'
import selfAwareness from '../../../../../../assets/selfawareness-images/strengthweakness.png'
import StrengthIdentification from './StrengthIdentification'
import WeaknessIdentification from './WeaknessIdentification'
import ScenarioQuestions from './ScenarioQuestions'
import WeekTwoAssessmentForm from './WeekTwoAssessmentForm'
import VideoComponent from './VideoComponent'
import QuestionComponent from './QuestionComponent'
import NavigationButtons from './NavigationButtons'
import userService from '../../../../../../services/api/user.js'

export default function WeekTwoLearning({ course, onClose, currentWeekIndex }) {
  const navigate = useNavigate()
  const courseid = course._id

  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('weekTwoCurrentStep')
    return savedStep ? parseInt(savedStep, 10) : 1 // Default to step 1 if not found
  })

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('weekTwoFormData')
    return savedData ? JSON.parse(savedData) : { week: 2, activities: [] }
  })

  const [videoPlaying, setVideoPlaying] = useState(false)

  useEffect(() => {
    localStorage.setItem('weekTwoCurrentStep', currentStep)
  }, [currentStep])

  useEffect(() => {
    try {
      const serializableData = { ...formData }
      console.log('Current Form Data:', serializableData)
      localStorage.setItem('weekTwoFormData', JSON.stringify(serializableData))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }, [formData])

  formData.activities = formData.activities.filter(
    (activity) => Object.keys(activity).length !== 0
  )

  //Todo Post data
  console.log('Post this data', formData)

  const handleNext = (data = {}) => {
    setFormData((prevFormData) => {
      const activityIndex = prevFormData.activities.findIndex(
        (item) => item.activity === data.activity
      )

      const updatedActivities = [...prevFormData.activities]

      if (activityIndex > -1) {
        updatedActivities[activityIndex] = data // Update existing activity
      } else {
        updatedActivities.push(data) // Add new activity
      }

      const updatedFormData = {
        ...prevFormData,
        activities: updatedActivities,
      }

      try {
        JSON.stringify(updatedFormData)
        return updatedFormData
      } catch (error) {
        console.error('Error serializing formData:', error)
        return prevFormData
      }
    })

    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))
  }

  const handleSubmit = () => {
    console.log(formData)
    userService
      .postMyActivity(courseid, formData)
      .then((response) => {
        console.log('Submission successful:', response)
        // handleNextWeekCourse(); // Uncomment if needed
      })
      .catch((error) => {
        console.error('Submission failed:', error)
      })
  }

  const handleNextWeekCourse = () => {
    const nextWeekIndex = currentWeekIndex + 1
    navigate('/dashboard/self-awareness-course/1', {
      state: { course, weekIndex: nextWeekIndex },
    })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://www.youtube.com/embed/CW-f1RVjCws'
            />
            <NavigationButtons onNext={handleNext} isBackDisabled />
          </>
        )
      case 2:
        return (
          <QuestionComponent
            question={{
              text: 'What do you understand by',
              image: selfAwareness,
              alt: 'selfAwareness image',
              suffix: '?',
            }}
            onBack={handlePrevious}
            onNext={handleNext}
            onSubmit={(data) => handleNext({ activity: 2, ...data })}
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
            <NavigationButtons onBack={handlePrevious} onNext={handleNext} />
          </>
        )
      case 4:
        return (
          <>
            <StrengthIdentification
              onNext={handleNext}
              onBack={handlePrevious}
              onSubmit={(data) => handleNext({ activity: 4, answers: data })}
            />
          </>
        )
      case 5:
        return (
          <>
            <WeaknessIdentification
              onBack={handlePrevious}
              onSubmit={(data) => handleNext({ activity: 5, answers: data })}
            />
          </>
        )
      case 6:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://www.youtube.com/embed/CW-f1RVjCws'
            />
            <NavigationButtons onBack={handlePrevious} onNext={handleNext} />
          </>
        )
      case 7:
        return (
          <ScenarioQuestions
            previous={handlePrevious}
            onSubmit={(data) =>
              handleNext({ activity: 7, answers: data }, handleSubmit())
            }
          />
        )
      case 8:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://www.youtube.com/embed/CW-f1RVjCws'
            />
            <NavigationButtons onBack={handlePrevious} onNext={handleNext} />
          </>
        )
      case 9:
        return (
          <WeekTwoAssessmentForm
            previous={handlePrevious}
            onSubmit={(data) => handleNext({ activity: 9, answers: data })}
          />
        )
      default:
        return null
    }
  }

  return <div className='course-progression-page'>{renderStepContent()}</div>
}
