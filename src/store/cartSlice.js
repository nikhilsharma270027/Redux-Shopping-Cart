import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            //redux
            //return {...state, avtio.payload }
            state.push(action.payload)
        },
        remove(state, action) {
            return state.filter(item => item.id !== action.payload)
        },
    }
})


export const {add, remove} = cartSlice.actions;
export default cartSlice.reducer;


// pure function : function that does have side efffects , means this function does not change data of outside