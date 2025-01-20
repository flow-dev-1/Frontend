import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyFireWorks from '../Fireworks'
import celebrate from '../../../../../../assets/celebrate.png'
import mindset from '../../../../../../assets/selfawareness-images/mindset.png'
import QuestionFromVideo from './QuestionFromVideo'
import WeekThreeAssessmentForm from './WeekThreeAssessmentForm'
import VideoComponent from './VideoComponent'
import NavigationButtons from '../week-two-screens/NavigationButtons'
import QuestionComponent from './QuestionComponent'
import userService from '../../../../../../services/api/user.js'
import SecondQuestionComponent from './SecondQuestionComponet.js'
import { useQuery } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import EndOfCourseComponent from './EndOfCourseComponent.js'

export default function WeekThreeLearning({
  course,
  courseId,
  onClose,
  currentWeekIndex,
  handleLinkClick,
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

  const week = 3
  const { data, isLoading, isError } = useQuery({
    queryKey: ['self-awareness-course-3', course?.course?._id, week],
    queryFn: () => userService.getMyActivites(course?.course?._id, week),
  })

  const { data: assessmentData, isLoading: assessmentLoading, status: assesmentStatus, isError: assessmentError } = useQuery({
    queryKey: ["self-awareness-assessment-3", course?.course?._id, week],
    queryFn: () => userService.getMyAssessment(course?.course?._id, week),
    enabled: !!course?.course._id && !!week
  });

  console.log(data,assessmentData,"Data here")


  useEffect(() => {
    if (!data || !assessmentData) return

  if (data?.activity) {
    const activities = data.activity.activities;

    // Create an object with week and activities
    const activityData = {
      week: week,
      activities: activities,
    }

    // Store the object in local storage under the key 'activity1'
    localStorage.setItem('week-3-activityData', JSON.stringify(activityData))
  }


  }, [data])
  

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
    const isLastActivity = currentActivity >= 8
    if (isLastActivity) {
      setCurrentActivity(10)
    } else {
      setCurrentActivity((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentActivity((prev) => prev - 1)
  }

  const handleSubmit = async () => {

    if (formData?.activities?.length < 7) {
      return { success: false, message: "Submission failed" };
    }

    try {
      const stringifiedFormData = JSON.stringify(formData)
      const response = await userService.postMyActivity(course.course._id, stringifiedFormData);

      if (response.success) {
        toast.success(response?.message);
        console.log("Submission successful:", response);
        return { success: true, message: "Submission successful" };
      } else {
        toast.error("Activity submission failed. Please contact flow admin for support!");
        console.error("Submission failed with response:", response);
        return { success: false, message: "Submission failed" };
      }
    } catch (error) {
      console.error('Submission failed:', error)
      return { success: false, message: "Submission failed" };
    }
  }

  const closeReviewPopUp = () => setReviewPopUp(false)

  const handleNextWeekCourse = () => {
    const nextWeekIndex = currentWeekIndex + 1
    navigate(`/dashboard/self-awareness-course/${course._id}`, {
      state: { course, weekIndex: nextWeekIndex },
    })
  }

  // console.log(formData)
  const renderActivityContent = () => {
    switch (currentActivity) {
      case 1:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-3/FLOW-3_1.mp4'
            />
            <NavigationButtons onNext={() => handleNext()} isBackDisabled />
          </>
        )
      case 2:
        return (
          <QuestionComponent
            activityIndex={currentActivity}
            questionText={'What do you understand by the word'}
            imageSrc={mindset}
            formData={formData}
            altText='?'
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
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-3/FLOW-3_2.mp4'
            />
            <NavigationButtons
              onBack={handlePrevious}
              onNext={() => handleNext()}
            />
          </>
        )
      case 4:
        return (
          <SecondQuestionComponent
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
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-3/FLOW-3_3.mp4'
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
            <QuestionFromVideo
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
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-3/FLOW-3_4.mp4'
            />
            <NavigationButtons
              onBack={handlePrevious}
              onNext={() => handleNext()}
            />
          </>
        )

      case 8:
        return (
          <WeekThreeAssessmentForm
            onBack={handlePrevious}
            handleNextWeekCourse={handleNextWeekCourse}
            onNext={handleNext}
            course={course}
            handleActivitySubmit={handleSubmit}
          />
        )
      default:
        return (
          <EndOfCourseComponent
            onNextWeekCourse={handleNextWeekCourse}
            onClose={onClose}
            handleLinkClick={handleLinkClick}
            setCurrentActivity={setCurrentActivity}
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
