import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import {tablePaginationInit} from "../initialStore"


const tablePaginationSlice = createSlice({
  name: 'tablePagination',
  initialState:tablePaginationInit,
  reducers: {
    setPage: (state,action: PayloadAction<{ name: string; page: number }>) => {
      const item = state.find((item) => item.name === action.payload.name);
      if (item) {
        item.page = action.payload.page;
      }
    },
    setLimit: (state,action: PayloadAction<{ name: string; limit: number }>) => {
      const item = state.find((item) => item.name === action.payload.name);
      if (item) {
        item.limit = action.payload.limit;
      }
    }
  },
});

export const { setPage, setLimit } = tablePaginationSlice.actions;

export default tablePaginationSlice.reducer;