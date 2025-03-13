// src/store/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../utility/types/typeStore';
import {cartInitialState} from "../initialStore"
import {resetAll} from "../Actions"



const cartSlice = createSlice({
  name: 'cart',
  initialState:cartInitialState,
  reducers: {
    addItem: (state, action: PayloadAction<Book>) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        //### I'm not sure how below line updates the store
        existingItem.quantityInCart++;
      } else {
        state.items.push({ ...action.payload, quantityInCart: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(resetAll, () => cartInitialState)

});

export const { addItem, removeItem, applyDiscount } = cartSlice.actions;
export default cartSlice.reducer;