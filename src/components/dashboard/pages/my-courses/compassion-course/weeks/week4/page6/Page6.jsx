import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Icon } from "@iconify/react";
import "./page6.css";
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
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";

function WeekFourPage6() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData.images.length;
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCurrentImage, setShowCurrentImage] = useState(true);
  const [activeBucketId, setActiveBucketId] = useState(null);
  const activeBucketRef = useRef(null);
  const bucketRefs = useRef({});
  const dragItemRef = useRef(null);
  const isDraggingRef = useRef(false);
  const hasLocalDragChangesRef = useRef(false);
  const pointerPositionRef = useRef({ x: null, y: null });
  const [bucketResults, setBucketResults] = useState({
    green: [],
    red: [],
    orange: [],
  });

  // useEffect(() => {
  //   setShowCurrentImage(true);
  // }, [currentStep])

  useEffect(() => {
    if (!userAnswers) return;
    if (hasLocalDragChangesRef.current) return;

    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    if (draftAnswer?.bucketResults) {
      const nextBucketResults = draftAnswer.bucketResults;
      const totalDropped = Object.values(nextBucketResults).reduce(
        (sum, bucketItems) =>
          sum + (Array.isArray(bucketItems) ? bucketItems.length : 0),
        0
      );
      setBucketResults(nextBucketResults);
      dispatch(setCurrentStep(Math.min(totalDropped + 1, totalSteps)));
      setShowCurrentImage(totalDropped < totalSteps);
      return;
    }

    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );
    const responseDroppedCount = response?.answer
      ? Object.values(response.answer).reduce(
          (sum, bucketItems) =>
            sum + (Array.isArray(bucketItems) ? bucketItems.length : 0),
          0
        )
      : 0;

    if (response?.answer && responseDroppedCount > 0) {
      const answerCopy = { ...response.answer };
      setBucketResults(answerCopy);

      if (responseDroppedCount >= totalSteps) {
        dispatch(setCurrentStep(totalSteps));
        setShowCurrentImage(false);
      } else {
        dispatch(setCurrentStep(Math.min(responseDroppedCount + 1, totalSteps)));
        setShowCurrentImage(responseDroppedCount < totalSteps);
      }
    }
    return () => {};
  }, [dispatch, pageData.id, totalSteps, userAnswers]);

  const updateBucketResults = (nextBucketResults) => {
    hasLocalDragChangesRef.current = true;
    setBucketResults(nextBucketResults);
    saveActivityDraft(userAnswers, pageData.id, {
      bucketResults: nextBucketResults,
    });
  };

  const getBucketIdAtPoint = useCallback(
    (x, y) => {
      if (x === null || y === null) return null;

      return (
        pageData.buckets.find((bucket) => {
          const bucketElement = bucketRefs.current[bucket.id];
          if (!bucketElement) return false;

          const rect = bucketElement.getBoundingClientRect();
          return (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
          );
        })?.id || null
      );
    },
    [pageData.buckets]
  );

  const getBucketIdForDraggedItem = useCallback(() => {
    const dragElement = dragItemRef.current;
    if (!dragElement) return null;

    const dragRect = dragElement.getBoundingClientRect();
    let bestBucketId = null;
    let bestOverlap = 0;

    pageData.buckets.forEach((bucket) => {
      const bucketElement = bucketRefs.current[bucket.id];
      if (!bucketElement) return;

      const bucketRect = bucketElement.getBoundingClientRect();
      const overlapX = Math.max(
        0,
        Math.min(dragRect.right, bucketRect.right) -
          Math.max(dragRect.left, bucketRect.left)
      );
      const overlapY = Math.max(
        0,
        Math.min(dragRect.bottom, bucketRect.bottom) -
          Math.max(dragRect.top, bucketRect.top)
      );
      const overlapArea = overlapX * overlapY;

      if (overlapArea > bestOverlap) {
        bestOverlap = overlapArea;
        bestBucketId = bucket.id;
      }
    });

    return bestOverlap > 0 ? bestBucketId : null;
  }, [pageData.buckets]);

  const updateActiveBucket = useCallback((bucketId) => {
    activeBucketRef.current = bucketId;
    setActiveBucketId((currentBucketId) =>
      currentBucketId === bucketId ? currentBucketId : bucketId
    );
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!isDraggingRef.current) return;

      const point = event.touches?.[0] || event;
      const x = point.clientX;
      const y = point.clientY;
      pointerPositionRef.current = { x, y };

      window.requestAnimationFrame(() => {
        if (!isDraggingRef.current) return;

        const hoveredBucketId =
          getBucketIdForDraggedItem() || getBucketIdAtPoint(x, y);
        updateActiveBucket(hoveredBucketId);
      });
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, [getBucketIdAtPoint, getBucketIdForDraggedItem, updateActiveBucket]);

  const resetDragAndDrop = () => {
    const emptyBucketResults = {
      green: [],
      red: [],
      orange: [],
    };

    setBucketResults(emptyBucketResults);
    setShowCurrentImage(true);
    setErrorMessage("");
    hasLocalDragChangesRef.current = true;
    saveActivityDraft(userAnswers, pageData.id, {
      bucketResults: emptyBucketResults,
    });
    dispatch(setCurrentStep(1));
  };

  // console.log("Page Data Images:", pageData.images);
  const imageMap = {};

  for (let i = 0; i < pageData.images.length; i++) {
    const image = pageData.images[i];
    imageMap[
      image
    ] = require(`../../../../../../../../assets/drag-images/image${i + 1}.png`);
  }

  const handleOnDragStart = () => {
    isDraggingRef.current = true;
    updateActiveBucket(null);
  };

  const handleOnDragEnd = (result) => {
    isDraggingRef.current = false;

    const destinationBucketId =
      activeBucketRef.current ||
      getBucketIdAtPoint(
        pointerPositionRef.current.x,
        pointerPositionRef.current.y
      ) ||
      getBucketIdForDraggedItem() ||
      result.destination?.droppableId;

    updateActiveBucket(null);

    if (!destinationBucketId || destinationBucketId === "image") return;

    setErrorMessage("");

    const { source } = result;

    // If dragging from image area to a bucket
    if (source.droppableId === "image") {
      const currentImage = pageData.images[currentStep - 1];
      const draggedIndex = pageData?.images.indexOf(currentImage);
      const newBucketResults = {
        ...bucketResults,
        [destinationBucketId]: [
          ...bucketResults[destinationBucketId],
          draggedIndex,
        ],
      };

      updateBucketResults(newBucketResults);
      setShowCurrentImage(false);

      if (currentStep < totalSteps) {
        dispatch(navigateNext());
        setShowCurrentImage(true);
      }
    }
  };

  const renderStep = () => {
    const currentImage = pageData.images[currentStep - 1];
    return showCurrentImage && currentImage ? (
      <Draggable draggableId={`image-${currentStep - 1}`} index={0}>
        {(provided, snapshot) => {
          const draggableCard = (
            <div
            ref={(element) => {
              provided.innerRef(element);
              dragItemRef.current = element;
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="compassion-week4-activity3-image-card"
            style={{
              ...provided.draggableProps.style,
              cursor: snapshot.isDragging ? "grabbing" : "grab",
              opacity: snapshot.isDropAnimating ? 0 : 1,
              transform: provided.draggableProps.style?.transform,
              transitionDuration: snapshot.isDropAnimating
                ? "0.001s"
                : undefined,
              zIndex: snapshot.isDragging ? 9999 : 1,
            }}
          >
            <CardBoard imgSrc={imageMap[currentImage]} />
          </div>
          );

          return draggableCard;
        }}
      </Draggable>
    ) : null;
  };

  const saveUserInput = () => {
    // if (!adminDatas.isAdmin && !myAnswer) {
    //   setErrorMessage("Oops! Please enter a valid input!");
    //   return false;
    // }
    if (
      bucketResults.green.length +
        bucketResults.red.length +
        bucketResults.orange.length !==
      pageData.images.length
    ) {
      setErrorMessage("Please make sure to fill all the buckets.");
      return false;
    }

    setErrorMessage("");
    // Allow flow admin to proceed without input but do not dispatch answer
    if (adminDatas.isAdmin) return true;
    dispatch(
      saveActivity({
        page: pageData.id,
        answer: bucketResults,
      })
    );
    hasLocalDragChangesRef.current = false;
    clearActivityDraft(userAnswers, pageData.id);
    return true;
  };

  const handlePrevious = () => {
    // console.log(currentStep)
    // console.log(bucketResults,"bucket results")
    // Page coming from
    const afterCurrentImage = pageData.images[currentStep - 1];
    const currentImage = pageData.images[currentStep - 2];

    // Remove afterCurrentImage and currentImage from bucketResults if they exist
    const afterCurrentIndex = pageData.images.indexOf(afterCurrentImage);
    const currentIndex = pageData.images.indexOf(currentImage);

    // Check if afterCurrentImage exists in any bucket and remove it
    const nextBucketResults = { ...bucketResults };

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

    // Update the state with the modified bucket results
    updateBucketResults(nextBucketResults);

    setShowCurrentImage(true);
    return true;
  };

  return (
    <DragDropContext onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd}>
      <div className="d-flex flex-column align-items-center">
        <div className="custom-border-20 compassion-week4-activity3-image-board">
          <Droppable droppableId="image">
            {(provided, snapshot) => (
              <div
                className="compassion-week4-activity3-image-source"
                {...provided.droppableProps}
                ref={provided.innerRef}
                data-dragging-over={snapshot.isDraggingOver}
              >
                {currentStep === totalSteps && (
                  <span
                    className="d-none d-md-block w-lg-50"
                    style={{ width: "150px" }}
                  ></span>
                )}
                {renderStep()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="bg-blue compassion-week4-activity3-image-targets">
            <div className="d-flex align-items-start mb-2 justify-content-center">
              <img src={ArrowTrail} alt="arrow trail" className="arrow-head" />
              <div className="text-center text-white pt-2">
                <h1 className="fs-1">{pageData.instruction}</h1>
              </div>
              <img src={ArrowTrail} alt="arrow trail" className="arrow-head" />
            </div>
            <div className="compassion-week4-activity3-image-buckets">
              {pageData.buckets.map((bucket) => (
                <Droppable key={bucket.id} droppableId={bucket.id}>
                  {(provided) => (
                    <div
                      className={`compassion-week4-activity3-image-dropzone ${
                        activeBucketId === bucket.id
                          ? "compassion-week4-activity3-image-dropzone-active"
                          : ""
                      }`}
                      ref={(element) => {
                        provided.innerRef(element);
                        if (element) {
                          bucketRefs.current[bucket.id] = element;
                        } else {
                          delete bucketRefs.current[bucket.id];
                        }
                      }}
                      {...provided.droppableProps}
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
                        {bucketResults[bucket.id]?.length}
                      </h2>
                      <div
                        className={
                          bucket.id === "green"
                            ? "inner-bucket"
                            : bucket.id === "orange"
                            ? "outer-bucket"
                            : "both-bucket"
                        }
                      >
                        {bucket.label}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        </div>
      </div>
      {currentStep !== 1 && (
        <p
          className="fs-5 d-flex justify-content-center gap-3 align-items-center mt-3 fs-2"
          onClick={resetDragAndDrop}
          style={{ cursor: "pointer" }}
        >
          <Icon className="ml-3" icon="teenyicons:refresh-solid" />
          Refresh
        </p>
      )}
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" customOnClick={handlePrevious} />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </DragDropContext>
  );
}

export default WeekFourPage6;
