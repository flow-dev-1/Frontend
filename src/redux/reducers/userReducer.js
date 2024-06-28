import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    connections: [],
    isSidebarOpen: false,
  },
  reducers: {
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
  offlineMode,
  toggleSidebar,
  connections,
} = userSlice.actions
export default userSlice.reducer
