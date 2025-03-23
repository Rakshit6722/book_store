import { combineReducers } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import wishListReducer from './wishlistSlice'
import cartReducer from './cartSlice'

const rootReducer = combineReducers({
    bookList: bookReducer,
    wishList: wishListReducer,
    cart: cartReducer
})

export default rootReducer