import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Icon } from "@iconify/react";
import ArrowTrail from "../../../../../../../../assets/ArrowTrail.svg";
import "./page4.css";
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

function WeekThreePage4() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData.images.length;
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCurrentImage, setShowCurrentImage] = useState(true);
  const [bucketResults, setBucketResults] = useState({
    green: [],
    red: [],
  });
  const bucketResultsRef = useRef(bucketResults);

  const updateBucketResults = (nextResults) => {
    bucketResultsRef.current = nextResults;
    setBucketResults(nextResults);
  };

  // useEffect(() => {
  //   setShowCurrentImage(true);
  // }, [currentStep])

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );
    if (response?.answer) {
      const answerCopy = { ...response.answer };
      updateBucketResults(answerCopy);
      if (currentStep === 1) {
        dispatch(setCurrentStep(totalSteps));
        setShowCurrentImage(false);
      }
    }
    return () => {};
  }, [userAnswers, pageData]);

  // console.log("Page Data Images:", pageData.images);
  const imageMap = {};

  for (let i = 0; i < pageData.images.length; i++) {
    const image = pageData.images[i];
    imageMap[
      image
    ] = require(`../../../../../../../../assets/drag-images/transition-drag-images/week3/image${
      i + 1
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

      // Ensure each bucket is initialized as an array
      const newBucketResults = {
        ...bucketResults,
        green: bucketResults.green || [],
        red: bucketResults.red || [],
        [destination.droppableId]: [
          ...(bucketResults[destination.droppableId] || []),
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
      <Draggable draggableId="current-image" index={currentStep}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              cursor: snapshot.isDragging ? "grabbing" : "grab",
              transform: `${provided.draggableProps.style?.transform || ""} ${
                snapshot.isDragging ? "scale(0.3)" : ""
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
    if (adminDatas.isAdmin) return true;

    if (
      bucketResultsRef.current.green.length + bucketResultsRef.current.red.length !==
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
        answer: bucketResultsRef.current,
      })
    );
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
    const nextBucketResults = {
      green: [...(bucketResultsRef.current.green || [])],
      red: [...(bucketResultsRef.current.red || [])],
    };

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

  const resetDragAndDrop = () => {
    updateBucketResults({
      green: [],
      red: [],
    });
    setShowCurrentImage(true);
    setErrorMessage("");
    dispatch(setCurrentStep(1));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="d-flex flex-column align-items-center pt-2 transition-course-drag-page">
        <div className="d-flex custom-border-20 flex-column flex-md-row transition-course-drag-shell">
          <Droppable droppableId="image">
            {(provided, snapshot) => (
              <div
                className="d-flex p-5 justify-content-center align-items-center transition-course-drag-panel"
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
                {currentStep === totalSteps && (
                  <span
                    className="d-none d-md-block w-lg-50"
                    style={{ width: "150px" }}
                  ></span>
                )}
                {renderStep()}
              </div>
            )}
          </Droppable>
          <div className="bg-blue transition-course-drag-panel">
            <div className="d-flex align-items-start mb-2">
              <img src={ArrowTrail} alt="arrow trail" className="arrow-head" />
              <div className="text-center text-white pt-2">
                <h1>{pageData.instruction}</h1>
              </div>
              <img src={ArrowTrail} alt="arrow trail" className="arrow-head" />
            </div>
            <div className="d-flex justify-content-around align-items-center px-0 py-0 px-md-4 py-md-2">
              {pageData.buckets.map((bucket) => (
                <Droppable key={bucket.id} droppableId={bucket.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="p-0 p-md-2 transition-course-bucket-dropzone"
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
                        className={`${
                          bucket.id === "green" ? "inner-count" : "outer-count"
                        } text-center`}
                      >
                        {bucketResults[bucket.id]?.length}
                      </h2>
                      <div
                        className={`${
                          bucket.id === "green" ? "inner-bowl" : "outer-bowl"
                        } px-3 text-center`}
                      >
                        {bucket.label}
                      </div>
                      <div className="transition-course-dnd-placeholder">
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p
        className="fs-5 d-flex justify-content-center gap-3 align-items-center mt-3 fs-2"
        onClick={resetDragAndDrop}
        style={{ cursor: "pointer" }}
      >
        <Icon className="ml-3" icon="teenyicons:refresh-solid" />
        Refresh
      </p>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" customOnClick={handlePrevious} />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </DragDropContext>
  );
}

export default WeekThreePage4;
