import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    otpModal: false,
    connections: [],
    isSidebarOpen: false,
  },
  reducers: {
    OtpSuccess: (state) => {
      return {
        ...state,
        otpModal: true,
      }
    },
    CloseOtpSuccess: (state) => {
      return {
        ...state,
        otpModal: false,
      }
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        user: action.payload,
      }
    },
    logoutSuccess: (state) => {
      return {
        ...state,
        user: null,
        connections: [],
      }
    },
    connections: (state, action) => {
      return {
        ...state,
        connections: action.payload,
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
  },
})

export const {
  loginSuccess,
  logoutSuccess,
  OtpSuccess,
  CloseOtpSuccess,
  offlineMode,
  toggleSidebar,
  connections,
} = userSlice.actions
export default userSlice.reducer
