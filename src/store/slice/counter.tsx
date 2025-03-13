import { createSlice } from '@reduxjs/toolkit';
import {counterInitialState} from "../initialStore"


const counterSlice = createSlice({
  name: 'counter',
  initialState:counterInitialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    }
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;