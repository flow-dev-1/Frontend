import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CardBoard from "./CardBoard";
import ArrowTrail from "../../../../../../../../../assets/ArrowTrail.svg";
import '../page6.css';


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
  const [bucketResults, setBucketResults] = useState({ green: [], red: [] });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const totalDropped = Object.values(bucketResults).reduce((sum, arr) => sum + arr.length, 0);
  const allImagesDropped = totalDropped >= images.length;

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    
    setErrorMessage("");

    const { source, destination } = result;
    
    if (source.droppableId === "image" && destination.droppableId !== "image") {
      const draggedIndex = currentImageIndex;
      
      setBucketResults((prev) => ({
        ...prev,
        [destination.droppableId]: [...(prev[destination.droppableId] || []), draggedIndex],
      }));
      
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.stepId === 1 ? { ...answer, value: bucketResults } : answer
        )
      );

      setCurrentImageIndex((prevIndex) => (prevIndex + 1 < images.length ? prevIndex + 1 : prevIndex));
    }
  };

  const goToStep = (index) => {
    if (index < currentImageIndex) {
      setCurrentImageIndex(index);
    }
  };

  const renderDragItem = () => {
    if (currentImageIndex >= images.length || allImagesDropped) return null;
    
    const imagePath = require(`../../../../../../../../../assets/drag-images/transition-drag-images/week9/image${currentImageIndex + 1}.png`);
    
    return (
      <Draggable draggableId={`image-${currentImageIndex}`} index={0} isDragDisabled={allImagesDropped}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              cursor: allImagesDropped ? "not-allowed" : snapshot.isDragging ? "grabbing" : "grab",
              opacity: allImagesDropped ? 0.5 : 1,
              transform: `${provided.draggableProps.style?.transform || ""} ${snapshot.isDragging ? "scale(0.3)" : ""}`,
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
    <> <InternalStepIndicator totalSteps={images.length} currentStep={currentImageIndex + 1} />
    <DragDropContext
      onDragEnd={handleOnDragEnd}>
      <div className="d-flex flex-column align-items-center pt-2">
        {/* Step Indicator */}
      

        <div className="d-flex custom-border-20">
          <Droppable droppableId="image">
            {(provided, snapshot) => (
              <div
                className="d-flex p-5 justify-content-center align-items-center"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  minHeight: "200px",
                  transition: "background-color 0.2s ease",
                  backgroundColor: snapshot.isDraggingOver ? "rgba(255, 255, 255, 0.1)" : "transparent",
                }}
              >
                {renderDragItem()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="bg-blue">
            <div className="d-flex align-items-start mb-2">
              <img src={ArrowTrail} alt="arrow trail" />
              <div className="text-center text-white pt-2">
                <h1>{instruction}</h1>
              </div>
              <img src={ArrowTrail} alt="arrow trail" />
            </div>
            <div className="d-flex justify-content-around align-items-center px-4 py-2">
              {buckets && buckets.map((bucket) => (
                <Droppable key={bucket.title} droppableId={bucket.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        backgroundColor: snapshot.isDraggingOver ? "rgba(255, 255, 255, 0.1)" : "transparent",
                        padding: "20px",
                        borderRadius: "8px",
                        minHeight: "100px",
                        height: "300px",
                        width: "200px",
                      }}
                    >
                      <h2 className={bucket.id === "inner" ? "inner-count" : "both-count"}>
                        {bucketResults[bucket.id]?.length || 0}
                      </h2>
                      <div className={bucket.id === "inner" ? "inner-bucket" : "both-bucket"}>
                        {bucket.title}
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
          <p style={{ color: "red", fontWeight: "bold" }}>All images have been placed!</p>
        )}
      </div>
    </DragDropContext>

    </>
  );
};

export default DragAndDropFrame;
