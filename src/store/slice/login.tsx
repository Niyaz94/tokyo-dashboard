

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {loginInitialState} from "../initialStore"

import api from "../../utility/Axios"

import {AppThunk} from "../Reducer"
import {resetAll} from "../Actions"


const authSlice = createSlice({
  name: 'auth',
  initialState:loginInitialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<{ token: string; userId: number,username:string }>) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = 0;
      state.username = "";
    },
  },
  extraReducers: (builder) => builder.addCase(resetAll, () => loginInitialState)
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;


export const login = (credentials: { username: string; password: string }): AppThunk => async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await api.post("users/login/", credentials);

      const { token, userId,username } = response.data;
      localStorage.setItem('token', token);
      dispatch(loginSuccess({ token, userId,username }));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(loginFailure(error.message));
        } else {
            // Handle other types of errors here
            // dispatch(loginFailure(error.message));
        }
    }
};