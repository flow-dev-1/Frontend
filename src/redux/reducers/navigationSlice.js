import { createSlice, createSelector } from "@reduxjs/toolkit";
import { courseContent as compassionCourseContent } from "../../components/dashboard/pages/my-courses/compassion-course/weeks/data/activity";
import { assessments as compassionAssessments } from "../../components/dashboard/pages/my-courses/compassion-course/weeks/data/assessment";
import { courseContent as transitionCourseContent } from "../../components/dashboard/pages/my-courses/transition-course/data/activity";
import { assessments as transitionAssessments } from "../../components/dashboard/pages/my-courses/transition-course/data/assessment";
import { courseContent as resilienceCourseContent } from "../../components/dashboard/pages/my-courses/resilience-grit/data/activity";
import { assessments as resilienceAssessments } from "../../components/dashboard/pages/my-courses/resilience-grit/data/assessment";

import { courseContent as totCourseContent } from "../../components/dashboard/pages/my-courses/TOT/data/activity";
import { assessments as totAssessments } from "../../components/dashboard/pages/my-courses/TOT/data/assessment";

import { courseContent as emotionalRegulationCourseContent } from "../../components/dashboard/pages/my-courses/emotional-regulation/data/activity";
import { assessments as emotionalRegulationAssessments } from "../../components/dashboard/pages/my-courses/emotional-regulation/data/assessment";

const courseData = {
  compassion: {
    courseContent: compassionCourseContent,
    assessments: compassionAssessments,
  },
  transition: {
    courseContent: transitionCourseContent,
    assessments: transitionAssessments,
  },
  resilience_grit: {
    courseContent: resilienceCourseContent,
    assessments: resilienceAssessments,
  },
  tot: {
    courseContent: totCourseContent,
    assessments: totAssessments,
  },
  emotional_regulation: {
    courseContent: emotionalRegulationCourseContent,
    assessments: emotionalRegulationAssessments,
  },
};

const getCourseFromURL = () => {
  // Add timeout to wait for route initialization
  const path = window?.location?.pathname || "/";

  // Handle initial / case
  if (path === "/") {
    return "compassion"; // default course
  }

  const segments = path.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  // Validate course name
  return [
    "compassion",
    "transition",
    "resilience_grit",
    "tot",
    "emotional_regulation",
  ].includes(lastSegment?.toLowerCase())
    ? lastSegment.toLowerCase()
    : "compassion";
};

// Helper function to calculate multiStep total steps
const calculateMultiStepTotal = (pageData) => {
  if (!pageData?.steps) return 0;

  // Check for consolidated scenarios with subQuestions (old structure)
  const hasConsolidatedScenarios = pageData.steps.some(
    (step) => step.type === "scenario" && step.subQuestions
  );

  if (hasConsolidatedScenarios) {
    // Calculate: 1 instruction + (number of scenarios × 7 steps each)
    const scenarioCount = pageData.steps.filter(
      (step) => step.type === "scenario" && step.subQuestions
    ).length;
    return 1 + scenarioCount * 7;
  }

  // Check for SONAR scenarios with sonarSteps (new structure)
  const hasSonarScenarios = pageData.steps.some(
    (step) => step.type === "scenario" && step.sonarSteps
  );

  if (hasSonarScenarios) {
    // Calculate: 1 instruction + (number of scenarios × 2 steps each: scenario + sonar)
    const scenarioCount = pageData.steps.filter(
      (step) => step.type === "scenario" && step.sonarSteps
    ).length;
    return 1 + scenarioCount * 2;
  }

  // Regular multiStep - just count the steps
  return pageData.steps.length;
};

const initialState = {
  currentCourse: "compassion",
  currentWeek: 1,
  currentPage: 1,
  currentStep: 1,
  showReview: false,
  showHurray: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      if (state.currentCourse !== action.payload) {
        state.currentCourse = action.payload;
        state.currentWeek = 2;
        state.currentPage = 1;
        state.currentStep = 1;
      }
    },
    updateCourseFromURL: (state) => {
      const newCourse = getCourseFromURL();
      if (state.currentCourse !== newCourse) {
        state.currentCourse = newCourse;
        state.currentWeek = 1;
        state.currentPage = 1;
        state.currentStep = 1;
        state.showReview = false;
        state.showHurray = false;

        sessionStorage.setItem("flow-currentWeek", "1");
        sessionStorage.setItem("flow-currentPage", "1");
        sessionStorage.setItem("flow-currentStep", "1");
      }
    },
    setCurrentWeek: (state, action) => {
      state.currentWeek = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setShowReview: (state, action) => {
      state.showReview = action.payload;
    },
    setShowHurray: (state, action) => {
      state.showHurray = action.payload;
    },
    navigateNext: (state) => {
      const { courseContent, assessments } = courseData[state.currentCourse];

      const weekData = courseContent[`week${state.currentWeek}`];
      const totalWeeks = Object.keys(courseContent).length;
      const totalPages = weekData?.pages?.length || 0;

      const isAssessmentPage = state.currentPage > totalPages;
      const isLastWeek = state.currentWeek === totalWeeks;
      const isFirstWeek = state.currentWeek === 1;

      if (isAssessmentPage) {
        const assessmentData = assessments[`week${state.currentWeek}`];

        const totalQuestions = assessmentData?.questions?.length || 0;
        const isLastQuestion = state.currentStep === totalQuestions;

        if (isLastQuestion) {
          if (
            state.currentCourse === "transition" &&
            state.currentWeek === 10
          ) {
            state.showReview = true;
          } else if (
            state.currentCourse === "tot" &&
            (state.currentWeek === 6 || isFirstWeek)
          ) {
            state.showReview = true;
          } else if (
            state.currentCourse !== "transition" &&
            state.currentCourse !== "tot" &&
            (state.currentWeek === 5 || isFirstWeek)
          ) {
            state.showReview = true;
          } else {
            state.showHurray = true;
          }
        } else {
          state.currentStep += 1;
          sessionStorage.setItem("flow-currentStep", state.currentStep);
        }
        return;
      }

      const pageData = weekData?.pages.find(
        (page) => page.id === state.currentPage
      );
      const isLastPage = state.currentPage === totalPages;

      // Calculate total steps based on page type
      let totalSteps = 0;
      if (pageData?.type === "imageDragAndDrop") {
        totalSteps = pageData.steps;
      } else if (pageData?.type === "multiStep") {
        totalSteps = calculateMultiStepTotal(pageData);
      } else if (pageData?.type === "interactiveScenario") {
        totalSteps = pageData.steps?.length || 0;
      } else if (pageData?.type === "multiScenario") {
        totalSteps = pageData.scenarios?.length || 0;
      }

      const isLastStep = state.currentStep === totalSteps;
      const hasAssessment =
        assessments[`week${state.currentWeek}`]?.questions?.length > 0;

      if (totalSteps > 0 && !isLastStep) {
        state.currentStep += 1;
        sessionStorage.setItem("flow-currentStep", state.currentStep);
        return;
      }

      if (isLastPage) {
        if (hasAssessment) {
          state.currentPage += 1;
          state.currentStep = 1;
          sessionStorage.setItem("flow-currentPage", state.currentPage);
          sessionStorage.setItem("flow-currentStep", "1");
          return;
        }

        if (!isLastWeek) {
          state.currentWeek += 1;
          state.currentPage = 1;
          state.currentStep = 1;
          sessionStorage.setItem("flow-currentWeek", state.currentWeek);
          sessionStorage.setItem("flow-currentPage", "1");
          sessionStorage.setItem("flow-currentStep", "1");
        }
        return;
      }

      if (state.currentPage < totalPages) {
        state.currentPage += 1;
        state.currentStep = 1;
        sessionStorage.setItem("flow-currentPage", state.currentPage);
        sessionStorage.setItem("flow-currentStep", "1");
      }
    },
    navigatePrev: (state) => {
      const { courseContent } = courseData[state.currentCourse];
      const weekData = courseContent[`week${state.currentWeek}`];
      const isAssessmentPage = state.currentPage > weekData?.pages.length;

      if (state.showReview) {
        return;
      }

      if (isAssessmentPage) {
        if (state.currentStep > 1) {
          state.currentStep -= 1;
          sessionStorage.setItem("flow-currentStep", state.currentStep);
          return;
        }
        state.currentPage = weekData?.pages.length || 1;
        state.currentStep = 1;
        sessionStorage.setItem("flow-currentPage", state.currentPage);
        sessionStorage.setItem("flow-currentStep", "1");
        return;
      }

      const pageData = weekData?.pages.find(
        (page) => page.id === state.currentPage
      );

      // Calculate total steps based on page type
      let totalSteps = 0;
      if (pageData?.type === "imageDragAndDrop") {
        totalSteps = pageData.steps;
      } else if (pageData?.type === "multiStep") {
        totalSteps = calculateMultiStepTotal(pageData);
      } else if (pageData?.type === "interactiveScenario") {
        totalSteps = pageData.steps?.length || 0;
      } else if (pageData?.type === "multiScenario") {
        totalSteps = pageData.scenarios?.length || 0;
      }

      const isFirstPage = state.currentPage === 1;
      const isFirstStep = state.currentStep === 1;
      const isFirstWeek = state.currentWeek === 1;

      if (totalSteps > 0 && !isFirstStep) {
        state.currentStep -= 1;
        sessionStorage.setItem("flow-currentStep", state.currentStep);
        return;
      }

      if (isFirstPage) {
        if (!isFirstWeek) {
          state.currentWeek -= 1;
          const prevWeekPages =
            courseContent[`week${state.currentWeek}`]?.pages.length || 1;
          state.currentPage = prevWeekPages;
          state.currentStep = 1;
          sessionStorage.setItem("flow-currentWeek", state.currentWeek);
          sessionStorage.setItem("flow-currentPage", state.currentPage);
          sessionStorage.setItem("flow-currentStep", "1");
        }
        return;
      }

      state.currentPage -= 1;
      state.currentStep = 1;
      sessionStorage.setItem("flow-currentPage", state.currentPage);
      sessionStorage.setItem("flow-currentStep", "1");
    },
    showReviewPopup: (state) => {
      state.showReview = true;
    },
    hideReviewPopup: (state) => {
      state.showReview = false;
      state.showHurray = true;
    },
    hideHurray: (state) => {
      state.showHurray = false;
      const { courseContent } = courseData[state.currentCourse];
      if (state.currentWeek < Object.keys(courseContent).length) {
        state.currentWeek += 1;
        state.currentPage = 1;
        state.currentStep = 1;
        sessionStorage.setItem("flow-currentWeek", state.currentWeek);
      }
    },
  },
});

export const {
  setCourse,
  setCurrentWeek,
  setCurrentPage,
  setCurrentStep,
  setShowReview,
  setShowHurray,
  navigateNext,
  navigatePrev,
  showReviewPopup,
  hideReviewPopup,
  hideHurray,
  updateCourseFromURL,
} = navigationSlice.actions;

// Base selectors
const selectNavigation = (state) => state.navigation;
export const selectCurrentCourse = (state) => state.navigation.currentCourse;
export const selectCurrentWeek = (state) => state.navigation.currentWeek;
export const selectCurrentPage = (state) => state.navigation.currentPage;
export const selectCurrentStep = (state) => state.navigation.currentStep;
export const selectShowReview = (state) => state.navigation.showReview;
export const selectShowHurray = (state) => state.navigation.showHurray;

// Memoized selectors
export const selectPageData = createSelector(
  [selectNavigation],
  (navigation) => {
    const { courseContent, assessments } = courseData[navigation.currentCourse];
    const weekData = courseContent[`week${navigation.currentWeek}`];
    const isAssessmentPage = navigation.currentPage > weekData?.pages.length;

    if (isAssessmentPage) {
      const assessmentData = assessments[`week${navigation.currentWeek}`];
      return {
        ...assessmentData,
        currentQuestion: assessmentData?.questions[navigation.currentStep - 1],
      };
    }

    return weekData?.pages.find((page) => page.id === navigation.currentPage);
  }
);

export const selectNavigationState = createSelector(
  [selectNavigation],
  (navigation) => {
    const { courseContent, assessments } = courseData[navigation.currentCourse];
    const weekData = courseContent[`week${navigation.currentWeek}`];
    const totalWeeks = Object.keys(courseContent).length;
    const isAssessmentPage = navigation.currentPage > weekData?.pages.length;

    let pageData;
    let totalSteps;

    if (isAssessmentPage) {
      pageData = assessments[`week${navigation.currentWeek}`];
      totalSteps = pageData?.questions?.length || 0;
    } else {
      pageData = weekData?.pages.find(
        (page) => page.id === navigation.currentPage
      );

      if (pageData?.type === "imageDragAndDrop") {
        totalSteps = pageData.steps || 0;
      } else if (pageData?.type === "multiStep") {
        totalSteps = calculateMultiStepTotal(pageData);
      } else if (pageData?.type === "multiScenario") {
        totalSteps = pageData.scenarios?.length || 0;
      } else if (pageData?.type === "video" || pageData?.type === "question") {
        totalSteps = 0;
      } else {
        totalSteps = pageData?.steps?.length || 0;
      }
    }

    const totalPages = weekData?.pages.length || 0;

    return {
      isFirstPage: navigation.currentPage === 1,
      isLastPage: !isAssessmentPage && navigation.currentPage === totalPages,
      isFirstStep: navigation.currentStep === 1,
      isLastStep: navigation.currentStep === totalSteps,
      isFirstWeek: navigation.currentWeek === 1,
      isLastWeek: navigation.currentWeek === totalWeeks,
      isAssessmentPage,
      pageData,
      weekData,
      totalSteps,
    };
  }
);

export default navigationSlice.reducer;
