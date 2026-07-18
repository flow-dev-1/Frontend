import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weeks: {
    week1: {
      pages: {},
      assessment: {
        questions: [],
      }
    },
    week2: {
      pages: {},
      assessment: {
        questions: [],
      }
    },
    week3: {
      pages: {},
      assessment: {
        questions: [],
      }
    },
    week4: {
      pages: {},
      assessment: {
        questions: [],
      }
    },
    week5: {
      pages: {},
      assessment: {
        questions: [],
      }
    }
  }
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    // Update video completion status
    updateVideoStatus: (state, action) => {
      const { week, page, isCompleted } = action.payload;
      if (!state.weeks[`week${week}`].pages[`page${page}`]) {
        state.weeks[`week${week}`].pages[`page${page}`] = {};
      }
      state.weeks[`week${week}`].pages[`page${page}`] = {
        type: 'video',
        isCompleted
      };
    },

    // Update text input responses
    updateTextInput: (state, action) => {
      const { week, page, questions } = action.payload;
      if (!state.weeks[`week${week}`].pages[`page${page}`]) {
        state.weeks[`week${week}`].pages[`page${page}`] = {};
      }
      state.weeks[`week${week}`].pages[`page${page}`] = {
        type: 'text_input',
        questions
      };
    },

    // Update objective/multiple choice responses
    updateObjectives: (state, action) => {
      const { week, page, questions } = action.payload;
      if (!state.weeks[`week${week}`].pages[`page${page}`]) {
        state.weeks[`week${week}`].pages[`page${page}`] = {};
      }
      state.weeks[`week${week}`].pages[`page${page}`] = {
        type: 'objectives',
        questions
      };
    },

    // Update drag and drop responses
    updateDragAndDrop: (state, action) => {
      const { week, page, items } = action.payload;
      if (!state.weeks[`week${week}`].pages[`page${page}`]) {
        state.weeks[`week${week}`].pages[`page${page}`] = {};
      }
      state.weeks[`week${week}`].pages[`page${page}`] = {
        type: 'drag_and_drop',
        items
      };
    },

    // Update assessment responses
    updateAssessment: (state, action) => {
      const { week, questions } = action.payload;
      state.weeks[`week${week}`].assessment.questions = questions;
    },

    // Update assessment review
    updateAssessmentReview: (state, action) => {
      const { week, review } = action.payload;
      state.weeks[`week${week}`].assessment.review = review;
    }
  }
});

export const {
  updateVideoStatus,
  updateTextInput,
  updateObjectives,
  updateDragAndDrop,
  updateAssessment,
  updateAssessmentReview
} = feedbackSlice.actions;

// Selectors
export const selectWeekFeedback = (state, week) => state.feedback.weeks[`week${week}`];
export const selectPageFeedback = (state, week, page) => state.feedback.weeks[`week${week}`].pages[`page${page}`];
export const selectAssessmentFeedback = (state, week) => state.feedback.weeks[`week${week}`].assessment;

export default feedbackSlice.reducer; 