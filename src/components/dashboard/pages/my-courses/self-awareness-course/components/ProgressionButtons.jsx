import React from 'react';

function Button({ text, variant, onClickNext, onClickPrev }) {
	if (variant == 'next') {
		return (
			<div className="progression-btns">
				<button className="btn dark" onClick={() => onClickNext()}>
					{'Next >>>'}
				</button>
			</div>
		);
	}

	if (variant == 'prev') {
		return (
			<div className="progression-btns">
				<button className="btn light" onClick={() => onClickPrev()}>
					{'<<< Back'}
				</button>
			</div>
		);
	}

	return (
		<div className="progression-btns">
			<button className="btn prev light" onClick={() => onClickPrev()}>
				{'<<< Back'}
			</button>
			<button className="btn next dark" onClick={() => onClickNext()}>
				{'Next >>>'}
			</button>
		</div>
	);
}

export default Button;
