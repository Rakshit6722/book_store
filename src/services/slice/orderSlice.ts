import { createSlice } from "@reduxjs/toolkit";

const initialState: { prevOrdersList: any[] } = {
    prevOrdersList: []
}

const orderSlice = createSlice({
    name:"prevOrderList",
    initialState,
    reducers:{
        setPrevOrdersList(state, action){
            state.prevOrdersList = [...action.payload, ...state.prevOrdersList]
        },
        resetPrevOrdersList(state){
            state.prevOrdersList = []
        }
    }
})

export const { setPrevOrdersList, resetPrevOrdersList } = orderSlice.actions
export default orderSlice.reducer