import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  navigateNext,
  navigatePrev,
  selectNavigationState,
} from "../../../../../../redux/reducers/navigationSlice";
import { store } from "../../../../../../redux/store";
import userService from "../../../../../../services/api/user";
import { queryClient } from "../../../../../../queryClient";

const getTransitionCourseDataQueryKey = (enrollmentId, week) => [
  "dashboard-transition-course",
  enrollmentId,
  week,
];

let transitionButtonSaving = false;
const transitionButtonSavingListeners = new Set();

const setTransitionButtonSaving = (isSaving) => {
  transitionButtonSaving = isSaving;
  transitionButtonSavingListeners.forEach((listener) => listener(isSaving));
};

const subscribeToTransitionButtonSaving = (listener) => {
  transitionButtonSavingListeners.add(listener);
  listener(transitionButtonSaving);

  return () => {
    transitionButtonSavingListeners.delete(listener);
  };
};

const canPersistTransitionResumePosition = (state) => {
  if (state.admin?.isAdmin) return false;
  if (state.navigation.currentCourse !== "transition") return false;
  if (!state.userAnswer?.courseEnrollmentId || !state.userAnswer?.course) {
    return false;
  }

  return true;
};

const canPersistTransitionProgress = (state) => {
  const navigationState = selectNavigationState(state);

  if (!canPersistTransitionResumePosition(state)) return false;
  if (navigationState.isAssessmentPage) return false;

  return true;
};

const persistCurrentActivityProgress = async () => {
  const state = store.getState();
  const userAnswers = state.userAnswer;
  const navigation = state.navigation;
  const navigationState = selectNavigationState(state);

  if (!canPersistTransitionResumePosition(state)) return true;
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

  const queryKey = getTransitionCourseDataQueryKey(
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

  if (!canPersistTransitionProgress(state)) return true;

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

  const queryKey = getTransitionCourseDataQueryKey(
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
    transitionButtonSaving
  );

  useEffect(() => subscribeToTransitionButtonSaving(setIsAnyButtonSaving), []);

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
      setTransitionButtonSaving(true);
      try {
        const activitySync = customOnClick
          ? persistCurrentActivityProgress()
          : Promise.resolve(true);

        dispatch(navigateNext());

        if (customOnClick) {
          const isSynced = await activitySync;
          if (!isSynced) {
            console.error("Transition progress save failed after navigation");
          }
        }

        const isPositionSynced = await persistCurrentResumePosition();
        if (!isPositionSynced) {
          console.error("Transition resume position save failed after navigation");
        }
      } catch (error) {
        console.error("Failed to sync Transition progress before navigation", error);
        return;
      } finally {
        setIsSaving(false);
        setTransitionButtonSaving(false);
      }
    } else if (text === "Prev") {
      dispatch(navigatePrev());
    }
  };

  // Don't render prev button on first page of first week
  // or first step of a multi-step page
  // if (text === "Prev" && isFirstStep) {
  //   return null; // should have not saved currentStep to be 1 initally
  // }               or maybe we can use this // (imageDragAndDrop || multiStep or assessment), get it from page data

  const isNextButton = text === "Next";
  const isPrevButton = text === "Prev";
  const buttonBusy = loading || isAnyButtonSaving;
  const isVisuallyBusy = buttonBusy && isNextButton;

  return (
    <button
      className={`transition-course-action btn fs-5 rounded w-200px h-50px d-flex align-items-center justify-content-center ${
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
