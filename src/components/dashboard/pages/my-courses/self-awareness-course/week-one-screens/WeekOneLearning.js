import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import VideoComponent from './VideoComponent'
import QuestionComponent from './QuestionComponent'
import DragDropComponent from './DragAndDrop'
import EndOfCourseComponent from './EndOfCourseComponent'
import ModalComponent from './ModalComponent'
import celebrate from '../../../../../../assets/celebrate.png'
import selfAwareness from '../../../../../../assets/selfawareness-images/self-awareness.png'
import personality from '../../../../../../assets/selfawareness-images/personality.png'
import emotionalHand from '../../../../../../assets/selfawareness-images/emotional.png'
import analyticHand from '../../../../../../assets/selfawareness-images/analytic.png'
import friendshipHand from '../../../../../../assets/selfawareness-images/friendship.png'
import actionHand from '../../../../../../assets/selfawareness-images/action.png'
import PersonalityDescriptionComponent from './PersonalityDescriptionComponent'
import PersonalityQuestionComponent from './PersonalityQuestionComponent'
import PersonalityTest from './PersonalityTest'
import 'react-toastify/dist/ReactToastify.css'
import WeekOneAssessmentForm from './WeekOneAssessmentForm'
import AssessmentForm from './AssessmentForm'
import userService from '../../../../../../services/api/user.js'
import BuyCoursePopup from '../popUp.jsx'
import { useQuery } from '@tanstack/react-query'

export default function WeekOneLearning({
  course,
  onClose,
  currentWeekIndex,
  courseId,
  handleLinkClick,
}) {

  const [showPopup, setShowPopup] = useState(false)
  const [currentActivity, setCurrentActivity] = useState(() => {
    const savedState = localStorage.getItem(
      `week-${currentWeekIndex}-currentActivity`
    )

    return savedState ? JSON.parse(savedState) : 1
  })
  const [formData, setFormData] = useState()

  const week = 1;
  const { data, isLoading, status, isError } = useQuery({
    queryKey: ["dashboard/self-awareness-course", course?.course._id, week],
    queryFn: () => userService.getMyActivites(course?.course._id, week),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false
  });

  const { data: assessmentData, isLoading: assessmentLoading, status: assesmentStatus, isError: assessmentError } = useQuery({
    queryKey: ["get-self-awareness-assessment", course?.course._id, week],
    queryFn: () => userService.getMyAssessment(course?.course._id, week),
    enabled: !!course?.course._id && !!week,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false
  });


  // const [assessmentData, setAssessmentData] = useState(null);
  // const [assessmentLoading, setAssessmentLoading] = useState(true);
  // const [assessmentError, setAssessmentError] = useState(null);

  // useEffect(() => {
  //   const fetchAssessmentData = async () => {
  //     setAssessmentLoading(true);
  //     try {
  //       const data = await userService.getMyAssessment(courseId, week);
  //       setAssessmentData(data);
  //     } catch (error) {
  //       setAssessmentError(error);
  //     } finally {
  //       setAssessmentLoading(false);
  //     }
  //   };

  //   fetchAssessmentData();
  // }, [courseId, week]);


  // console.log(assessments)Don’t have an account? Sign Up


  useEffect(() => {

    if (!data || !assessmentData) return
    console.log(assessmentData, "assesment data")

    const assessments = assessmentData?.existingAssessment?.assessments;
    const percent = assessmentData?.existingAssessment?.rating;
    const color = assessmentData?.existingAssessment?.personalityColor;
    // Check if data.activity exists and save it under one key 'activity1' in local storage
    if (data?.activity && assessments?.length > 0) {

      const activities = data.activity.activities;
      // Create an object with week and activities
      const activityData = {
        week: week,
        activities: activities
      };

      const assessment_data = {
        week: week,
        percentage: percent,
        assessments: assessments,
        personalityColor: personality
      }

      setFormData(activityData)
      // Store the object in local storage under the key 'activity1'
      localStorage.setItem("week-1-activityData", JSON.stringify(activityData));
      localStorage.setItem(
        "weekOneAssessmentData",
        JSON.stringify({ formData: assessment_data })
      );

    } else {

      // New user
      setFormData({
        week: week,
        activities: []
      })
    }

  }, [data, assessmentData])


  useEffect(() => {
    const canSee = localStorage.getItem(`${courseId}-can-see`)
    if (canSee === null) {
      setShowPopup(true)
    }
  }, [courseId])
  // console.log(course.course._id)

  const handleClosePopup = () => {
    setShowPopup(false)
  }

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

  const handleSubmit = async () => {

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

  const handleNext = async (data = {}) => {
    setFormData((prevData) => {

      const updatedActivities = prevData?.activities?.map((item) =>
        item.activity === currentActivity ? { ...item, ...data } : item
      )
      if (
        !updatedActivities?.find((item) => item.activity === currentActivity)
      ) {
        updatedActivities?.push({ activity: currentActivity, ...data })
      }
      return { ...prevData, activities: updatedActivities }
    })

    // Check if it's the last activity defined and go to the default case
    const isLastActivity = currentActivity >= 15
    if (isLastActivity) {
      setCurrentActivity(16) // This will trigger the default case in renderActivityContent
    } else {
      const nextActivity = currentActivity + 1
      setCurrentActivity(nextActivity)
    }
  }

  const handlePrevious = () => {
    const prevActivity = currentActivity - 1
    setCurrentActivity(prevActivity)
  }

  const closeReviewPopUp = () => setReviewPopUp(false)

  const handleNextWeekCourse = () => {
    const nextWeekIndex = currentWeekIndex + 1
    navigate(`/dashboard/self-awareness-course/${courseId}`, {
      state: { course, weekIndex: nextWeekIndex },
    })
  }

  const renderActivityContent = () => {
    //  if (showPopup) {
    //   return <BuyCoursePopup />;
    // }
    switch (currentActivity) {
      case 1:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_1.mp4'
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

      case 2:
        return (
          <QuestionComponent
            questionText={'What do you think'}
            activityIndex={currentActivity}
            imageSrc={selfAwareness}
            formData={formData}
            altText='is?'
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
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_2.mp4'
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

      case 4:
        return (
          <QuestionComponent
            questionText={'What do you think'}
            activityIndex={currentActivity}
            imageSrc={personality}
            formData={formData}
            altText='is?'
            onBack={handlePrevious}
            onNext={(answers) => handleNext({ answers })}
          />
        )

      case 5:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_3.mp4'
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

      case 6:
        return (
          <div className='drag-drop-section'>
            <DragDropComponent
              activityIndex={currentActivity}
              formData={formData}
              onBack={handlePrevious}
              onNext={handleNext}
            />
          </div>
        )

      case 7:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_4.mp4'
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

      case 8:
        return (
          <PersonalityDescriptionComponent
            questionText='What do you understand by the word,'
            imageSrc={personality}
            emotionalHand={emotionalHand}
            activityIndex={currentActivity}
            analyticHand={analyticHand}
            friendshipHand={friendshipHand}
            actionHand={actionHand}
            altText='?'
            formData={formData}
            onBack={handlePrevious}
            onNext={(answer) => handleNext({ answer })}
          />
        )

      case 9:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_5.mp4'
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

      case 10:
        return (
          <PersonalityTest
            activityIndex={currentActivity}
            formData={formData}
            onBack={handlePrevious}
            onNext={handleNext}
          />
        )

      case 11:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_6.mp4'
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

      case 12:
        return (
          <QuestionComponent
            activityIndex={12}
            questionText='Did you discover something new about yourself through this assessment? What did you learn?'
            imageSrc=''
            formData={formData}
            altText=''
            onBack={handlePrevious}
            onNext={(answers) => handleNext({ answers })}
          />
        )
      case 13:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc='https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_7.mp4'
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
      case 14:
        return (
          <PersonalityQuestionComponent
            onBack={handlePrevious}
            onNext={(answers) => handleNext({ answers })}
            activityIndex={currentActivity}
            questions={[
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
            formData={formData}
          />
        )

      case 15:
        return (
          <WeekOneAssessmentForm
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
    <div className='week-one-learning'>
      <ToastContainer />
      <div className='content-container'>
        {renderActivityContent()}
        <ModalComponent
          show={reviewPopUp}
          handleClose={closeReviewPopUp}
        // Additional props for ModalComponent if needed
        />
      </div>
    </div>
  )
}
