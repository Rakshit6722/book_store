import { createSlice } from "@reduxjs/toolkit";


type BookType = {
    bookName: string;
    author: string;
    rating: number;
    price: number;
    discountPrice: number;
    cover?: string;
    _id: string;
};

const initialState = {
    wishList: [] as BookType[],
    loading: false,
}

const wishListSlice = createSlice({
    name: "wishLIst",
    initialState,
    reducers: {
        setWishList(state, action) {
            const book = action.payload
            const index = state.wishList.findIndex((item) => item._id === book._id);
            if (index === -1) {
                state.wishList.push(book);
            }
        },
        removeFromWishlist(state, action) {
            const book = action.payload
            const index = state.wishList.findIndex((item) => item._id === book._id);
            if (index !== -1) {
                state.wishList.splice(index, 1);
            }
        },
        resetWishList(state) {
            state.wishList = [];
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    }
})

export const { setWishList, resetWishList, setLoading, removeFromWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;