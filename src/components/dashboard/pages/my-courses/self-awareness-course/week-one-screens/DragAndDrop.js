import React, { useState, useEffect } from 'react'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Icon } from '@iconify/react'
import dragdropArrow from '../../../../../../assets/selfawareness-images/dragdrop-arrowl.png'
import bucketYes from '../../../../../../assets/selfawareness-images/bucket-yes.png'
import bucketNo from '../../../../../../assets/selfawareness-images/bucket-no.png'
import bucketSometimes from '../../../../../../assets/selfawareness-images/bucket-sometimes.png'
import '../newcourse.css'

import cardOne from '../../../../../../assets/selfawareness-images/card-one.png'
import cardTwo from '../../../../../../assets/selfawareness-images/card-two.png'
import cardThree from '../../../../../../assets/selfawareness-images/card-three.png'
import cardFour from '../../../../../../assets/selfawareness-images/card-four.png'
import cardFive from '../../../../../../assets/selfawareness-images/card-five.png'
import cardSix from '../../../../../../assets/selfawareness-images/card-six.png'
import cardSeven from '../../../../../../assets/selfawareness-images/card-seven.png'
import cardEight from '../../../../../../assets/selfawareness-images/card-eight.png'
import cardNine from '../../../../../../assets/selfawareness-images/card-nine.png'
import cardTen from '../../../../../../assets/selfawareness-images/card-ten.png'

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
]

const initialCards = [
  { id: 'card-1', content: 'I enjoy meeting new people.', imageIndex: 0 },
  { id: 'card-2', content: 'I like to try new things.', imageIndex: 1 },
  { id: 'card-3', content: 'I am honest and tell the truth.', imageIndex: 2 },
  {
    id: 'card-4',
    content:
      'I care a lot about what people think of me and try to make them happy always.',
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
    content:
      'I like to make friends but struggle with keeping those friendships.',
    imageIndex: 9,
  },
]

const initialBuckets = {
  yes: [],
  no: [],
  sometimes: [],
}

const ItemTypes = {
  CARD: 'card',
}

function Card({ card, index, isDragging }) {
  const [{ isDraggingCard }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { card, index },
    collect: (monitor) => ({
      isDraggingCard: !!monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag}
      className={`card-item d-flex align-items-center justify-content-center ${
        isDraggingCard || isDragging ? 'draging' : ''
      }`}
      style={{
        cursor: isDraggingCard ? 'grabbing' : 'grab', // Change the cursor based on dragging state
        visibility: isDraggingCard ? 'hidden' : 'visible', // Hide the card from its original position when dragging
        transform: isDraggingCard ? 'scale(0.5)' : 'scale(1)', // Halve the size while dragging
        opacity: "1", // Keep full opacity during dragging
        transition: 'transform 0.2s ease, visibility 0s', // Smooth scaling with instant visibility toggle
      }}
    >
      <img
        src={cardImages[card.imageIndex]}
        alt='card'
        className='slider-img-card'
      />
    </div>
  )
}

function Bucket({ type, bucketContent, onDrop }) {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => onDrop(item, type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <div
      ref={drop}
      className={`bucket bucket-${type}`}
      style={{ position: 'relative', backgroundColor: isOver ? '#f0f0f0' : '' }}
    >
      <div className={`${type} bucket-item`}>
        <h3 className='mb-0'>{bucketContent.length}</h3>
      </div>
      <img
        src={
          type === 'yes'
            ? bucketYes
            : type === 'no'
            ? bucketNo
            : bucketSometimes
        }
        alt={`bucket${type}`}
      />
    </div>
  )
}

function DragDropComponent({ onBack, onNext, formData }) {
  const [cards, setCards] = useState(formData?.cards || initialCards)
  const [buckets, setBuckets] = useState(formData?.buckets || initialBuckets)
  const [history, setHistory] = useState([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0) // Track current card index

  useEffect(() => {
    if (formData) {
      setCards(formData.cards || initialCards)
      setBuckets(formData.buckets || initialBuckets)
    }
  }, [formData])

  const handleDrop = (item, bucketType) => {
    const newCards = cards.filter((_, index) => index !== item.index)
    const droppedCard = item.card

    setBuckets((prevBuckets) => ({
      ...prevBuckets,
      [bucketType]: [...prevBuckets[bucketType], droppedCard],
    }))
    setCards(newCards)
    setCurrentCardIndex((prevIndex) => prevIndex + 1) // Move to next card
    saveStateToHistory(newCards, buckets)
  }

  const saveStateToHistory = (cardsState, bucketsState) => {
    setHistory((prevHistory) => [
      ...prevHistory,
      { cards: cardsState, buckets: bucketsState },
    ])
  }

  const handleBack = () => {
    if (history.length > 0) {
      const previousState = history.pop()
      setCards(previousState.cards)
      setBuckets(previousState.buckets)
      setCurrentCardIndex((prevIndex) => prevIndex - 1) // Move to previous card
      setHistory([...history])
    } else {
      onBack()
    }
  }

  const onRefresh = () => {
    setCards(initialCards)
    setBuckets(initialBuckets)
    setCurrentCardIndex(0) // Reset to first card
  }

  const areAllCardsCategorized = () => {
    return cards.length === 0
  }

  const sliderIndicator = (index) => {
    // Check if the card has been categorized by looking in all the buckets
    const isAnswered =
      buckets.yes.some((card) => card.imageIndex === index) ||
      buckets.no.some((card) => card.imageIndex === index) ||
      buckets.sometimes.some((card) => card.imageIndex === index)

    return isAnswered ? 'answered' : ''
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className='drag-drop'>
          <div className='card-slider'>
            {cards.length > 0 && (
              <Card card={cards[0]} index={0} isDragging={false} />
            )}
          </div>

          <div className='drop-card'>
            <div className='drop-card-header'>
              <img src={dragdropArrow} alt='' />
              <h2>
                Drag-and-drop the statements on the left into any of these
                bowls.
              </h2>
              <img src={dragdropArrow} alt='' className='dragdropArrow' />
            </div>

            <div className='bucket-section mt-5 py-2'>
              {['yes', 'no', 'sometimes'].map((bucketType) => (
                <Bucket
                  key={bucketType}
                  type={bucketType}
                  bucketContent={buckets[bucketType]}
                  onDrop={handleDrop}
                />
              ))}
            </div>
          </div>
        </div>

        <div className='refresh mt-3 ml-8'>
          {/* Slider Indicator */}
          <div className='slider-indicator'>
            <ul className='p-0'>
              {Array.from({ length: initialCards.length }).map((_, index) => (
                <li key={index} className={sliderIndicator(index)}></li>
              ))}
            </ul>
          </div>
          <div className='d-flex justify-content-between' onClick={onRefresh}>
            <Icon icon='teenyicons:refresh-solid' />
            Refresh
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-around mt-3'>
          <button className='btn progress-btn btn-light' onClick={handleBack}>
            {'<<<'} Back
          </button>

          <button
            className='btn progress-btn btn-dark'
            onClick={() => onNext({ cards, buckets })}
            disabled={!areAllCardsCategorized()}
          >
            Next {'>>>'}
          </button>
        </div>
      </div>
    </DndProvider>
  )
}

export default DragDropComponent
