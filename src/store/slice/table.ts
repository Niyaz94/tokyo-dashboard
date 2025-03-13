import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../Reducer';
import {tableInitialState} from "../initialStore"

import {resetAll} from "../Actions"


const tableSlice = createSlice({
  name: 'table',
  initialState:tableInitialState,
  reducers: {
    addRow: (state, action) => {
      state.data.push(action.payload);
    },
    updateRow: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.data.findIndex(row => row.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...newData };
      }
    },
    deleteRow: (state, action) => {
      const id = action.payload;
      state.data = state.data.filter(row => row.id !== id);
    },
  },
});

export const { addRow, updateRow, deleteRow } = tableSlice.actions;
export const selectTableData = (state:RootState) => state.table.data;

export default tableSlice.reducer;