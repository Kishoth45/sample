import { call, put, takeLatest } from "redux-saga/effects";
import { fetchTodo, fetchTodoSuccess, fetchTodoFailure,addTodoRequest,  addTodoSuccess, addTodoFailure } from "../slice/todoSlice";
import { ApiResponse,todo } from "../types/apiTypes";




// Function to fetch data from a Comment API
async function fetchTodoData(): Promise<ApiResponse> {
    const NEW_API_URL = 'https://dummyjson.com/todos'; 
    try {
        const response = await fetch(NEW_API_URL);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Fetch error: ${error}`);
    }
}

function* fetchTodoDataSaga(): Generator<any, void, ApiResponse> {
    try {
        const data: ApiResponse = yield call(fetchTodoData);
        yield put(fetchTodoSuccess(data));  
    } catch (error: any) {
        yield put(fetchTodoFailure(error.message));
    }
}

export function* watchFetchTodoData() {
    yield takeLatest(fetchTodo.type, fetchTodoDataSaga);
}

// API call function to add a todo
async function addTodoApi(newTodo: todo): Promise<todo> {
    const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
        const errorMessage = await response.text(); // Get error response text
        console.error('Error response:', errorMessage);
        throw new Error('Failed to add todo: ' + errorMessage);
    }
    

    return response.json();
}



function* addTodoSaga(action: ReturnType<typeof addTodoRequest>): Generator<any, void, todo> {
    try {
        const newTodo: todo = yield call(addTodoApi, action.payload);
        yield put(addTodoSuccess(newTodo)); // Dispatch the success action
    } catch (error: any) {
        yield put(addTodoFailure(error.message)); // Dispatch the failure action
    }
}

export function* watchAddTodo() {
    yield takeLatest(addTodoRequest.type, addTodoSaga);
}

import { editTodoRequest, editTodoSuccess, editTodoFailure, deleteTodoRequest, deleteTodoSuccess, deleteTodoFailure } from '../slice/todoSlice';

// API call to edit a todo
async function editTodoApi(updatedTodo: todo): Promise<todo> {
    const response = await fetch(`https://dummyjson.com/todos/${updatedTodo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
        throw new Error('Failed to update todo');
    }

    return response.json();
}

// Saga to handle editing todo
function* editTodoSaga(action: ReturnType<typeof editTodoRequest>): Generator<any, void, todo> {
    try {
        const updatedTodo: todo = yield call(editTodoApi, action.payload);
        yield put(editTodoSuccess(updatedTodo));
    } catch (error: any) {
        yield put(editTodoFailure(error.message));
    }
}

// API call to delete a todo
async function deleteTodoApi(id: number): Promise<void> {
    const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
}

// Saga to handle deleting todo
function* deleteTodoSaga(action: ReturnType<typeof deleteTodoRequest>): Generator<any, void, void> {
    try {
        yield call(deleteTodoApi, action.payload);
        yield put(deleteTodoSuccess(action.payload));
    } catch (error: any) {
        yield put(deleteTodoFailure(error.message));
    }
}

export function* watchTodoActions() {
    yield takeLatest(editTodoRequest.type, editTodoSaga);
    yield takeLatest(deleteTodoRequest.type, deleteTodoSaga);
}
