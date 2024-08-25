import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Icon } from '@iconify/react';
import dragdropArrow from '../../../../../../assets/selfawareness-images/dragdrop-arrowl.png';
import bucketYes from '../../../../../../assets/selfawareness-images/bucket-yes.png';
import bucketNo from '../../../../../../assets/selfawareness-images/bucket-no.png';
import bucketSometimes from '../../../../../../assets/selfawareness-images/bucket-sometimes.png';
import '../newcourse.css';

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
    cardTen
];

const initialCards = [
    { id: 'card-1', content: 'Card 1', imageIndex: 0 },
    { id: 'card-2', content: 'Card 2', imageIndex: 1 },
    { id: 'card-3', content: 'Card 3', imageIndex: 2 },
    { id: 'card-4', content: 'Card 4', imageIndex: 3 },
    { id: 'card-5', content: 'Card 5', imageIndex: 4 },
    { id: 'card-6', content: 'Card 6', imageIndex: 5 },
    { id: 'card-7', content: 'Card 7', imageIndex: 6 },
    { id: 'card-8', content: 'Card 8', imageIndex: 7 },
    { id: 'card-9', content: 'Card 9', imageIndex: 8 },
    { id: 'card-10', content: 'Card 10', imageIndex: 9 }
];

const initialBuckets = {
    yes: [],
    no: [],
    sometimes: []
};

function DragDropComponent() {
    const [cards, setCards] = useState(initialCards);
    const [buckets, setBuckets] = useState(initialBuckets);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) return;

        if (source.droppableId === 'card-slider') {
            const newCards = Array.from(cards);
            const draggedCard = newCards.splice(source.index, 1)[0];
            
            if (destination.droppableId === 'bucket-yes') {
                setBuckets(prev => ({
                    ...prev,
                    yes: [...prev.yes, draggedCard]
                }));
            } else if (destination.droppableId === 'bucket-no') {
                setBuckets(prev => ({
                    ...prev,
                    no: [...prev.no, draggedCard]
                }));
            } else if (destination.droppableId === 'bucket-sometimes') {
                setBuckets(prev => ({
                    ...prev,
                    sometimes: [...prev.sometimes, draggedCard]
                }));
            }

            const newIndex = newCards.length ? Math.min(currentCardIndex, newCards.length - 1) : -1;
            setCards(newCards);
            setCurrentCardIndex(newIndex);
        }
    };

    const onRefresh = () => {
        setCards(initialCards);
        setBuckets(initialBuckets);
        setCurrentCardIndex(0);
    };

    const sliderIndicator = (index) => {
        return index >= initialCards.length - cards.length ? '' : 'dragged';
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <div className="drag-drop">
                    <Droppable droppableId="card-slider" direction="horizontal">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="card-slider"
                            >
                                {currentCardIndex >= 0 && (
                                    <Draggable
                                        draggableId={cards[currentCardIndex]?.id}
                                        index={0}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                className={`card-item d-flex align-items-center justify-content-center ${snapshot.isDragging ? 'dragging' : ''}`}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {cards.length > 0 && currentCardIndex >= 0 && currentCardIndex < cards.length ? (
                                                    <img
                                                        src={cardImages[cards[currentCardIndex]?.imageIndex]}
                                                        alt="card"
                                                        className='slider-img-card'
                                                    />
                                                ) : (
                                                    <p>no more cards</p>
                                                )}
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
                            <h2>Drag-and-drop the statements on the left into any of these bowls.</h2>
                            <img src={dragdropArrow} alt="" className='dragdropArrow' />
                        </div>

                        <div className="bucket-section mt-5 py-2">
                            <Droppable droppableId="bucket-yes">
                                {(provided) => (
                                    <div
                                        className="bucket bucket-yes"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <div className="yes bucket-item">
                                            <h3 className='mb-0'>{buckets.yes.length}</h3>
                                        </div>
                                        <img src={bucketYes} alt="bucketYes" />
                                    </div>
                                )}
                            </Droppable>

                            <Droppable droppableId="bucket-no">
                                {(provided) => (
                                    <div
                                        className="bucket bucket-no"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <div className="no bucket-item">
                                            <h3 className='mb-0'>{buckets.no.length}</h3>
                                        </div>
                                        <img src={bucketNo} alt="bucketNo" />
                                    </div>
                                )}
                            </Droppable>

                            <Droppable droppableId="bucket-sometimes">
                                {(provided) => (
                                    <div
                                        className="bucket bucket-sometimes"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <div className="sometimes bucket-item">
                                            <h3 className='mb-0'>{buckets.sometimes.length}</h3>
                                        </div>
                                        <img src={bucketSometimes} alt="bucketSometimes" />
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                </div>
                <div className="refresh mt-5">
                    <div className="slider-indicator">
                        <ul className="p-0">
                            {Array.from({ length: initialCards.length }).map((_, index) => (
                                <li key={index} className={sliderIndicator(index)}></li>
                            ))}
                        </ul>
                    </div>
                    <div className='d-flex' onClick={onRefresh}>
                        <Icon icon="system-uicons:refresh" className='mx-3 fs-3' />
                        Refresh
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
}

export default DragDropComponent;
