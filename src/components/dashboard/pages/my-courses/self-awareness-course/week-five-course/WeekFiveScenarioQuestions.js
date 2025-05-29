import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProgressionButtons from '../components/ProgressionButtons';

export default function WeekFiveScenarioQuestions({ onNext, onBack, formData, activityIndex }) {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [answers, setAnswers] = useState({ IWill: [], IWillNot: [] });
	const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
	const [openNoDropdownIndex, setOpenNoDropdownIndex] = useState(null);
	const dropdownRefs = useRef([]);
	const noDropdownRefs = useRef([]);

	const questionsArray = [
		{
			title: 'Two classmates, Sarah and Alex, have been assigned to work on a group project together. However, they have different ideas about how to approach the project, and tensions are rising between them. Sarah wants to take the lead and implement her ideas, while Alex feels sidelined and frustrated. If you were Sarah, how would you respond to this situation?',
			options: [
				'Reach out to the class teacher.',
				'Try to speak to Alex in private.',
				'Try to speak our friend Jim to speak to Sarah and Alex in private.',
				'Do nothing and wait for them to sort out their differences.',
			],
		},
		{
			title: 'During lunch break, a group of students starts pressuring Jack to skip class and join them in going to an off-campus party. Jack is torn between wanting to fit in with his peers and knowing that skipping class is against school rules and could negatively affect his grades. If you were Jack, how would you respond to this peer pressure situation?',
			options: [
				' Reach out to the class teacher.',
				' Try to speak to them one after the other.',
				' Join them in going to the off-campus party.',
				' Do nothing and wait for them to go alone.',
			],
		},
		{
			title: 'During a class presentation, James receives feedback from his teacher and classmates that his delivery was too monotone and he needs to work on his public speaking skills. James feels embarrassed and defensive, as he put a lot of effort into preparing for the presentation. If you were James, how would you respond to this situation?',
			options: [
				' Listen carefully to the feedback.',
				' Ask for more detailed feedback.',
				' Practice public speaking.',
				' Ignore the feedback.',
				' Give up on presentation.',
			],
		},
		{
			title: 'Tom has been feeling overwhelmed with schoolwork and family issues at home. This is beginning to make him quiet and easily tired. If you were Tom, how would you respond to this situation?',
			options: [
				' Talk  to a trusted adult.',
				' Seek support from friends.',
				' Practice relaxation techniques.',
				' Isolate myself.',
				' Ignore the problem.',
			],
		},
		{
			title: "Emily has been rehearsing for weeks to audition for the school play. However, when the cast list is posted, she discovers that she didn't get a part. She feels disappointed, rejected, and unsure of her abilities. If you were Emily, how would you respond to this situation?",
			options: [
				'Talk  to the drama teacher.',
				'Support her friends.',
				'Stay positive.',
				'Give up on acting.',
				'Withdraw from friends.',
			],
		},
	];

	useEffect(() => {
		if (formData && formData.activities) {
			const activity = formData.activities.find((act) => act.activity === activityIndex);
			if (activity && activity.answers) {
				setAnswers({
					IWill: activity.answers.IWill || [],
					IWillNot: activity.answers.IWillNot || [],
				});
			}
		}
	}, [formData, activityIndex]);

	const handleNextStepClick = () => {
		if (answers.IWill[currentIndex - 1] && answers.IWillNot[currentIndex - 1]) {
			if (currentIndex < questionsArray.length) {
				setCurrentIndex(currentIndex + 1);
			} else {
				onNext(answers); // Pass the answers to onSubmit
			}
		} else {
			toast.error('Please select both "I will" and "I will not" options.');
		}
	};

	const handlePreviousStepClick = () => {
		if (currentIndex > 1) {
			setCurrentIndex(currentIndex - 1);
		} else {
			onBack();
		}
	};

	const handleDropdownClick = (index) => {
		setOpenDropdownIndex(index === openDropdownIndex ? null : index);
	};

	const handleNoDropdownClick = (index) => {
		setOpenNoDropdownIndex(index === openNoDropdownIndex ? null : index);
	};

	const handleOptionClick = (index, option) => {
		setAnswers((prev) => {
			const newIWill = [...prev.IWill];
			newIWill[index - 1] = option;
			return { ...prev, IWill: newIWill };
		});
		setOpenDropdownIndex(null);
	};

	const handleNoOptionClick = (index, option) => {
		setAnswers((prev) => {
			const newIWillNot = [...prev.IWillNot];
			newIWillNot[index - 1] = option;
			return { ...prev, IWillNot: newIWillNot };
		});
		setOpenNoDropdownIndex(null);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRefs.current &&
				!dropdownRefs.current.some((ref) => ref && ref.contains(event.target))
			) {
				setOpenDropdownIndex(null);
			}
			if (
				noDropdownRefs.current &&
				!noDropdownRefs.current.some((ref) => ref && ref.contains(event.target))
			) {
				setOpenNoDropdownIndex(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const renderQuestion = () => {
		const currentQuestion = questionsArray[currentIndex - 1];
		const options = currentQuestion.options;

		return (
			<div className="week-two scenario">
				<div className="assessment question-box py-4">
					<div className="scenario-number px-4 mb-3 mx-auto">
						<h1 className="text-center my-0">Scenario {currentIndex}</h1>
					</div>
					<div className="question-box-header align-items-start">
						<h2 style={{ color: '#5B616A' }} className="mb-0 ms-3 text-center">
							{currentQuestion.title}
						</h2>
					</div>
					<div
						className="dropdown-select-section mt-5"
						style={{ width: '100%', gridTemplateColumns: '1fr 1fr', gap: '10px' }}
					>
						<div
							key={`${currentIndex}-option`}
							style={{ width: '100%' }}
							ref={(el) => (dropdownRefs.current[currentIndex] = el)}
							className="two"
						>
							<div
								className="d-flex align-items-start w-100"
								onClick={() => handleDropdownClick(currentIndex)}
							>
								<div>
									I will{' '}
									<span className="selected-option">
										{answers.IWill[currentIndex - 1] || ''}
									</span>
								</div>

								<Icon
									icon={
										openDropdownIndex === currentIndex
											? 'iconamoon:arrow-up-2-thin'
											: 'iconamoon:arrow-down-2-thin'
									}
									className="fs-2"
								/>
							</div>

							{openDropdownIndex === currentIndex && (
								<ul className="emoji-value-option my-3">
									{options.map((option, optionIndex) => (
										<li
											key={optionIndex}
											onClick={() => handleOptionClick(currentIndex, option)}
										>
											{option}
										</li>
									))}
								</ul>
							)}
						</div>
						<div
							key={`${currentIndex}-no-option`}
							ref={(el) => (noDropdownRefs.current[currentIndex] = el)}
							className="dropdown-container mt-3"
							style={{ width: '100%' }}
						>
							<div
								className="d-flex align-items-start w-100"
								onClick={() => handleNoDropdownClick(currentIndex)}
							>
								<div>
									I will not{' '}
									<span className="selected-option">
										{answers.IWillNot[currentIndex - 1] || ''}
									</span>
								</div>
								<Icon
									icon={
										openNoDropdownIndex === currentIndex
											? 'iconamoon:arrow-up-2-thin'
											: 'iconamoon:arrow-down-2-thin'
									}
									className="fs-2 w-full"
								/>
							</div>

							{openNoDropdownIndex === currentIndex && (
								<ul className="emoji-value-option my-3">
									{options.map((option, optionIndex) => (
										<li
											key={optionIndex}
											onClick={() =>
												handleNoOptionClick(currentIndex, option)
											}
										>
											{option}
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			{renderQuestion()}

			<div className="slider-indicator">
				<ul className="p-0 mt-3 justify-content-center">
					{Array.from({ length: questionsArray.length }, (_, index) => (
						<li
							key={index + 1}
							className={currentIndex >= index + 1 ? 'answered' : ''}
							onClick={() => setCurrentIndex(index + 1)}
						></li>
					))}
				</ul>
			</div>

			<div className="mt-3">
				<ProgressionButtons
					variant={'both'}
					onClickNext={handleNextStepClick}
					onClickPrev={handlePreviousStepClick}
				/>
			</div>

			<ToastContainer />
		</>
	);
}
