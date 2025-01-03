import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isAdmin: null,
        code: null,
    },
    reducers: {
        setCode: (state, action) => {
            return {
                ...state,
                isAdmin: true,
                code: action.payload,
            };
        },
        clearCode: (state) => {
            return {
                ...state,
                isAdmin: null,
                code: null,
            };
        },
    },
});

export const { setCode, clearCode } = adminSlice.actions;
export default adminSlice.reducer;

export const adminData = (state) => state.admin;

