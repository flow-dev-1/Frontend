import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./page4.css";
import ArrowTrail from "../../../../../../../../assets/ArrowTrail.svg";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";

function WeekFourPage4() {
  const pageData = useSelector(selectPageData);
  const [options, setOptions] = useState(pageData.options);
  const [bowls, setBowls] = useState({
    inner: [],
    outer: [],
  });

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If dragging from options to a bowl
    if (source.droppableId === "options" && destination.droppableId !== "options") {
      const draggedOption = options[source.index];
      const newOptions = Array.from(options);
      newOptions.splice(source.index, 1);

      const newBowls = {
        ...bowls,
        [destination.droppableId]: [
          ...bowls[destination.droppableId],
          draggedOption,
        ],
      };

      

      setOptions(newOptions);
      setBowls(newBowls);
    }
  };

  // Check the index and return appropriate styles
  function checkIndex(index) {
    if (index === 2 || index === 5 || index === 8 || index === 11) {
      return "text-white bg-blue options";
    }
    return "text-blue bg-sky-blue options";
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div>
        <div className="custom-border-20 question-box-container d-flex w-1020px">
          <Droppable droppableId="options">
            {(provided) => (
              <div 
                className="p-5 d-flex gap-3 align-items-baseline flex-wrap flex-basis"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {options.map((option, index) => (
                  <Draggable
                    key={`option-${index}`}
                    draggableId={`option-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <h2
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${checkIndex(index + 1)} ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                        style={{
                          ...provided.draggableProps.style,
                          cursor: snapshot.isDragging ? "grabbing" : "grab",
                        }}
                      >
                        {option}
                      </h2>
                    )}
                  </Draggable>
                ))}
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
            <div className="d-flex justify-content-around px-4">
              {pageData.bowls.map((bowl, index) => (
                <Droppable key={bowl.id} droppableId={bowl.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        backgroundColor: snapshot.isDraggingOver ? "rgba(255, 255, 255, 0.1)" : "transparent",
                        padding: "20px",
                        borderRadius: "8px",
                        minHeight: "100px",
                      }}
                    >
                      <h2 className={bowl.id === "inner" ? "inner-count" : "outer-count"}>
                        {bowls[bowl.id].length}
                      </h2>
                      <div className={bowl.id === "inner" ? "inner-bowl" : "outer-bowl"}>
                        {bowl.label}
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
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </DragDropContext>
  );
}

export default WeekFourPage4;
