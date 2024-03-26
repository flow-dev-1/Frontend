import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            return {
                ...state,
                user: action.payload,
            };
        },
        logoutSuccess: (state) => {
            return {
                ...state,
                user: null,

            };
        },

    },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
