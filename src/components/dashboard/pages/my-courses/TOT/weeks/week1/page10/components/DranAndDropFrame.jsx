import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Icon } from "@iconify/react";
import CardBoard from "./CardBoard";
import ArrowTrail from "../../../../../../../../../assets/ArrowTrail.svg";
import "../page10.css";

const STEP_ID = 2;

const createEmptyBucketResults = () => ({
  green: [],
  red: [],
});

const normalizeBucketResults = (answer) => ({
  green: Array.isArray(answer?.green) ? answer.green : [],
  red: Array.isArray(answer?.red) ? answer.red : [],
});

const DragAndDropFrame = ({
  info,
  setErrorMessage,
  answers,
  setAnswers,
  setCurrentImageIndex1,
  setDragDropImageLength,
}) => {
  const { imagePairs, buckets, instruction } = info;
  const [bucketResults, setBucketResults] = useState(createEmptyBucketResults);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [droppedInCurrentPair, setDroppedInCurrentPair] = useState([]);

  // Calculate total images across all pairs
  const totalImages =
    imagePairs?.reduce((sum, pair) => sum + pair.images.length, 0) || 0;

  useEffect(() => {
    if (!answers?.length) {
      setBucketResults(createEmptyBucketResults());
      setCurrentPairIndex(0);
      setDroppedInCurrentPair([]);
      setCurrentImageIndex1(0);
      return;
    }

    const existingAnswer = answers.find((answer) => answer.stepId === STEP_ID);
    if (existingAnswer?.value) {
      const nextBucketResults = normalizeBucketResults(existingAnswer.value);
      setBucketResults(nextBucketResults);

      const totalDropped =
        nextBucketResults.green.length + nextBucketResults.red.length;

      let pairIndex = 0;
      let itemsCount = 0;

      for (let i = 0; i < imagePairs.length; i++) {
        if (itemsCount + imagePairs[i].images.length <= totalDropped) {
          itemsCount += imagePairs[i].images.length;
          pairIndex = i + 1;
        } else {
          break;
        }
      }

      setCurrentPairIndex(Math.min(pairIndex, imagePairs.length - 1));
      setCurrentImageIndex1(totalDropped);

      const droppedIds = [
        ...nextBucketResults.green,
        ...nextBucketResults.red,
      ];
      const currentPairImageIds =
        imagePairs[pairIndex]?.images.map((img) => img.id) || [];
      const droppedInPair = currentPairImageIds.filter((id) =>
        droppedIds.includes(id)
      );
      setDroppedInCurrentPair(droppedInPair);
    }
  }, [answers, imagePairs, setCurrentImageIndex1]);

  useEffect(() => {
    setDragDropImageLength(totalImages);
  }, [totalImages, setDragDropImageLength]);

  const totalDropped = Object.values(bucketResults).reduce(
    (sum, arr) => sum + arr.length,
    0
  );
  const allImagesDropped = totalDropped >= totalImages;
  const currentPair = imagePairs?.[currentPairIndex];
  const allCurrentPairDropped =
    currentPair && droppedInCurrentPair.length >= currentPair.images.length;

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.droppableId === "image") return;

    setErrorMessage("");
    const { source, destination } = result;

    if (source.droppableId === "image") {
      // Extract the image ID from draggableId (format: "image-{imageId}")
      const draggedImageId = parseInt(result.draggableId.split("-")[1]);

      // Check if this image was already dropped
      if (droppedInCurrentPair.includes(draggedImageId)) return;

      const newBucketResults = {
        ...normalizeBucketResults(bucketResults),
        [destination.droppableId]: [
          ...(bucketResults[destination.droppableId] || []),
          draggedImageId,
        ],
      };
      setBucketResults(newBucketResults);

      // Update dropped in current pair
      const newDroppedInPair = [...droppedInCurrentPair, draggedImageId];
      setDroppedInCurrentPair(newDroppedInPair);

      setAnswers((prevAnswers) => {
        const previousAnswers = Array.isArray(prevAnswers) ? prevAnswers : [];
        const existingAnswerIndex = previousAnswers.findIndex(
          (answer) => answer.stepId === STEP_ID,
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

      // Update total dropped count for the indicator
      const newTotalDropped = totalDropped + 1;
      setCurrentImageIndex1(newTotalDropped);

      // Move to next pair if current pair is complete
      if (
        newDroppedInPair.length >= currentPair.images.length &&
        currentPairIndex < imagePairs.length - 1
      ) {
        setCurrentPairIndex(currentPairIndex + 1);
        setDroppedInCurrentPair([]);
      }
    }
  };

  const resetDragAndDrop = () => {
    setBucketResults(createEmptyBucketResults());
    setCurrentPairIndex(0);
    setDroppedInCurrentPair([]);
    setCurrentImageIndex1(0);
    setErrorMessage("");
    setAnswers((prevAnswers) =>
      Array.isArray(prevAnswers)
        ? prevAnswers.filter((answer) => answer.stepId !== STEP_ID)
        : [],
    );
  };

  const renderDragItems = () => {
    if (!currentPair || allImagesDropped || allCurrentPairDropped) return null;

    return currentPair.images.map((image, index) => {
      // Skip if this image was already dropped
      if (droppedInCurrentPair.includes(image.id)) return null;

      const imagePath = require(`../../../../../../../../../assets/drag-images/tot-drag-images/week1/page10/image${
        image.id + 1
      }.png`);

      return (
        <Draggable
          key={`image-${image.id}`}
          draggableId={`image-${image.id}`}
          index={index}
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
              <CardBoard imgSrc={imagePath} text={image.text} />
            </div>
          )}
        </Draggable>
      );
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="d-flex custom-border-20 flex-column flex-md-row tot-week1-activity5-dnd-layout">
          <div className="d-flex flex-column justify-content-center align-items-center p-4 tot-week1-activity5-dnd-column">
            {currentPair && !allImagesDropped && (
              <div className="text-center mb-2 w-100">
                <h2 className="text-blue fw-bold tot-week-2-question-text">
                  {currentPair.decisionText}
                </h2>
              </div>
            )}

            <Droppable droppableId="image">
              {(provided, snapshot) => (
                <div
                  className="w-100 d-flex justify-content-center align-items-center gap-3 flex-wrap"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    minHeight: "320px",
                    transition: "background-color 0.2s ease",
                    backgroundColor: snapshot.isDraggingOver
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  }}
                >
                  {renderDragItems()}
                  <div className="tot-week1-activity5-hidden-placeholder">
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>

          <div className="bg-blue px-4 py-4 tot-week1-activity5-dnd-column">
            <div className="d-flex align-items-start mb-3 tot-week1-activity5-instruction-row">
              <img src={ArrowTrail} alt="arrow trail" className="arrow-head" />
              <div className="text-center text-white flex-grow-1 tot-activity5-drag-instruction">
                <h1 className="fw-bold">
                  {instruction}
                </h1>
              </div>
              <img
                src={ArrowTrail}
                alt="arrow trail"
                className="arrow-head arrow-tail"
              />
            </div>

            <div className="d-flex justify-content-around align-items-center flex-wrap">
              {buckets &&
                buckets.map((bucket) => (
                  <Droppable key={bucket.title} droppableId={bucket.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        className="pt-1 draggable-bucket tot-week1-activity5-dropzone"
                        {...provided.droppableProps}
                        style={{
                          backgroundColor: snapshot.isDraggingOver
                            ? "rgba(255, 255, 255, 0.1)"
                            : "transparent",
                        }}
                      >
                        <h2
                          className={
                            bucket.id === "green" ? "inner-count" : "both-count"
                          }
                        >
                          {bucketResults[bucket.id]?.length || 0}
                        </h2>
                        <div
                          className={
                            bucket.id === "green"
                              ? "inner-box-sel bucket-text"
                              : "outer-box-not-sel bucket-text"
                          }
                        >
                          {/* <p className="text-center">{bucket.title}</p> */}
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
        className="fs-5 d-flex justify-content-center gap-3 align-items-center mt-2 fs-2"
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
