import { createSlice, createSelector } from "@reduxjs/toolkit";
import { courseContent } from "../../components/dashboard/pages/my-courses/compassion-course/weeks/data/activity";
import { assessments } from "../../components/dashboard/pages/my-courses/compassion-course/weeks/data/assessment";

const initialState = {
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
      const weekData = courseContent[`week${state.currentWeek}`];
      const totalWeeks = Object.keys(courseContent).length;
      const totalPages = weekData?.pages?.length || 0;
      const isAssessmentPage = state.currentPage > totalPages;
      const isLastWeek = state.currentWeek === totalWeeks;

      if (isAssessmentPage) {
        const assessmentData = assessments[`week${state.currentWeek}`];
        const totalQuestions = assessmentData?.questions?.length || 0;
        const isLastQuestion = state.currentStep === totalQuestions;

        // Check if we are on the last question of the assessment
        if (isLastQuestion) {
          if (state.currentWeek === 5) {
            state.showReview = true; // Set showReview to true if it's week 5
          } else {
            state.showHurray = true; // Set showHurray to true if it's not week 5
          }
        } else {
          // Move to next question
          state.currentStep += 1;
          sessionStorage.setItem("flow-currentStep", state.currentStep)

        }
        return;
      }

      const pageData = weekData?.pages.find(
        (page) => page.id === state.currentPage
      );
      const isLastPage = state.currentPage === totalPages;

      // Handle different page types for steps
      let totalSteps = 0;
      if (pageData?.type === "imageDragAndDrop") {
        totalSteps = pageData.steps;
      } else if (pageData?.type === "multiStep") {
        totalSteps = pageData.steps?.length || 0;
      } else if (pageData?.type === "interactiveScenario") {
        totalSteps = pageData.steps?.length || 0;
      } else if (pageData?.type === "multiScenario") {
        totalSteps = pageData.scenarios?.length || 0;
      }

      const isLastStep = state.currentStep === totalSteps;
      const hasAssessment =
        assessments[`week${state.currentWeek}`]?.questions?.length > 0;

      // If current page has steps and we're not on the last step
      if (totalSteps > 0 && !isLastStep) {
        state.currentStep += 1;
        sessionStorage.setItem("flow-currentStep", state.currentStep)
        return;
      }

      // If we're on the last page of the week
      if (isLastPage) {
        // If week has assessment, go to assessment page
        if (hasAssessment) {
          state.currentPage += 1;
          state.currentStep = 1;
          sessionStorage.setItem("flow-currentPage", state.currentPage)
          sessionStorage.setItem("flow-currentStep", 1)
          return;
        }

        // If not the last week, go to next week
        if (!isLastWeek) {
          state.currentWeek += 1;
          state.currentPage = 1;
          state.currentStep = 1;
          sessionStorage.setItem("flow-currentWeek", state.currentWeek)
          sessionStorage.setItem("flow-currentPage", 1)
          sessionStorage.setItem("flow-currentStep", 1)
        }
        return;
      }



      // For pages without steps (like video pages) or when we're on the last step
      // go to next page if we haven't reached the end
      if (state.currentPage < totalPages) {
        state.currentPage += 1;
        state.currentStep = 1;
        sessionStorage.setItem("flow-currentPage", state.currentPage )
        sessionStorage.setItem("flow-currentStep", state.currentStep )
      }
    },
    navigatePrev: (state) => {
      const weekData = courseContent[`week${state.currentWeek}`];
      const isAssessmentPage = state.currentPage > weekData?.pages.length;

      // Don't allow navigation when review popup is shown
      if (state.showReview) {
        return;
      }

      if (isAssessmentPage) {
        if (state.currentStep > 1) {
          // Go to previous question
          state.currentStep -= 1;
          sessionStorage.setItem("flow-currentStep", state.currentStep)
          return;
        }
        // If on first question, go back to last activity page
        state.currentPage = weekData?.pages.length || 1;
        state.currentStep = 1;

        sessionStorage.setItem("flow-currentPage", state.currentPage)
        sessionStorage.setItem("flow-currentStep", 1)
        
        return;
      }

      const pageData = weekData?.pages.find(
        (page) => page.id === state.currentPage
      );

      // Handle different page types for steps
      let totalSteps = 0;
      if (pageData?.type === "imageDragAndDrop") {
        totalSteps = pageData.steps;
      } else if (pageData?.type === "multiStep") {
        totalSteps = pageData.steps?.length || 0;
      } else if (pageData?.type === "interactiveScenario") {
        totalSteps = pageData.steps?.length || 0;
      } else if (pageData?.type === "multiScenario") {
        totalSteps = pageData.scenarios?.length || 0;
      }

      const isFirstPage = state.currentPage === 1;
      const isFirstStep = state.currentStep === 1;
      const isFirstWeek = state.currentWeek === 1;

      // If current page has steps and we're not on the first step
      if (totalSteps > 0 && !isFirstStep) {
        state.currentStep -= 1;
        sessionStorage.setItem("flow-currentStep",  state.currentStep - 1)
        return;
      }

      // If we're on the first page of the week
      if (isFirstPage) {
        // If not the first week, go to previous week's last page
        if (!isFirstWeek) {
          state.currentWeek -= 1;
          const prevWeekPages =
            courseContent[`week${state.currentWeek}`]?.pages.length || 1;
          state.currentPage = prevWeekPages;
          state.currentStep = 1;

          sessionStorage.setItem("flow-currentWeek", state.currentWeek)
          sessionStorage.setItem("flow-currentPage", state.currentPage)
          sessionStorage.setItem("flow-currentStep", 1)
        }
        return;
      }

      // Otherwise, go to previous page
      state.currentPage -= 1;
      state.currentStep = 1;
      sessionStorage.setItem("flow-currentPage", state.currentPage)
      sessionStorage.setItem("flow-currentStep", 1)
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
      if (state.currentWeek < Object.keys(courseContent).length) {
        state.currentWeek += 1;
        state.currentPage = 1;
        state.currentStep = 1;
        sessionStorage.setItem("flow-currentWeek", state.currentWeek)
      }
    },
  },
});

export const {
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
} = navigationSlice.actions;

// Base selectors
const selectNavigation = (state) => state.navigation;
export const selectCurrentWeek = (state) => state.navigation.currentWeek;
export const selectCurrentPage = (state) => state.navigation.currentPage;
export const selectCurrentStep = (state) => state.navigation.currentStep;
export const selectShowReview = (state) => state.navigation.showReview;
export const selectShowHurray = (state) => state.navigation.showHurray;

// Memoized selectors
export const selectPageData = createSelector(
  [selectNavigation],
  (navigation) => {
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
