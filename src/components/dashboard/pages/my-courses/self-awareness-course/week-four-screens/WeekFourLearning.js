import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyFireWorks from '../Fireworks'
import celebrate from '../../../../../../assets/celebrate.png'
import values from '../../../../../../assets/selfawareness-images/values.png'
import MindSetFlipQuestion from './MindSetFlipQuestion'
import WeekFourAssessmentForm from './WeekFourAssessmentForm'
import QuestionAboutPeople from './QuestionAboutPeople'
import CoreValuesQuestion from './CoreValuesQuestion'
import QuestionComponent from './QuestionComponent'
import userService from '../../../../../../services/api/user.js'
import { toast, ToastContainer } from 'react-toastify'
import EndOfCourseComponent from './EndOfCourseComponent'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from "react-redux";
import {
  updateData,
} from "../../../../../../redux/reducers/userAnswersReducer.js";

import ProgressionButtons from '../components/ProgressionButtons.jsx';
import VideoComponent from '../components/VideoComponent.jsx';

export default function WeekFourLearning({
  course,
  onClose,
  currentWeekIndex,
  courseId,
  handleLinkClick,
}) {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false)
  const [currentActivity, setCurrentActivity] = useState(() => {
    const savedState = localStorage.getItem(
      `week-${currentWeekIndex}-currentActivity`
    )
    return savedState ? JSON.parse(savedState) : 1
  })
  const week = 4;
  const [formData, setFormData] = useState()

  const { data, isLoading, status, isError } = useQuery({
    queryKey: ["self-awareness-course-4", courseId, week],
    queryFn: () => userService.getUserCourseData(courseId, week),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false
  });

  useEffect(() => {

    if (!data) return

    if (data.assessment && data.activity) {
      const assessments = data?.assessment?.assessments;
      const activities = data?.activity?.activities;
      const percent = data?.assessment?.rating;

      // Create an object with week and activities
      const activityData = {
        week: week,
        activities: activities
      };

      const assessment_data = {
        week: week,
        percentage: percent,
        assessments: assessments,
     
      }

      setFormData(activityData)
      // Store the object in local storage under the key 'activity1'
      localStorage.setItem("week-4-activityData", JSON.stringify(activityData));
      localStorage.setItem(
        "weekFourAssessmentData",
        JSON.stringify({ formattedData: assessment_data })
      );
      // This Dispatch will be used in submiting the data at the assessment page
      dispatch(
        updateData({
          course: course?.course?._id,
          courseEnrollmentId: courseId,
          week,
          activities: data.activity?.activities,
          assessments: data.assessment?.assessments,
        })
      );
    } else {
      // New user
      setFormData({
        week: week,
        activities: []
      })
      dispatch(
        updateData({
          course: course?.course?._id,
          courseEnrollmentId: courseId,
          week,
          activities: [],
          assessments: [],
        })
      );
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

    const isLastActivity = currentActivity >= 10
    if (isLastActivity) {
      setCurrentActivity(11)
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

  const renderActivityContent = () => {
    switch (currentActivity) {
      case 1:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-4/FLOW-4_1.mp4'
            />
						<div className="mt-3">
							<ProgressionButtons variant="next" onClickNext={handleNext} />
						</div>
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
            altText=''
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
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-4/FLOW-4_2.mp4'
            />
						<div className="mt-3">
							<ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
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
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-4/FLOW-4_3.mp4'
            />
						<div className="mt-3">
							<ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
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
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-4/FLOW-4_4.mp4'
            />
						<div className="mt-3">
							<ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
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
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-4/FLOW-4_5.mp4'
            />
						<div className="mt-3">
							<ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
          </>
        )
      case 10:
        return (
          <WeekFourAssessmentForm
            onBack={handlePrevious}
            handleNextWeekCourse={handleNextWeekCourse}
            onNext={handleNext}
            course={course}
            activityData={formData}
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
    <div className='week-learning'>
      <ToastContainer />
      <div className='content-container'>{renderActivityContent()}</div>
    </div>
  )
}
