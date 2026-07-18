import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Icon } from "@iconify/react";
import CardBoard from "./CardBoard";
import ArrowTrail from "../../../../../../../../../assets/ArrowTrail.svg";
import "../page6.css";

const STEP_ID = 2;

const createEmptyBucketResults = () => ({
  green: [],
  red: [],
  orange: [],
});

const normalizeBucketResults = (answer) => ({
  green: Array.isArray(answer?.green) ? answer.green : [],
  red: Array.isArray(answer?.red) ? answer.red : [],
  orange: Array.isArray(answer?.orange) ? answer.orange : [],
});

const DragAndDropFrame = ({
  info,
  setErrorMessage,
  answers,
  setAnswers,
  setCurrentImageIndex1,
  setDragDropImageLength,
}) => {
  const { images, buckets, instruction } = info;
  const [bucketResults, setBucketResults] = useState(createEmptyBucketResults);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdvancingCard, setIsAdvancingCard] = useState(false);
  const advanceTimerRef = useRef(null);

  useEffect(() => {
    if (!answers?.length) {
      setBucketResults(createEmptyBucketResults());
      setCurrentImageIndex(0);
      setCurrentImageIndex1(0);
      return;
    }

    const existingAnswer = answers.find((answer) => answer.stepId === STEP_ID);
    if (existingAnswer?.value) {
      const nextBucketResults = normalizeBucketResults(existingAnswer.value);
      setBucketResults(nextBucketResults);

      const totalDropped =
        nextBucketResults.green.length +
        nextBucketResults.red.length +
        nextBucketResults.orange.length;
      const nextImageIndex = Math.min(totalDropped, images.length);
      setCurrentImageIndex(nextImageIndex);
      setCurrentImageIndex1(nextImageIndex);
    }
  }, [answers, images.length, setCurrentImageIndex1]);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  const totalDropped = Object.values(bucketResults).reduce(
    (sum, arr) => sum + arr.length,
    0
  );
  const allImagesDropped = totalDropped >= images.length;

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    setErrorMessage("");
    const { source, destination } = result;

    if (source.droppableId === "image" && destination.droppableId !== "image") {
      const draggedIndex = currentImageIndex;

      const newBucketResults = {
        ...normalizeBucketResults(bucketResults),
        [destination.droppableId]: [
          ...(bucketResults[destination.droppableId] || []),
          draggedIndex,
        ],
      };
      setBucketResults(newBucketResults);

      setAnswers((prevAnswers) => {
        const previousAnswers = Array.isArray(prevAnswers) ? prevAnswers : [];
        const existingAnswerIndex = previousAnswers.findIndex(
          (answer) => answer.stepId === STEP_ID
        );

        if (existingAnswerIndex !== -1) {
          const updatedAnswers = [...previousAnswers];
          updatedAnswers[existingAnswerIndex] = {
            ...updatedAnswers[existingAnswerIndex],
            value: newBucketResults,
          };
          return updatedAnswers;
        }

        return [
          ...previousAnswers,
          {
            stepId: STEP_ID,
            value: newBucketResults,
          },
        ];
      });

      setIsAdvancingCard(true);
      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
      }
      advanceTimerRef.current = setTimeout(() => {
        const nextImageIndex = Math.min(draggedIndex + 1, images.length);
        setCurrentImageIndex(nextImageIndex);
        setCurrentImageIndex1(nextImageIndex);
        setIsAdvancingCard(false);
      }, 120);
    }
  };

  const resetDragAndDrop = () => {
    setBucketResults(createEmptyBucketResults());
    setCurrentImageIndex(0);
    setCurrentImageIndex1(0);
    setIsAdvancingCard(false);
    setErrorMessage("");
    setAnswers((prevAnswers) =>
      Array.isArray(prevAnswers)
        ? prevAnswers.filter((answer) => answer.stepId !== STEP_ID)
        : [],
    );
  };

  useEffect(() => {
    setDragDropImageLength(images.length);
  }, [images.length, setDragDropImageLength]);

  const renderDragItem = () => {
    if (isAdvancingCard || currentImageIndex >= images.length || allImagesDropped) {
      return null;
    }

    const imagePath = require(`../../../../../../../../../assets/drag-images/tot-drag-images/week2/page6/image${
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
              transform: provided.draggableProps.style?.transform,
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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="d-flex custom-border-20 flex-column flex-md-row tot-week2-activity3-dnd-layout">
          <Droppable droppableId="image">
            {(provided, snapshot) => (
              <div
                className="d-flex justify-content-center align-items-center p-4 tot-week2-activity3-dnd-column tot-week2-activity3-card-stage"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  transition: "background-color 0.2s ease",
                  backgroundColor: snapshot.isDraggingOver
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
                }}
              >
                <div className="tot-week2-activity3-card-slot">
                  {renderDragItem()}
                </div>
                <div className="tot-week2-activity3-hidden-placeholder">
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

          <div className="bg-blue px-4 py-3 tot-week2-activity3-dnd-column">
            <div className="d-flex align-items-start mb-2">
              <img src={ArrowTrail} alt="arrow trail" className="arrow-head" />
              <div className="text-center text-white pt-1 flex-grow-1 tot-drag-instruction">
                <h1 className="fs-3">{instruction}</h1>
              </div>
              <img
                src={ArrowTrail}
                alt="arrow trail"
                className="arrow-head arrow-tail"
              />
            </div>

            <div className="d-flex justify-content-center align-items-center tot-week2-activity3-bucket-row">
              {buckets &&
                buckets.map((bucket) => (
                  <Droppable key={bucket.title} droppableId={bucket.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        className="pt-1 draggable-bucket tot-week2-activity3-dropzone"
                        {...provided.droppableProps}
                        style={{
                          backgroundColor: snapshot.isDraggingOver
                            ? "rgba(255, 255, 255, 0.1)"
                            : "transparent",
                        }}
                      >
                        <h2
                          className={
                            bucket.id === "green"
                              ? "inner-count"
                              : bucket.id === "orange"
                              ? "outer-count"
                              : "both-count"
                          }
                        >
                          {bucketResults[bucket.id]?.length || 0}
                        </h2>
                        <div
                          className={
                            bucket.id === "green"
                              ? "inner-bucket bucket-text"
                              : bucket.id === "orange"
                              ? "outer-bucket bucket-text"
                              : "both-bucket bucket-text"
                          }
                        >
                          <span className="tot-week2-activity3-bucket-label">
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
