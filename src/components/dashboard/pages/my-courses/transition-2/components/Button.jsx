import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  navigateNext,
  navigatePrev,
  selectNavigationState,
} from "../../../../../../redux/reducers/navigationSlice";
import { store } from "../../../../../../redux/store";
import userService from "../../../../../../services/api/user";
import { queryClient } from "../../../../../../queryClient";

const getTransition2CourseDataQueryKey = (enrollmentId, week) => [
  "dashboard-transition-2-course",
  enrollmentId,
  week,
];

let transition2ButtonSaving = false;
const transition2ButtonSavingListeners = new Set();

const setTransition2ButtonSaving = (isSaving) => {
  transition2ButtonSaving = isSaving;
  transition2ButtonSavingListeners.forEach((listener) => listener(isSaving));
};

const subscribeToTransition2ButtonSaving = (listener) => {
  transition2ButtonSavingListeners.add(listener);
  listener(transition2ButtonSaving);

  return () => {
    transition2ButtonSavingListeners.delete(listener);
  };
};

const canPersistTransition2ResumePosition = (state) => {
  if (state.admin?.isAdmin) return false;
  if (state.navigation.currentCourse !== "transition_2") return false;
  if (!state.userAnswer?.courseEnrollmentId || !state.userAnswer?.course) {
    return false;
  }

  return true;
};

const canPersistTransition2Progress = (state) => {
  const navigationState = selectNavigationState(state);

  if (!canPersistTransition2ResumePosition(state)) return false;
  if (navigationState.isAssessmentPage) return false;

  return true;
};

const persistCurrentActivityProgress = async () => {
  const state = store.getState();
  const userAnswers = state.userAnswer;
  const navigation = state.navigation;
  const navigationState = selectNavigationState(state);

  if (!canPersistTransition2ResumePosition(state)) return true;
  if (navigationState.isAssessmentPage) return true;
  if (navigationState.totalSteps > 0 && !navigationState.isLastStep) return true;
  if (!userAnswers?.week) return true;
  if (!userAnswers.activities?.length) return true;

  const lastActivityIndex = navigation.currentPage;

  const result = await userService.postMyActivity(userAnswers.courseEnrollmentId, {
    course: userAnswers.course,
    courseEnrollmentId: userAnswers.courseEnrollmentId,
    week: userAnswers.week,
    activities: userAnswers.activities,
    lastActivityIndex,
  });

  if (result?.success === false) return false;

  const queryKey = getTransition2CourseDataQueryKey(
    userAnswers.courseEnrollmentId,
    userAnswers.week
  );

  queryClient.setQueryData(queryKey, (previousData) => ({
    ...(previousData || {}),
    activity: result?.newActivity || {
      ...(previousData?.activity || {}),
      activities: userAnswers.activities,
      courseEnrollmentId: userAnswers.courseEnrollmentId,
      lastActivityIndex,
      week: userAnswers.week,
    },
  }));
  await queryClient.invalidateQueries({ queryKey, exact: true });

  return true;
};

const persistCurrentResumePosition = async () => {
  const state = store.getState();
  const userAnswers = state.userAnswer;
  const navigation = state.navigation;

  if (!canPersistTransition2Progress(state)) return true;

  const payload = {
    course: userAnswers.course,
    courseEnrollmentId: userAnswers.courseEnrollmentId,
    week: navigation.currentWeek,
    lastActivityIndex: navigation.currentPage,
  };

  const result = await userService.postMyActivity(
    userAnswers.courseEnrollmentId,
    payload
  );

  if (result?.success === false) return false;

  const queryKey = getTransition2CourseDataQueryKey(
    userAnswers.courseEnrollmentId,
    navigation.currentWeek
  );

  queryClient.setQueryData(queryKey, (previousData) => ({
    ...(previousData || {}),
    activity: {
      ...(previousData?.activity || {}),
      ...(result?.newActivity || {}),
      courseEnrollmentId: userAnswers.courseEnrollmentId,
      week: navigation.currentWeek,
      lastActivityIndex: navigation.currentPage,
    },
  }));

  return true;
};

const Button = ({ loading, text, customOnClick }) => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [isAnyButtonSaving, setIsAnyButtonSaving] = useState(
    transition2ButtonSaving
  );
  const navigationState = useSelector(selectNavigationState);
  const { isFirstPage, isFirstStep, isFirstWeek } = navigationState;

  useEffect(() => subscribeToTransition2ButtonSaving(setIsAnyButtonSaving), []);

  const handleClick = async (e) => {
    e.preventDefault();
    if (loading || isSaving || isAnyButtonSaving) return;

    if (customOnClick) {
      const inputOkay = customOnClick();

      // If the User is expected to enter input and does not they cant proceed.
      if (!inputOkay) return;
    }

    if (text === "Next") {
      setIsSaving(true);
      setTransition2ButtonSaving(true);
      try {
        if (customOnClick) {
          const isSynced = await persistCurrentActivityProgress();
          if (!isSynced) return;
        }

        dispatch(navigateNext());

        const isPositionSynced = await persistCurrentResumePosition();
        if (!isPositionSynced) return;
      } catch (error) {
        console.error("Failed to sync activity progress before navigation", error);
        return;
      } finally {
        setIsSaving(false);
        setTransition2ButtonSaving(false);
      }
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
  const buttonBusy = loading || isAnyButtonSaving;
  const isVisuallyBusy = buttonBusy && isNextButton;

  return (
    <button
      className={`transition-course-action btn fs-5 rounded w-200px h-40px d-flex align-items-center justify-content-center ${
        buttonBusy ? "transition-course-action--busy" : ""
      } ${
        isVisuallyBusy ? "transition-course-action--saving" : ""
      } ${
        isNextButton || customOnClick
          ? "bg-button text-white border-0 hover-prev"
          : isPrevButton
          ? "bg-transparent text-button-blue border border-blue hover-next"
          : ""
      }`}
      onClick={handleClick}
      type="button"
      aria-disabled={buttonBusy}
      tabIndex={buttonBusy ? -1 : 0}
    >
      {isVisuallyBusy ? (
        <span className="transition-course-action__saving-content">
          <span className="transition-course-action__spinner" aria-hidden="true" />
          <span>Saving...</span>
        </span>
      ) : (
        <>
          {isPrevButton && <span className="me-2">{"<<<"}</span>}
          {text}
          {isNextButton && <span className="ms-2">{">>>"}</span>}
        </>
      )}
    </button>
  );
};

export default React.memo(Button);
