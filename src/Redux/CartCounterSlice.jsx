import { createSlice } from '@reduxjs/toolkit'

export const CartCounterSlice = createSlice({
    name: "count",
    initialState : {
        value: 0
    },
    reducers: {
        increment : (state) => {
            state.value += 1;
        },

        decrement :(state) => {
            state.value -= 1;

        }
    }
})

export const {increment,decrement} = CartCounterSlice.actions

export default CartCounterSlice.reducer

