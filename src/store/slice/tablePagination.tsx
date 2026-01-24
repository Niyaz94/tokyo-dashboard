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
    },
    setFilter: (state,action: PayloadAction<{ name: string; filter: {field:string,order:'asc'|'desc'} }>) => {
      const item = state.find((item) => item.name === action.payload.name);
      if (item) {
        item.filter = action.payload.filter;
      }
    }
  },
});

export const { setPage, setLimit,setFilter } = tablePaginationSlice.actions;

export default tablePaginationSlice.reducer;