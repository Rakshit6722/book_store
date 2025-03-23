import { combineReducers } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import wishListReducer from './wishlistSlice'

const rootReducer = combineReducers({
    bookList: bookReducer,
    wishList: wishListReducer
})

export default rootReducer