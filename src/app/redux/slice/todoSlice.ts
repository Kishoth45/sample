import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, todo } from "../types/apiTypes";

interface todoState {
    data: ApiResponse | null;
    loading: boolean;
    error: String | null;
}

const initialState: todoState = {
    data: {
        quotes: [],
        users: [],
        comments: [],
        todos: [],   // Initialize todos as an empty array
        total: 0,    // Initialize total count
        skip: 0,     // Initialize skip value
        limit: 0,    // Initialize limit value
    },
    loading: false,
    error: null,
};



const todoSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchTodo: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTodoSuccess: (state, action: PayloadAction<ApiResponse>) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchTodoFailure: (state, action: PayloadAction<String>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addTodoRequest(state, action: PayloadAction<todo>) {
            state.loading = true;  // You might want to set loading state here
        },
        addTodoSuccess: (state, action: PayloadAction<todo>) => {
            state.data?.todos.push(action.payload); // Push the new todo to the existing todos array
        },
        addTodoFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        editTodoRequest: (state, action: PayloadAction<todo>) => {
            state.loading = true;
        },
        editTodoSuccess: (state, action: PayloadAction<todo>) => {
            state.loading = false;
            if (state.data) {
                const index = state.data.todos.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.data.todos[index] = action.payload; // Update the todo
                }
            }
        },
        editTodoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Delete Todo Request
        deleteTodoRequest: (state, action: PayloadAction<number>) => {
            state.loading = true;
        },
        deleteTodoSuccess: (state, action: PayloadAction<number>) => {
            state.loading = false;
            if (state.data) {
                state.data.todos = state.data.todos.filter(todo => todo.id !== action.payload); // Remove the todo
            }
        },
        deleteTodoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const { 
    fetchTodo, 
    fetchTodoSuccess,
    fetchTodoFailure, 
    addTodoSuccess, 
    addTodoFailure,
    addTodoRequest,
    editTodoRequest,   
    editTodoSuccess,
    editTodoFailure,
    deleteTodoRequest,
    deleteTodoSuccess,
    deleteTodoFailure,
  } = todoSlice.actions;
export default todoSlice.reducer;