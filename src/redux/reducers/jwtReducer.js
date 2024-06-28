import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    clearToken: (state) => {
      return {
        ...state,
        token: null,
      };
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
