import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import strengthweakness from '../../../../../../assets/selfawareness-images/strengthweakness.png';
import StrengthIdentification from './StrengthIdentification';
import WeaknessIdentification from './WeaknessIdentification';
import ScenarioQuestions from './ScenarioQuestions';
import WeekTwoAssessmentForm from './WeekTwoAssessmentForm';
import VideoComponent from './VideoComponent';
import QuestionComponent from './QuestionComponent';
import NavigationButtons from './NavigationButtons';
import ProgressionButtons from '../components/ProgressionButtons.jsx';
import userService from '../../../../../../services/api/user.js';
import { toast, ToastContainer } from 'react-toastify';
import EndOfCourseComponent from './EndOfCourseComponent.js';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { updateData } from '../../../../../../redux/reducers/userAnswersReducer.js';

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

	const { data, isLoading, status, isError } = useQuery({
		queryKey: ['self-awareness-course-1', courseId, week],
		queryFn: () => userService.getUserCourseData(courseId, week),
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		keepPreviousData: false,
	});

	useEffect(() => {
		if (!data) return;

		if (data.assessment && data.activity) {
			const assessments = data?.assessment?.assessments;
			const activities = data?.activity?.activities;
			const percent = data?.assessment?.rating;

			// Create an object with week and activities
			const activityData = {
				week: week,
				activities: activities,
			};

			const assessment_data = {
				week: week,
				percentage: percent,
				assessments: assessments,
				personalityColor: data?.assessment?.personalityColor
					? data?.assessment?.personalityColor
					: 'Yellow',
			};

			setFormData(activityData);
			// Store the object in local storage under the key 'activity1'
			localStorage.setItem('week-2-activityData', JSON.stringify(activityData));
			localStorage.setItem(
				'weekTwoAssessmentData',
				JSON.stringify({ formattedData: assessment_data })
			);

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
				activities: [],
			});
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
	}, [data]);

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
	const handleNext = async (data = {}) => {
		setFormData((prevData) => {
			const updatedActivities = prevData?.activities?.map((item) =>
				item.activity === currentActivity ? { ...item, ...data } : item
			);
			if (!updatedActivities.find((item) => item.activity === currentActivity)) {
				updatedActivities.push({ activity: currentActivity, ...data });
			}
			return { ...prevData, activities: updatedActivities };
		});

		const isLastActivity = currentActivity >= 9;
		if (isLastActivity) {
			setCurrentActivity(10);
		} else {
			setCurrentActivity((prev) => prev + 1);
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
		<div>
			<ToastContainer />
			<div className="content-container">{renderActivityContent()}</div>
		</div>
	);
}
