import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ArrowTrail from "../../../../../../../../assets/ArrowTrail.svg";
import RedBucket from "../../../../../../../../assets/Buckets/Red Bucket.svg";
import OrangeBucket from "../../../../../../../../assets/Buckets/Orange Bucket.svg";
import GreenBucket from "../../../../../../../../assets/Buckets/Green Bucket.svg";
import Button from "../../../components/Button";
import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import CardBoard from "./components/CardBoard";
import StepIndicator from "../../../components/StepIndicator";

// Import all images
import image1 from "../../../../../../../../assets/drag-images/image1.png";
import image2 from "../../../../../../../../assets/drag-images/image2.png";
import image3 from "../../../../../../../../assets/drag-images/image3.png";
import image4 from "../../../../../../../../assets/drag-images/image4.png";
import image5 from "../../../../../../../../assets/drag-images/image5.png";
import image6 from "../../../../../../../../assets/drag-images/image6.png";
import image7 from "../../../../../../../../assets/drag-images/image7.png";
import image8 from "../../../../../../../../assets/drag-images/image8.png";
import image9 from "../../../../../../../../assets/drag-images/image9.png";
import image10 from "../../../../../../../../assets/drag-images/image10.png";

function WeekFourPage6() {
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData.images.length;

  const [showCurrentImage, setShowCurrentImage] = useState(true);
  const [bucketResults, setBucketResults] = useState({
    green: [],
    red: [],
    orange: [],
  });

  // Reset showCurrentImage when step changes
  useEffect(() => {
    setShowCurrentImage(true);
  }, [currentStep]);

  const imageMap = {
    "Helping with chores at home.": image1,
    "Helping an elderly neighbor with groceries.": image2,
    "Smiling at someone who looks upset.": image3,
    "Standing up for someone being bullied.": image4,
    "Holding the door open for a stranger.": image5,
    "Helping a classmate with a school project.": image6,
    "Listening when someone needs to talk.": image7,
    "Being kind and respectful in your daily interactions.": image8,
    "Preparing a meal for a sick family member.": image9,
    "Picking up litter in a public park.": image10,
  };

  const bucketMap = {
    green: GreenBucket,
    red: RedBucket,
    orange: OrangeBucket,
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // If dragging from image area to a bucket
    if (source.droppableId === "image" && destination.droppableId !== "image") {
      const currentImage = pageData.images[currentStep - 1];
      const newBucketResults = {
        ...bucketResults,
        [destination.droppableId]: [
          ...bucketResults[destination.droppableId],
          currentImage,
        ],
      };

      console.log(newBucketResults);
      

      setBucketResults(newBucketResults);
      setShowCurrentImage(false);
    }
  };

  const renderStep = () => {
    const currentImage = pageData.images[currentStep - 1];
    return showCurrentImage && currentImage ? (
      <Draggable draggableId="current-image" index={0}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              cursor: snapshot.isDragging ? "grabbing" : "grab",
              transform: `${provided.draggableProps.style?.transform || ''} ${snapshot.isDragging ? 'scale(0.5)' : ''}`,
              zIndex: snapshot.isDragging ? 9999 : 1,
            }}
          >
            <CardBoard imgSrc={imageMap[currentImage]} />
          </div>
        )}
      </Draggable>
    ) : null;
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="d-flex flex-column align-items-center pt-2">
        <div className="row custom-border-20 w-1020px">
          <Droppable droppableId="image">
            {(provided) => (
              <div 
                className="col d-flex p-5 justify-content-center align-items-center"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ minHeight: "200px" }}
              >
                {renderStep()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="col bg-blue">
            <div className="d-flex align-items-start mb-2">
              <img src={ArrowTrail} alt="arrow trail" />
              <div className="text-center text-white pt-2">
                <h1>{pageData.instruction}</h1>
              </div>
              <img src={ArrowTrail} alt="arrow trail" />
            </div>
            <div className="d-flex justify-content-between px-4">
              {pageData.buckets.map((bucket) => (
                <Droppable key={bucket.id} droppableId={bucket.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        position: "relative",
                        transition: "transform 0.2s",
                        transform: snapshot.isDraggingOver ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      <div style={{ textAlign: "center", marginBottom: "10px" }}>
                        <h2 
                          style={{
                            color: "white",
                            fontSize: "24px",
                            fontWeight: "bold",
                            margin: 0,
                            padding: "5px 15px",
                            borderRadius: "15px",
                            display: "inline-block",
                            backgroundColor: bucket.id === "green" ? "#4CAF50" : 
                                          bucket.id === "red" ? "#f44336" : "#ff9800",
                          }}
                        >
                          {bucketResults[bucket.id].length}
                        </h2>
                      </div>
                      <img
                        src={bucketMap[bucket.id]}
                        alt={`${bucket.id} bucket`}
                        style={{
                          maxWidth: "100%",
                          filter: snapshot.isDraggingOver ? "brightness(1.2)" : "brightness(1)",
                        }}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        </div>
      </div>
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </DragDropContext>
  );
}

export default WeekFourPage6;
