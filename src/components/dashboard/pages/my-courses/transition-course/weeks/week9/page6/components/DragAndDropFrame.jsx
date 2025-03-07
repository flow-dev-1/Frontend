import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CardBoard from "./CardBoard";
import ArrowTrail from "../../../../../../../../../assets/ArrowTrail.svg";
import '../page6.css'
const DragAndDropFrame = ({ info, setErrorMessage, answers, setAnswers }) => {
  const { images, buckets, instruction } = info;
  const [bucketResults, setBucketResults] = React.useState({
    green: [],
    red: [],
  });

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setErrorMessage("");

    const { source, destination } = result;

    if (source.droppableId === "image" && destination.droppableId !== "image") {
      const currentImage = images[0]; // Assuming the first image is the current image
      const draggedIndex = images.indexOf(currentImage);

      const newBucketResults = {
        ...bucketResults,
        green: bucketResults.green || [],
        red: bucketResults.red || [],
        [destination.droppableId]: [
          ...(bucketResults[destination.droppableId] || []),
          draggedIndex,
        ],
      };

      setBucketResults(newBucketResults);

      const updatedAnswers = answers.map(answer => {
        if (answer.stepId === 1) { // Assuming the current step is 1
          return {
            ...answer,
            value: newBucketResults,
          };
        }
        return answer;
      });

      setAnswers(updatedAnswers);
    }
  };

  const renderDragItem = () => {
    const currentImage = images[0]; // Assuming the first image is the current image
    const imageMap = {};

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      imageMap[image] = require(`../../../../../../../../../assets/drag-images/transition-drag-images/week9/image${i + 1}.png`);
    }

    return (
      <Draggable draggableId="current-image" index={1}>
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
    );
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="d-flex flex-column align-items-center pt-2">
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
                  backgroundColor: snapshot.isDraggingOver
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
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
                <Droppable key={bucket.title} droppableId={bucket.title}>
                  {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                      padding: "20px",
                      borderRadius: "8px",
                      minHeight: "100px",
                      height: "300px",
                      width: "200px",
                    }}
                    >
                      <h2  className={
                          bucket.id === "inner"
                            ? "inner-count"
                            : "both-count"
                        }>{bucketResults[bucket.id]?.length}</h2>
                          <div
                        className={
                          bucket.id === "inner"
                            ? "inner-bucket"
                            : "both-bucket" 
                        }
                      >
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
      </div>
    </DragDropContext>
  );
};

export default DragAndDropFrame;
