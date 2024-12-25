import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  navigateNext,
  navigatePrev,
  selectNavigationState,
} from "../../../../../../redux/reducers/navigationSlice";

const Button = ({ text, customOnClick }) => {
  const dispatch = useDispatch();
  const navigationState = useSelector(selectNavigationState);
  const { isFirstPage, isFirstStep, isFirstWeek } = navigationState;

  const handleClick = (e) => {
    e.preventDefault();

    if (customOnClick) {
      customOnClick();
      return;
    }

    if (text === "Next") {
      dispatch(navigateNext());
    } else if (text === "Prev") {
      dispatch(navigatePrev());
    }
  };

  // Don't render prev button on first page of first week
  // or first step of a multi-step page
  // if (text === "Prev" && isFirstStep) {
  //   return null; // should have not saved currentStep to be 1 initally
  // }               or maybe we can use this // (imageDragAndDrop || multiStep || interactiveScenario || multiScenario ), get it from page data, for the assesment, just get pag etype

  const isNextButton = text === "Next";
  const isPrevButton = text === "Prev";

  return (
    <button
      className={`btn fs-5 rounded w-200px h-50px ${
        isNextButton || customOnClick
          ? "bg-button text-white border-0 hover-prev"
          : isPrevButton
          ? "bg-transparent text-button-blue border border-blue hover-next"
          : ""
      }`}
      onClick={handleClick}
      type="button"
    >
      {isPrevButton && <span className="me-2">{"<<<"}</span>}
      {text}
      {isNextButton && <span className="ms-2">{">>>"}</span>}
    </button>
  );
};

export default React.memo(Button);
