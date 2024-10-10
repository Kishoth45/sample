import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../types/apiTypes";

interface userState {
    data: ApiResponse | null;
    loading: boolean;
    error: String | null;
}

const initialState: userState = {
    data: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUser: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserSuccess: (state, action: PayloadAction<ApiResponse>) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchUserFailure: (state, action: PayloadAction<String>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const { fetchUser, fetchUserSuccess, fetchUserFailure } = userSlice.actions;
export default userSlice.reducer;
