

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {dailyInitialState}      from "../initialStore"
import {AppThunk}               from "../Reducer"
import useFetch, {FetchData}    from '../../utility/customHook/useGetAPI';
import { dailySingleInterface}  from '../../utility/types/typeStore';
import { AppDispatch }              from '../index';



const dailySlice = createSlice({
  name: 'daily',
  initialState:dailyInitialState,
  reducers: {
    loadingStart(state) {
      state.loading = "pending";
    },
    loadingSuccess(state, action: PayloadAction<dailySingleInterface[]>) {
      state.loading = "succeeded";
      state.data = action.payload;
    },
    loadingFailure(state, action: PayloadAction<string>) {
      state.loading = "failed";
    },
    addDaily(state, action: PayloadAction<dailySingleInterface>) {
      state.loading = "failed";
    },
    removeDaily(state, action: PayloadAction<number>) {
      state.loading = "failed";
    },
  }
});

export const { loadingStart, loadingSuccess, loadingFailure } = dailySlice.actions;

export default dailySlice.reducer;

export const fetchDailyId = (apiUrl:string): AppThunk => async (dispatch) => {
    dispatch(loadingStart());
    try {
      // label:0,value:new Date().toJSON().slice(0,10)}
      const { data,success}: FetchData<[]> = useFetch <[]>(apiUrl,[{}]);
      dispatch(loadingSuccess(data));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(loadingFailure(error.message));
        } else {
            // Handle other types of errors here
        }
    }
};