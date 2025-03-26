import { combineReducers } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import wishListReducer from './wishlistSlice'
import cartReducer from './cartSlice'
import prevOrderReducer from './orderSlice'

const rootReducer = combineReducers({
    bookList: bookReducer,
    wishList: wishListReducer,
    cart: cartReducer,
    prevOrderList: prevOrderReducer
})

export default rootReducer