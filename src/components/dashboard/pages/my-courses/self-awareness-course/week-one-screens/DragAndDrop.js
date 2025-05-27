import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import dragdropArrow from '../../../../../../assets/selfawareness-images/dragdrop-arrowl.png';
import bucketYes from '../../../../../../assets/selfawareness-images/bucket-yes.png';
import bucketNo from '../../../../../../assets/selfawareness-images/bucket-no.png';
import bucketSometimes from '../../../../../../assets/selfawareness-images/bucket-sometimes.png';
import '../newcourse.css';
import { Icon } from '@iconify/react';
import cardOne from '../../../../../../assets/selfawareness-images/card-one.png';
import cardTwo from '../../../../../../assets/selfawareness-images/card-two.png';
import cardThree from '../../../../../../assets/selfawareness-images/card-three.png';
import cardFour from '../../../../../../assets/selfawareness-images/card-four.png';
import cardFive from '../../../../../../assets/selfawareness-images/card-five.png';
import cardSix from '../../../../../../assets/selfawareness-images/card-six.png';
import cardSeven from '../../../../../../assets/selfawareness-images/card-seven.png';
import cardEight from '../../../../../../assets/selfawareness-images/card-eight.png';
import cardNine from '../../../../../../assets/selfawareness-images/card-nine.png';
import cardTen from '../../../../../../assets/selfawareness-images/card-ten.png';

const cardImages = [
	cardOne,
	cardTwo,
	cardThree,
	cardFour,
	cardFive,
	cardSix,
	cardSeven,
	cardEight,
	cardNine,
	cardTen,
];

const initialCards = [
	{ id: 'card-1', content: 'I enjoy meeting new people.', imageIndex: 0 },
	{ id: 'card-2', content: 'I like to try new things.', imageIndex: 1 },
	{ id: 'card-3', content: 'I am honest and tell the truth.', imageIndex: 2 },
	{
		id: 'card-4',
		content: 'I care a lot about what people think of me and try to make them happy always.',
		imageIndex: 3,
	},
	{
		id: 'card-5',
		content: 'I like to solve problems and figure things out.',
		imageIndex: 4,
	},
	{ id: 'card-6', content: 'I am kind and help others.', imageIndex: 5 },
	{
		id: 'card-7',
		content: 'I am creative and like to make things.',
		imageIndex: 6,
	},
	{ id: 'card-8', content: 'I am brave and face my fears.', imageIndex: 7 },
	{
		id: 'card-9',
		content: 'I am organized and like to keep things tidy.',
		imageIndex: 8,
	},
	{
		id: 'card-10',
		content: 'I like to make friends but struggle with keeping those friendships.',
		imageIndex: 9,
	},
];

const initialBuckets = {
	yes: [],
	no: [],
	sometimes: [],
};

function DragDropComponent({ onBack, onNext, formData }) {
	console.log(formData, 'FormData');
	const [cards, setCards] = useState(formData?.cards || initialCards);
	const [buckets, setBuckets] = useState(formData?.buckets || initialBuckets);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (formData) {
			setCards(
				formData?.activities?.length > 5 ? formData?.activities[5]?.cards : initialCards
			);
			setBuckets(
				formData?.activities?.length > 5 ? formData?.activities[5]?.buckets : initialBuckets
			);
		}
	}, [formData]);
	// console.log(formData.activities[5].buckets)
	const handleOnDragEnd = (result) => {
		if (!result.destination) return;

		const { source, destination } = result;

		if (source.droppableId === 'cards' && destination.droppableId !== 'cards') {
			const droppedCard = cards[0];
			const newBuckets = {
				...buckets,
				[destination.droppableId]: [...buckets[destination.droppableId], droppedCard],
			};

			setBuckets(newBuckets);
			setCards((prevCards) => prevCards.slice(1)); // Move to the next card
			setCurrentIndex(currentIndex + 1);
		}
	};

	const handleBack = () => {
		if (currentIndex > 0) {
			setCards([initialCards[currentIndex - 1], ...cards]);
			setCurrentIndex(currentIndex - 1);
		} else {
			onBack();
		}
	};

	const handleReset = () => {
		setCards(initialCards);
		setBuckets(initialBuckets);
		setCurrentIndex(0);
	};

	const areAllCardsPlaced = () => {
		return cards?.length === 0;
	};

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<div>
				<div className="drag-drop">
					<Droppable droppableId="cards">
						{(provided) => (
							<div
								className="card-slider"
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{cards?.length > 0 && (
									<Draggable
										key={cards[0].id}
										draggableId={cards[0].id}
										index={0}
									>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className={`card-item d-flex align-items-center justify-content-center ${
													snapshot.isDragging ? 'draging' : ''
												}`}
												style={{
													cursor: snapshot.isDragging
														? 'grabbing'
														: 'grab',
													opacity: snapshot.isDragging ? '0.1' : '1',
													transform: 'none', // Prevent any change in transform
													...provided.draggableProps.style,
												}}
											>
												<img
													src={cardImages[cards[0].imageIndex]}
													alt="card"
													className="slider-img-card"
												/>
											</div>
										)}
									</Draggable>
								)}
								{provided.placeholder}
							</div>
						)}
					</Droppable>

					<div className="drop-card">
						<div className="drop-card-header">
							<img src={dragdropArrow} alt="" />
							<h2 style={{ color: '#FAFAFA' }}>
								Drag-and-drop the statements on the left into any of these bowls.
							</h2>
							<img src={dragdropArrow} alt="" className="dragdropArrow" />
						</div>

						<div className="bucket-section mt-4 py-2">
							{['yes', 'no', 'sometimes'].map((bucketType) => (
								<Droppable key={bucketType} droppableId={bucketType}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.droppableProps}
											className={`bucket bucket-${bucketType} ${
												snapshot.isDraggingOver ? 'dragging-over' : ''
											}`}
											style={{
												backgroundColor: snapshot.isDraggingOver
													? 'rgba(0, 0, 0, 0.1)'
													: '',
												width: '150px',
												height: '150px',
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												position: 'relative',
											}}
										>
											<div className={`${bucketType} bucket-item`}>
												<h3 className="mb-0">
													{buckets?.[bucketType]?.length ?? 0}
												</h3>
											</div>
											<img
												src={
													bucketType === 'yes'
														? bucketYes
														: bucketType === 'no'
														? bucketNo
														: bucketSometimes
												}
												alt={`bucket-${bucketType}`}
												style={{
													width: '100%',
                          maxWidth: '100px',
													height: 'auto',
													transition: 'transform 0.3s ease',
													transform: snapshot.isDraggingOver
														? 'scale(1.4)'
														: 'scale(1)',
												}}
											/>
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							))}
						</div>
					</div>
				</div>

				<div className="d-flex flex-column mt-3">
					<div
						className="d-flex justify-content-end align-items-center gap-2 px- mb-2 text-muted"
						onClick={handleReset}
						style={{ cursor: 'pointer', marginLeft: '4rem' }}
					>
						<Icon className="ml-3" icon="teenyicons:refresh-solid" />
						<p className="text-3xl mr-2">Refresh </p>
					</div>

					<div className="slider-indicator">
						<ul>
							{Array.from({ length: initialCards.length }).map((_, index) => (
								<li
									key={index}
									style={{ width: '20px', height: '-10px' }}
									className={index < currentIndex ? 'answered-drop' : 'p-0'}
								></li>
							))}
						</ul>
					</div>
				</div>

				<div className="progression-btns mt-3">
					<button className="btn prev light" onClick={handleBack}>
						{'<<< Back'}
					</button>
					<button
						className="btn next dark"
						onClick={() => onNext({ cards, buckets })}
						disabled={!areAllCardsPlaced()}
						// Disable if not all cards are placed
					>
						{'Next >>>'}
					</button>
				</div>
			</div>
		</DragDropContext>
	);
}

export default DragDropComponent;
