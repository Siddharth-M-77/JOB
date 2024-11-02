import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: null,
    },
    reducers: {
        // actions
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        // New action to update user profile
        updateUser: (state, action) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload, // Updated data ko merge karna
                };
            }
        },
    },
});

export const { setLoading, setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
