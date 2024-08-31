import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import MyFireWorks from '../Fireworks'
import celebrate from '../../../../../../assets/celebrate.png'
import WeekFiveAssessmentForm from './WeekFiveAssessmentForm'
import EmojiEmotionMatch from './EmojiEmotionMatch'
import WeekFiveScenarioQuestions from './WeekFiveScenarioQuestions'
import EmojiRespond from './EmojiRespond'

export default function WeekFiveLearning({ course, currentWeekIndex }) {
  const navigate = useNavigate()
  const courseid = course._id

  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('weekFiveCurrentStep')
    return savedStep ? parseInt(savedStep, 10) : 1 // Default to step 1 if not found
  })

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('weekFiveFormData')
    return savedData ? JSON.parse(savedData) : { week: 5, activities: [] }
  })

  const [videoPlaying, setVideoPlaying] = useState(false)

  useEffect(() => {
    localStorage.setItem('weekFiveCurrentStep', currentStep)
  }, [currentStep])

  useEffect(() => {
    try {
      const serializableData = { ...formData }
      console.log('Current Form Data:', serializableData)
      localStorage.setItem('weekFiveFormData', JSON.stringify(serializableData))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }, [formData])

  formData.activities = formData.activities.filter(
    (activity) => Object.keys(activity).length !== 0
  )

  // Handle the next step and data submission
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

  const handleNextWeekCourse = () => {
    const nextWeekIndex = currentWeekIndex + 1
    navigate('/dashboard/self-awareness-course/1', {
      state: { course, weekIndex: nextWeekIndex },
    })
  }

  const backToCourse = () => {
    navigate('/dashboard/my-courses', { replace: true })
  }
  console.log(formData)

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        // introductory-video
        return (
          <div className='course-progression-step'>
            <div className='video-div'>
              {videoPlaying ? (
                <iframe
                  className='custom-video'
                  src='https://www.youtube.com/embed/CW-f1RVjCws'
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              ) : (
                <div className='video-thumbnail'>
                  <div
                    className='play-button'
                    onClick={() => setVideoPlaying(true)}
                  >
                    <Icon icon='carbon:play-outline' className='play-icon' />
                  </div>
                </div>
              )}
            </div>

            <div className='progression-buttons mt-3'>
              <button
                className='btn progress-btn btn-dark'
                onClick={handleNext}
              >
                Next {'>>>'}
              </button>
            </div>
          </div>
        )

      case 2:
        // self-awareness question
        return (
          <div className=''>
            <EmojiEmotionMatch
              onComplete={(answers) =>
                handleNext({ activity: 2, answers })
              }
              onBack={handlePrevious}
            />
           
          </div>
        )

      case 3:
        // introductory-video
        return (
          <div className='course-progression-step'>
            <div className='video-div'>
              {videoPlaying ? (
                <iframe
                  className='custom-video'
                  src='https://www.youtube.com/embed/CW-f1RVjCws'
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              ) : (
                <div className='video-thumbnail'>
                  <div
                    className='play-button'
                    onClick={() => setVideoPlaying(true)}
                  >
                    <Icon icon='carbon:play-outline' className='play-icon' />
                  </div>
                </div>
              )}
            </div>

            <div className='d-flex align-items-center justify-content-around mt-5'>
              <button
                className='btn progress-btn btn-light'
                onClick={handlePrevious}
              >
                {'<<<'} Back
              </button>
              <button
                className='btn progress-btn btn-dark'
                onClick={handleNext}
              >
                Next {'>>>'}
              </button>
            </div>
          </div>
        )

      case 4:
        // self-awareness scenario questions
        return (
          <div className=''>
            <WeekFiveScenarioQuestions
              previous={handlePrevious}
              onSubmit={(data) => handleNext({ activity: 4, answers: data })}
            />
          </div>
        )

      case 5:
        // introductory-video
        return (
          <div className='course-progression-step'>
            <div className='video-div'>
              {videoPlaying ? (
                <iframe
                  className='custom-video'
                  src='https://www.youtube.com/embed/CW-f1RVjCws'
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              ) : (
                <div className='video-thumbnail'>
                  <div
                    className='play-button'
                    onClick={() => setVideoPlaying(true)}
                  >
                    <Icon icon='carbon:play-outline' className='play-icon' />
                  </div>
                </div>
              )}
            </div>

            <div className='d-flex align-items-center justify-content-around mt-5'>
              <button
                className='btn progress-btn btn-light'
                onClick={handlePrevious}
              >
                {'<<<'} Back
              </button>
              <button
                className='btn progress-btn btn-dark'
                onClick={handleNext}
              >
                Next {'>>>'}
              </button>
            </div>
          </div>
        )

      case 6:
        // self-awareness emoji respond
        return (
          <div className=''>
            <EmojiRespond />
            <div className='d-flex align-items-center justify-content-around mt-5'>
              <button
                className='btn progress-btn btn-light'
                onClick={handlePrevious}
              >
                {'<<<'} Back
              </button>
              <button
                className='btn progress-btn btn-dark'
                onClick={() =>
                  handleNext({
                    activity: 6,
                    answers: /* gather data here */ {},
                  })
                }
              >
                Next {'>>>'}
              </button>
            </div>
          </div>
        )

      case 7:
        // introductory-video
        return (
          <div className='course-progression-step'>
            <div className='video-div'>
              {videoPlaying ? (
                <iframe
                  className='custom-video'
                  src='https://www.youtube.com/embed/CW-f1RVjCws'
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              ) : (
                <div className='video-thumbnail'>
                  <div
                    className='play-button'
                    onClick={() => setVideoPlaying(true)}
                  >
                    <Icon icon='carbon:play-outline' className='play-icon' />
                  </div>
                </div>
              )}
            </div>

            <div className='d-flex align-items-center justify-content-around mt-5'>
              <button
                className='btn progress-btn btn-light'
                onClick={handlePrevious}
              >
                {'<<<'} Back
              </button>
              <button
                className='btn progress-btn btn-dark'
                onClick={handleNext}
              >
                Next {'>>>'}
              </button>
            </div>
          </div>
        )

      case 8:
        // assessment form
        return (
          <div className='assessment-page'>
            <WeekFiveAssessmentForm
              previous={handlePrevious}
              onSubmit={(data) => {
                handleNext({ activity: 8, assessment: data })
              }}
            />
          </div>
        )

      case 9:
        // end of the course
        return (
          <div className='end-of-course-page'>
            <div className='congrats'>
              <img src={celebrate} alt='celebrate' />
              {currentWeekIndex === 4 ? (
                <div>
                  <h1>Congratulations!</h1>
                  <p className='text-center fs-6 w-75 mx-auto'>
                    We’re proud of the progress you’ve made, and we can’t wait
                    to see how you apply these lessons in your life.
                  </p>
                </div>
              ) : (
                <div>
                  <h1>Hurray!</h1>
                  <p className='text-center fs-5 '>
                    You have made it to the {<br />} Week {currentWeekIndex + 1}
                  </p>
                </div>
              )}
            </div>
            <MyFireWorks currentWeekIndex={currentWeekIndex} />
            <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
              {currentWeekIndex === 4 ? (
                <div>
                  <button
                    className='btn progress-btn btn-dark'
                    onClick={backToCourse}
                  >
                    Go to My Courses {'>>>'}
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className='btn progress-btn btn-dark'
                    onClick={handleNextWeekCourse}
                  >
                    Proceed to Week {currentWeekIndex + 2}
                  </button>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return <div className='course-progression-page'>{renderStepContent()}</div>
}
