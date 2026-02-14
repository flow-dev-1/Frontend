import React, { useEffect, useState, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import MyFireWorks from '../Fireworks'
import celebrate from '../../../../../../assets/celebrate.png'
import WeekFiveAssessmentForm from './WeekFiveAssessmentForm'
import EmojiEmotionMatch from './EmojiEmotionMatch'
import WeekFiveScenarioQuestions from './WeekFiveScenarioQuestions'
import EmojiRespond from './EmojiRespond'
import EndOfCourseComponent from './EndOfCourseComponent'
import userService from "../../../../../../services/api/user.js";
import { toast, ToastContainer } from "react-toastify";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import QuestionComponent from './QuestionsComponent.js'
import emoational_image from '../../../../../../assets/selfawareness-images/emotional-intelligence.png'
import { useDispatch } from "react-redux";
import {
  updateData,
} from "../../../../../../redux/reducers/userAnswersReducer.js";

import ProgressionButtons from '../components/ProgressionButtons.jsx';
import VideoComponent from '../components/VideoComponent.jsx';

export default function WeekFiveLearning({
  course,
  courseId,
  onClose,
  currentWeekIndex,
}) {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false)
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem(`week-5-activityData`);
    return savedData ? JSON.parse(savedData) : { week: 5, activities: [] };
  });

  const [currentActivity, setCurrentActivity] = useState(() => {
    const savedState = localStorage.getItem(
      `week-${currentWeekIndex}-currentActivity`
    )
    return savedState ? JSON.parse(savedState) : 1
  })
  const week = 5;

  const { data: courseData, isLoading, status, isError } = useQuery({
    queryKey: ["self-awareness-course-5", courseId, week],
    queryFn: () => userService.getUserCourseData(courseId, week),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false
  });

  // Check if data.activity exists and save it under one key 'activity1' in local storage

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
        personalityColor: courseData.assessment.personalityColor || 'Yellow',
      };

      localStorage.setItem(
        'weekFiveAssessmentData',
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
    localStorage.setItem(`week-5-activityData`, JSON.stringify(formData));
  }, [formData]);

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

    const nextActivity = currentActivity + 1;
    setCurrentActivity(nextActivity);

    if (!isCompleted && !isLoading) {
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
  }, [formData?.activities, courseData?.activity?.activities, currentActivity, courseId, isCompleted, isLoading]);


  const handlePrevious = () => {
    setCurrentActivity((prev) => prev - 1);
  };

  const closeReviewPopUp = () => setReviewPopUp(false);

  const handleNextWeekCourse = () => {
    const nextWeekIndex = currentWeekIndex + 1;
    navigate(`/dashboard/self-awareness-course`, {
      state: { enrollmentData: course, weekIndex: nextWeekIndex },
    });
  };

  const handleSubmit = async () => {
    if (isCompleted) {
      return { success: true, message: "Week already completed." };
    }

    if (formData?.activities?.length < 8) {
      return { success: false, message: "Submission failed" };
    }

    try {
      const stringifiedFormData = JSON.stringify(formData);
      const response = await userService.postMyActivity(courseId, stringifiedFormData);

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
            <div className="mt-3">
              <ProgressionButtons variant="next" onClickNext={handleNext} />
            </div>
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
            <div className="mt-3">
              <ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
            </div>
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
            <div className="mt-3">
              <ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
            </div>
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
            <div className="mt-3">
              <ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
            </div>
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
            <div className="mt-3">
              <ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
            </div>
          </>
        )
      case 10:
        return (
          <WeekFiveAssessmentForm
            onBack={handlePrevious}
            onNext={handleNext}
            course={course}
            handleActivitySubmit={handleSubmit}
            activityData={formData}
            isCompleted={isCompleted}
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
    <div className='week-learning'>
      <ToastContainer />
      <div className='content-container'>{renderActivityContent()}</div>
    </div>
  )
}
