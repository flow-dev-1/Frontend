import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./page4.css";
import ArrowTrail from "../../../../../../../../assets/ArrowTrail.svg";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { Icon } from "@iconify/react/dist/iconify.js";

function WeekEightPage4() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const [errorMessage, setErrorMessage] = useState("");
  const [options, setOptions] = useState(pageData.options);
  const [bowls, setBowls] = useState({
    inner: [],
    outer: [],
  });

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );

    if (response?.answer) {
      setBowls(response.answer);
      setOptions([]);
    }
    return () => {};
  }, [userAnswers]);

  const handleOnDragEnd = (result) => {
    setErrorMessage("");
    if (!result.destination) return;

    const { source, destination } = result;

    // If dragging from options to a bowl
    if (
      source.droppableId === "options" &&
      destination.droppableId !== "options"
    ) {
      const draggedOption = options[source.index];
      const draggedIndex = pageData?.options.indexOf(draggedOption);
      const newOptions = Array.from(options);
      newOptions.splice(source.index, 1);

      // Ensure the destination bowl exists and is an array
      const newBowls = {
        ...bowls,
        [destination.droppableId]: [
          ...(bowls[destination.droppableId] || []), // Default to empty array if undefined
          draggedIndex,
        ],
      };

      setOptions(newOptions);
      setBowls(newBowls);
    }
  };

  const saveUserInput = () => {
    // if (!adminDatas.isAdmin && !myAnswer) {
    //   setErrorMessage("Oops! Please enter a valid input!");
    //   return false;
    // }

    if (bowls.inner.length + bowls.outer.length !== 12) {
      setErrorMessage("Please make sure to fill all the bowls.");
      return false;
    }
    setErrorMessage("");
    // Allow flow admin to proceed without input but do not dispatch answer
    if (adminDatas.isAdmin) return true;
    dispatch(
      saveActivity({
        page: pageData.id,
        answer: bowls,
      })
    );
    return true;
  };

  const resetDragAndDrop = () => {
    setBowls({ inner: [], outer: [] }); // Reset bowls
    setOptions(pageData.options); // Reset options to initial state
    setErrorMessage(""); // Clear any error messages
  };

  // Check the index and return appropriate styles
  function checkIndex(index) {
    if (index === 2 || index === 5 || index === 8 || index === 11) {
      return "text-white bg-drag-blue options";
    }
    return "text-blue bg-sky-blue options";
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div>
        <div className="custom-border-20 question-box-container d-flex">
          <Droppable droppableId="options">
            {(provided) => (
              <div
                className="p-5 gap-5 drag-flex-basis"
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
                        className={`fs-1 ${checkIndex(index + 1)} ${
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
            <div className="d-flex align-items-start mb-5">
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
                      className="my-2"
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
                      }}
                    >
                      <h2
                        className={
                          bowl.id === "inner" ? "inner-count" : "outer-count"
                        }
                      >
                        {bowls[bowl.id] ? bowls[bowl.id].length : 0}{" "}
                        {/* Added check */}
                      </h2>
                      <div
                        className={
                          bowl.id === "inner" ? "inner-bowl" : "outer-bowl"
                        }
                      >
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
      <p
        // style={{cursor: "pointer"}}
        className="fs-5 d-flex justify-content-center gap-3 align-items-center mt-3 fs-2"
        onClick={resetDragAndDrop}
        style={{ cursor: "pointer" }} // Added cursor pointer
      >
        <Icon className="ml-3" icon="teenyicons:refresh-solid" />
        Refresh
      </p>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </DragDropContext>
  );
}

export default WeekEightPage4;
