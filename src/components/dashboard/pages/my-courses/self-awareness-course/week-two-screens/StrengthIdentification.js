import React, { useState, useEffect } from 'react';
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png';
import '../newcourse.css';
import ProgressionButtons from '../components/ProgressionButtons';
import { toast } from 'react-toastify';

export default function StrengthIdentification({ formData, onNext, onBack, activityIndex }) {
	const questionsArray = [
		'Creative',
		'Energetic',
		'Honest',
		'Responsible',
		'Organized',
		'Patient',
		'Friendly',
		'Confident',
		'Good listener',
		'Team player',
		'Brave',
		'Analytical',
		'Compassionate',
		'Hardworking',
		'Trustworthy',
		'Flexible',
		'Determined',
		'Emphatic',
		'Cooperative',
		'Problem Solver',
		'Curious',
		'Dependable',
		'Adaptable',
		'Enthusiastic',
		'Kind',
		'Generous',
		'Respectful',
		'Good Communicator',
		'Ability to lead',
		'Detail-oriented',
	];

	// Find answers for the current activity index in formData
	const currentActivityData = formData?.activities.find(
		(item) => item.activity === activityIndex
	);

	// Extract saved answers if they exist
	const savedAnswers =
		currentActivityData && currentActivityData.answers && currentActivityData.answers.strengths
			? currentActivityData.answers.strengths
			: [];

	// Initialize state for checked questions based on savedAnswers
	const [questionChecked, setQuestionChecked] = useState(() =>
		questionsArray.reduce(
			(acc, question, index) => ({
				...acc,
				[index]: savedAnswers.includes(question),
			}),
			{}
		)
	);

	const [selectedAnswers, setSelectedAnswers] = useState(savedAnswers);

	useEffect(() => {
		// Update selected answers whenever questionChecked state changes
		const answers = Object.entries(questionChecked)
			.filter(([_, isChecked]) => isChecked)
			.map(([index]) => questionsArray[index]);

		setSelectedAnswers(answers);
	}, [questionChecked]);

	const handleQuestionCheck = (questionIndex) => {
		setQuestionChecked((prevState) => ({
			...prevState,
			[questionIndex]: !prevState[questionIndex], // Toggle the checked state
		}));
	};

	const handleSubmit = () => {
		if (selectedAnswers.length === 0) {
			// Show an alert if no answers are selected
			toast.error('Please select at least one strength.');
			return;
		}

		onNext({ strengths: selectedAnswers }); // Proceed to the next step
	};

	return (
		<>
			<div className="week-two question-box py-4">
				<div className="d-flex align-items-start">
					<div className="question-box-header mx-auto">
						<h1 className="mb-0 ">Question: </h1>
						<h2 className="mb-0 d-flex ms-3 " style={{ color: '#5B616A' }}>
							Identify Your Strengths
						</h2>
					</div>
				</div>
				<div className="assessment checkbox-questions mt-4">
					<ul className="p-0" style={{width: '100%'}}>
						{questionsArray.map((item, index) => (
							<li key={index} className="d-flex">
								<img
									onClick={() => handleQuestionCheck(index)}
									className="cursor-pointer"
									src={questionChecked[index] ? checkedImage : unCheckedImage}
									alt=""
								/>
								<p className="question-p ms-2 text-nowrap">{item}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="mt-3">
				<ProgressionButtons
					variant={'both'}
					onClickNext={handleSubmit}
					onClickPrev={onBack}
				/>
			</div>
		</>
	);
}
