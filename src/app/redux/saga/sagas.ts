import { call, put, takeLatest, all } from "redux-saga/effects";
import { fetchData, fetchDataSuccess, fetchDataFailure } from "../slice/tableslice";
import { ApiResponse} from "../types/apiTypes";
import { fetchUser, fetchUserFailure, fetchUserSuccess } from "../slice/userSlice";
import { fetchComment, fetchCommentSuccess, fetchCommentFailure } from "../slice/commentSlice";
import { watchAddTodo, watchFetchTodoData } from "./todosaga";

// Define the API URL
const API_URL = 'https://dummyjson.com/quotes'; 

// Function to fetch Quotes data
async function fetchTableData(): Promise<ApiResponse> {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Network is not ok');
        }
        
        const data = await response.json();
        console.log(data);
        return data;
        
    } catch (error) {
        throw new Error(`Fetch error: ${error}`);
    }
}

function* fetchTableDataSaga(): Generator<any, void, ApiResponse> {
    try {
        const data: ApiResponse = yield call(fetchTableData);
        yield put(fetchDataSuccess(data));
    } catch (error: any) {
        yield put(fetchDataFailure(error.message));
    }
}

export function* watchFetchData() {
    yield takeLatest(fetchData.type, fetchTableDataSaga);
}



// Function to fetch data from a User API
async function fetchUserData(): Promise<ApiResponse> {
    const NEW_API_URL = 'https://dummyjson.com/users'; 
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

function* fetchUserDataSaga(): Generator<any, void, ApiResponse> {
    try {
        const data: ApiResponse = yield call(fetchUserData);
        yield put(fetchUserSuccess(data));  
    } catch (error: any) {
        yield put(fetchUserFailure(error.message));
    }
}

export function* watchFetchUserData() {
    yield takeLatest(fetchUser.type, fetchUserDataSaga);
}



// Function to fetch data from a Comment API
async function fetchCommentData(): Promise<ApiResponse> {
    const NEW_API_URL = 'https://dummyjson.com/comments'; 
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

function* fetchCommentDataSaga(): Generator<any, void, ApiResponse> {
    try {
        const data: ApiResponse = yield call(fetchCommentData);
        yield put(fetchCommentSuccess(data));  
    } catch (error: any) {
        yield put(fetchCommentFailure(error.message));
    }
}

export function* watchFetchCommentData() {
    yield takeLatest(fetchComment.type, fetchCommentDataSaga);
}

// Root saga
export default function* rootSaga() {
    yield all([
        watchFetchData(),
        watchFetchUserData(),
        watchFetchCommentData(),
        watchFetchTodoData(),
        watchAddTodo()
    ]);
}


