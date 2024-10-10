import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../types/apiTypes";

interface TableState {
    data: ApiResponse | null;
    loading: boolean;
    error: String | null;
}

const initialState: TableState = {
    data: null,
    loading: false,
    error: null
};

const tableSlice = createSlice({
    name: 'quotes',
    initialState,
    reducers: {
        fetchData: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action: PayloadAction<ApiResponse>) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDataFailure: (state, action: PayloadAction<String>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addQuote(state, action: PayloadAction<{ quote: string; author: string }>) {
            const existingQuotes = state.data?.quotes || [];
            const maxId = existingQuotes.length > 0 ? Math.max(...existingQuotes.map(q => q.id)) : 0;
            state.data?.quotes.push({ id: maxId + 1, ...action.payload }); // Add new quote with incremented ID
        },
    }
});

export const { fetchData, fetchDataSuccess, fetchDataFailure, addQuote } = tableSlice.actions;
export default tableSlice.reducer;
