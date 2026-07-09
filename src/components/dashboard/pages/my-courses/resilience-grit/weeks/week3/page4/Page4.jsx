import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Icon } from "@iconify/react";
import ArrowTrail from "../../../../../../../../assets/ArrowTrail.svg";
import Button from "../../../components/Button";
import {
  selectPageData,
  selectCurrentStep,
  setCurrentStep,
  navigateNext,
} from "../../../../../../../../redux/reducers/navigationSlice";
import CardBoard from "./components/CardBoard";
import StepIndicator from "../../../components/StepIndicator";
import { useDispatch } from "react-redux";
import {
  userAnswer,
  saveActivity,
  removeActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import adaptabilitymale from "../../../../../../../../assets/resilience-grit-images/adaptabilitymale.png"
import adaptabilityfemale from "../../../../../../../../assets/resilience-grit-images/adaptabilityfemale.png";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";
import "./page4.css";

const createEmptyBucketResults = () => ({
  green: [],
  red: [],
});

const normalizeBucketResults = (results) => ({
  green: Array.isArray(results?.green) ? results.green : [],
  red: Array.isArray(results?.red) ? results.red : [],
});

function Page4() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData.images.length;
  const userAnswers = useSelector(userAnswer);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCurrentImage, setShowCurrentImage] = useState(true);
  const [bucketResults, setBucketResults] = useState(createEmptyBucketResults);
  const [isAdvancingCard, setIsAdvancingCard] = useState(false);
  const advanceTimerRef = useRef(null);

  const updateBucketResults = (nextResults) => {
    const normalizedResults = normalizeBucketResults(nextResults);

    setBucketResults(normalizedResults);
    saveActivityDraft(userAnswers, pageData.id, normalizedResults);
  };

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );
    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    const savedAnswer = response?.answer || draftAnswer;
    if (savedAnswer) {
      const answerCopy = normalizeBucketResults(savedAnswer);
      setBucketResults(answerCopy);
      if (currentStep === 1) {
        const placedCount = answerCopy.green.length + answerCopy.red.length;
        dispatch(setCurrentStep(Math.max(1, Math.min(placedCount + 1, totalSteps))));
        setShowCurrentImage(placedCount < totalSteps);
      }
    }
    return () => {};
  }, [currentStep, dispatch, pageData, pageData.id, totalSteps, userAnswers]);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);
  const imageMap = {};

  for (let i = 0; i < pageData.images.length; i++) {
    const image = pageData.images[i];
    imageMap[
      image
    ] = require(`../../../../../../../../assets/drag-images/resilience-drag-images/week3/image${i + 1
      }.png`);
  }
  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setErrorMessage("");

    const { source, destination } = result;

    // If dragging from image area to a bucket
    if (source.droppableId === "image" && destination.droppableId !== "image") {
      const currentImage = pageData.images[currentStep - 1];
      const draggedIndex = pageData?.images.indexOf(currentImage);
      if (draggedIndex < 0) return;

      const newBucketResults = {
        ...normalizeBucketResults(bucketResults),
        [destination.droppableId]: [
          ...(bucketResults[destination.droppableId] || []),
          draggedIndex,
        ],
      };

      updateBucketResults(newBucketResults);
      setIsAdvancingCard(true);
      setShowCurrentImage(false);

      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
      }
      advanceTimerRef.current = setTimeout(() => {
        if (currentStep < totalSteps) {
          dispatch(navigateNext());
          setShowCurrentImage(true);
        }
        setIsAdvancingCard(false);
      }, 120);
    }
  };

  const renderStep = () => {
    const currentImage = pageData.images[currentStep - 1];
    return showCurrentImage && !isAdvancingCard && currentImage ? (
      <Draggable draggableId="current-image" index={currentStep}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              cursor: snapshot.isDragging ? "grabbing" : "grab",
              transform: `${provided.draggableProps.style?.transform || ""} ${snapshot.isDragging ? "scale(0.3)" : ""
                }`,
              zIndex: snapshot.isDragging ? 9999 : 1,
            }}
          >
            <CardBoard imgSrc={imageMap[currentImage]} />
          </div>
        )}
      </Draggable>
    ) : null;
  };

  const saveUserInput = () => {
    // if (!adminDatas.isAdmin && !myAnswer) {
    //   setErrorMessage("Oops! Please enter a valid input!");
    //   return false;
    // }
    if (
      bucketResults.green.length + bucketResults.red.length !==
      pageData.images.length
    ) {
      setErrorMessage("Please make sure to fill all the buckets.");
      return false;
    }

    setErrorMessage("");
    // Allow flow admin to proceed without input but do not dispatch answer
    // if (adminDatas.isAdmin) return true
    dispatch(
      saveActivity({
        page: pageData.id,
        answer: bucketResults,
      })
    );
    clearActivityDraft(userAnswers, pageData.id);
    return true;
  };

  const handlePrevious = () => {
    const afterCurrentImage = pageData.images[currentStep - 1];
    const currentImage = pageData.images[currentStep - 2];

    const afterCurrentIndex = pageData.images.indexOf(afterCurrentImage);
    const currentIndex = pageData.images.indexOf(currentImage);
    const nextBucketResults = normalizeBucketResults(bucketResults);

    Object.keys(nextBucketResults).forEach((bucket) => {
      if (nextBucketResults[bucket].includes(afterCurrentIndex)) {
        nextBucketResults[bucket] = nextBucketResults[bucket].filter(
          (index) => index !== afterCurrentIndex
        );
      }
      if (nextBucketResults[bucket].includes(currentIndex)) {
        nextBucketResults[bucket] = nextBucketResults[bucket].filter(
          (index) => index !== currentIndex
        );
      }
    });

    updateBucketResults(nextBucketResults);
    setShowCurrentImage(true);
    return true;
  };

  const resetDragAndDrop = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
    }
    setErrorMessage("");
    setIsAdvancingCard(false);
    setBucketResults(createEmptyBucketResults());
    setShowCurrentImage(true);
    clearActivityDraft(userAnswers, pageData.id);
    dispatch(removeActivity(pageData.id));
    dispatch(setCurrentStep(1));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="d-flex custom-border-20 flex-column flex-md-row week3-activity2-dnd-layout">
        <Droppable droppableId="image">
          {(provided, snapshot) => (
            <div
              className="d-flex justify-content-center align-items-center week3-activity2-dnd-column week3-activity2-card-stage"
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
              <div className="week3-activity2-card-slot">
                {renderStep()}
              </div>
              <div className="week3-activity2-hidden-placeholder">
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        <div className="bg-blue px-4 py-2 week3-activity2-dnd-column">
          <div className="d-flex align-items-start mb-2">
            <img src={ArrowTrail} alt="arrow trail" className="arrow-head" />
            <div className="text-center text-white pt-2 flex-grow-1 resilience-drag-instruction h1">
            <h1>{pageData.instruction}</h1>
            </div>
            <img src={ArrowTrail} alt="arrow trail" className="arrow-head" />
          </div>

          <div className="d-flex justify-content-around align-items-center flex-wrap">
            {pageData.buckets.map((bucket) => (
                <Droppable key={bucket.title} droppableId={bucket.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      className="p-2 m-2 draggable-bucket week3-activity2-dropzone"
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
                        {bucketResults[bucket.id]?.length}
                      </h2>
                      <div
                        className={
                          bucket.id === "green" ? "inner-bucket" : "both-bucket"
                        }
                      >
                        <img src={bucket.id === "green" ? adaptabilitymale : adaptabilityfemale} alt="arrow trail" className="arrow-head mt-3" />
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
          </div>
        </div>
      </div>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <StepIndicator totalSteps={totalSteps} />
      <p
        className="fs-5 d-flex justify-content-center gap-3 align-items-center mt-3 fs-2"
        onClick={resetDragAndDrop}
        style={{ cursor: "pointer" }}
      >
        <Icon className="ml-3" icon="teenyicons:refresh-solid" />
        Refresh
      </p>
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" customOnClick={handlePrevious} />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </DragDropContext>
  );
}

export default Page4;
