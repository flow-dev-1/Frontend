import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { decryptId } from '../../../../../utils/encryption';
import userService from '../../../../../services/api/user';
import { useQuery } from '@tanstack/react-query';

function SelfAwarenessCourse() {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const [id, setId] = useState('');
	const [course, setCourse] = useState(null);

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
			setId(enrolmentData._id);
			setCourse(enrolmentData);
			setOpen(true);
		}
	}, [enrolmentData, isEnrollmentLoading, navigate]);

	const {
		data: completedWeeks,
	} = useQuery({
		queryKey: ['completed-weeks', id],
		queryFn: () => userService.getCompletedWeeks(id),
		enabled: !!id,
	});

	// New state to track completed weeks
	const [completedWeeksState, setCompletedWeeksState] = useState([]);

	// Update completedWeeksState whenever the query data changes
	useEffect(() => {
		if (completedWeeks && completedWeeks.weeks) {
			setCompletedWeeksState(completedWeeks.weeks);
		}
	}, [completedWeeks]);

	const storedWeekIndex = localStorage.getItem(`currentWeek-${id}`);
	const backendWeekIndex = enrolmentData?.lastWeekIndex || 1;
	const stateWeekIndex = location.state?.weekIndex;
	const initialWeekIndex = stateWeekIndex || (storedWeekIndex ? Math.max(parseInt(storedWeekIndex, 10), backendWeekIndex) : backendWeekIndex);

	const [activeLink, setActiveLink] = useState(`week${initialWeekIndex}`);
	const [currentWeekIndex, setCurrentWeekIndex] = useState(initialWeekIndex);

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
		catalogue: [
			{ weekLesson: 'Introduction to Self-Awareness' },
			{ weekLesson: 'Identifying Strengths and Weaknesses' },
			{ weekLesson: 'Understanding Mindset' },
			{ weekLesson: 'Identifying Values' },
			{ weekLesson: 'Emotional Intelligence and Communication Skills' },
		],
		enrolled: true,
	};

	const handleLinkClick = (index) => {
		const weekNumber = index + 1;
		setActiveLink(`week${weekNumber}`);
		setCurrentWeekIndex(weekNumber);
		localStorage.setItem(`currentWeek-${id}`, weekNumber);

		// If the week is already completed, reset its sub-activity progress
		// so the user can review it from the beginning if they intentionally click it.
		if (isWeekCompleted(weekNumber)) {
			localStorage.setItem(`week-${weekNumber}-currentActivity`, JSON.stringify(1));
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
					/>
				);
			case 1:
				return (
					<WeekTwoLearning
						courseId={id}
						course={course}
						currentWeekIndex={currentWeekIndex}
						handleLinkClick={handleLinkClick}
					/>
				);
			case 2:
				return (
					<WeekThreeLearning
						courseId={id}
						course={course}
						currentWeekIndex={currentWeekIndex}
						handleLinkClick={handleLinkClick}
					/>
				);
			case 3:
				return (
					<WeekFourLearning
						courseId={id}
						course={course}
						currentWeekIndex={currentWeekIndex}
						handleLinkClick={handleLinkClick}
					/>
				);
			case 4:
				return (
					<WeekFiveLearning
						courseId={id}
						course={course}
						currentWeekIndex={currentWeekIndex}
						handleLinkClick={handleLinkClick}
					/>
				);
			default:
				return <p>Select a week to view its content.</p>;
		}
	};

	const disableCourse = (index) => {
		const data = completedWeeksState; // Use updated state
		if (data.includes(index.toString())) {
			return false;
		}
		const lastItemPlusOne = Number(data[data.length - 1]) + 1;
		if (index === lastItemPlusOne) {
			return false;
		}
		// If no completed weeks, allow access to week 1
		if (data.length === 0 && index === 1) {
			return false;
		}
		return true;
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

	return (
		<div className="self-awareness course-profile">
			{open && (
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

							<ul className="sub-courses mt-2">
								{courses.catalogue.map((week, index) => {
									const weekNumber = index + 1;
									const isCompleted = isWeekCompleted(weekNumber);
									const isAccessible = isWeekAccessible(weekNumber);
									const isActive = `week${weekNumber}` === activeLink;

									return (
										<li key={index} className='sub-course'>
											<button
												key={index}
												className={`course-week-button ${isActive ? 'active' : ''}`}
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
													<p className="ms-3">{week.weekLesson}</p>
												</div>
											</button>
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
					<div className="course-content">{renderSidebarContent()}</div>
				</>
			)}
		</div>
	);
}

export default SelfAwarenessCourse;
