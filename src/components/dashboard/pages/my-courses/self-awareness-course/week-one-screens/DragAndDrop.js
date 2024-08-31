import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Icon } from "@iconify/react";
import dragdropArrow from "../../../../../../assets/selfawareness-images/dragdrop-arrowl.png";
import bucketYes from "../../../../../../assets/selfawareness-images/bucket-yes.png";
import bucketNo from "../../../../../../assets/selfawareness-images/bucket-no.png";
import bucketSometimes from "../../../../../../assets/selfawareness-images/bucket-sometimes.png";
import "../newcourse.css";

import cardOne from "../../../../../../assets/selfawareness-images/card-one.png";
import cardTwo from "../../../../../../assets/selfawareness-images/card-two.png";
import cardThree from "../../../../../../assets/selfawareness-images/card-three.png";
import cardFour from "../../../../../../assets/selfawareness-images/card-four.png";
import cardFive from "../../../../../../assets/selfawareness-images/card-five.png";
import cardSix from "../../../../../../assets/selfawareness-images/card-six.png";
import cardSeven from "../../../../../../assets/selfawareness-images/card-seven.png";
import cardEight from "../../../../../../assets/selfawareness-images/card-eight.png";
import cardNine from "../../../../../../assets/selfawareness-images/card-nine.png";
import cardTen from "../../../../../../assets/selfawareness-images/card-ten.png";

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
  { id: "card-1", content: "I enjoy meeting new people.", imageIndex: 0 },
  { id: "card-2", content: "I like to try new things.", imageIndex: 1 },
  { id: "card-3", content: "I am honest and tell the truth.", imageIndex: 2 },
  {
    id: "card-4",
    content:
      "I care a lot about what people think of me and try to make them happy always.",
    imageIndex: 3
  },
  {
    id: "card-5",
    content: "I like to solve problems and figure things out.",
    imageIndex: 4
  },
  { id: "card-6", content: "I am kind and help others.", imageIndex: 5 },
  {
    id: "card-7",
    content: "I am creative and like to make things.",
    imageIndex: 6
  },
  { id: "card-8", content: "I am brave and face my fears.", imageIndex: 7 },
  {
    id: "card-9",
    content: "I am organized and like to keep things tidy.",
    imageIndex: 8
  },
  {
    id: "card-10",
    content:
      "I like to make friends but struggle with keeping those friendships.",
    imageIndex: 9
  }
];

const initialBuckets = {
  yes: [],
  no: [],
  sometimes: []
};

function DragDropComponent({ onBack, onNext }) {
  const [cards, setCards] = useState(initialCards);
  const [buckets, setBuckets] = useState(initialBuckets);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [history, setHistory] = useState([]); // To keep track of previous states

  useEffect(() => {
    // Load persisted state from localStorage
    const savedCards = JSON.parse(localStorage.getItem("cards"));
    const savedBuckets = JSON.parse(localStorage.getItem("buckets"));
    const savedCurrentCardIndex = JSON.parse(
      localStorage.getItem("currentCardIndex")
    );
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];

    if (savedCards) setCards(savedCards);
    if (savedBuckets) setBuckets(savedBuckets);
    if (savedCurrentCardIndex !== null)
      setCurrentCardIndex(savedCurrentCardIndex);
    if (savedHistory) setHistory(savedHistory);
  }, []);

  useEffect(() => {
    // Persist state to localStorage whenever it changes
    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("buckets", JSON.stringify(buckets));
    localStorage.setItem("currentCardIndex", JSON.stringify(currentCardIndex));
    localStorage.setItem("history", JSON.stringify(history));
  }, [cards, buckets, currentCardIndex, history]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      // If the card is dropped outside of a valid location, revert the position
      return;
    }

    if (source.droppableId === "card-slider") {
      const newCards = Array.from(cards);
      const draggedCard = newCards.splice(currentCardIndex, 1)[0];

      if (destination.droppableId === "bucket-yes") {
        setBuckets((prev) => ({
          ...prev,
          yes: [...prev.yes, draggedCard]
        }));
      } else if (destination.droppableId === "bucket-no") {
        setBuckets((prev) => ({
          ...prev,
          no: [...prev.no, draggedCard]
        }));
      } else if (destination.droppableId === "bucket-sometimes") {
        setBuckets((prev) => ({
          ...prev,
          sometimes: [...prev.sometimes, draggedCard]
        }));
      } else {
        // Revert card position if drop location is invalid
        return;
      }

      const updatedCards = newCards;
      setCards(updatedCards);
      if (updatedCards.length > 0) {
        setCurrentCardIndex(0);
      } else {
        setCurrentCardIndex(-1); // No more cards to show
      }
    }
  };

  const onRefresh = () => {
    setCards(initialCards);
    setBuckets(initialBuckets);
    setCurrentCardIndex(0);
    localStorage.removeItem("cards");
    localStorage.removeItem("buckets");
    localStorage.removeItem("currentCardIndex");
    localStorage.removeItem("history");
  };

  const sliderIndicator = (index) => {
    return index >= initialCards.length - cards.length ? "" : "dragged";
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousState = history.pop();
      setCards(previousState.cards);
      setBuckets(previousState.buckets);
      setCurrentCardIndex(previousState.currentCardIndex);
      setHistory([...history]); // Update the history state
    } else {
      onBack(); // Go back to the previous screen if there are no more states in history
    }
  };

  const saveStateToHistory = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      { cards, buckets, currentCardIndex }
    ]);
  };

  useEffect(() => {
    saveStateToHistory();
  }, [cards, buckets, currentCardIndex]);

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
                {currentCardIndex >= 0 && cards.length > 0 && (
                  <Draggable
                    draggableId={cards[currentCardIndex]?.id}
                    index={0}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`card-item d-flex align-items-center justify-content-center ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          src={cardImages[cards[currentCardIndex]?.imageIndex]}
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
              <h2>
                Drag-and-drop the statements on the left into any of these
                bowls.
              </h2>
              <img src={dragdropArrow} alt="" className="dragdropArrow" />
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
                      <h3 className="mb-0">{buckets.yes.length}</h3>
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
                      <h3 className="mb-0">{buckets.no.length}</h3>
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
                      <h3 className="mb-0">{buckets.sometimes.length}</h3>
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
          <div className="d-flex" onClick={onRefresh}>
            <Icon icon="system-uicons:refresh" />
            <span>Refresh</span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-around mt-3">
          <button className="btn progress-btn btn-light" onClick={handleBack}>
            {"<<<"} Back
          </button>
          <button
            className="btn progress-btn btn-dark"
            onClick={() => onNext({ cards, buckets })}
            disabled={cards.length > 0} // Disable the Next button if there are still cards left
          >
            Next {">>>"}
          </button>
        </div>
      </div>
    </DragDropContext>
  );
}

export default DragDropComponent;
