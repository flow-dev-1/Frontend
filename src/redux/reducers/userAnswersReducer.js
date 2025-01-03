import { createSlice } from '@reduxjs/toolkit'

const userAnswerSlice = createSlice({
  name: 'userAnswer',
  initialState: {
    course: null,
    week: null,
    activities: [],
    assessments: [],
    // isSidebarOpen: false,
  },
  reducers: {
    updateData: (state, action) => {
      const { course, week, activities, assessments } = action.payload;
      return {
        ...state,
        course: course,
        week: week,
        activities: activities,
        assessments: assessments,
      }
    },
    saveActivity: (state, action) => {
      return {
        ...state,
        activities: [...state.activities, action.payload],
      }
    },
    saveAssessment: (state, action) => {
      return {
        ...state,
        assessments: [...state.assessments, action.payload],
      }
    },
    clearData: (state) => {
      state.course = null;
      state.week = null;
      state.activities = [];
      state.assessments = [];
    },
  },
})

export const {
  updateData,
  saveActivity,
  saveAssessment,
  clearData
} = userAnswerSlice.actions
export default userAnswerSlice.reducer

export const userAnswer = (state) => state.userAnswer;
