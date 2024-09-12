import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyFireWorks from '../Fireworks'
import strengthweakness from '../../../../../../assets/selfawareness-images/strengthweakness.png'
import StrengthIdentification from './StrengthIdentification'
import WeaknessIdentification from './WeaknessIdentification'
import ScenarioQuestions from './ScenarioQuestions'
import WeekTwoAssessmentForm from './WeekTwoAssessmentForm'
import VideoComponent from './VideoComponent'
import QuestionComponent from './QuestionComponent'
import NavigationButtons from './NavigationButtons'
import userService from '../../../../../../services/api/user.js'
import { toast, ToastContainer } from 'react-toastify'
import EndOfCourseComponent from './EndOfCourseComponent.js'
import { useQuery } from '@tanstack/react-query'

export default function WeekTwoLearning({
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
  const week = 2;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard/self-awareness-course", course?.course?._id, week],
    queryFn: () => userService.getMyActivites(course?.course?._id, week)
  });
   const [assessmentData, setAssessmentData] = useState(null);
   const [assessmentLoading, setAssessmentLoading] = useState(true);
   const [assessmentError, setAssessmentError] = useState(null);
    useEffect(() => {
      const fetchAssessmentData = async () => {
        setAssessmentLoading(true);
        try {
          const data = await userService.getMyAssessment(courseId, week);
          setAssessmentData(data);
        } catch (error) {
          setAssessmentError(error);
        } finally {
          setAssessmentLoading(false);
        }
      };

      fetchAssessmentData();
    }, [courseId, week]);

    const assessments = assessmentData?.existingAssessment.assessments;
    const percent = assessmentData?.existingAssessment.rating;
    const color = assessmentData?.existingAssessment?.personalityColor;
// console.log(assessments)
  // Check if data.activity exists and save it under one key 'activity1' in local storage
  if (data?.activity && assessments) {
    const activities = data.activity.activities;

    // Create an object with week and activities
    const activityData = {
      week: week,
      activities: activities
    };
      const assessmentData = {
    week:week,
    percentage:percent,
    assessments:assessments,
    personalityColor:color
  }


    // Store the object in local storage under the key 'activity1'
    localStorage.setItem("week-2-activityData", JSON.stringify(activityData));
      localStorage.setItem(
    "weekTwoAssessmentData",
    JSON.stringify({ formData: assessmentData })
  );

    console.log("Week and activities saved to localStorage under 'activity1'");
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
//  console.log(course.course._id)
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
      handleSubmit()
    } else {
      setCurrentActivity((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentActivity((prev) => prev - 1)
  }
  const handleSubmit = async () => {
    try {
      // Your submit logic here
      const stringifiedFormData = JSON.stringify(formData)
      userService
        .postMyActivity(course.course._id, stringifiedFormData)
        .then((response) => {
          console.log("Submission successful:", response);
        })
        .catch((error) => {
          console.error("Submission failed:", error);
        });
    } catch (error) {
      console.error('Submission failed:', error)
      toast.error('Submission failed. Please try again later.')
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
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-2/FLOW-2_1.mp4'
            />
            <NavigationButtons onNext={() => handleNext()} isBackDisabled />
          </>
        )
      case 2:
        return (
          <QuestionComponent
            activityIndex={currentActivity}
            questionText={'What do you understand'}
            imageSrc={strengthweakness}
            formData={formData}
            altText='by?'
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
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-2/FLOW-2_2.mp4'
            />
            <NavigationButtons
              onBack={handlePrevious}
              onNext={() => handleNext()}
            />
          </>
        )
      case 4:
        return (
          <StrengthIdentification
            activityIndex={currentActivity}
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
          <WeaknessIdentification
            activityIndex={currentActivity}
            formData={formData}
            onBack={handlePrevious}
            onNext={(answers) =>
              handleNext({
                answers,
              })
            }
          />
        )
      case 6:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-2/FLOW-2_3.mp4'
            />
            <NavigationButtons
              onBack={handlePrevious}
              onNext={() => handleNext()}
            />
          </>
        )
      case 7:
        return (
          <ScenarioQuestions
            activityIndex={currentActivity}
            formData={formData}
            onBack={handlePrevious}
            onNext={(answers) =>
              handleNext({
                answers,
              })
            }
          />
        )
      case 8:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-2/FLOW-2_4.mp4'
            />
            <NavigationButtons
              onBack={handlePrevious}
              onNext={() => handleNext()}
            />
          </>
        )

      case 9:
        return (
          <WeekTwoAssessmentForm
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
