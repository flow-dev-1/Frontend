import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './newcourse.css';
import './breakpoints.css';
import './styles.css';
import courseOne from '../../../../../assets/course1.png';
import WeekOneLearning from './week-one-screens/WeekOneLearning';
import WeekTwoLearning from './week-two-screens/WeekTwoLearning';
import WeekThreeLearning from './week-three-screens/WeekThreeLearning';
import WeekFourLearning from './week-four-screens/WeekFourLearning';
import WeekFiveLearning from './week-five-course/WeekFiveLearning';
import userService from '../../../../../services/api/user';
import { useQueries, useQuery } from '@tanstack/react-query';
import Loading from '../../../../loader/Loader';
import {
	getLegacySelfAwarenessActivityProgressKey,
	getSelfAwarenessActivityProgressKey,
	readSelfAwarenessStorage,
	writeSelfAwarenessRawStorage,
	writeSelfAwarenessStorage,
} from './utils/storage';

const COURSE_STRUCTURE = [
	{
		week: 1,
		title: 'Introduction to Self-Awareness',
		items: [
			{ activity: 1, label: 'Video 1: Introduction Video' },
			{ activity: 2, label: 'Activity 1' },
			{ activity: 3, label: 'Video 2: Self Awareness' },
			{ activity: 4, label: 'Activity 2' },
			{ activity: 5, label: 'Video 3: Personality' },
			{ activity: 6, label: 'Activity 3' },
			{ activity: 7, label: 'Video 4: Personality Color' },
			{ activity: 8, label: 'Activity 4' },
			{ activity: 9, label: 'Video 5: Your Personality Color' },
			{ activity: 10, label: 'Activity 5' },
			{ activity: 11, label: 'Video 6: Your Personality Color Test' },
			{ activity: 14, label: 'Activity 6' },
			{ activity: 13, label: 'Video 7: Recap for the week' },
			{ activity: 15, label: 'Week 1 Assessment' },
		],
	},
	{
		week: 2,
		title: 'Strengths and Weaknesses',
		items: [
			{ activity: 1, label: 'Video 1: Strengths and Weaknesses' },
			{ activity: 2, label: 'Activity 1' },
			{ activity: 3, label: 'Video 2: Strengths and Weaknesses (Cont.)' },
			{ activity: 4, label: 'Activity 2' },
			{ activity: 5, label: 'Activity 2 (cont.)' },
			{ activity: 6, label: 'Video 3: Applying Strengths and Weaknesses' },
			{ activity: 7, label: 'Activity 3' },
			{ activity: 8, label: 'Video 4: Recap for the week' },
			{ activity: 9, label: 'Week 2 Assessment' },
		],
	},
	{
		week: 3,
		title: 'Mindset',
		items: [
			{ activity: 1, label: 'Video 1: Mindset' },
			{ activity: 2, label: 'Activity 1' },
			{ activity: 3, label: 'Video 2: Fixed and Growth Mindset' },
			{ activity: 4, label: 'Activity 2' },
			{ activity: 5, label: 'Video 3: Importance of Mindset' },
			{ activity: 6, label: 'Activity 3' },
			{ activity: 7, label: 'Video 4: Recap for the week' },
			{ activity: 8, label: 'Week 3 Assessment' },
		],
	},
	{
		week: 4,
		title: 'Values',
		items: [
			{ activity: 1, label: 'Video 1: Consistency in Behaviour' },
			{ activity: 2, label: 'Activity 1' },
			{ activity: 3, label: 'Video 2: Values' },
			{ activity: 4, label: 'Activity 2' },
			{ activity: 5, label: 'Video 3: Meditation' },
			{ activity: 6, label: 'Activity 3' },
			{ activity: 7, label: 'Video 4: Importance of Values' },
			{ activity: 8, label: 'Activity 4' },
			{ activity: 9, label: 'Video 5: Recap for the week' },
			{ activity: 10, label: 'Week 4 Assessment' },
		],
	},
	{
		week: 5,
		title: 'Emotions and Emotional Intelligence',
		items: [
			{ activity: 1, label: 'Video 1: Emotions' },
			{ activity: 2, label: 'Activity 1' },
			{ activity: 3, label: 'Video 2: Emotional Intelligence' },
			{ activity: 4, label: 'Activity 2' },
			{ activity: 5, label: 'Video 3: Importance of Emotional Intelligence' },
			{ activity: 6, label: 'Activity 3' },
			{ activity: 7, label: 'Video 4: Understanding Emotions' },
			{ activity: 8, label: 'Activity 4' },
			{ activity: 9, label: 'Video 5: Recap for the week' },
			{ activity: 10, label: 'Week 5 Assessment' },
		],
	},
];

const MAX_REACHED_STORAGE_KEY = 'flow-self-awareness-maxReachedPages';
const SELF_AWARENESS_WEEK_NUMBERS = COURSE_STRUCTURE.map((week) => week.week);

const getSavedMaxReachedPages = () => {
	try {
		return JSON.parse(sessionStorage.getItem(MAX_REACHED_STORAGE_KEY) || '{}');
	} catch (error) {
		return {};
	}
};

const getSelfAwarenessWeekTotalItems = (weekNumber) =>
	Math.max(
		...(COURSE_STRUCTURE.find((week) => week.week === weekNumber)?.items.map((item) => item.activity) || [1])
	);

const getSelfAwarenessWeek = (weekNumber) =>
	COURSE_STRUCTURE.find((week) => week.week === weekNumber);

const normalizeSelfAwarenessActivity = (activity, weekNumber) => {
	const activityNumber = Number(activity) || 1;

	if (weekNumber === 1 && activityNumber === 12) return 14;

	const week = getSelfAwarenessWeek(weekNumber);
	if (!week?.items?.length) return Math.max(1, activityNumber);
	if (week.items.some((item) => item.activity === activityNumber)) {
		return activityNumber;
	}

	const sortedActivities = [...week.items]
		.map((item) => item.activity)
		.sort((first, second) => first - second);
	const nextVisibleActivity = sortedActivities.find((itemActivity) => itemActivity >= activityNumber);

	return nextVisibleActivity || sortedActivities[sortedActivities.length - 1];
};

const getSelfAwarenessActivityOrderIndex = (weekNumber, activity) => {
	const week = getSelfAwarenessWeek(weekNumber);
	const normalizedActivity = normalizeSelfAwarenessActivity(activity, weekNumber);
	const index = week?.items.findIndex((item) => item.activity === normalizedActivity) ?? -1;

	return index >= 0 ? index : 0;
};

const getNextSelfAwarenessActivity = (activity, weekNumber) => {
	const week = getSelfAwarenessWeek(weekNumber);
	const normalizedActivity = normalizeSelfAwarenessActivity(activity, weekNumber);
	const currentIndex = week?.items.findIndex((item) => item.activity === normalizedActivity) ?? -1;

	if (!week?.items?.length || currentIndex < 0) return normalizedActivity + 1;

	return week.items[currentIndex + 1]?.activity || week.items[currentIndex].activity;
};

const clampSelfAwarenessActivity = (activity, weekNumber) =>
	normalizeSelfAwarenessActivity(
		Math.max(1, Math.min(Number(activity) || 1, getSelfAwarenessWeekTotalItems(weekNumber))),
		weekNumber
	);

const getSelfAwarenessResumeActivity = (activity, weekNumber) => {
	if (!activity) return null;

	const savedLastActivityIndex = Number(activity.lastActivityIndex || 0);
	if (savedLastActivityIndex > 0) {
		return clampSelfAwarenessActivity(savedLastActivityIndex, weekNumber);
	}

	const savedActivities = activity.activities || [];
	const lastAnsweredActivity = savedActivities.reduce(
		(highestActivity, currentActivity) =>
			Math.max(highestActivity, Number(currentActivity.activity || 0)),
		0
	);

	if (lastAnsweredActivity > 0) {
		return getNextSelfAwarenessActivity(lastAnsweredActivity, weekNumber);
	}

	return null;
};

function SelfAwarenessCourse() {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const [id, setId] = useState('');
	const [course, setCourse] = useState(null);
	const [hasResolvedBackendResume, setHasResolvedBackendResume] = useState(false);
	const appliedBackendResumeRef = useRef(false);

	// Access data from location.state
	const initialEnrolmentData = location.state?.enrollmentData;
	const enrollmentId = initialEnrolmentData?._id;

	const {
		data: enrollmentResponse,
		isLoading: isEnrollmentLoading,
	} = useQuery({
		queryKey: ['enrollment', enrollmentId],
		queryFn: () => userService.getSingleEnrollment(enrollmentId),
		enabled: !!enrollmentId,
	});

	const enrolmentData = enrollmentResponse?.enrollment || initialEnrolmentData;

	useEffect(() => {
		if (!enrolmentData && !isEnrollmentLoading) return navigate('/dashboard');
		if (enrolmentData) {
			appliedBackendResumeRef.current = false;
			setHasResolvedBackendResume(false);
			setId(enrolmentData._id);
			setCourse(enrolmentData);
			setOpen(true);
		}
	}, [enrolmentData, isEnrollmentLoading, navigate]);

	const resumePositionQueries = useQueries({
		queries: SELF_AWARENESS_WEEK_NUMBERS.map((weekNumber) => ({
			queryKey: ['self-awareness-course', id, weekNumber, 'resume-position'],
			queryFn: () => userService.getUserCourseData(id, weekNumber),
			enabled: !!id,
			refetchOnMount: 'always',
			refetchOnWindowFocus: true,
			staleTime: 0,
			gcTime: 0,
		})),
	});

	const backendWeekIndex = enrolmentData?.lastWeekIndex || 1;
	const stateWeekIndex = location.state?.weekIndex;
	const initialWeekIndex = stateWeekIndex || backendWeekIndex;

	const [activeLink, setActiveLink] = useState(`week${initialWeekIndex}`);
	const [currentWeekIndex, setCurrentWeekIndex] = useState(initialWeekIndex);
	const [activeActivityByWeek, setActiveActivityByWeek] = useState({});
	const [maxReachedByWeek, setMaxReachedByWeek] = useState(getSavedMaxReachedPages);
	const [requestedActivity, setRequestedActivity] = useState(null);

	useEffect(() => {
		if (!id) return;
		if (appliedBackendResumeRef.current) return;
		if (resumePositionQueries.some((query) => query.isPending)) return;

		const resumeCandidates = resumePositionQueries
			.flatMap((query, index) => {
				const weekNumber = SELF_AWARENESS_WEEK_NUMBERS[index];
				const candidates = [];
				const activityNumber = getSelfAwarenessResumeActivity(
					query.data?.activity,
					weekNumber
				);

				if (activityNumber) {
					candidates.push({
						weekNumber,
						activity: activityNumber,
						updatedAt: query.data?.activity?.updatedAt
							? new Date(query.data.activity.updatedAt).getTime()
							: 0,
					});
				}

				if (query.data?.assessment) {
					const nextWeekNumber = Math.min(
						weekNumber + 1,
						COURSE_STRUCTURE.length
					);
					candidates.push({
						weekNumber: nextWeekNumber,
						activity: weekNumber >= COURSE_STRUCTURE.length
							? getSelfAwarenessWeekTotalItems(weekNumber)
							: 1,
						updatedAt: query.data.assessment.updatedAt
							? new Date(query.data.assessment.updatedAt).getTime()
							: 0,
					});
				}

				return candidates;
			})
			.filter(Boolean)
			.sort((firstCandidate, secondCandidate) => {
				if (secondCandidate.weekNumber !== firstCandidate.weekNumber) {
					return secondCandidate.weekNumber - firstCandidate.weekNumber;
				}

				if (secondCandidate.activity !== firstCandidate.activity) {
					return (
						getSelfAwarenessActivityOrderIndex(
							secondCandidate.weekNumber,
							secondCandidate.activity
						) -
						getSelfAwarenessActivityOrderIndex(
							firstCandidate.weekNumber,
							firstCandidate.activity
						)
					);
				}

				return secondCandidate.updatedAt - firstCandidate.updatedAt;
			});

		const resumeTarget = resumeCandidates[0];
		appliedBackendResumeRef.current = true;
		setHasResolvedBackendResume(true);

		if (!resumeTarget) return;

		setActiveLink(`week${resumeTarget.weekNumber}`);
		setCurrentWeekIndex(resumeTarget.weekNumber);
		setRequestedActivity({
			week: resumeTarget.weekNumber,
			activity: resumeTarget.activity,
			requestedAt: Date.now(),
		});
		setActiveActivityByWeek((previous) => ({
			...previous,
			[resumeTarget.weekNumber]: resumeTarget.activity,
		}));
		setMaxReachedByWeek((previous) => {
			const previousActivity = previous[resumeTarget.weekNumber] || 1;
			const previousOrderIndex = getSelfAwarenessActivityOrderIndex(
				resumeTarget.weekNumber,
				previousActivity
			);
			const resumeOrderIndex = getSelfAwarenessActivityOrderIndex(
				resumeTarget.weekNumber,
				resumeTarget.activity
			);
			const next = {
				...previous,
				[resumeTarget.weekNumber]:
					resumeOrderIndex >= previousOrderIndex ? resumeTarget.activity : previousActivity,
			};

			sessionStorage.setItem(MAX_REACHED_STORAGE_KEY, JSON.stringify(next));
			return next;
		});
		writeSelfAwarenessRawStorage(`currentWeek-${id}`, resumeTarget.weekNumber);
		writeSelfAwarenessStorage(
			getSelfAwarenessActivityProgressKey(id, resumeTarget.weekNumber),
			resumeTarget.activity
		);
	}, [id, resumePositionQueries]);

	// Ensure activeLink and currentWeekIndex are updated if initialWeekIndex changes (e.g. from state)
	useEffect(() => {
		if (stateWeekIndex) {
			setActiveLink(`week${stateWeekIndex}`);
			setCurrentWeekIndex(stateWeekIndex);
		}
	}, [stateWeekIndex]);

	const courses = {
		id: 1,
		image: courseOne,
		title: 'Knowing Yourself Better:',
		subtitle: 'Self Awareness',
		overviewDescription:
			'The curriculum combines engaging educational content, interactive activities, and reflective discussions to create an environment that nurtures resilience, creativity, and a lifelong love for learning. From understanding the power of "yet" to exploring the potential of the human brain, each weeks session delves into different aspects of the growth mindset.',
		description:
			'The "Growth Mindset Course" is a 10-week program designed to introduce and instill the principles of a growth mindset in children.',
		catalogue: COURSE_STRUCTURE.map((week) => ({ weekLesson: week.title })),
		enrolled: true,
	};

	const getStoredActivity = (weekNumber) => {
		return normalizeSelfAwarenessActivity(readSelfAwarenessStorage(
			getSelfAwarenessActivityProgressKey(id, weekNumber),
			getLegacySelfAwarenessActivityProgressKey(weekNumber),
			1
		), weekNumber);
	};

	const getMaxReachedActivity = (weekNumber, isCompleted) => {
		const activeActivity =
			maxReachedByWeek[weekNumber] ||
			activeActivityByWeek[weekNumber] ||
			getStoredActivity(weekNumber);

		return isCompleted
			? getSelfAwarenessWeekTotalItems(weekNumber)
			: normalizeSelfAwarenessActivity(activeActivity, weekNumber);
	};

	const handleActivityChange = useCallback((weekNumber, activity) => {
		const normalizedActivity = normalizeSelfAwarenessActivity(activity, weekNumber);
		setActiveActivityByWeek((previous) => ({
			...previous,
			[weekNumber]: normalizedActivity,
		}));
		setMaxReachedByWeek((previous) => {
			const previousActivity = previous[weekNumber] || 1;
			const previousOrderIndex = getSelfAwarenessActivityOrderIndex(
				weekNumber,
				previousActivity
			);
			const nextOrderIndex = getSelfAwarenessActivityOrderIndex(
				weekNumber,
				normalizedActivity
			);
			const next = {
				...previous,
				[weekNumber]:
					nextOrderIndex >= previousOrderIndex ? normalizedActivity : previousActivity,
			};

			sessionStorage.setItem(MAX_REACHED_STORAGE_KEY, JSON.stringify(next));
			return next;
		});
	}, []);

	const handleLinkClick = (index, activity = null) => {
		const weekNumber = index + 1;
		setActiveLink(`week${weekNumber}`);
		setCurrentWeekIndex(weekNumber);
		writeSelfAwarenessRawStorage(`currentWeek-${id}`, weekNumber);

		if (activity) {
			setRequestedActivity({
				week: weekNumber,
				activity,
				requestedAt: Date.now(),
			});
		}
	};

	const renderSidebarContent = () => {
		const weekIndex = parseInt(activeLink.replace('week', ''), 10) - 1;
		switch (weekIndex) {
			case 0:
				return (
					<WeekOneLearning
						courseId={id}
						course={course}
						currentWeekIndex={currentWeekIndex}
						handleLinkClick={handleLinkClick}
						requestedActivity={requestedActivity}
						onActivityChange={handleActivityChange}
					/>
				);
			case 1:
				return (
					<WeekTwoLearning
						courseId={id}
						course={course}
						currentWeekIndex={currentWeekIndex}
						handleLinkClick={handleLinkClick}
						requestedActivity={requestedActivity}
						onActivityChange={handleActivityChange}
					/>
				);
			case 2:
				return (
					<WeekThreeLearning
						courseId={id}
						course={course}
						currentWeekIndex={currentWeekIndex}
						handleLinkClick={handleLinkClick}
						requestedActivity={requestedActivity}
						onActivityChange={handleActivityChange}
					/>
				);
			case 3:
				return (
					<WeekFourLearning
						courseId={id}
						course={course}
						currentWeekIndex={currentWeekIndex}
						handleLinkClick={handleLinkClick}
						requestedActivity={requestedActivity}
						onActivityChange={handleActivityChange}
					/>
				);
			case 4:
				return (
					<WeekFiveLearning
						courseId={id}
						course={course}
						currentWeekIndex={currentWeekIndex}
						handleLinkClick={handleLinkClick}
						requestedActivity={requestedActivity}
						onActivityChange={handleActivityChange}
					/>
				);
			default:
				return <p>Select a week to view its content.</p>;
		}
	};

	// Helper functions for week states (using enrollment progress like Emotional Regulation)
	const progressPerWeek = 100 / courses.catalogue.length; // 20% per week for 5 weeks

	const isWeekCompleted = (weekNumber) => {
		// A week is completed if the user has progressed beyond it
		const progress = enrolmentData?.progress || 0;
		return progress >= (weekNumber * progressPerWeek);
	};

	const isWeekAccessible = (weekNumber) => {
		// Calculate max accessible week based on progress
		const progress = enrolmentData?.progress || 0;
		const calculatedMaxWeek = Math.floor(progress / progressPerWeek);
		// Allow access to current incomplete week + next week
		const maxAccessibleWeek = Math.max(1, Math.min(calculatedMaxWeek + 1, courses.catalogue.length));
		return weekNumber <= maxAccessibleWeek;
	};

	const canShowCourseShell = open || Boolean(enrolmentData);

	if (!canShowCourseShell) {
		return (
			<div className="self-awareness course-profile">
				<div className="self-awareness-course-loading">
					<Loading />
					<p>Loading your Self Awareness course...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="self-awareness course-profile">
			<>
				{/* course menu */}
				<div className="course-menu">
						<div className="course-menu-collapsed">
							<button
								onClick={() => navigate('/dashboard/my-courses')}
								className="p-2"
								style={{
									cursor: 'pointer',
									border: 'none',
									background: '#f8f5f5',
									borderRadius: '50%',
								}}
							>
								<Icon icon="mdi:arrow-right" width="20" height="20" />
							</button>
						</div>

						<div className="course-menu-expanded">
							<p
								className="back-to-course-list"
								onClick={() => navigate('/dashboard/my-courses')}
							>
								<Icon icon="fa6-solid:arrow-left-long" className="me-2" />
								Back to My Courses
							</p>

							<div className="course-title-text mt-3">
								<h2>{courses.title}</h2>
								<h2 className="sub-title">{courses.subtitle}</h2>
							</div>

							<ul className="sub-courses self-awareness-accordion mt-2">
								{COURSE_STRUCTURE.map((week, index) => {
									const weekNumber = week.week;
									const isCompleted = isWeekCompleted(weekNumber);
									const isAccessible = isWeekAccessible(weekNumber);
									const isActive = `week${weekNumber}` === activeLink;
									const storedActiveActivity =
										activeActivityByWeek[weekNumber] || getStoredActivity(weekNumber);
									const activeActivity = normalizeSelfAwarenessActivity(
										storedActiveActivity,
										weekNumber
									);
									const activeItemIndex = getSelfAwarenessActivityOrderIndex(
										weekNumber,
										activeActivity
									);
									const maxReachedActivity = getMaxReachedActivity(
										weekNumber,
										isCompleted
									);
									const maxReachedItemIndex = isCompleted
										? week.items.length - 1
										: Math.max(
											activeItemIndex,
											getSelfAwarenessActivityOrderIndex(
												weekNumber,
												maxReachedActivity
											)
										);

									return (
										<li key={weekNumber} className='sub-course self-awareness-week-group'>
											<button
												className={`course-week-button self-awareness-week-header ${isActive ? 'active' : ''}`}
												onClick={() => handleLinkClick(index)}
												disabled={!isAccessible}
												style={{
													opacity: isAccessible ? 1 : 0.5,
													cursor: isAccessible ? 'pointer' : 'not-allowed',
													transition: 'all 0.3s ease',
												}}
											>
												<div>
													<Icon
														icon={
															isCompleted
																? 'icon-park-solid:check-one'
																: isAccessible
																	? 'icon-park-outline:check-one'
																	: 'mdi:lock'
														}
														className="course-list-icon"
														style={{
															color: isCompleted ? '#50AA50' : isAccessible ? '#275DAD' : '#999',
														}}
													/>
												</div>
												<div className="d-flex align-items-center">
													<p className="text-nowrap">{`Week ${weekNumber} `}</p>
													<p className="ms-3">{week.title}</p>
												</div>
												<Icon
													icon="mdi:chevron-down"
													className={`self-awareness-week-chevron ${isActive ? 'open' : ''}`}
												/>
											</button>
											{isActive && (
												<div className="self-awareness-week-items">
													{week.items.map((item, itemIndex) => {
														const itemCompleted =
															isCompleted || itemIndex < activeItemIndex;
														const itemActive = item.activity === activeActivity;
														const itemAccessible =
															isAccessible && itemIndex <= maxReachedItemIndex;

														return (
															<button
																key={item.activity}
																type="button"
																className={`self-awareness-week-item ${itemActive ? 'active' : ''}`}
																onClick={() => handleLinkClick(index, item.activity)}
																disabled={!itemAccessible}
															>
																<Icon
																	icon={
																		itemCompleted
																			? 'icon-park-solid:check-one'
																			: itemAccessible
																				? 'icon-park-outline:check-one'
																				: 'mdi:lock'
																	}
																	className="self-awareness-week-item-icon"
																/>
																<span>{item.label}</span>
															</button>
														);
													})}
												</div>
											)}
										</li>
									);
								})}
							</ul>

							{/* Progress indicator */}
							<div className="mt-4 px-3">
								<div className="d-flex justify-content-between align-items-center mb-2">
									<small className="text-muted">Course Progress</small>
									<small className="fw-bold">{enrolmentData?.progress || 0}%</small>
								</div>
								<div className="progress" style={{ height: '8px' }}>
									<div
										className="progress-bar"
										role="progressbar"
										style={{
											width: `${enrolmentData?.progress || 0}%`,
											backgroundColor: '#00BCC3',
										}}
										aria-valuenow={enrolmentData?.progress || 0}
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
							</div>
						</div>
				</div>

				{/* course content to take up the remainig space */}
				<div className="course-content">
					{hasResolvedBackendResume ? (
						renderSidebarContent()
					) : (
						<div className="self-awareness-course-loading self-awareness-course-loading-inline">
							<Loading />
							<p>Finding where you stopped...</p>
						</div>
					)}
				</div>
			</>
		</div>
	);
}

export default SelfAwarenessCourse;
