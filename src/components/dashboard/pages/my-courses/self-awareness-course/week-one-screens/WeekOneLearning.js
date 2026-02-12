import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
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
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { updateData } from '../../../../../../redux/reducers/userAnswersReducer.js';

import ProgressionButtons from '../components/ProgressionButtons.jsx';
import VideoComponent from '../components/VideoComponent.jsx';

export default function WeekOneLearning({
	course,
	onClose,
	currentWeekIndex,
	courseId,
	handleLinkClick,
}) {
	const dispatch = useDispatch();
	const [showPopup, setShowPopup] = useState(false);
	const [currentActivity, setCurrentActivity] = useState(() => {
		const savedState = localStorage.getItem(`week-${currentWeekIndex}-currentActivity`);

		return savedState ? JSON.parse(savedState) : 1;
	});
	const [formData, setFormData] = useState();

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

			// Remote State Restoration: Jump to last saved page if it exists
			if (courseData.activity.lastActivityIndex) {
				setCurrentActivity(courseData.activity.lastActivityIndex);
			}

			const activityData = {
				week: week,
				activities: activities,
			};

			setFormData(activityData);
			localStorage.setItem('week-1-activityData', JSON.stringify(activityData));

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
				'weekOneAssessmentData',
				JSON.stringify({ formattedData: assessment_data })
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
		localStorage.setItem(
			`week-${currentWeekIndex}-currentActivity`,
			JSON.stringify(currentActivity)
		);
	}, [currentActivity, currentWeekIndex]);

	useEffect(() => {
		localStorage.setItem(`week-${currentWeekIndex}-activityData`, JSON.stringify(formData));
	}, [formData, currentWeekIndex]);

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

		const nextActivity = currentActivity >= 15 ? 16 : currentActivity + 1;
		setCurrentActivity(nextActivity);

		const isCompleted = !!courseData?.assessment;
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
		const prevActivity = currentActivity - 1;
		setCurrentActivity(prevActivity);
	};

	const closeReviewPopUp = () => setReviewPopUp(false);

	const handleNextWeekCourse = () => {
		const nextWeekIndex = currentWeekIndex + 1;
		navigate(`/dashboard/self-awareness-course/${courseId}`, {
			state: { course, weekIndex: nextWeekIndex },
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
