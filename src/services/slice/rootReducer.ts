import { combineReducers } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";

const rootReducer = combineReducers({
    bookList: bookReducer,
})

export default rootReducer