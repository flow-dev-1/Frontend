import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import strengthweakness from '../../../../../../assets/selfawareness-images/strengthweakness.png';
import StrengthIdentification from './StrengthIdentification';
import WeaknessIdentification from './WeaknessIdentification';
import ScenarioQuestions from './ScenarioQuestions';
import WeekTwoAssessmentForm from './WeekTwoAssessmentForm';
import QuestionComponent from './QuestionComponent';
import userService from '../../../../../../services/api/user.js';
import { toast, ToastContainer } from 'react-toastify';
import EndOfCourseComponent from './EndOfCourseComponent.js';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { updateData } from '../../../../../../redux/reducers/userAnswersReducer.js';

import ProgressionButtons from '../components/ProgressionButtons.jsx';
import VideoComponent from '../components/VideoComponent.jsx';

export default function WeekTwoLearning({
	course,
	courseId,
	onClose,
	currentWeekIndex,
	handleLinkClick,
}) {
	const dispatch = useDispatch();
	const [currentActivity, setCurrentActivity] = useState(() => {
		const savedState = localStorage.getItem(`week-${currentWeekIndex}-currentActivity`);
		return savedState ? JSON.parse(savedState) : 1;
	});
	const [formData, setFormData] = useState();
	const week = 2;

	const { data: courseData, isLoading, status, isError } = useQuery({
		queryKey: ['self-awareness-course-2', courseId, week],
		queryFn: () => userService.getUserCourseData(courseId, week),
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		keepPreviousData: false,
	});

	useEffect(() => {
		if (!courseData) return;

		if (courseData.activity) {
			const activities = courseData.activity.activities || [];

			// Remote State Restoration: Jump to last saved page if it exists
			if (courseData.activity.lastActivityIndex) {
				setCurrentActivity(courseData.activity.lastActivityIndex);
			}

			const activityData = {
				week: week,
				activities: activities,
			};

			setFormData(activityData);
			localStorage.setItem('week-2-activityData', JSON.stringify(activityData));

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
				'weekTwoAssessmentData',
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
	//  console.log(course.course._id)
	const isCompleted = !!courseData?.assessment;

	const handleNext = async (incomingData = {}) => {
		const updatedActivities =
			formData?.activities?.map((item) =>
				item.activity === currentActivity ? { ...item, ...incomingData } : item
			) || [];

		if (!updatedActivities.find((item) => item.activity === currentActivity)) {
			updatedActivities.push({ activity: currentActivity, ...incomingData });
		}

		setFormData((prevData) => ({ ...prevData, activities: updatedActivities }));

		const nextActivity = currentActivity >= 9 ? 10 : currentActivity + 1;
		setCurrentActivity(nextActivity);

		if (!isCompleted) {
			// Fire and Forget: Save progress to background
			const payload = {
				week: week,
				activities: updatedActivities,
				lastActivityIndex: nextActivity // Save where they are going
			};

			userService.postMyActivity(courseId, payload).catch(err => {
				console.error("Failed to auto-save activity:", err);
			});
		}
	};

	const handlePrevious = () => {
		setCurrentActivity((prev) => prev - 1);
	};

	const handleNextWeekCourse = () => {
		const nextWeekIndex = currentWeekIndex + 1;
		navigate(`/dashboard/self-awareness-course/${course._id}`, {
			state: { course, weekIndex: nextWeekIndex },
		});
	};

	// console.log(formData)
	const renderActivityContent = () => {
		switch (currentActivity) {
			case 1:
				return (
					<>
						<VideoComponent
							videoPlaying={videoPlaying}
							setVideoPlaying={setVideoPlaying}
							videoSrc="https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-2/FLOW-2_1.mp4"
						/>
						<div className="mt-3">
							<ProgressionButtons variant={'next'} onClickNext={handleNext} />
						</div>
					</>
				);
			case 2:
				return (
					<QuestionComponent
						activityIndex={currentActivity}
						questionText={'What do you understand'}
						imageSrc={strengthweakness}
						formData={formData}
						altText="by?"
						onBack={handlePrevious}
						onNext={(answers) =>
							handleNext({
								answers,
							})
						}
					/>
				);
			case 3:
				return (
					<>
						<VideoComponent
							videoPlaying={videoPlaying}
							setVideoPlaying={setVideoPlaying}
							videoSrc="https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-2/FLOW-2_2.mp4"
						/>
						<div className="mt-3">
							<ProgressionButtons variant={'both'} onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
					</>
				);
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
				);
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
				);
			case 6:
				return (
					<>
						<VideoComponent
							videoPlaying={videoPlaying}
							setVideoPlaying={setVideoPlaying}
							videoSrc="https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-2/FLOW-2_3.mp4"
						/>
						<div className="mt-3">
							<ProgressionButtons variant={'both'} onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
					</>
				);
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
				);
			case 8:
				return (
					<>
						<VideoComponent
							videoPlaying={videoPlaying}
							setVideoPlaying={setVideoPlaying}
							videoSrc="https://d3sc34m1n26ele.cloudfront.net/self-awareness-week-2/FLOW-2_4.mp4"
						/>
						<div className="mt-3">
							<ProgressionButtons variant={'both'} onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
					</>
				);

			case 9:
				return (
					<WeekTwoAssessmentForm
						onBack={handlePrevious}
						handleNextWeekCourse={handleNextWeekCourse}
						onNext={handleNext}
						course={course}
						activityData={formData}
						isCompleted={isCompleted}
					/>
				);
			default:
				return (
					<EndOfCourseComponent
						onNextWeekCourse={handleNextWeekCourse}
						onClose={onClose}
						handleLinkClick={handleLinkClick}
						setCurrentActivity={setCurrentActivity}
						openReviewPopUp={() => setReviewPopUp(true)}
					/>
				);
		}
	};

	return (
		<div className='week-learning'>
			<ToastContainer />
			<div className="content-container">{renderActivityContent()}</div>
		</div>
	);
}
