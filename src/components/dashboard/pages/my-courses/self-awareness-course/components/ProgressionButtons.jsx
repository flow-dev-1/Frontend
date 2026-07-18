import React, { useEffect, useState } from 'react';

let selfAwarenessButtonSaving = false;
const selfAwarenessButtonSavingListeners = new Set();

const setSelfAwarenessButtonSaving = (isSaving) => {
	selfAwarenessButtonSaving = isSaving;
	selfAwarenessButtonSavingListeners.forEach((listener) => listener(isSaving));
};

const subscribeToSelfAwarenessButtonSaving = (listener) => {
	selfAwarenessButtonSavingListeners.add(listener);
	listener(selfAwarenessButtonSaving);

	return () => {
		selfAwarenessButtonSavingListeners.delete(listener);
	};
};

function Button({ text, variant, onClickNext, onClickPrev, nextDisabled = false }) {
	const [isSaving, setIsSaving] = useState(selfAwarenessButtonSaving);

	useEffect(() => subscribeToSelfAwarenessButtonSaving(setIsSaving), []);

	const handleNext = async () => {
		if (isSaving || nextDisabled) return;
		setSelfAwarenessButtonSaving(true);

		try {
			const canProceed = await onClickNext?.();
			if (canProceed === false) return;
		} finally {
			setSelfAwarenessButtonSaving(false);
		}
	};

	const handlePrev = () => {
		if (isSaving) return;
		onClickPrev?.();
	};

	const nextText = isSaving ? 'Saving...' : 'Next >>>';

	if (variant === 'next') {
		return (
			<div className="progression-btns">
			<button className="btn dark" onClick={handleNext} disabled={isSaving || nextDisabled}>
					{nextText}
				</button>
			</div>
		);
	}

	if (variant === 'prev') {
		return (
			<div className="progression-btns">
				<button className="btn light" onClick={handlePrev} disabled={isSaving}>
					{'<<< Back'}
				</button>
			</div>
		);
	}

	return (
		<div className="progression-btns">
			<button className="btn prev light" onClick={handlePrev} disabled={isSaving}>
				{'<<< Back'}
			</button>
			<button className="btn next dark" onClick={handleNext} disabled={isSaving || nextDisabled}>
				{nextText}
			</button>
		</div>
	);
}

export default Button;
