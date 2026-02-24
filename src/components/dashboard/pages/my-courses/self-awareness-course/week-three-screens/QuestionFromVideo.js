import React, { useState, useEffect } from 'react';

export default function QuestionFromVideo({ formData, onBack, onNext }) {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [errorMessage, setErrorMessage] = useState('');
	const [answers, setAnswers] = useState(['', '', '', '', '', '']);

	useEffect(() => {
		const currentActivityData = formData?.activities?.find((activity) => activity.activity === 6);
		if (currentActivityData && currentActivityData.answers) {
			setAnswers(currentActivityData.answers);
		} else {
			setAnswers(['', '', '', '', '', '']);
		}
	}, [formData]);

	const handleInputChange = (event, index) => {
		const { value } = event.target;
		setAnswers((prevAnswers) => {
			const newAnswers = [...prevAnswers];
			newAnswers[index] = value;
			return newAnswers;
		});
	};

	const validateAnswers = () => {
		setErrorMessage('');

		if (currentIndex === 1) {
			// Check first 5 answers
			const emptyAnswers = answers.slice(0, 5).filter((answer) => !answer.trim());
			if (emptyAnswers.length > 0) {
				setErrorMessage('Please fill in all 5 lessons before proceeding');
				return false;
			}
		} else if (currentIndex === 2) {
			// Check last answer
			if (!answers[5].trim()) {
				setErrorMessage('Please share what you will start working on');
				return false;
			}
		}
		return true;
	};

	const handleNextStepClick = () => {
		if (!validateAnswers()) return;

		if (currentIndex < 2) {
			setCurrentIndex(currentIndex + 1);
		} else {
			onNext(answers);
		}
	};

	const handlePreviousStepClick = () => {
		if (currentIndex > 1) {
			setCurrentIndex(currentIndex - 1);
		} else {
			onBack();
		}
	};

	const renderQuestion = () => {
		return (
			<>
				{(() => {
					switch (currentIndex) {
						case 1:
							return (
								<div
									className="mindset question-box"
									style={{ overflowY: 'scroll' }}
								>
									<div className="mt-2">
										<div className="question-box-header">
											<h1 className="mb-0">Question:</h1>
											<h2
												style={{ color: '#5B616A' }}
												className="mb-0 d-flex ms-3 text-left"
											>
												List five (5) lessons you got from the videos you
												watched
											</h2>
										</div>
										<div className="scrollable mt-2">
											{[...Array(5)].map((_, index) => (
												<div
													className="text-area-box px-4 my-4"
													key={index}
												>
													<textarea
														rows="3"
														placeholder={`${index + 1
															}. Type your answer here...`}
														value={answers[index]}
														onChange={(e) =>
															handleInputChange(e, index)
														}
													/>
												</div>
											))}
										</div>
									</div>
								</div>
							);

						case 2:
							return (
								<div className="mindset question-box">
									<div className="mt-2">
										<div className="question-box-header">
											<h1 className="mb-0">Question:</h1>
											<h2
												style={{ color: '#5B616A' }}
												className="mb-0 d-flex ms-3 text-left"
											>
												List one (1) thing you will start working on, even
												on your growth journey.
											</h2>
										</div>
										<div
											className="text-area-box px-4"
										>
											<textarea
												rows="6"
												placeholder="Type your answer here..."
												value={answers[5]}
												onChange={(e) => handleInputChange(e, 5)}
											/>
										</div>
									</div>
								</div>
							);

						default:
							return null;
					}
				})()}
			</>
		);
	};

	return (
		<div>
			{renderQuestion()}
			{errorMessage && (
				<div className="alert alert-danger" role="alert">
					{errorMessage}
				</div>
			)}
			<div className="slider-indicator">
				<ul className="p-0 mt-3">
					{Array.from({ length: 2 }, (_, index) => (
						<li
							key={index + 1}
							className={currentIndex >= index + 1 ? 'answered' : ''}
						></li>
					))}
				</ul>
			</div>
			<div className="progression-btns mt-3">
				<button className="btn prev light" onClick={handlePreviousStepClick}>
					{'<<< Back'}
				</button>
				<button className="btn next dark" onClick={handleNextStepClick}>
					{'Next >>>'}
				</button>
			</div>
		</div>
	);
}
