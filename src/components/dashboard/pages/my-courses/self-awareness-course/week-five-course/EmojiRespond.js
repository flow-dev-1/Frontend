import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

import emojiSad from '../../../../../../assets/selfawareness-images/emocom-images/sad.png';
import emojiAngry from '../../../../../../assets/selfawareness-images/emocom-images/angry.png';
import emojiAnxiety from '../../../../../../assets/selfawareness-images/emocom-images/anxiety.png';
import emojiBored from '../../../../../../assets/selfawareness-images/emocom-images/bored.png';
import emojiHappy from '../../../../../../assets/selfawareness-images/emocom-images/happy.png';
import emojiEnvy from '../../../../../../assets/selfawareness-images/emocom-images/envy.png';
import emojiFear from '../../../../../../assets/selfawareness-images/emocom-images/fear.png';
import emojiJoy from '../../../../../../assets/selfawareness-images/emocom-images/joy.png';
import emojiNostalgia from '../../../../../../assets/selfawareness-images/emocom-images/nostalgia.png';

import ProgressionButtons from '../components/ProgressionButtons';

export default function EmojiRespond({ onNext, onBack, formData, activityIndex }) {
	const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
	const [selectedOptions, setSelectedOptions] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const dropdownRefs = useRef([]);

	// Emoji data
	const emojis = [
		{
			src: emojiJoy,
			label: 'Joy',
			options: [
				{ src: emojiHappy, label: 'Happy' },
				{ src: emojiNostalgia, label: 'Nostalgia' },
				{ src: emojiJoy, label: 'Joy' },
			],
		},
		{
			src: emojiAnxiety,
			label: 'Anxiety',
			options: [
				{ src: emojiBored, label: 'Bored' },
				{ src: emojiAnxiety, label: 'Anxiety' },
				{ src: emojiJoy, label: 'Joy' },
			],
		},
		{
			src: emojiHappy,
			label: 'Happy',
			options: [
				{ src: emojiHappy, label: 'Happy' },
				{ src: emojiAnxiety, label: 'Anxiety' },
				{ src: emojiJoy, label: 'Joy' },
			],
		},
		{
			src: emojiAngry,
			label: 'Angry',
			options: [
				{ src: emojiAngry, label: 'Angry' },
				{ src: emojiJoy, label: 'Joy' },
				{ src: emojiSad, label: 'Sad' },
			],
		},
		{
			src: emojiSad,
			label: 'Sad',
			options: [
				{ src: emojiHappy, label: 'Happy' },
				{ src: emojiAnxiety, label: 'Anxiety' },
				{ src: emojiSad, label: 'Sad' },
			],
		},
	];

	useEffect(() => {
		// Prepopulate selectedOptions based on formData
		const currentActivityData = formData?.activities?.find(
			(activity) => activity.activity === activityIndex
		);
		if (currentActivityData && currentActivityData.answers) {
			setSelectedOptions(currentActivityData.answers);
		} else {
			setSelectedOptions({});
		}
	}, [formData, activityIndex]);

	const handleEmojiClick = (index) => {
		setOpenDropdownIndex(index === openDropdownIndex ? null : index);
	};

	const handleOptionClick = (index, option) => {
		setSelectedOptions((prev) => ({ ...prev, [index]: option.label }));
		setErrorMessage('');
		setOpenDropdownIndex(null); // Close dropdown after selection
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRefs.current &&
				!dropdownRefs.current.some((ref) => ref && ref.contains(event.target))
			) {
				setOpenDropdownIndex(null); // Close dropdown if click is outside
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleNextStepClick = () => {
		const allSelected = emojis.every((_, index) => selectedOptions[index]);

		if (!allSelected) {
			setErrorMessage('Please select an option for each emoji before proceeding.');
			return false;
		}

		return onNext(selectedOptions);
	};

	return (
		<div>
			<div className="week-two question-box py-4">
				<div className="align-items-start">
					<div className="question-box-header mx-auto align-items-start">
						<h1 className="mb-0">Instructions:</h1>
						<h2 style={{ color: '#5B616A' }} className="mb-0 d-flex ms-3">
							All you need to do is select how you would respond to a colleague
							wearing a facial expression with facial responses.
						</h2>
					</div>

					<div className="dropdown-select-section mt-5">
						{emojis.map((emoji, index) => (
							<div
								key={index}
								ref={(el) => (dropdownRefs.current[index] = el)}
								className="dropdown-container"
							>
								<div className="dropdown-div d-flex justify-between align-items-center text-body">
									<img src={emoji.src} alt={emoji.label} />

									<span className="selected-option">
										{selectedOptions[index] ? (
											<>
												<img
													src={
														emoji.options.find(
															(option) =>
																option.label ===
																selectedOptions[index]
														).src
													}
													alt={selectedOptions[index]}
												/>
											</>
										) : (
											''
										)}
									</span>

									<Icon
										icon={
											openDropdownIndex === index
												? 'iconamoon:arrow-up-2-thin'
												: 'iconamoon:arrow-down-2-thin'
										}
										className="fs-2 cursor-pointer"
										onClick={() => handleEmojiClick(index)}
									/>
								</div>

								{openDropdownIndex === index && (
									<ul className="emoji-value-option">
										{emoji.options.map((option, optionIndex) => (
											<li
												key={optionIndex}
												onClick={() => handleOptionClick(index, option)}
											>
												<img src={option.src} alt={option.label} />
											</li>
										))}
									</ul>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
			{errorMessage && <div className="text-danger">{errorMessage}</div>}

			<div className="mt-3">
				<ProgressionButtons
					variant={'both'}
					onClickPrev={onBack}
					onClickNext={handleNextStepClick}
				/>
			</div>
		</div>
	);
}
