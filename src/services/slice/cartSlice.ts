import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

type CartType = {
    name: string;
    author: string;
    price: number;
    discountPrice: number;
    cover?: string;
    _id: string;
    quantity: number;
    quantityToBuy: number;
    product_id?: string; 
}

const initialState = {
    cart: [] as CartType[],
    cartLoading: false,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers : {
        setCart(state, action) {
            state.cart = action.payload;
        },
        addToCartReducer(state, action) {
            const book = action.payload;
            const index = state.cart.findIndex((item) => item._id === book._id);
            if (index === -1) {
                state.cart.push({ ...book });
            }
        },
        removeFromCart(state, action) {
            console.log("action", action)
            // const book = action.payload;
            const index = state.cart.findIndex((item) => item._id === action.payload);
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },
        incrementQuantity(state, action) {
            // const book = action.payload;
            const index = state.cart.findIndex((item) => item._id === action.payload);
            if (index !== -1) {
                state.cart[index].quantityToBuy += 1;
            }
        },
        decrementQuantity(state, action) {
            // const book = action.payload;
            const index = state.cart.findIndex((item) => item._id === action.payload);
            console.log("index", index)
            if (index !== -1) {
                state.cart[index].quantityToBuy -= 1;
            }
        },
        resetCart(state) {
            state.cart.length = 0;
            storage.removeItem('persist:root');
        },
        setCartLoading(state, action) {
            state.cartLoading = action.payload;
        }
    }
})

export const { setCart, addToCartReducer, removeFromCart, incrementQuantity, decrementQuantity, resetCart, setCartLoading } = cartSlice.actions;
export default cartSlice.reducer;