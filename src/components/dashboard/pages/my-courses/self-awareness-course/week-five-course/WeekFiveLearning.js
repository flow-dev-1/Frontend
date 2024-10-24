import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import MyFireWorks from '../Fireworks'
import celebrate from '../../../../../../assets/celebrate.png'
import WeekFiveAssessmentForm from './WeekFiveAssessmentForm'
import EmojiEmotionMatch from './EmojiEmotionMatch'
import WeekFiveScenarioQuestions from './WeekFiveScenarioQuestions'
import EmojiRespond from './EmojiRespond'
import EndOfCourseComponent from './EndOfCourseComponent'
import NavigationButtons from './NavigationButtons'
import VideoComponent from './VideoComponent'
import userService from "../../../../../../services/api/user.js";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from '@tanstack/react-query';
import QuestionComponent from './QuestionsComponent.js'
import emoational_image from '../../../../../../assets/selfawareness-images/emotional-intelligence.png'

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
        const week = 5;
        const { data, isLoading, isError } = useQuery({
          queryKey: [
            "dashboard/self-awareness-course",
            course?.course._id,
            week
          ],
          queryFn: () => userService.getMyActivites(course?.course._id, week)
        });

        // Check if data.activity exists and save it under one key 'activity1' in local storage
        if (data?.activity) {
          const activities = data.activity.activities;

          // Create an object with week and activities
          const activityData = {
            week: week,
            activities: activities
          };

          // Store the object in local storage under the key 'activity1'
          localStorage.setItem(
            "week-5-activityData",
            JSON.stringify(activityData)
          );

          console.log(
            "Week and activities saved to localStorage under 'activity1'"
          );
        }

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
      handleSubmit()
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

   console.log(course?.course._id);
   const handleSubmit = async () => {
     try {
       // Your submit logic here
     console.log(formData)
       const stringifiedFormData = JSON.stringify(formData);
       userService
         .postMyActivity(course.course._id, stringifiedFormData)
         .then((response) => {
           console.log("Submission successful:", response);
         })
         .catch((error) => {
           console.error("Submission failed:", error);
         });
     } catch (error) {
       console.error("Submission failed:", error);
       toast.error("Submission failed. Please try again later.");
     }
   };
  const renderActivityContent = () => {
    switch (currentActivity) {
      case 1:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-5/FLOW-5_1.mp4'
            />
            <NavigationButtons onNext={() => handleNext()} isBackDisabled />
          </>
        )

      case 2:
        return (
          <QuestionComponent
            questionText={'What do you understand by'}
            activityIndex={currentActivity}
            imageSrc={emoational_image}
            formData={formData}
            altText='?'
            onBack={handlePrevious}
            onNext={(answers) => handleNext({ answers })}
          />
        )
      case 3:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-5/FLOW-5_2.mp4'
            />
            <NavigationButtons
              onBack={handlePrevious}
              onNext={() => handleNext()}
            />
          </>
        )
      case 4:
        return (
          <EmojiEmotionMatch
            activityIndex={currentActivity}
            questionText='What exactly are'
            suffix='?'
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
      case 5:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-5/FLOW-5_3.mp4'
            />
            <NavigationButtons
              onBack={handlePrevious}
              onNext={() => handleNext()}
            />
          </>
        )
      case 6:
        return (
          <WeekFiveScenarioQuestions
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
      case 7:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-5/FLOW-5_4.mp4'
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
            <EmojiRespond
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
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-5/FLOW-5_5.mp4'
            />
            <NavigationButtons
              onBack={handlePrevious}
              onNext={() => handleNext()}
            />
          </>
        )
      case 10:
        return (
          <WeekFiveAssessmentForm
            onBack={handlePrevious}
            handleNextWeekCourse={handleNextWeekCourse}
            onNext={handleNext}
            course={course}
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
