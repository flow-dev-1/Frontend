import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const QuestionComponent = ({
	questionText,
	imageSrc,
	altText,
	formData,
	onBack,
	onNext,
	activityIndex, // Pass this as a prop to identify the activity
}) => {
	// State to manage the user's answer
	const [answers, setAnswers] = useState('');

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
		setAnswers(event.target.value);
	};

	// Function to handle Next button click
	const handleNextClick = () => {
		if (!answers) {
			// Show a toast message if the answer is empty
			toast.error('Please provide an answer before continuing.');
			return;
		}
		// Pass the answer data back to the parent component
		onNext([answers]);
	};

	return (
		<>
			<div className="question-box py-3">
				<div className="question-box-header m-auto">
					<h1 className="mb-0">Question:</h1>
					<h2 style={{ color: '#5B616A' }} className="mb-0 d-flex ms-1">
						{questionText}
					</h2>
					{imageSrc && <img src={imageSrc} alt={altText} className="mx-1 fiveImg " />}
					<h2 className="" style={{ color: '#5B616A' }}>
						{altText}
					</h2>
				</div>
				<div className="text-area-box px-4 mt-4">
					<textarea
						rows="6"
						placeholder="Type your answer here..."
						value={answers} // Bind the textarea value to state
						onChange={handleInputChange} // Update state on input change
					/>
				</div>

				<ToastContainer />
			</div>
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
