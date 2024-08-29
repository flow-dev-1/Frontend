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

export default function WeekFourLearning({ course, currentWeekIndex }) {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('weekFourCurrentStep')
    return savedStep ? parseInt(savedStep, 10) : 1
  })

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('weekFourFormData')
    return savedData ? JSON.parse(savedData) : { week: 4, answers: [] }
  })

  const [videoPlaying, setVideoPlaying] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('weekFourCurrentStep', currentStep)
  }, [currentStep])

  useEffect(() => {
    try {
      const serializableData = { ...formData }
      console.log('Current Form Data:', serializableData)
      localStorage.setItem('weekFourFormData', JSON.stringify(serializableData))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }, [formData])

  const handleNext = (data = {}) => {
    setFormData((prevFormData) => {
      const updatedAnswers = [...prevFormData.answers]
      const currentStepIndex = currentStep - 1

      // Replace the data for the current step if it exists, otherwise push new data
      if (updatedAnswers[currentStepIndex]) {
        updatedAnswers[currentStepIndex] = data
      } else {
        updatedAnswers.push(data)
      }

      const updatedFormData = {
        ...prevFormData,
        answers: updatedAnswers,
      }

      return updatedFormData
    })

    setCurrentStep((prevStep) => prevStep + 1)
  }

formData.answers = formData.answers.filter((item) => {
  // Check if the item is an empty object
  if (Object.keys(item).length === 0) {
    return false
  }

  // Check if the item is a SyntheticBaseEvent object
  if (
    item._reactName === 'onClick' &&
    item._targetInst === null &&
    item.type === 'click'
  ) {
    return false
  }

  // If neither condition is met, keep the item
  return true
})

//TODO: post data
console.log('Filtered Form Data', formData)

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))
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
              text: 'What exactly are',
              image: values,
              alt: 'values image',
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
          <MindSetFlipQuestion
            onNext={handleNext}
            onBack={handlePrevious}
            onSubmit={(data) => handleNext({ activity: 4, answers: data })}
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
            <NavigationButtons onBack={handlePrevious} onNext={handleNext} />
          </>
        )
      case 6:
        return (
          <QuestionAboutPeople
            onBack={handlePrevious}
            onSubmit={(data) => handleNext({ activity: 6, answers: data })}
          />
        )
      case 7:
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
      case 8:
        return (
          <>
            <CoreValuesQuestion
              onNext={handleNext}
              onBack={handlePrevious}
              onSubmit={(data) => handleNext({ activity: 8, answers: data })}
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
            <NavigationButtons onBack={handlePrevious} onNext={handleNext} />
          </>
        )
      case 10:
        return (
          <WeekFourAssessmentForm
            onBack={handlePrevious}
            onSubmit={(data) => handleNext({ activity: 10, answers: data })}
          />
        )
      case 11:
        return (
          <div className='end-of-course-page'>
            <div className='congrats'>
              <img src={celebrate} alt='celebrate' />
              <h1>Hurray!</h1>
              <p className='text-center fs-5'>
                You have made it to the <br /> Week {currentWeekIndex + 1}
              </p>
            </div>
            <MyFireWorks />
            <NavigationButtons onNext={handleNextWeekCourse} />
          </div>
        )
      default:
        return null
    }
  }

  return <div className='course-progression-page'>{renderStepContent()}</div>
}
