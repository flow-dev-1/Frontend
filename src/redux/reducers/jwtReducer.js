import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    otpModal: false,
  },
  reducers: {
    setToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      }
    },
    clearToken: (state) => {
      return {
        ...state,
        token: null,
      }
    },
    otpSuccess: (state) => {
      return {
        ...state,
        otpModal: false,
      }
    },
    closeOtpSuccess: (state) => {
   return {
     ...state,
     otpModal: false,
   }
    },
  },
})

export const { otpSuccess, closeOtpSuccess, setToken, clearToken } =
  authSlice.actions
export default authSlice.reducer
