import React, { useEffect, useState, useCallback } from 'react'
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
import { useQuery, useQueryClient } from '@tanstack/react-query'
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
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem(`week-4-activityData`);
    return savedData ? JSON.parse(savedData) : { week: 4, activities: [] };
  });

  const { data: courseData, isLoading, status, isError } = useQuery({
    queryKey: ["self-awareness-course-4", courseId, week],
    queryFn: () => userService.getUserCourseData(courseId, week),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false
  });

  useEffect(() => {
    if (!courseData) return;

    if (courseData.activity) {
      const activities = courseData.activity.activities || [];

      // Remote State Restoration: Jump to last saved page if it exists and week is NOT completed
      if (courseData.activity.lastActivityIndex && !isCompleted) {
        setCurrentActivity(courseData.activity.lastActivityIndex);
      }

      // Robust Merge: Only use remote activities if they are more comprehensive or if local is empty
      setFormData((prevData) => {
        const localActivities = prevData?.activities || [];
        if (localActivities.length > 0 && activities.length <= localActivities.length) {
          // Keep local data as it might be fresher
          return prevData;
        }
        return { ...prevData, activities: activities };
      });

      dispatch(
        updateData({
          course: course?.course?._id,
          courseEnrollmentId: courseId,
          week,
          activities: activities,
          assessments: courseData.assessment?.assessments || [],
        })
      );
    }


    if (courseData.assessment) {
      const assessments = courseData.assessment.assessments || [];
      const percent = courseData.assessment.rating;

      const assessment_data = {
        week: week,
        percentage: percent,
        assessments: assessments,
      };

      localStorage.setItem(
        'weekFourAssessmentData',
        JSON.stringify({ formattedData: assessment_data })
      );
    }
  }, [courseData]);

  const [videoPlaying, setVideoPlaying] = useState(false);
  const [reviewPopUp, setReviewPopUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(
      `week-${currentWeekIndex}-currentActivity`,
      JSON.stringify(currentActivity)
    );
  }, [currentActivity, currentWeekIndex]);

  useEffect(() => {
    localStorage.setItem(`week-${currentWeekIndex}-activityData`, JSON.stringify(formData));
  }, [formData, currentWeekIndex]);

  const isCompleted = !!courseData?.assessment;

  const queryClient = useQueryClient();

  const handleNext = useCallback(async (incomingData = {}) => {
    const currentActivities = formData?.activities || courseData?.activity?.activities || [];
    const updatedActivities = currentActivities.map((item) =>
      item.activity === currentActivity ? { ...item, ...incomingData } : item
    );

    if (!updatedActivities.find((item) => item.activity === currentActivity)) {
      updatedActivities.push({ activity: currentActivity, ...incomingData });
    }

    setFormData((prevData) => ({ ...prevData, activities: updatedActivities }));

    const nextActivity = currentActivity >= 10 ? 11 : currentActivity + 1;
    setCurrentActivity(nextActivity);

    if (!isCompleted) {
      // Fire and Forget: Save progress to background
      const payload = {
        week: week,
        activities: updatedActivities,
        lastActivityIndex: nextActivity // Save where they are going
      };

      userService.postMyActivity(courseId, payload)
        .then(() => {
          // Invalidate enrollment query to reflect any backend updates
          queryClient.invalidateQueries(['enrollment', courseId]);
        })
        .catch(err => {
          console.error("Failed to auto-save activity:", err);
        });
    }
  }, [formData?.activities, courseData?.activity?.activities, currentActivity, courseId, isCompleted]);

  const handlePrevious = () => {
    setCurrentActivity((prev) => prev - 1)
  }

  const closeReviewPopUp = () => setReviewPopUp(false)

  const handleNextWeekCourse = () => {
    const nextWeekIndex = currentWeekIndex + 1
    navigate(`/dashboard/self-awareness-course`, {
      state: { enrollmentData: course, weekIndex: nextWeekIndex },
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
            isCompleted={isCompleted}
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
