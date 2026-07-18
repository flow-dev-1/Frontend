import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import dragdropArrow from '../../../../../../assets/selfawareness-images/dragdrop-arrowl.png';
import bucketYes from '../../../../../../assets/selfawareness-images/bucket-yes.png';
import bucketNo from '../../../../../../assets/selfawareness-images/bucket-no.png';
import bucketSometimes from '../../../../../../assets/selfawareness-images/bucket-sometimes.png';
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
import ProgressionButtons from '../components/ProgressionButtons';

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

const createInitialBuckets = () => ({
	yes: [],
	no: [],
	sometimes: [],
});

const normalizeBuckets = (buckets) => ({
	yes: Array.isArray(buckets?.yes) ? buckets.yes : [],
	no: Array.isArray(buckets?.no) ? buckets.no : [],
	sometimes: Array.isArray(buckets?.sometimes) ? buckets.sometimes : [],
});

const normalizeSavedState = (savedState) => {
	const nextCards = Array.isArray(savedState?.cards) ? savedState.cards : initialCards;
	const nextBuckets = normalizeBuckets(savedState?.buckets);
	const inferredIndex = initialCards.length - nextCards.length;
	const nextIndex = Number.isFinite(savedState?.currentIndex)
		? savedState.currentIndex
		: inferredIndex;

	return {
		cards: nextCards,
		buckets: nextBuckets,
		currentIndex: Math.max(0, Math.min(nextIndex, initialCards.length)),
	};
};

function DragDropComponent({ onBack, onNext, formData, onUpdate, activityIndex }) {
	const initialState = formData?.activities?.find((act) => act.activity === activityIndex) || {};
	const savedState = normalizeSavedState(initialState);

	const [cards, setCards] = useState(savedState.cards);
	const [buckets, setBuckets] = useState(savedState.buckets);
	const [currentIndex, setCurrentIndex] = useState(savedState.currentIndex);
	const [isDragging, setIsDragging] = useState(false);
	const [activeBucket, setActiveBucket] = useState(null);
	const bucketRefs = useRef({});

	// Pushing state to parent only when it actually changes due to user action
	const pushToParent = (updatedCards, updatedBuckets, updatedIndex) => {
		if (onUpdate) {
			onUpdate({
				cards: updatedCards,
				buckets: updatedBuckets,
				currentIndex: updatedIndex,
			});
		}
	};

	// Remote/Parent change restoration (only if internal state is still initial)
	useEffect(() => {
		const saved = formData?.activities?.find((act) => act.activity === activityIndex);
		if (!saved) return;

		const nextState = normalizeSavedState(saved);
		setCards(nextState.cards);
		setBuckets(nextState.buckets);
		setCurrentIndex(nextState.currentIndex);
	}, [formData, activityIndex]);

	const getBucketAtPoint = (clientX, clientY) => {
		const bucketEntry = Object.entries(bucketRefs.current).find(([, node]) => {
			if (!node) return false;
			const rect = node.getBoundingClientRect();
			return (
				clientX >= rect.left &&
				clientX <= rect.right &&
				clientY >= rect.top &&
				clientY <= rect.bottom
			);
		});

		return bucketEntry?.[0] || null;
	};

	useEffect(() => {
		if (!isDragging) return undefined;

		const updateActiveBucket = (event) => {
			const point = event.touches?.[0] || event;
			setActiveBucket(getBucketAtPoint(point.clientX, point.clientY));
		};

		window.addEventListener('mousemove', updateActiveBucket);
		window.addEventListener('touchmove', updateActiveBucket);

		return () => {
			window.removeEventListener('mousemove', updateActiveBucket);
			window.removeEventListener('touchmove', updateActiveBucket);
		};
	}, [isDragging]);
	// console.log(formData.activities[5].buckets)
	const handleOnDragEnd = (result) => {
		setIsDragging(false);
		const hoveredBucket = activeBucket;
		setActiveBucket(null);

		const { source, destination } = result;
		const destinationBucket = hoveredBucket || destination?.droppableId;

		if (source.droppableId === 'cards' && destinationBucket !== 'cards') {
			if (!cards?.length) return;

			if (!['yes', 'no', 'sometimes'].includes(destinationBucket)) return;

			const droppedCard = cards[0];
			const updatedCards = cards.slice(1);
			const updatedIndex = currentIndex + 1;
			const newBuckets = {
				...buckets,
				[destinationBucket]: [
					...(buckets[destinationBucket] || []),
					droppedCard,
				],
			};

			setBuckets(newBuckets);
			setCards(updatedCards);
			setCurrentIndex(updatedIndex);

			pushToParent(updatedCards, newBuckets, updatedIndex);
		}
	};

	const handleBack = () => {
		if (currentIndex > 0) {
			const previousCard = initialCards[currentIndex - 1];
			const updatedCards = [
				previousCard,
				...cards.filter((card) => card.id !== previousCard.id),
			];
			const updatedBuckets = Object.fromEntries(
				Object.entries(normalizeBuckets(buckets)).map(([bucketType, bucketCards]) => [
					bucketType,
					bucketCards.filter((card) => card.id !== previousCard.id),
				])
			);
			const updatedIndex = currentIndex - 1;

			setCards(updatedCards);
			setBuckets(updatedBuckets);
			setCurrentIndex(updatedIndex);
			pushToParent(updatedCards, updatedBuckets, updatedIndex);
		} else {
			onBack();
		}
	};

	const handleReset = () => {
		const emptyBuckets = createInitialBuckets();
		setCards(initialCards);
		setBuckets(emptyBuckets);
		setCurrentIndex(0);
		pushToParent(initialCards, emptyBuckets, 0);
	};

	const areAllCardsPlaced = () => {
		return currentIndex >= initialCards.length || cards?.length === 0;
	};

	return (
		<DragDropContext
			onDragStart={() => setIsDragging(true)}
			onDragEnd={handleOnDragEnd}
		>
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
												className="card-item d-flex align-items-center justify-content-center"
												style={{
													...provided.draggableProps.style,
													cursor: snapshot.isDragging
														? 'grabbing'
														: 'grab',
													opacity: snapshot.isDragging ? '0.95' : '1',
													filter: snapshot.isDragging
														? 'drop-shadow(0 12px 18px rgba(0, 0, 0, 0.25))'
														: 'none',
													zIndex: snapshot.isDragging ? 9999 : 1,
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
									{(provided) => (
										<div
											ref={(node) => {
												provided.innerRef(node);
												bucketRefs.current[bucketType] = node;
											}}
											{...provided.droppableProps}
											className={`bucket bucket-${bucketType} ${activeBucket === bucketType ? 'dragging-over' : ''
												}`}
											style={{
												backgroundColor: activeBucket === bucketType
													? 'rgba(0, 0, 0, 0.1)'
													: '',
												outline: activeBucket === bucketType
													? '3px solid rgba(255, 255, 255, 0.85)'
													: '3px solid transparent',
												borderRadius: '12px',
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
												}}
											/>
										</div>
									)}
								</Droppable>
							))}
						</div>
					</div>
				</div>

				<div className="d-flex flex-column mt-3">
					<div
						className="self-awareness-dnd-refresh fs-5 d-flex justify-content-center gap-3 align-items-center mt-3 mb-2"
						onClick={handleReset}
						style={{ cursor: 'pointer' }}
					>
						<Icon className="ml-3" icon="teenyicons:refresh-solid" />
						<span>Refresh</span>
					</div>

					<div className="slider-indicator">
						<ul>
							{Array.from({ length: initialCards.length }).map((_, index) => (
								<li
									key={index}
									style={{ width: '20px' }}
									className={index < currentIndex ? 'answered-drop' : 'p-0'}
								></li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-3">
					<ProgressionButtons
						variant="both"
						onClickPrev={handleBack}
						onClickNext={() => onNext({ cards, buckets, currentIndex })}
						nextDisabled={!areAllCardsPlaced()}
					/>
				</div>
			</div>
		</DragDropContext>
	);
}

export default DragDropComponent;
