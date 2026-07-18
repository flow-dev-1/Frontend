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

export const adminData = (state) => {
    const isPreviewMode =
        typeof window !== "undefined" &&
        window.sessionStorage.getItem("flow-course-preview-mode") === "true";

    return {
        ...state.admin,
        isAdmin: state.admin.isAdmin || isPreviewMode,
        isPreviewMode,
    };
};

