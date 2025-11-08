import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CardBoard from "./CardBoard";
import ArrowTrail from "../../../../../../../../../assets/ArrowTrail.svg";
import "../page2.css";

const DragAndDropFrame = ({
  info,
  setErrorMessage,
  answers,
  setAnswers,
  setCurrentImageIndex1,
  setDragDropImageLength,
}) => {
  const { skills, zones, instruction } = info;
  const [zoneResults, setZoneResults] = useState({
    blue: [],
    green: [],
    yellow: [],
    red: [],
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!answers?.length) return;

    const existingAnswer = answers.find((answer) => answer.stepId === 2);
    if (existingAnswer?.value) {
      setZoneResults({
        blue: existingAnswer.value.blue || [],
        green: existingAnswer.value.green || [],
        yellow: existingAnswer.value.yellow || [],
        red: existingAnswer.value.red || [],
      });

      // Update currentSkillIndex based on total dropped items
      const totalDropped =
        (existingAnswer.value.blue?.length || 0) +
        (existingAnswer.value.green?.length || 0) +
        (existingAnswer.value.yellow?.length || 0) +
        (existingAnswer.value.red?.length || 0);
      setCurrentImageIndex(totalDropped);
      setCurrentImageIndex1(totalDropped);
    }
  }, [answers]);

  const totalDropped = Object.values(zoneResults).reduce(
    (sum, arr) => sum + arr.length,
    0
  );
  const allSkillsDropped = totalDropped >= skills.length;

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    setErrorMessage("");
    const { source, destination } = result;

    if (source.droppableId === "skill" && destination.droppableId !== "skill") {
      const draggedIndex = currentImageIndex;

      // Update zone results
      const newZoneResults = {
        ...zoneResults,
        [destination.droppableId]: [
          ...(zoneResults[destination.droppableId] || []),
          draggedIndex,
        ],
      };
      setZoneResults(newZoneResults);

      // Update answers state
      setAnswers((prevAnswers) => {
        const existingAnswerIndex = prevAnswers.findIndex(
          (answer) => answer.stepId === 2
        );

        if (existingAnswerIndex !== -1) {
          // Update existing answer
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingAnswerIndex] = {
            ...updatedAnswers[existingAnswerIndex],
            value: newZoneResults,
          };
          return updatedAnswers;
        } else {
          // Create new answer
          return [
            ...prevAnswers,
            {
              stepId: 2,
              value: newZoneResults,
            },
          ];
        }
      });

      // Update current skill index
      setCurrentImageIndex((prevIndex) =>
        prevIndex + 1 < skills.length ? prevIndex + 1 : prevIndex
      );
      setCurrentImageIndex1((prevIndex) =>
        prevIndex + 1 < skills.length ? prevIndex + 1 : prevIndex
      );
    }
  };

  useEffect(() => {
    setDragDropImageLength(skills.length);
  }, [skills]);

  const renderDragItem = () => {
    if (currentImageIndex >= skills.length || allSkillsDropped) return null;
    const imagePath = require(`../../../../../../../../../assets/drag-images/emotional-regulation-drag-images/week5/page2/image${
      currentImageIndex + 1
    }.png`);

    return (
      <Draggable
        draggableId={`skill-${currentImageIndex}`}
        index={0}
        isDragDisabled={allSkillsDropped}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              cursor: allSkillsDropped
                ? "not-allowed"
                : snapshot.isDragging
                ? "grabbing"
                : "grab",
              opacity: allSkillsDropped ? 0.5 : 1,
              transform: `${provided.draggableProps.style?.transform || ""} ${
                snapshot.isDragging ? "scale(0.9)" : ""
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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="row custom-border-20 w-100 m-0">
        {/* Left Droppable (50%) */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4">
          <Droppable droppableId="skill">
            {(provided, snapshot) => (
              <div
                className="w-100 d-flex justify-content-center align-items-center"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  minHeight: "300px",
                  transition: "background-color 0.2s ease",
                  backgroundColor: snapshot.isDraggingOver
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
                }}
              >
                {allSkillsDropped && (
                  <span
                    className="d-none d-md-block"
                    style={{ width: "150px" }}
                  />
                )}
                {renderDragItem()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Right Zones (50%) */}
        <div className="col-12 col-md-6 bg-blue px-4 py-3">
          <div className="zones-grid-container">
            {zones &&
              zones.map((zone) => (
                <Droppable key={zone.id} droppableId={zone.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      className={`coping-zone-container ${zone.id}`}
                      {...provided.droppableProps}
                      style={{
                        backgroundColor: snapshot.isDraggingOver
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                      }}
                    >
                      <h2 className="zone-count" style={{ color: zone.color }}>
                        {zoneResults[zone.id]?.length || 0}
                      </h2>
                      <div className="zone-title">
                        <h2 className="text-center text-white fw-bold m-0">
                          {zone.title}
                        </h2>
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
  );
};

export default DragAndDropFrame;
