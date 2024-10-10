import { combineReducers } from "@reduxjs/toolkit";
import tablereducers from "../slice/tableslice"
import userreducers from "../slice/userSlice"
import commentreducers from "../slice/commentSlice"
import todoreducers from "../slice/todoSlice"

export const rootReducer=combineReducers({
    table: tablereducers,
    user: userreducers,
    comment: commentreducers,
    todo: todoreducers
})