import { createSlice } from "@reduxjs/toolkit";


type BookType = {
    bookName: string;
    author: string;
    rating: number;
    price: number;
    discountPrice: number;
    cover?: string;
    _id: string;
    quantity: number;
};

const initialState = {
    bookList: [] as BookType[],
    loading: false,
}

const bookSlice = createSlice({
    name: "bookList",
    initialState,
    reducers: {
        setBookList(state, action) {
            state.bookList = action.payload;
        },
        resetBookList(state) {
            state.bookList = [];
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    }
})

export const { setBookList, resetBookList, setLoading } = bookSlice.actions;
export default bookSlice.reducer;