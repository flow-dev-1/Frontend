import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CardBoard from "./CardBoard";
import "../page2.css";

const createEmptyZoneResults = () => ({
  blue: [],
  green: [],
  yellow: [],
  red: [],
});

const normalizeZoneResults = (results) => ({
  blue: Array.isArray(results?.blue) ? results.blue : [],
  green: Array.isArray(results?.green) ? results.green : [],
  yellow: Array.isArray(results?.yellow) ? results.yellow : [],
  red: Array.isArray(results?.red) ? results.red : [],
});

const DragAndDropFrame = ({
  info,
  setErrorMessage,
  answers,
  setAnswers,
  setCurrentImageIndex1,
  setDragDropImageLength,
}) => {
  const { skills, zones } = info;
  const [zoneResults, setZoneResults] = useState(createEmptyZoneResults);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeHoverZone, setActiveHoverZone] = useState(null);
  const pointerPositionRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const trackPointer = (event) => {
      const touch = event.touches?.[0] || event.changedTouches?.[0];
      pointerPositionRef.current = {
        x: touch ? touch.clientX : event.clientX,
        y: touch ? touch.clientY : event.clientY,
      };

      if (!isDraggingRef.current) return;

      setActiveHoverZone((previousZone) => {
        const hoveredZone = getHoveredZoneId();
        return previousZone === hoveredZone ? previousZone : hoveredZone;
      });
    };

    window.addEventListener("mousemove", trackPointer, { passive: true });
    window.addEventListener("touchmove", trackPointer, { passive: true });
    window.addEventListener("touchend", trackPointer, { passive: true });

    return () => {
      window.removeEventListener("mousemove", trackPointer);
      window.removeEventListener("touchmove", trackPointer);
      window.removeEventListener("touchend", trackPointer);
    };
  }, []);

  useEffect(() => {
    if (!answers?.length) {
      setZoneResults(createEmptyZoneResults());
      setCurrentImageIndex(0);
      setCurrentImageIndex1(0);
      return;
    }

    const existingAnswer = answers.find((answer) => answer.stepId === 2);
    if (existingAnswer?.value) {
      const normalizedResults = normalizeZoneResults(existingAnswer.value);
      setZoneResults(normalizedResults);

      // Update currentSkillIndex based on total dropped items
      const totalDropped =
        normalizedResults.blue.length +
        normalizedResults.green.length +
        normalizedResults.yellow.length +
        normalizedResults.red.length;
      setCurrentImageIndex(totalDropped);
      setCurrentImageIndex1(totalDropped);
    }
  }, [answers, setCurrentImageIndex1]);

  const totalDropped = Object.values(zoneResults).reduce(
    (sum, arr) => sum + arr.length,
    0
  );
  const allSkillsDropped = totalDropped >= skills.length;

  const getHoveredZoneId = () => {
    const hoveredElement = document.elementFromPoint(
      pointerPositionRef.current.x,
      pointerPositionRef.current.y
    );

    return hoveredElement
      ?.closest("[data-emotional-drop-zone]")
      ?.getAttribute("data-emotional-drop-zone");
  };

  const handleOnDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleOnDragEnd = (result) => {
    isDraggingRef.current = false;
    setActiveHoverZone(null);
    setErrorMessage("");
    const { source, destination } = result;

    if (source.droppableId === "skill") {
      const hoveredZone = getHoveredZoneId();
      const destinationZone = hoveredZone || destination?.droppableId;

      if (!destinationZone || destinationZone === "skill") return;

      const draggedIndex = currentImageIndex;
      const currentResults = normalizeZoneResults(zoneResults);

      // Update zone results
      const newZoneResults = {
        ...currentResults,
        [destinationZone]: [
          ...(currentResults[destinationZone] || []),
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
  }, [setDragDropImageLength, skills]);

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
                snapshot.isDragging ? "scale(0.8)" : ""
              }`,
              zIndex: snapshot.isDragging ? 9999 : 1,
              pointerEvents: snapshot.isDragging ? "none" : undefined,
            }}
          >
            <CardBoard imgSrc={imagePath} />
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <DragDropContext onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd}>
      <div className="custom-border-20 emotional-dnd-layout">
        {/* Left Droppable (50%) */}
        <div className="d-flex justify-content-center align-items-center p-4 emotional-dnd-column emotional-dnd-card-stage">
          <Droppable droppableId="skill">
            {(provided, snapshot) => (
              <div
                className="w-100 d-flex justify-content-center align-items-center emotional-dnd-card-drop"
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
                <div className="emotional-dnd-card-slot">{renderDragItem()}</div>
                <div className="emotional-dnd-hidden-placeholder">
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>

        {/* Right Zones (50%) */}
        <div className="bg-blue px-4 py-3 emotional-dnd-column">
          <div className="zones-grid-container">
            {zones &&
              zones.map((zone) => (
                <Droppable key={zone.id} droppableId={zone.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      className={`coping-zone-container ${zone.id}`}
                      data-emotional-drop-zone={zone.id}
                      {...provided.droppableProps}
                      style={{
                        backgroundColor: activeHoverZone === zone.id
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                        boxShadow: activeHoverZone === zone.id
                          ? "0 0 0 3px rgba(255, 255, 255, 0.5)"
                          : "none",
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
                      <div className="emotional-dnd-hidden-placeholder">
                        {provided.placeholder}
                      </div>
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
