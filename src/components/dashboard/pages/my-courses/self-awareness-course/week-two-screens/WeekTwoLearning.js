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

export default function WeekTwoLearning({ course, onClose, currentWeekIndex }) {
  const navigate = useNavigate()

  // Retrieve the current step and form data from localStorage, or initialize defaults
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('weekTwoCurrentStep')
    return savedStep ? parseInt(savedStep, 10) : 1 // Default to step 1 if not found
  })

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('weekTwoFormData')
    return savedData
      ? JSON.parse(savedData)
      : { week: 2, activity: 1, answers: [] }
  })

  const [videoPlaying, setVideoPlaying] = useState(false)

  // Save currentStep to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('weekTwoCurrentStep', currentStep)
  }, [currentStep])

  // Save formData to localStorage whenever it changes
  useEffect(() => {
    try {
      const serializableData = { ...formData }
      console.log('Current Step Data:', serializableData)
      localStorage.setItem('weekTwoFormData', JSON.stringify(serializableData))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }, [formData])

  const handleNext = (data = {}) => {
    setFormData((prevFormData) => {
      const activityIndex = prevFormData.answers.findIndex(
        (item) => item.activity === data.activity
      )

      const updatedAnswers = [...prevFormData.answers]

      if (activityIndex > -1) {
        // If the activity already exists, update it
        updatedAnswers[activityIndex] = data
      } else {
        // Otherwise, add a new activity entry
        updatedAnswers.push(data)
      }

      const updatedFormData = {
        ...prevFormData,
        answers: updatedAnswers,
      }

      try {
        // Ensure the data being saved does not contain circular references
        JSON.stringify(updatedFormData) // Test if the updated form data can be serialized
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
  //Sanitizing data
  // Remove the "activity": 1 entry
  delete formData.activity

  // Remove empty objects from the "answers" array
  formData.answers = formData.answers.filter(
    (answer) => Object.keys(answer).length !== 0
  )
  //TODO: Submit to the backend
  console.log('Modified Form Data', formData)

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
            onSubmit={(data) => handleNext({ activity: 7, answers: data })}
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
      // case 10:
      //   return (
      //     <div className='end-of-course-page'>
      //       <div className='congrats'>
      //         <img src={celebrate} alt='celebrate' />
      //         <h1>Hurray!</h1>
      //         <p className='text-center fs-5'>
      //           You have made it to the {<br />} Week {currentWeekIndex + 1}
      //         </p>
      //       </div>
      //       <MyFireWorks />
      //       <button
      //         className='btn progress-btn btn-dark'
      //         onClick={handleNextWeekCourse}
      //       >
      //         Proceed to Week {currentWeekIndex + 2}
      //       </button>
      //     </div>
      //   )
      default:
        return null
    }
  }

  return <div className='course-progression-page'>{renderStepContent()}</div>
}
