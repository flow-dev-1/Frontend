import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        code: null,
    },
    reducers: {
        setCode: (state, action) => {
            return {
                ...state,
                code: action.payload,
            };
        },
        clearCode: (state) => {
            return {
                ...state,
                code: null,
            };
        },
    },
});

export const { setCode, clearCode } = adminSlice.actions;
export default adminSlice.reducer;
