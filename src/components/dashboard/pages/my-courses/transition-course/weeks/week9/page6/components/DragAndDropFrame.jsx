import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Icon } from "@iconify/react";
import CardBoard from "./CardBoard";
import ArrowTrail from "../../../../../../../../../assets/ArrowTrail.svg";
import "../page6.css";

const EMPTY_BUCKET_RESULTS = {
  green: [],
  red: [],
};

const normalizeBucketResults = (answer) => ({
  green: Array.isArray(answer?.green) ? answer.green : [],
  red: Array.isArray(answer?.red) ? answer.red : [],
});

const InternalStepIndicator = ({ totalSteps, currentStep }) => {
  return (
    <div className="d-flex justify-content-center mt-4" style={{ gap: "10px" }}>
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`${index + 1 <= currentStep ? "bg-green" : "bg-gray"}`}
          style={{
            flexBasis: "35px",
            height: "17px",
            borderRadius: "8px",
            cursor: index <= currentStep ? "pointer" : "default",
          }}
        />
      ))}
    </div>
  );
};

const DragAndDropFrame = ({ info, setErrorMessage, answers, setAnswers }) => {
  const { images, buckets, instruction } = info;
  const [bucketResults, setBucketResults] = useState(EMPTY_BUCKET_RESULTS);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdvancingCard, setIsAdvancingCard] = useState(false);
  const advanceTimerRef = useRef(null);

  useEffect(() => {
    if (!answers?.length) return;

    const existingAnswer = answers.find((answer) => answer.stepId === 6);
    if (existingAnswer?.value) {
      const nextBucketResults = normalizeBucketResults(existingAnswer.value);
      setBucketResults(nextBucketResults);

      // Update currentImageIndex based on total dropped items
      const totalDropped =
        nextBucketResults.green.length + nextBucketResults.red.length;
      setCurrentImageIndex(totalDropped);
    }
  }, [answers]);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  const totalDropped =
    (bucketResults.green || []).length + (bucketResults.red || []).length;
  const allImagesDropped = totalDropped >= images.length;

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    setErrorMessage("");
    const { source, destination } = result;

    if (source.droppableId === "image" && destination.droppableId !== "image") {
      const draggedIndex = currentImageIndex;

      // Update bucket results
      const newBucketResults = {
        ...normalizeBucketResults(bucketResults),
        [destination.droppableId]: [
          ...(bucketResults[destination.droppableId] || []),
          draggedIndex,
        ],
      };
      setBucketResults(newBucketResults);

      // Update answers state
      setAnswers((prevAnswers) => {
        const existingAnswerIndex = prevAnswers.findIndex(
          (answer) => answer.stepId === 6
        );

        if (existingAnswerIndex !== -1) {
          // Update existing answer
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingAnswerIndex] = {
            ...updatedAnswers[existingAnswerIndex],
            value: newBucketResults,
          };
          return updatedAnswers;
        } else {
          // Create new answer
          return [
            ...prevAnswers,
            {
              stepId: 6,
              value: newBucketResults,
            },
          ];
        }
      });

      setIsAdvancingCard(true);
      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
      }
      advanceTimerRef.current = setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex + 1 < images.length ? prevIndex + 1 : prevIndex
        );
        setIsAdvancingCard(false);
      }, 120);
    }
  };

  const resetDragAndDrop = () => {
    const nextBucketResults = EMPTY_BUCKET_RESULTS;
    setBucketResults(nextBucketResults);
    setCurrentImageIndex(0);
    setIsAdvancingCard(false);
    setErrorMessage("");
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.stepId !== 6)
    );
  };

  const renderDragItem = () => {
    if (isAdvancingCard || currentImageIndex >= images.length || allImagesDropped) {
      return null;
    }

    const imagePath = require(`../../../../../../../../../assets/drag-images/transition-drag-images/week9/image${
      currentImageIndex + 1
    }.png`);

    return (
      <Draggable
        draggableId={`image-${currentImageIndex}`}
        index={0}
        isDragDisabled={allImagesDropped}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              cursor: allImagesDropped
                ? "not-allowed"
                : snapshot.isDragging
                ? "grabbing"
                : "grab",
              opacity: allImagesDropped ? 0.5 : 1,
              transform: `${provided.draggableProps.style?.transform || ""} ${
                snapshot.isDragging ? "scale(0.3)" : ""
              }`,
              zIndex: snapshot.isDragging ? 9999 : 1,
            }}
          >
            <CardBoard imgSrc={imagePath} />
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <>
      {" "}
      <InternalStepIndicator
        totalSteps={images.length}
        currentStep={currentImageIndex + 1}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="d-flex flex-column align-items-center pt-2">
          {/* Step Indicator */}

          <div className="d-flex custom-border-20 flex-column flex-md-row week9-activity3-dnd-layout">
            <Droppable droppableId="image">
              {(provided, snapshot) => (
                <div
                  className="d-flex p-5 justify-content-center align-items-center week9-activity3-dnd-column week9-activity3-card-stage"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    minHeight: "200px",
                    transition: "background-color 0.2s ease",
                    backgroundColor: snapshot.isDraggingOver
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  }}
                >
                  <div className="week9-activity3-card-slot">
                    {renderDragItem()}
                  </div>
                  <div className="week9-activity3-hidden-placeholder">
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
            <div className="bg-blue week9-activity3-dnd-column">
              <div className="d-flex align-items-start mb-2">
                <img
                  src={ArrowTrail}
                  alt="arrow trail"
                  className="arrow-head"
                />
                <div className="text-center text-white pt-2">
                  <h1>{instruction}</h1>
                </div>
                <img
                  src={ArrowTrail}
                  alt="arrow trail"
                  className="arrow-head"
                />
              </div>
              <div className="d-flex justify-content-around align-items-center  px-0 py-0 px-md-4 py-md-2">
                {buckets &&
                  buckets.map((bucket) => (
                    <Droppable key={bucket.title} droppableId={bucket.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          className="p-0 p-md-2 week9-activity3-dropzone"
                          {...provided.droppableProps}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "rgba(255, 255, 255, 0.1)"
                              : "transparent",
                            padding: "20px",
                            borderRadius: "8px",
                            minHeight: "100px",
                            height: "300px",
                          }}
                        >
                          <h2
                            className={
                              bucket.id === "green"
                                ? "inner-count"
                                : "both-count"
                            }
                          >
                            {bucketResults[bucket.id]?.length || 0}
                          </h2>
                          <div
                            className={`week9-activity3-bucket-label ${
                              bucket.id === "green"
                                ? "inner-bucket"
                                : "both-bucket"
                            }`}
                          >
                            <span className="week9-activity3-bucket-text">
                              {bucket.title}
                            </span>
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
              </div>
            </div>
          </div>
          {allImagesDropped && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              All images have been placed!
            </p>
          )}
        </div>
      </DragDropContext>
      <p
        className="fs-5 d-flex justify-content-center gap-3 align-items-center mt-3 fs-2"
        onClick={resetDragAndDrop}
        style={{ cursor: "pointer" }}
      >
        <Icon className="ml-3" icon="teenyicons:refresh-solid" />
        Refresh
      </p>
    </>
  );
};

export default DragAndDropFrame;
