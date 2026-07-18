import React, { useState, useEffect } from 'react';

const QuestionComponent = ({
	questionText,
	imageSrc,
	altText,
	formData,
	onBack,
	onUpdate,
	onNext,
	suffix,
	activityIndex, // Pass this as a prop to identify the activity
}) => {
	// State to manage the user's answer
	const [answers, setAnswers] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		// Find the data for the current activity
		const currentActivityData = formData?.activities?.find(
			(item) => item?.activity === activityIndex
		);
		console.log(formData);

		if (currentActivityData && currentActivityData?.answers) {
			// Set the answer from formData if it exists
			setAnswers(currentActivityData.answers[0] || '');
		} else {
			// Set to empty if no answer is found
			setAnswers('');
		}
	}, [activityIndex, formData]);

	// Function to handle input change
	const handleInputChange = (event) => {
		const nextAnswer = event.target.value;
		setAnswers(nextAnswer);
		setErrorMessage('');
		onUpdate?.({ answers: [nextAnswer] });
	};

	// Function to handle Next button click
	const handleNextClick = () => {
		if (!answers.trim()) {
			setErrorMessage('Please provide an answer before continuing.');
			return;
		}
		// Pass the answer data back to the parent component
		onNext([answers]);
	};

	return (
		<>
			<div className="question-box py-5">
				<div className="question-box-header">
					<h1 className="mb-0">Question:</h1>
					<h2 className="mb-0 d-flex ms-3" style={{ color: '#5b6161' }}>
						{questionText}
					</h2>
					{imageSrc && <img src={imageSrc} alt={altText} className="question-box-img" />}
					<h2 style={{ color: '#5b6161' }}>{altText}</h2>
					{suffix && <h2 style={{ color: '#5b6161' }}>{suffix}</h2>}
				</div>
				<div className="text-area-box px-4 mt-4">
					<textarea
						rows="6"
						placeholder="Type your answer here..."
						value={answers} // Bind the textarea value to state
						onChange={handleInputChange} // Update state on input change
					/>
				</div>
			</div>
			{errorMessage && <div className="text-danger">{errorMessage}</div>}
			<div className="progression-btns mt-3">
				{onBack && (
					<button className="btn prev light" onClick={onBack}>
						{'<<< Back'}
					</button>
				)}
				<button className="btn next dark" onClick={handleNextClick}>
					{'Next >>>'}
				</button>
			</div>
		</>
	);
};

export default QuestionComponent;
