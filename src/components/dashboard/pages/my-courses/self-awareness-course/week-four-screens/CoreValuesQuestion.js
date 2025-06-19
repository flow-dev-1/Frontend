import React, { useState, useEffect } from 'react';
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png';
import { toast } from 'react-toastify';
import ProgressionButtons from '../components/ProgressionButtons';

export default function CoreValuesQuestion({ onBack, onNext, formData, activityIndex }) {
	// Retrieve answers from formData for the current activity index
	const initialSelectedValues =
		formData.activities.find(
			(activity) => activity.activity === activityIndex && activity.answers
		)?.answers || [];

	const [selectedValues, setSelectedValues] = useState(initialSelectedValues);

	const questionsArray = [
		'Generosity',
		'Respect',
		'Leadership',
		'Responsibility',
		'Integrity',
		'Empathy',
		'Compassion',
		'Gratitude',
		'Courage',
		'Forgiveness',
		'Perseverance',
		'Cooperation',
	];

	// Toggle the selection of a question
	const handleQuestionCheck = (item) => {
		setSelectedValues((prevState) => {
			if (prevState.includes(item)) {
				return prevState.filter((value) => value !== item);
			} else {
				return [...prevState, item];
			}
		});
	};

	// Proceed to the next step or submit answers
	const handleNext = () => {
		// Ensure at least 4 values are selected
		if (selectedValues.length < 4) {
			toast.error('Please select at least four core values before proceeding.');
			return;
		}
		// Submit the selected values
		onNext(selectedValues);
	};

	// Render the list of questions
	const renderQuestions = () => {
		return (
			<div className="mindset question-box">
				<div className="question-box-header align-items-start">
					<h1 className="mb-0">Instruction:</h1>
					<h2 className="mb-0 d-flex ms-3 text-left" style={{ color: '#5b6161' }}>
						Identify four (4) core values that resonate with you the most.
					</h2>
				</div>
				<div className="flip-div overflow-auto mt-2">
					<ul>
						{questionsArray.map((item, index) => (
							<li key={index} className="d-flex">
								<div>
									<p className="question-p text-gray">{item}</p>
								</div>
								<img
									onClick={() => handleQuestionCheck(item)}
									className="cursor-pointer"
									src={
										selectedValues.includes(item)
											? checkedImage
											: unCheckedImage
									}
									alt=""
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	};

	return (
		<div>
			{renderQuestions()}
			<div className="mt-3">
				<ProgressionButtons onClickPrev={onBack} onClickNext={handleNext} />
			</div>
		</div>
	);
}
