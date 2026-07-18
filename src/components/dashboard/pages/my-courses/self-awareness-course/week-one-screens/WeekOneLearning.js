import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import QuestionComponent from './QuestionComponent';
import DragDropComponent from './DragAndDrop';
import EndOfCourseComponent from './EndOfCourseComponent';
import ModalComponent from './ModalComponent';
import selfAwareness from '../../../../../../assets/selfawareness-images/self-awareness.png';
import personality from '../../../../../../assets/selfawareness-images/personality.png';
import emotionalHand from '../../../../../../assets/selfawareness-images/emotional.png';
import analyticHand from '../../../../../../assets/selfawareness-images/analytic.png';
import friendshipHand from '../../../../../../assets/selfawareness-images/friendship.png';
import actionHand from '../../../../../../assets/selfawareness-images/action.png';
import PersonalityDescriptionComponent from './PersonalityDescriptionComponent';
import PersonalityQuestionComponent from './PersonalityQuestionComponent';
import PersonalityTest from './PersonalityTest';
import 'react-toastify/dist/ReactToastify.css';
import WeekOneAssessmentForm from './WeekOneAssessmentForm';
import userService from '../../../../../../services/api/user.js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { updateData } from '../../../../../../redux/reducers/userAnswersReducer.js';

import ProgressionButtons from '../components/ProgressionButtons.jsx';
import VideoComponent from '../components/VideoComponent.jsx';
import {
	getLegacySelfAwarenessActivityDataKey,
	getLegacySelfAwarenessActivityProgressKey,
	getSelfAwarenessActivityDataKey,
	getSelfAwarenessActivityProgressKey,
	mergeSelfAwarenessActivityDrafts,
	readSelfAwarenessStorage,
	writeSelfAwarenessStorage,
} from '../utils/storage';

const WEEK_ONE_VISIBLE_FLOW = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 13, 15];
const LEGACY_REMOVED_ACTIVITY = 12;
const REAL_ACTIVITY_SIX = 14;

const normalizeWeekOneActivity = (activity) => {
	const activityNumber = Number(activity) || 1;
	if (activityNumber === LEGACY_REMOVED_ACTIVITY) return REAL_ACTIVITY_SIX;
	if (WEEK_ONE_VISIBLE_FLOW.includes(activityNumber)) return activityNumber;
	if (activityNumber > Math.max(...WEEK_ONE_VISIBLE_FLOW)) return activityNumber;
	return 1;
};

const getNextWeekOneActivity = (activity) => {
	const normalizedActivity = normalizeWeekOneActivity(activity);
	const currentIndex = WEEK_ONE_VISIBLE_FLOW.indexOf(normalizedActivity);
	return WEEK_ONE_VISIBLE_FLOW[currentIndex + 1] || 16;
};

const getPreviousWeekOneActivity = (activity) => {
	const normalizedActivity = normalizeWeekOneActivity(activity);
	const currentIndex = WEEK_ONE_VISIBLE_FLOW.indexOf(normalizedActivity);
	return WEEK_ONE_VISIBLE_FLOW[currentIndex - 1] || 1;
};

export default function WeekOneLearning({
	course,
	onClose,
	currentWeekIndex,
	courseId,
	handleLinkClick,
	requestedActivity,
	onActivityChange,
}) {
	const dispatch = useDispatch();
	const [showPopup, setShowPopup] = useState(false);
	const [currentActivity, setCurrentActivity] = useState(() => {
		return normalizeWeekOneActivity(readSelfAwarenessStorage(
			getSelfAwarenessActivityProgressKey(courseId, currentWeekIndex),
			getLegacySelfAwarenessActivityProgressKey(currentWeekIndex),
			1
		));
	});
	const [formData, setFormData] = useState(() => {
		return readSelfAwarenessStorage(
			getSelfAwarenessActivityDataKey(courseId, 1),
			getLegacySelfAwarenessActivityDataKey(1),
			{ week: 1, activities: [] }
		);
	});

	const week = 1;
	const { data: courseData, isLoading, status, isError } = useQuery({
		queryKey: ['self-awareness-course-1', courseId, week],
		queryFn: () => userService.getUserCourseData(courseId, week),
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
		keepPreviousData: false,
	});

	useEffect(() => {
		if (!courseData) return;

		if (courseData.activity) {
			const activities = courseData.activity.activities || [];

			// Remote State Restoration: Jump to last saved page if it exists and week is NOT completed
			if (courseData.activity.lastActivityIndex && !isCompleted) {
				setCurrentActivity(normalizeWeekOneActivity(courseData.activity.lastActivityIndex));
			}

			setFormData((prevData) => {
				const draftActivities = prevData?.activities || [];
				return {
					...prevData,
					week,
					activities: mergeSelfAwarenessActivityDrafts(activities, draftActivities),
				};
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

			writeSelfAwarenessStorage(
				'weekOneAssessmentData',
				{ formattedData: assessment_data }
			);
		}
	}, [courseData]);

	useEffect(() => {
		const canSee = localStorage.getItem(`${courseId}-can-see`);
		if (canSee === null) {
			setShowPopup(true);
		}
	}, [courseId]);
	// console.log(course.course._id)

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	const [videoPlaying, setVideoPlaying] = useState(false);
	const [reviewPopUp, setReviewPopUp] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		writeSelfAwarenessStorage(
			getSelfAwarenessActivityProgressKey(courseId, currentWeekIndex),
			currentActivity
		);
		onActivityChange?.(currentWeekIndex, currentActivity);
	}, [courseId, currentActivity, currentWeekIndex, onActivityChange]);

	useEffect(() => {
		if (requestedActivity?.week !== currentWeekIndex) return;
		if (!requestedActivity?.activity) return;
		setCurrentActivity(normalizeWeekOneActivity(requestedActivity.activity));
	}, [currentWeekIndex, requestedActivity]);

	useEffect(() => {
		const normalizedActivity = normalizeWeekOneActivity(currentActivity);
		if (normalizedActivity !== currentActivity) {
			setCurrentActivity(normalizedActivity);
		}
	}, [currentActivity]);

	useEffect(() => {
		writeSelfAwarenessStorage(
			getSelfAwarenessActivityDataKey(courseId, 1),
			formData
		);
	}, [courseId, formData]);

	const isCompleted = !!courseData?.assessment;

	const queryClient = useQueryClient();

	const onLocalUpdate = useCallback((incomingData) => {
		setFormData((prevData) => {
			const currentActivities = prevData?.activities || courseData?.activity?.activities || [];
			const updatedActivities = currentActivities.map((item) =>
				item.activity === currentActivity ? { ...item, ...incomingData } : item
			);

			if (!updatedActivities.find((item) => item.activity === currentActivity)) {
				updatedActivities.push({ activity: currentActivity, ...incomingData });
			}

			return { ...prevData, activities: updatedActivities };
		});
	}, [currentActivity, courseData?.activity?.activities]);

	const handleNext = useCallback(async (incomingData = {}) => {
		const currentActivities = formData?.activities || courseData?.activity?.activities || [];
		const updatedActivities = currentActivities.map((item) =>
			item.activity === currentActivity ? { ...item, ...incomingData } : item
		);

		if (!updatedActivities.find((item) => item.activity === currentActivity)) {
			updatedActivities.push({ activity: currentActivity, ...incomingData });
		}

		setFormData((prevData) => ({ ...prevData, activities: updatedActivities }));

		const nextActivity = getNextWeekOneActivity(currentActivity);

		if (!isCompleted && !isLoading) {
			const payload = {
				week: week,
				activities: updatedActivities,
				lastActivityIndex: nextActivity // Save where they are going
			};

			try {
				const result = await userService.postMyActivity(courseId, payload);
				queryClient.setQueryData(
					['self-awareness-course-1', courseId, week],
					(previousData) => ({
						...(previousData || {}),
						activity: result?.newActivity || {
							...(previousData?.activity || {}),
							...payload,
						},
					})
				);
				await queryClient.invalidateQueries({ queryKey: ['enrollment', courseId] });
			} catch (err) {
				console.error("Failed to auto-save activity:", err);
				return false;
			}
		}
		setCurrentActivity(nextActivity);
		return true;
	}, [formData?.activities, courseData?.activity?.activities, currentActivity, courseId, isCompleted, isLoading, queryClient]);

	const handlePrevious = () => {
		const prevActivity = getPreviousWeekOneActivity(currentActivity);
		setCurrentActivity(prevActivity);
	};

	const closeReviewPopUp = () => setReviewPopUp(false);

	const handleNextWeekCourse = () => {
		const nextWeekIndex = currentWeekIndex + 1;
		if (handleLinkClick) {
			handleLinkClick(nextWeekIndex - 1, 1);
			return;
		}
		navigate(`/dashboard/self-awareness-course`, {
			state: { enrollmentData: course, weekIndex: nextWeekIndex },
		});
	};

	const renderActivityContent = () => {
		switch (currentActivity) {
			case 1:
				return (
					<>
						<VideoComponent
							videoPlaying={videoPlaying}
							setVideoPlaying={setVideoPlaying}
							videoSrc="https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_1.mp4"
						/>
						<div className="mt-3">
							<ProgressionButtons variant="next" onClickNext={handleNext} />
						</div>
					</>
				);

			case 2:
				return (
					<QuestionComponent
						questionText={'What do you think'}
						activityIndex={currentActivity}
						imageSrc={selfAwareness}
						formData={formData}
						altText="is?"
						onBack={handlePrevious}
						onUpdate={onLocalUpdate}
						onNext={(answers) => handleNext({ answers })}
					/>
				);

			case 3:
				return (
					<>
						<VideoComponent
							videoPlaying={videoPlaying}
							setVideoPlaying={setVideoPlaying}
							videoSrc="https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_2.mp4"
						/>
						<div className="mt-3">
							<ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
					</>
				);

			case 4:
				return (
					<QuestionComponent
						questionText={'What do you think'}
						activityIndex={currentActivity}
						imageSrc={personality}
						formData={formData}
						altText="is?"
						onBack={handlePrevious}
						onUpdate={onLocalUpdate}
						onNext={(answers) => handleNext({ answers })}
					/>
				);

			case 5:
				return (
					<>
						<VideoComponent
							videoPlaying={videoPlaying}
							setVideoPlaying={setVideoPlaying}
							videoSrc="https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_3.mp4"
						/>
						<div className="mt-3">
							<ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
					</>
				);

			case 6:
				return (
					<div className="drag-drop-section">
						<DragDropComponent
							activityIndex={currentActivity}
							formData={formData}
							onBack={handlePrevious}
							onUpdate={onLocalUpdate}
							onNext={handleNext}
						/>
					</div>
				);

			case 7:
				return (
					<>
						<VideoComponent
							videoPlaying={videoPlaying}
							setVideoPlaying={setVideoPlaying}
							videoSrc="https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_4.mp4"
						/>
						<div className="mt-3">
							<ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
					</>
				);

			case 8:
				return (
					<PersonalityDescriptionComponent
						questionText="What do you understand by the word,"
						imageSrc={personality}
						emotionalHand={emotionalHand}
						activityIndex={currentActivity}
						analyticHand={analyticHand}
						friendshipHand={friendshipHand}
						actionHand={actionHand}
						altText="?"
						formData={formData}
						onBack={handlePrevious}
						onUpdate={onLocalUpdate}
						onNext={(answer) => handleNext({ answer })}
					/>
				);

			case 9:
				return (
					<>
						<VideoComponent
							videoPlaying={videoPlaying}
							setVideoPlaying={setVideoPlaying}
							videoSrc="https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_5.mp4"
						/>
						<div className="mt-3">
							<ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
					</>
				);

			case 10:
				return (
					<PersonalityTest
						activityIndex={currentActivity}
						formData={formData}
						onBack={handlePrevious}
						onUpdate={onLocalUpdate}
						onNext={handleNext}
					/>
				);

			case 11:
				return (
					<>
						<VideoComponent
							videoPlaying={videoPlaying}
							setVideoPlaying={setVideoPlaying}
							videoSrc="https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_6.mp4"
						/>
						<div className="mt-3">
							<ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
					</>
				);

			case 12:
				return (
					<QuestionComponent
						activityIndex={12}
						questionText="Did you discover something new about yourself through this assessment? What did you learn?"
						imageSrc=""
						formData={formData}
						altText=""
						onBack={handlePrevious}
						onUpdate={onLocalUpdate}
						onNext={(answers) => handleNext({ answers })}
					/>
				);
			case 13:
				return (
					<>
						<VideoComponent
							videoPlaying={videoPlaying}
							setVideoPlaying={setVideoPlaying}
							videoSrc="https://d3sc34m1n26ele.cloudfront.net/week-1/FLOW+1_7.mp4"
						/>
						<div className="mt-3">
							<ProgressionButtons variant="both" onClickNext={handleNext} onClickPrev={handlePrevious} />
						</div>
					</>
				);
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
						onUpdate={onLocalUpdate}
					/>
				);

			case 15:
				return (
					<WeekOneAssessmentForm
						onBack={handlePrevious}
						handleNextWeekCourse={handleNextWeekCourse}
						onNext={handleNext}
						course={course}
						activityData={formData}
						savedAssessment={courseData?.assessment}
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
		<div className="week-learning">
			<ToastContainer />
			<div className="content-container">
				{renderActivityContent()}
				<ModalComponent
					reviewPopUp={reviewPopUp}
					closeReviewPopUp={closeReviewPopUp}
				/>
			</div>
		</div>
	);
}
