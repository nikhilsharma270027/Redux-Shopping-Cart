import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
}); //We will freeze the object, So that noone can Change the object element || read only

const initialState = [];

const productSlice = createSlice({
    name: 'product',
    initialState : {
        data: [],
        status: STATUSES.IDLE // error || sucess || idle
    },
    reducers: {
        // setProducts(state, action) {
        //     // Do not do this , NEVER || reducers are already asyncronos we dont use asyn and wait
        //     //const res = await fetch('https://fakestoreapi.com/products'); 
        //     //we cant request data her,so where should we!!! we need to get  data right!!
        //     //So we use thunks middleware, its in build in redux
        //     //The word "thunk" is a programming term that means "a piece of code that does some delayed work".
        //     //Rather than execute some logic now, we can write a function body or code that can be used to perform the work later.
        //     state.data = action.payload;
        // },
        // setStatus(state, action) {
        //     state.status = action.payload
        // }
        // // remove(state, action) {
        // //     return state.filter(item => item.id !== action.payload)
        // // },
    },
    extraReducers: (builder) => { // its an api of redux
        builder
          .addCase(fetchProducts.pending, (state, action)  => {
                state.status = STATUSES.LOADING;
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR
          })
    }
})


export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// 2nd type thunk ||  createAsyncThunk(' identifier ', async function)
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        return data;
})

// //Basis Thunk || More used personally
// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING))
//         try{
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     };
// }