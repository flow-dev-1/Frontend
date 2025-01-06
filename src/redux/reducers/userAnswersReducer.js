import { createSlice } from '@reduxjs/toolkit'

const userAnswerSlice = createSlice({
  name: 'userAnswer',
  initialState: {
    courseEnrollmentId: null,
    week: 1,
    activities: [],
    assessments: [],
    // isSidebarOpen: false,
  },
  reducers: {
    updateData: (state, action) => {
      const { courseEnrollmentId, week, activities, assessments } = action.payload;
      return {
        ...state,
        courseEnrollmentId,
        week,
        activities,
        assessments,
      }
    },
    saveActivity: (state, action) => {
      const updatedActivities = state.activities.filter(activity => activity.page !== action.payload.page);
      return {
        ...state,
        activities: [...updatedActivities, action.payload],
      }
    },
    saveAssessment: (state, action) => {
      return {
        ...state,
        assessments: action.payload,
      }
    },
    clearData: (state) => {
      state.courseEnrollmentId = null;
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
