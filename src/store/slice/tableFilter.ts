import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../Reducer';
import {tableHeaderFilter} from "../initialStore"
interface SetFiltersPayload {
  filterName: string;
  filterKey: string;
  filterValue: string | number;
}

const tableFilterSlice = createSlice({
  name: 'tableFlter',
  initialState:tableHeaderFilter,
  reducers: {
    setFilters: (state, action: PayloadAction<SetFiltersPayload>) => {
      const { filterName, filterKey, filterValue } = action.payload;

      // Ensure the filterName exists in state
      if (!state[filterName]) {
        state[filterName] = {};
      }

      // ✅ Create a new object so the change is detected properly
      state[filterName] = {
        ...state[filterName],
        [filterKey]: filterValue,
      };
    },
    resetFilters: (state, action: PayloadAction<{ filterName: string }>) => {
      const { filterName } = action.payload;
      if (state[filterName]) {
        state[filterName] = {};
      }
    },
  },
});

export const { setFilters,resetFilters } = tableFilterSlice.actions;
export const selectTableData = (state:RootState) => state.table.data;

export default tableFilterSlice.reducer;