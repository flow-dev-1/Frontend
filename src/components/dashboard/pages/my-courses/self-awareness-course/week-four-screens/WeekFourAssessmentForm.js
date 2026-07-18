import React, { useState, useEffect } from 'react';
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png';
import { toast } from 'react-toastify';
import userService from '../../../../../../services/api/user.js';
import MatchingComponent from './MatchingComponent.js';
import { useSelector, useDispatch } from 'react-redux';
import { userAnswer, updateData } from '../../../../../../redux/reducers/userAnswersReducer.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RotatingLines } from 'react-loader-spinner';
import { writeSelfAwarenessStorage } from '../utils/storage';

export default function WeekFourAssessmentForm({ onNext, onBack, course, activityData, savedAssessment, isCompleted }) {
	const dispatch = useDispatch();
	const userAnswers = useSelector(userAnswer);
	const [arrows, setArrows] = useState([]); // State for managing arrows
	const [arrows2, setArrows2] = useState([]); // State for managing arrows
	const [disableButton, setDisableButton] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [matchesSet1, setMatchesSet1] = useState([]);
	const [matchesSet2, setMatchesSet2] = useState([]);
	// Sample items for matching

	const questionsArray = [
		{
			title: 'What are values?',
			questionList: [
				'A. Beliefs and principles that guide our actions and decisions',
				'B. Emotions and feelings we experience daily',
				'C. Skills and talents we possess',
				'D. Goals and dreams we want to achieve',
			],
		},
		{
			title: 'Select one statement that does not show the importance of values.',
			questionList: [
				'A. They help us make decisions',
				'B. They guide our behavior',
				'C. They define our talents',
				'D. They help us understand what is most important to us',
			],
		},
		{
			title: 'Which of the following is an example of a value?',
			questionList: ['A. Happiness', 'B. Respect', 'C. Excitement', 'D. Intelligence'],
		},
		{
			title: 'How can knowing your values help you in life?',
			questionList: [
				'A. It can make you rich',
				'B. It can help you make choices that align with your beliefs',
				'C. It can make you more popular',
				'D. It can give you superpowers',
			],
		},
		{
			title: 'Imagine you value honesty. What would you likely do in a situation where you found a lost wallet?',
			questionList: [
				'A. Keep the wallet for yourself',
				'B. Ignore the wallet and walk away',
				'C. Try to find the owner and return the wallet',
				'D. Take the money and leave the wallet',
			],
		},
		{
			title: 'Imagine you value responsibility, what would you likely do in a situation where the teacher asks the class to clean their lockers but nobody is doing it?',
			questionList: [
				'A. Wait for the cleaner to come and clean your locker',
				'B. Do nothing',
				'C. Clean your locker',
				'D. Ask your classmate to help you clean your locker',
			],
		},
		{
			title: 'My value can influence how I treat other people',
			questionList: ['A. True', 'B. False'],
		},
		{
			title: "If Honesty is one of your values, what would be your best response to the following scenario. I accidentally broke my friend's favorite toy. No one saw me doing it. I would rather:",
			questionList: [
				'A. Say it was someone else.',
				'B. Pretend nothing happened.',
				'C. Tell my friend the truth immediately.',
				'D. Replace the toy with a new one quietly.',
			],
		},
		{
			title: 'Match the following statements in the scenario to their respective values',
			questionList: [],
		},
		{
			title: 'Match the following statements in the scenario to their respective values.',
			questionList: [],
		},
	];

	const leftItemsArray = ['Kindness', 'Respect', 'Responsibility'];

	const rightItemsArray = [
		"Sarah remembers she has her own after-school activity but suggests they put David's books in his locker first so he isn’t late to his next class.",
		'As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.',
		'Sarah offers to help David with the books.',
		,
	];
	const leftItemsArray2 = ['Loyalty', 'Punctuality', 'Generousity'];

	const rightItemsArray2 = [
		'Both Alex and Ben arrive at Alex’s house on time, ensuring they have maximum time to work on the project.',
		'Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project.',
		'Despite having a busy schedule, Alex prioritizes helping Ben, honouring their friendship.',
		,
	];

	const handleNext = () => {
		console.log('All items matched. Moving to next screen.');
		// Navigate to the next screen or handle the next step
	};

	const [currentIndex, setCurrentIndex] = useState(1);
	const [answers, setAnswers] = useState(() => {
		const storedData = localStorage.getItem('weekFourAssessmentData');
		if (storedData) {
			try {
				const parsedData = JSON.parse(storedData);
				return parsedData.assessment?.answers || [];
			} catch (e) {
				console.error('Error parsing local storage data', e);
				return [];
			}
		}
		return [];
	});

	useEffect(() => {
		const backendAssessment =
			savedAssessment?.assessments?.[0] || savedAssessment?.assessments;

		if (backendAssessment) {
			setAnswers(backendAssessment?.answers || []);
			setMatchesSet1(backendAssessment?.matchesSet1 || []);
			setMatchesSet2(backendAssessment?.matchesSet2 || []);
			return;
		}

		const savedAnswers = localStorage.getItem('weekFourAssessmentData');
		if (savedAnswers) {
			const parsedAnswers = JSON.parse(savedAnswers);
			if (parsedAnswers?.formattedData?.assessments) {
				const assessmentData = parsedAnswers?.formattedData?.assessments[0];
				setAnswers(assessmentData?.answers || []);
				setMatchesSet1(assessmentData?.matchesSet1 || []);
				setMatchesSet2(assessmentData?.matchesSet2 || []);
			}
		}
	}, [savedAssessment]);

	useEffect(() => {
		if (isCompleted || savedAssessment) return;
		const assessmentData = {
			week: 4,
			answers, // Keep flat for now to match component usage
			matchesSet1,
			matchesSet2,
		};
		writeSelfAwarenessStorage('weekFourAssessmentData', assessmentData);
	}, [answers, isCompleted, matchesSet1, matchesSet2, savedAssessment]);

	const handleMatch = (leftIndex, rightIndex) => {
		if (rightIndex === null) {
			setMatchesSet1((prev) => prev.filter((match) => match?.left != leftIndex));
			return;
		}

		// Check if the matches are complete
		if (matchesSet1.length === leftItemsArray.length) {
			// If all matches are made, reset matches and count
			setMatchesSet1([]);
		}

		// Update the matches
		setMatchesSet1((prev) => [...prev, { left: leftIndex, right: rightIndex }]);
	};

	const handleMatch2 = (leftIndex, rightIndex) => {
		if (rightIndex === null) {
			setMatchesSet2((prev) => prev.filter((match) => match?.left != leftIndex));
			return;
		}

		// Check if the matches are complete
		if (matchesSet2.length === leftItemsArray2.length) {
			// If all matches are made, reset matches and count
			setMatchesSet2([]);
		}

		// Update the matches
		setMatchesSet2((prev) => [...prev, { left: leftIndex, right: rightIndex }]);
	};

	const handleQuestionCheck = (optionIndex) => {
		// Check if the answer for the current question has already been selected and persisted or if week is completed
		if (isCompleted || answers[currentIndex - 1] !== undefined) {
			setErrorMessage('You cannot change your answer once selected.');
			return;
		}
		setErrorMessage('');

		// Allow the user to select an answer only if it's not already saved
		setAnswers((prevState) => {
			const newAnswers = [...prevState];
			newAnswers[currentIndex - 1] = optionIndex; // Save the selected option
			return newAnswers;
		});
	};

	const handleNextStepClick = () => {
		// Validate matching questions
		if (currentIndex === 9 && matchesSet1.length !== leftItemsArray.length) {
			setErrorMessage('Please complete the matching before proceeding.');
			return;
		}
		if (currentIndex === 10 && matchesSet2.length !== leftItemsArray2.length) {
			setErrorMessage('Please complete the matching before proceeding.');
			return;
		}

		// Validate multiple choice questions
		if (!isCompleted && currentIndex <= 8 && answers[currentIndex - 1] === undefined) {
			setErrorMessage('Please select an answer before proceeding.');
			return;
		}

		// Move to the next question or submit
		if (currentIndex < questionsArray.length) {
			setCurrentIndex(currentIndex + 1);
		} else {
			if (isCompleted) {
				onNext();
			} else {
				saveWeekFourAssessment();
			}
		}
	};

	const handlePreviousStepClick = () => {
		if (currentIndex > 1) {
			setCurrentIndex(currentIndex - 1);
		} else {
			onBack();
		}
	};

	const queryClient = useQueryClient();
	// Mutation for saving user data
	const mutation = useMutation({
		mutationFn: (data) => userService.submitCourseData(data), // Dispatch saveAssessment action
		onSuccess: (data) => {
			setIsLoading(false);
			toast.dismiss();
			toast.success(data.message || 'Answers saved successfully!'); // Show success toast

			// Invalidate enrollment query to trigger real-time progress update
			queryClient.invalidateQueries(['enrollment', userAnswers?.courseEnrollmentId]);

			dispatch(
				updateData({
					course: null,
					courseEnrollmentId: null,
					week: 4,
					activities: [],
					assessments: [],
				})
			);
			localStorage.removeItem('weekFourAssessmentData');
			onNext();
		},
		onError: (error) => {
			console.log(error, 'errorrrr');
			toast.dismiss();
			setErrorMessage(error?.message || error?.error || 'Error saving answers');
		},
	});

	const saveWeekFourAssessment = async () => {
		if (disableButton || isCompleted) return;

		try {
			if (!activityData?.activities || activityData?.activities?.length !== 9) {
				setErrorMessage('Please complete all activities before submitting the assessment.');
				return;
			}

			// Final check for all answers and matches
			if (
				answers.length < 8 ||
				answers.slice(0, 8).some((ans) => ans === undefined) ||
				matchesSet1.length !== leftItemsArray.length ||
				matchesSet2.length !== leftItemsArray2.length
			) {
				setErrorMessage('Please ensure all 10 assessment items are completed.');
				return;
			}

			const correctAnswers = [0, 2, 1, 1, 2, 2, 1, 2];
			const correctMatchesSet1 = [
				{ left: 0, right: 2 },
				{ left: 1, right: 1 },
				{ left: 2, right: 0 },
			];
			const correctMatchesSet2 = [
				{ left: 0, right: 0 },
				{ left: 1, right: 1 },
				{ left: 2, right: 2 },
			];
			const valuesToCheck = answers;
			const correctCount = valuesToCheck.reduce((count, current, index) => {
				return current === correctAnswers[index] ? count + 1 : count;
			}, 0);

			// Check Matching Questions
			const valuesToCheckForMatchSet1 = matchesSet1;
			const valuesToCheckForMatchSet2 = matchesSet2;

			const isMatchSet1Correct =
				JSON.stringify(valuesToCheckForMatchSet1) === JSON.stringify(correctMatchesSet1);
			const isMatchSet2Correct =
				JSON.stringify(valuesToCheckForMatchSet2) === JSON.stringify(correctMatchesSet2);

			const matchCount = (isMatchSet1Correct ? 3 : 0) + (isMatchSet2Correct ? 3 : 0); // 3 matches per set

			// Total questions
			const totalQuestions = 8 + 2;

			const totalCorrect = correctCount + matchCount;
			const percentage = (totalCorrect / totalQuestions) * 100;

			toast.success(`You scored ${percentage}% in the quiz`);

			const finalAssessmentData = {
				answers,
				matchesSet1,
				matchesSet2,
			};

			const mutationData = {
				...userAnswers,
				assessments: [finalAssessmentData],
				activities: activityData?.activities,
				rating: percentage.toString(),
			};

			mutation.mutate(mutationData);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			setErrorMessage('Something went wrong. Please contact flow admin for support!');
		}
	};

	const renderQuestion = () => {
		const question = questionsArray[currentIndex - 1]

		return (
			<div className='week-two'>
				<div className='assessment question-box'>
					{currentIndex <= 1 && (
						<div className='assessment-box'>
							<h2 style={{ color: '#FAFAFA', textAlign: 'center' }}>
								Assessment
							</h2>
							<p style={{ color: '#FAFAFA' }} className='text-center'>
								Scenario around your values.
							</p>
						</div>
					)}
					<div
						style={{ marginTop: '3rem' }}
						className='d-flex align-items-start mt-6'
					>
						<h1 style={{ color: '#5B616A' }}>{currentIndex}.</h1>
						<h2
							style={{ color: '#5B616A' }}
							className='text-start mb-0  fs-1 ms-3'
						>
							{question.title}
						</h2>
					</div>
					{currentIndex <= 8 && (
						<div
							style={{ marginLeft: '3rem' }}
							className='text-center checkbox-questions'
						>
							<ul className='p-0 mt-4 d-flex flex-column'>
								{question.questionList.map((item, index) => (
									<li key={index} className='d-flex align-items-center'>
										<img
											onClick={() => handleQuestionCheck(index)}
											className='cursor-pointer'
											src={
												answers[currentIndex - 1] === index
													? checkedImage
													: unCheckedImage
											}
											alt=''
										/>
										<p className='question-p ms-3'>{item}</p>
									</li>
								))}
							</ul>
						</div>
					)}
					{currentIndex === 9 && (
						<div className='match'>
							<MatchingComponent
								leftItems={leftItemsArray}
								rightItems={rightItemsArray}
								onMatch={handleMatch}
								onNext={handleNext}
								arrows={arrows}
								setArrows={setArrows}
								isCompleted={isCompleted}
							/>
						</div>
					)}
					{currentIndex === 10 && (
						<div className='match'>
							<MatchingComponent
								leftItems={leftItemsArray2}
								rightItems={rightItemsArray2}
								onMatch={handleMatch2}
								onNext={handleNext}
								setArrows={setArrows2}
								arrows={arrows2}
								isCompleted={isCompleted}
							/>
						</div>
					)}
				</div>
			</div>
		)
	}

	return (
		<div>
			{renderQuestion()}

			<div className='slider-indicator'>
				<ul className='p-0 mt-5'>
					{Array.from({ length: questionsArray.length }, (_, index) => (
						<li
							key={index + 1}
							className={currentIndex >= index + 1 ? 'answered' : ''}
						></li>
					))}
				</ul>
			</div>

			{errorMessage && <div className="text-danger">{errorMessage}</div>}

			<div className="progression-btns mt-3">
				<button
					className="btn prev light"
					onClick={handlePreviousStepClick}
					disabled={mutation.isPending}
				>
					{'<<< Back'}
				</button>
				<button
					className="btn next dark"
					onClick={handleNextStepClick}
					disabled={mutation.isPending}
				>
					{mutation.isPending ? (
						<RotatingLines
							className="me-2 text-white"
							type="Oval"
							strokeColor="white"
							height={20}
							width={20}
						/>
					) : (
						<>
							{isCompleted
								? currentIndex === questionsArray.length
									? 'Continue'
									: 'Next >>>'
								: currentIndex === questionsArray.length
									? 'Submit'
									: 'Next >>>'}
						</>
					)}
				</button>
			</div>
		</div>
	)
}
