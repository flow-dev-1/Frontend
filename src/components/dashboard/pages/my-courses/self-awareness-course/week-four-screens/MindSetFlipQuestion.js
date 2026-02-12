import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png';
import imageMap from './imageMapping';
import { toast } from 'react-toastify';
import ProgressionButtons from '../components/ProgressionButtons';

Modal.setAppElement('#root');

export default function MindSetFlipQuestion({ onSubmit, onBack, onNext, activityIndex, formData }) {
	const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
	const [valueDescription, setValueDescription] = useState(null);
	const [answers, setAnswers] = useState([]);

	const questionsArray = [
		[
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
			'Kindness',
			'Tolerance',
			'Patience',
			'Friendship',
			'Teamwork',
			'Organization',
			'Grit',
			'Resilience',
			'Adaptability',
			'Contentment',
			'Honor',
			'Moderation',
			'Spirituality',
			'Healthy Life',
			'Family',
			'Resourcefulness',
			'Mindfulness',
			'Creativity',
			'Curiosity',
			'Punctuality',
			'Courtesy',
			'Self-control',
			'Self-discipline',
			'Optimism',
		],
	];

	// Splitting the questions into chunks of 12 (3 rows x 4 columns)
	const chunkSize = 12;
	const questionChunks = (questionsArray[0] || []).reduce((chunks, item, index) => {
		const chunkIndex = Math.floor(index / chunkSize);
		if (!chunks[chunkIndex]) {
			chunks[chunkIndex] = []; // start a new chunk
		}
		chunks[chunkIndex].push(item);
		return chunks;
	}, []);

	// Extract answers from formData for activityIndex, if available
	const preFilledAnswers =
		formData?.activities?.find((activity) => activity.activity === activityIndex)?.answers || [];

	// Initialize questionChecked state based on pre-filled answers
	const initializeCheckedState = () => {
		return questionChunks.reduce((acc, chunk, chunkIndex) => {
			const checkedIndices = chunk.reduce((checkedIndices, question, questionIndex) => {
				if (preFilledAnswers.includes(question)) {
					checkedIndices.push(questionIndex);
				}
				return checkedIndices;
			}, []);
			acc[chunkIndex] = checkedIndices;
			return acc;
		}, {});
	};

	const [questionChecked, setQuestionChecked] = useState(
		questionChunks.reduce((acc, _, index) => ({ ...acc, [index]: [] }), {})
	);
	const [chunkCompletion, setChunkCompletion] = useState(
		questionChunks.reduce((acc, _, index) => ({ ...acc, [index]: false }), {})
	);

	useEffect(() => {
		const preFilled = formData?.activities?.find((activity) => activity.activity === activityIndex)?.answers || [];
		const newChecked = questionChunks.reduce((acc, chunk, chunkIndex) => {
			const checkedIndices = chunk.reduce((checkedIndices, question, questionIndex) => {
				if (preFilled.includes(question)) {
					checkedIndices.push(questionIndex);
				}
				return checkedIndices;
			}, []);
			acc[chunkIndex] = checkedIndices;
			return acc;
		}, {});

		setQuestionChecked(newChecked);
		setAnswers(preFilled);

		const newCompletion = questionChunks.reduce((acc, chunk, chunkIndex) => {
			acc[chunkIndex] = (newChecked[chunkIndex] || []).length > 0;
			return acc;
		}, {});
		setChunkCompletion(newCompletion);
	}, [formData, activityIndex]);

	useEffect(() => {
		// Update chunk completion if the checked state changes
		setChunkCompletion((prev) => ({
			...prev,
			[currentChunkIndex]: (questionChecked[currentChunkIndex] || []).length > 0,
		}));
	}, [questionChecked, currentChunkIndex]);

	const handleQuestionCheck = (chunkIndex, optionIndex) => {
		setQuestionChecked((prevState) => {
			const updated = { ...prevState };
			const current = updated[chunkIndex] || [];
			if (current.includes(optionIndex)) {
				updated[chunkIndex] = current.filter((i) => i !== optionIndex);
			} else {
				updated[chunkIndex] = [...current, optionIndex];
			}
			return updated;
		});
	};

	const handleItemClick = (item) => {
		setValueDescription(item);
	};

	const handleModalClose = () => {
		setValueDescription(null);
	};

	const renderQuestion = () => {
		const currentChunk = questionChunks[currentChunkIndex];

		if (currentChunk) {
			return (
				<div className="mindset question-box">
					<div className="question-box-header">
						<h1 className="mb-0 ">Instruction: </h1>
						<h2 style={{ color: '#5b6161' }} className="mb-0 d-flex ms-3 text-left">
							Flip each card to know more about the values. Select the box on each
							card to pick the values you feel are a big part of who you are.
						</h2>
					</div>
					<div className="flip-div overflow-auto">
						<ul>
							{currentChunk.map((item, index) => (
								<li
									key={index}
									className='d-flex'
								>
									<div onClick={() => handleItemClick(item)} className='flex-fill'>
										<p className="question-p py-2 text-gray">{item}</p>
									</div>
									<img
										onClick={() =>
											handleQuestionCheck(currentChunkIndex, index)
										}
										className="cursor-pointer"
										src={
											questionChecked[currentChunkIndex]?.includes(index)
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
		}

		return null;
	};

	const handleNextChunk = () => {
		const checkedItems = questionChecked[currentChunkIndex] || [];
		if (checkedItems.length === 0) {
			toast.error('Please select at least one item before proceeding.');
			return;
		}

		// Add checked items from current chunk to the answers array
		const updatedAnswers = [
			...answers,
			...checkedItems.map((index) => questionChunks[currentChunkIndex][index]),
		];
		setAnswers(updatedAnswers);

		// Move to the next chunk if not the last one, otherwise submit
		if (currentChunkIndex < questionChunks.length - 1) {
			setCurrentChunkIndex(currentChunkIndex + 1);
		} else {
			if (Object.values(chunkCompletion).every(Boolean)) {
				// Submit the form after updating the answers state with the last chunk's answers
				onNext(updatedAnswers);
			} else {
				alert('Please complete all chunks before submitting.');
			}
		}
	};

	const handlePreviousChunk = () => {
		if (currentChunkIndex > 0) {
			setCurrentChunkIndex(currentChunkIndex - 1);
		} else {
			onBack();
		}
	};

	return (
		<>
			{renderQuestion()}

			{valueDescription && (
				<Modal
					isOpen={valueDescription}
					onRequestClose={handleModalClose}
					contentLabel="Value Description Modal"
					className="custom-modal"
					overlayClassName="custom-overlay"
					shouldCloseOnOverlayClick={true}
				>
					<div className="w-0 m-auto">
						{valueDescription && (
							<img
								src={imageMap[valueDescription] || ''}
								alt={valueDescription}
								onClick={handleModalClose}
								className="value-description-img"
							/>
						)}
					</div>
				</Modal>
			)}

			<div className="slider-indicator mt-3">
				<ul className="p-0">
					{questionChunks.map((_, index) => (
						<li
							key={index}
							className={currentChunkIndex >= index ? 'answered' : ''}
						></li>
					))}
				</ul>
			</div>

			<ProgressionButtons onClickPrev={handlePreviousChunk} onClickNext={handleNextChunk} />
		</>
	);
}
