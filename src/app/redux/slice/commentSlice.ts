import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../types/apiTypes";

interface commentState {
    data: ApiResponse | null;
    loading: boolean;
    error: String | null;
}

const initialState: commentState = {
    data: null,
    loading: false,
    error: null
};

const commentSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchComment: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCommentSuccess: (state, action: PayloadAction<ApiResponse>) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchCommentFailure: (state, action: PayloadAction<String>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const { fetchComment, fetchCommentSuccess, fetchCommentFailure } = commentSlice.actions;
export default commentSlice.reducer;
